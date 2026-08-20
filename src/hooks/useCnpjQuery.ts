"use client";

import { useEffect, useRef, useState } from "react";
import { fetchCnpj } from "@/src/services/cnpj.service";
import { fetchPncpContracts } from "@/src/services/pncp.service";
import type { CnpjApiResponse } from "@/src/types/cnpj";
import type { JsonValue } from "@/src/types/json";
import { onlyDigits } from "@/src/utils/formatters";

const TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS ?? 12000);

export function useCnpjQuery() {
  const [data, setData] = useState<CnpjApiResponse | null>(null);
  const [error, setError] = useState("");
  const [pncpData, setPncpData] = useState<JsonValue | null>(null);
  const [pncpError, setPncpError] = useState("");
  const [pncpLoading, setPncpLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  async function queryPncp(cnpj: string, signal: AbortSignal) {
    setPncpLoading(true); setPncpError(""); setPncpData(null);
    try { setPncpData(await fetchPncpContracts(cnpj, signal)); }
    catch (err) { if (!(err instanceof DOMException && err.name === "AbortError")) setPncpError(err instanceof Error ? err.message : "Não foi possível consultar os contratos do PNCP."); }
    finally { setPncpLoading(false); }
  }

  async function queryCnpj(cnpj: string): Promise<void> {
    const digits = onlyDigits(cnpj);
    if (digits.length !== 14) { setError("Digite um CNPJ válido com 14 dígitos."); setData(null); setPncpData(null); setPncpError(""); return; }
    controllerRef.current?.abort();
    const controller = new AbortController(); controllerRef.current = controller;
    const timeoutId = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    setLoading(true); setError(""); setData(null);
    try {
      const cnpjPromise = fetchCnpj(digits, controller.signal).then(setData);
      await Promise.all([cnpjPromise, queryPncp(digits, controller.signal)]);
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") setError("A consulta demorou mais do que o esperado.");
      else setError(err instanceof Error ? err.message : "Ocorreu um erro inesperado.");
    } finally {
      window.clearTimeout(timeoutId); setLoading(false);
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  }

  useEffect(() => () => controllerRef.current?.abort(), []);
  return { data, error, loading, pncpData, pncpError, pncpLoading, queryCnpj };
}
