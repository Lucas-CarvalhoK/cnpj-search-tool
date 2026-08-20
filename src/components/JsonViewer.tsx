"use client";
import { useState } from "react";
import { CopyIcon } from "@/public/icons/CopyIcon";
import type { CnpjApiResponse } from "@/src/types/cnpj";

export interface JsonViewerProps { data: CnpjApiResponse; }

export function JsonViewer({
  data,
}: JsonViewerProps) {
  const [open, setOpen] =
    useState<boolean>(false);

  const [copied, setCopied] =
    useState<boolean>(false);

  const json = JSON.stringify(
    data,
    null,
    2
  );

  async function copyJson(): Promise<void> {
    try {
      await navigator.clipboard.writeText(json);

      setCopied(true);

      window.setTimeout(
        () => setCopied(false),
        2000
      );
    } catch {
      const textarea =
        document.createElement("textarea");

      textarea.value = json;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      document.execCommand("copy");

      document.body.removeChild(textarea);

      setCopied(true);

      window.setTimeout(
        () => setCopied(false),
        2000
      );
    }
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold">
            JSON bruto
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Visualize ou copie a resposta completa da API.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              setOpen((current) => !current)
            }
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900"
          >
            {open
              ? "Ocultar JSON"
              : "Visualizar JSON"}
          </button>

          <button
            type="button"
            onClick={copyJson}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-white dark:text-slate-900"
          >
            <CopyIcon />

            {copied
              ? "Copiado!"
              : "Copiar JSON"}
          </button>
        </div>
      </div>

      {open && (
        <pre className="max-h-[600px] overflow-auto bg-slate-950 p-5 text-xs leading-6 text-slate-100">
          <code>{json}</code>
        </pre>
      )}
    </section>
  );
}