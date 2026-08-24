"use client";
import { useState } from "react";
import { SearchIcon } from "@/public/icons/SearchIcon";
import { formatCnpj, onlyDigits } from "@/src/utils/formatters";
import { CnpjFormProps } from "../types/cnpj";

export function CnpjForm({
  onSearch,
  loading,
}: CnpjFormProps) {
  const [cnpj, setCnpj] =
    useState<string>("");

  const [validationError, setValidationError] =
    useState<string>("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    setCnpj(formatCnpj(event.target.value));
    setValidationError("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    if (onlyDigits(cnpj).length !== 14) {
      setValidationError(
        "Informe um CNPJ válido com 14 dígitos."
      );

      return;
    }

    await onSearch(cnpj);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <label
          htmlFor="cnpj"
          className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          CNPJ
        </label>

        <input
          id="cnpj"
          value={cnpj}
          onChange={handleChange}
          placeholder="00.000.000/0000-00"
          inputMode="numeric"
          autoComplete="off"
          disabled={loading}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />

        {validationError && (
          <p className="mt-2 text-sm text-red-500">
            {validationError}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-7 inline-flex h-[52px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 hover: cursor-pointer"
      >
        {loading ? (
          <>
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Consultando...
          </>
        ) : (
          <>
            <SearchIcon />
            Consultar
          </>
        )}
      </button>
    </form>
  );
}