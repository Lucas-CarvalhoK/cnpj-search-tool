import type { ReactNode } from "react";

export interface InfoCardProps { label: string; value?: ReactNode; className?: string; }

export function InfoCard({
  label,
  value,
  className = "",
}: InfoCardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:bg-slate-900 ${className}`}
    >
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <div className="mt-2 break-words text-sm font-medium text-slate-900 dark:text-slate-100">
        {value || "Não informado"}
      </div>
    </div>
  );
}