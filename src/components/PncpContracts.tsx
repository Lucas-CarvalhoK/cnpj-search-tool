import { ContractCard } from "./index";

import { extractPncpContracts } from "@/src/utils/pncp";

import type { JsonValue } from "@/src/types/json";

interface PncpContractsProps {
  data: JsonValue | null;
  loading: boolean;
  error: string;
}

export function PncpContracts({
  data,
  loading,
  error,
}: PncpContractsProps) {
  const contracts =
    extractPncpContracts(data);

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
          Não foram encontrados contratos vigentes no PNCP para este CNPJ.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:p-6 md:p-0">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Contratos encontradoss
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {contracts.length}{" "}
            {contracts.length === 1
              ? "contrato encontrado"
              : "contratos encontrados"}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {contracts.map((contract) => (
          <ContractCard
            key={contract.id}
            {...contract}
          />
        ))}
      </div>
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