
import { ContractCard } from "./index";
import { extractPncpContracts } from "@/src/utils/pncp";
import type { JsonValue } from "@/src/types/json";
import type { PncpContractStatus } from "../services/pncp.service";

import { LoaderCircle } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface PncpContractsProps {
  data: JsonValue | null;
  loading: boolean;
  error: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  status: PncpContractStatus;
  onStatusChange: (status: PncpContractStatus) => void;
}

const options: {
  label: string;
  value: PncpContractStatus;
}[] = [
    { label: "Todos os contratos", value: "todos" },
    { label: "Vigentes", value: "vigente" },
    { label: "Não vigentes", value: "nao_vigente" },
  ];

export function PncpContracts({
  data,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  status,
  onStatusChange,
}: PncpContractsProps) {
  const contracts = extractPncpContracts(data);

  const rawTotal =
    data && typeof data === "object" && !Array.isArray(data)
      ? Number(data.total ?? 0)
      : 0;

  const totalContracts =
    Number.isFinite(rawTotal) && rawTotal >= 0
      ? rawTotal
      : 0;

  const visiblePages = Array.from(
    { length: Math.min(5, totalPages) },
    (_, index) => {
      const start = Math.max(
        1,
        Math.min(page - 2, totalPages - 4)
      );

      return start + index;
    }
  );

  return (
    <div className="space-y-6 sm:p-6 md:p-0">
      {/* Cabeçalho e filtros */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Contratos encontrados
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {totalContracts.toLocaleString("pt-BR")}{" "}
            {totalContracts === 1
              ? "contrato encontrado"
              : "contratos encontrados"}
          </p>
        </div>

        <fieldset
          disabled={loading}
          className="flex flex-col gap-x-3 disabled:opacity-60"
        >
          <legend className="text-lg font-bold text-slate-900 dark:text-white">
            Status dos contratos
          </legend>

          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
              >
                <input
                  type="radio"
                  name="contractStatus"
                  value={option.value}
                  checked={status === option.value}
                  onChange={() => onStatusChange(option.value)}
                  className="h-4 w-4 accent-blue-600"
                />

                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Lista de contratos e overlay de loading */}
      <div
        className="relative min-h-[300px]"
        aria-busy={loading}
      >
        <div
          className={`space-y-4 transition-opacity duration-200 ${loading ? "opacity-40" : "opacity-100"
            }`}
        >
          {contracts.length > 0 ? (
            contracts.map((contract) => (
              <ContractCard
                key={contract.id}
                {...contract}
              />
            ))
          ) : loading ? (
            <>
              <ContractSkeleton />
              <ContractSkeleton />
              <ContractSkeleton />
            </>
          ) : error ? (
            <div
              role="alert"
              className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-400"
            >
              {error}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 p-8 text-center dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Nenhum contrato encontrado
              </h3>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Não foram encontrados contratos para este CNPJ
                com o filtro selecionado.
              </p>
            </div>
          )}
        </div>

        {/* Overlay de carregamento */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-start justify-center rounded-xl bg-white/30 pt-24 backdrop-blur-[2px] dark:bg-slate-950/30">
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-lg dark:border-slate-700 dark:bg-slate-900"
            >
              <LoaderCircle
                className="h-5 w-5 animate-spin text-blue-600"
                aria-hidden="true"
              />

              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                Atualizando contratos...
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Erro com dados anteriores preservados */}
      {error && contracts.length > 0 && !loading && (
        <div
          role="alert"
          className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-400"
        >
          {error}
        </div>
      )}

      {/* Paginação */}
      {!error && totalPages > 1 && (
        <div
          className={
            loading ? "pointer-events-none opacity-50" : ""
          }
          aria-busy={loading}
        >
          <Pagination className="pt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={page === 1 || loading}
                  tabIndex={page === 1 || loading ? -1 : 0}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  onClick={(event) => {
                    event.preventDefault();

                    if (!loading && page > 1) {
                      onPageChange(page - 1);
                    }
                  }}
                />
              </PaginationItem>

              {visiblePages[0] > 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              {visiblePages.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={page === pageNumber}
                    aria-disabled={loading}
                    tabIndex={loading ? -1 : 0}
                    onClick={(event) => {
                      event.preventDefault();

                      if (!loading && page !== pageNumber) {
                        onPageChange(pageNumber);
                      }
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {visiblePages[visiblePages.length - 1] <
                totalPages && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={
                    page === totalPages || loading
                  }
                  tabIndex={
                    page === totalPages || loading ? -1 : 0
                  }
                  className={
                    page === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                  onClick={(event) => {
                    event.preventDefault();

                    if (!loading && page < totalPages) {
                      onPageChange(page + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

function ContractSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
      <div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />

      <div className="mt-4 h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="h-12 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-12 rounded bg-slate-200 dark:bg-slate-800" />
        <div className="h-12 rounded bg-slate-200 dark:bg-slate-800" />
      </div>
    </div>
  );
}
