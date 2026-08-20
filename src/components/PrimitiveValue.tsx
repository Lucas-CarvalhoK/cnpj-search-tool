import type { JsonValue } from "@/src/types/json";
import { humanizeKey } from "@/src/utils/formatters";
import { isEmptyValue, formatValue } from "@/src/utils/json";

export interface PrimitiveValueProps { label: string; value: JsonValue; }

export function PrimitiveValue({
  label,
  value,
}: PrimitiveValueProps) {
  const empty = isEmptyValue(value);

  return (
    <div className="grid gap-2 border-b border-slate-100 py-3 last:border-0 sm:grid-cols-[minmax(180px,0.35fr)_1fr] dark:border-slate-800">
      <dt className="text-sm font-semibold text-slate-600 dark:text-slate-400">
        {humanizeKey(label)}
      </dt>

      <dd
        className={
          empty
            ? "text-sm italic text-slate-400"
            : "break-words text-sm text-slate-900 dark:text-slate-100"
        }
      >
        {formatValue(label, value)}
      </dd>
    </div>
  );
}