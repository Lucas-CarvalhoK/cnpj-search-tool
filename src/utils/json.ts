import type { JsonValue } from "@/src/types/json";
import { formatBoolean, onlyDigits, formatCnpj, formatCep, formatPhone, formatCurrency, formatDate } from "./formatters";

export function isEmptyValue(value: JsonValue): boolean {
  return (
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

export function countFilledFields(
  data: JsonValue | undefined
): number {
  if (data === undefined || data === null) {
    return 0;
  }

  let count = 0;

  const stack: JsonValue[] = [data];

  const visited = new WeakSet<object>();

  while (stack.length > 0) {
    const current = stack.pop();

    if (
      current === undefined ||
      current === null
    ) {
      continue;
    }

    if (
      typeof current !== "object"
    ) {
      if (!isEmptyValue(current)) {
        count++;
      }

      continue;
    }

    // Evita referências circulares
    if (visited.has(current)) {
      continue;
    }

    visited.add(current);

    if (Array.isArray(current)) {
      for (const item of current) {
        stack.push(item);
      }

      continue;
    }

    for (const value of Object.values(current)) {
      if (value !== undefined) {
        stack.push(value);
      }
    }
  }

  return count;
}

export function formatValue(
  key: string,
  value: JsonValue
): string {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Não informado";
  }

  const normalizedKey = key.toLowerCase();

  if (typeof value === "boolean") {
    return formatBoolean(value);
  }

  if (
    normalizedKey.includes("cnpj") &&
    onlyDigits(value).length === 14
  ) {
    return formatCnpj(value);
  }

  if (
    normalizedKey.includes("cep") &&
    onlyDigits(value).length === 8
  ) {
    return formatCep(value);
  }

  if (
    normalizedKey.includes("telefone") ||
    normalizedKey.includes("phone")
  ) {
    return formatPhone(value);
  }

  if (
    normalizedKey.includes("capital") ||
    normalizedKey.includes("faturamento") ||
    normalizedKey.includes("receita") ||
    normalizedKey.includes("valor")
  ) {
    if (
      typeof value === "number" ||
      (typeof value === "string" &&
        !Number.isNaN(Number(value)))
    ) {
      return formatCurrency(value);
    }
  }

  if (
    normalizedKey.includes("data") ||
    normalizedKey.includes("date")
  ) {
    return formatDate(value);
  }

  return String(value);
}

// ============================================================
// HOOK DE CONSULTA
// ============================================================
