"use client";

import { useEffect, useRef, useState } from "react";
import { fetchCnpj } from "@/src/services/cnpj.service";
import {
  fetchPncpContracts,
  type PncpContractStatus,
} from "@/src/services/pncp.service";

import type { CnpjApiResponse } from "@/src/types/cnpj";
import type { JsonValue } from "@/src/types/json";
import { onlyDigits } from "@/src/utils/formatters";

const TIMEOUT_MS = Number(
  process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? 12000
);

function isAbortError(error: unknown): boolean {
  return (
    error instanceof Error &&
    error.name === "AbortError"
  );
}

const PAGE_SIZE = 10;

function getTotalPages(data: JsonValue): number {
  if (
    data === null ||
    typeof data !== "object" ||
    Array.isArray(data)
  ) {
    return 1;
  }

  const total = data.total;

  if (
    typeof total !== "number" ||
    !Number.isFinite(total) ||
    total < 0
  ) {
    return 1;
  }

  return Math.max(1, Math.ceil(total / PAGE_SIZE));
}

export function useCnpjQuery() {
  const [data, setData] =
    useState<CnpjApiResponse | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [pncpData, setPncpData] =
    useState<JsonValue | null>(null);
  const [pncpError, setPncpError] = useState("");
  const [pncpLoading, setPncpLoading] =
    useState(false);

  const [pncpPage, setPncpPage] = useState(1);
  const [pncpTotalPages, setPncpTotalPages] =
    useState(1);

  const [searchedCnpj, setSearchedCnpj] =
    useState("");
  const [searchedStatus, setSearchedStatus] =
    useState<PncpContractStatus>("todos");

  const cnpjControllerRef =
    useRef<AbortController | null>(null);

  const pncpControllerRef =
    useRef<AbortController | null>(null);

  const pncpRequestIdRef = useRef(0);

  async function queryCnpj(
    cnpj: string,
    status: PncpContractStatus = "todos"
  ): Promise<void> {
    const digits = onlyDigits(cnpj);

    if (digits.length !== 14) {
      cnpjControllerRef.current?.abort();
      pncpControllerRef.current?.abort();
      pncpRequestIdRef.current += 1;

      setError("Digite um CNPJ válido com 14 dígitos.");
      setData(null);
      setPncpData(null);
      setPncpError("");
      setSearchedCnpj("");
      setPncpPage(1);
      setPncpTotalPages(1);
      setLoading(false);
      setPncpLoading(false);
      return;
    }

    // Cancela a consulta cadastral anterior.
    cnpjControllerRef.current?.abort();

    const controller = new AbortController();
    cnpjControllerRef.current = controller;

    setLoading(true);
    setError("");
    setData(null);

    // Inicia a consulta ao PNCP pelo useEffect.
    setPncpData(null);
    setPncpError("");
    setPncpTotalPages(1);
    setPncpPage(1);
    setSearchedStatus(status);
    setSearchedCnpj(digits);

    const timeoutId = window.setTimeout(
      () => controller.abort(),
      TIMEOUT_MS
    );

    try {
      const result = await fetchCnpj(
        digits,
        controller.signal
      );

      if (!controller.signal.aborted) {
        setData(result);
      }
    } catch (err) {
      if (controller.signal.aborted) {
        if (cnpjControllerRef.current === controller) {
          setError("A consulta demorou mais do que o esperado.");
        }
      } else {
        setError(
          err instanceof Error
            ? err.message
            : "Ocorreu um erro inesperado."
        );
      }
    } finally {
      window.clearTimeout(timeoutId);

      if (cnpjControllerRef.current === controller) {
        setLoading(false);
        cnpjControllerRef.current = null;
      }
    }
  }

  // Busca contratos quando CNPJ, status ou página mudarem.
  useEffect(() => {
    if (!searchedCnpj) return;

    pncpControllerRef.current?.abort();

    const controller = new AbortController();
    pncpControllerRef.current = controller;

    const requestId = ++pncpRequestIdRef.current;

    const timeoutId = window.setTimeout(
      () => controller.abort(),
      TIMEOUT_MS
    );

    async function loadPncpContracts() {
      setPncpLoading(true);
      setPncpError("");
      setPncpData(null);

      try {
        const result = await fetchPncpContracts(
          searchedCnpj,
          searchedStatus,
          pncpPage,
          controller.signal
        );

        if (
          controller.signal.aborted ||
          pncpRequestIdRef.current !== requestId
        ) {
          return;
        }

        setPncpData(result);
        setPncpTotalPages(getTotalPages(result));
      } catch (err) {
        if (
          pncpRequestIdRef.current !== requestId
        ) {
          return;
        }

        if (controller.signal.aborted) {
          setPncpError(
            "A consulta ao PNCP demorou mais do que o esperado."
          );
        } else if (!isAbortError(err)) {
          setPncpError(
            err instanceof Error
              ? err.message
              : "Não foi possível consultar os contratos do PNCP."
          );
        }
      } finally {
        window.clearTimeout(timeoutId);

        if (
          pncpRequestIdRef.current === requestId
        ) {
          setPncpLoading(false);
        }
      }
    }

    void loadPncpContracts();

    return () => {
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [searchedCnpj, searchedStatus, pncpPage]);

  useEffect(() => {
    return () => {
      cnpjControllerRef.current?.abort();
      pncpControllerRef.current?.abort();
    };
  }, []);

  return {
    data,
    error,
    loading,
    pncpData,
    pncpError,
    pncpLoading,
    pncpPage,
    pncpTotalPages,
    setPncpPage,
    queryCnpj,
  };
}
