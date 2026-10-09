
import { ContractCard } from "./index";
import { extractPncpContracts } from "@/src/utils/pncp";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

import type { JsonValue } from "@/src/types/json";

interface PncpContractsProps {
  data: JsonValue | null;
  loading: boolean;
  error: string;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PncpContracts({
  data,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
}: PncpContractsProps) {
  const contracts = extractPncpContracts(data);

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

  if (loading) {
    return (
      <div className="space-y-4 p-5 sm:p-6">
        <ContractSkeleton />
        <ContractSkeleton />
        <ContractSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 sm:p-6">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-400">
          {error}
        </div>
      </div>
    );
  }

  if (!data || contracts.length === 0) {
    return (
      <div className="p-8 text-center">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Nenhum contrato encontrado
        </h3>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Não foram encontrados contratos para este CNPJ.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:p-6 md:p-0">
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Contratos encontrados
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          {contracts.length}{" "}
          {contracts.length === 1
            ? "contrato nesta página"
            : "contratos nesta página"}
        </p>
      </div>

      <div className="space-y-4">
        {contracts.map((contract) => (
          <ContractCard
            key={contract.id}
            {...contract}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="pt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                aria-disabled={page === 1}
                tabIndex={page === 1 ? -1 : 0}
                className={
                  page === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={(event) => {
                  event.preventDefault();
                  if (page > 1) {
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
                  onClick={(event) => {
                    event.preventDefault();
                    onPageChange(pageNumber);
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
                aria-disabled={page === totalPages}
                tabIndex={
                  page === totalPages ? -1 : 0
                }
                className={
                  page === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
                onClick={(event) => {
                  event.preventDefault();
                  if (page < totalPages) {
                    onPageChange(page + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
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
