import type { JsonValue } from "@/src/types/json";
import { PrimitiveValue } from "./PrimitiveValue";
import { humanizeKey } from "@/src/utils/formatters";

export interface RecursiveDataViewerProps { data: JsonValue; label?: string | null; depth?: number; }

export function RecursiveDataViewer({
  data,
  label = "Dados",
  depth = 0,
}: RecursiveDataViewerProps) {
  if (
    data === null ||
    typeof data !== "object"
  ) {
    return (
      <PrimitiveValue
        label={label ?? "Valor"}
        value={data}
      />
    );
  }

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return (
        <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm italic text-slate-400 dark:border-slate-700">
          {label
            ? `${humanizeKey(label)}: nenhum item encontrado.`
            : "Nenhum item encontrado."}
        </div>
      );
    }

    return (
      <section className="space-y-3">
        {label && (
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              {humanizeKey(label)}
            </h3>

            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-bold text-blue-600 dark:text-blue-400">
              {data.length}
            </span>
          </div>
        )}

        <div className="space-y-3">
          {data.map((item, index) => (
            <div
              key={`${label ?? "array"}-${index}`}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <RecursiveDataViewer
                data={item}
                label={`Item ${index + 1}`}
                depth={depth + 1}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  const entries = Object.entries(data);

  return (
    <section
      className={
        depth > 0
          ? "rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950"
          : ""
      }
    >
      {label && depth > 0 && (
        <h3 className="mb-3 break-words text-sm font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          {humanizeKey(label)}
        </h3>
      )}

      <dl>
        {entries.map(([key, value]) => {
          const nested =
            value !== null &&
            typeof value === "object";

          if (nested) {
            return (
              <div
                key={key}
                className="py-3"
              >
                <RecursiveDataViewer
                  data={value}
                  label={key}
                  depth={depth + 1}
                />
              </div>
            );
          }

          return (
            <PrimitiveValue
              key={key}
              label={key}
              value={value ?? null}
            />
          );
        })}
      </dl>
    </section>
  );
}