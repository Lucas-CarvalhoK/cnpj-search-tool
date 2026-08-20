import type { JsonValue } from "@/src/types/json";

const PNCP_API_URL = process.env.NEXT_PUBLIC_PNCP_API_URL;

function getApiUrl(): string {
  if (!PNCP_API_URL) throw new Error("NEXT_PUBLIC_PNCP_API_URL não foi configurada.");
  return PNCP_API_URL.replace(/\/$/, "");
}

export async function fetchPncpContracts(cnpj: string, signal?: AbortSignal): Promise<JsonValue> {
  const params = new URLSearchParams({ q: cnpj, tipos_documento: "contrato", ordenacao: "-data", pagina: "1", tam_pagina: "10", status: "vigente" });
  const response = await fetch(`${getApiUrl()}?${params.toString()}`, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Não foi possível consultar os contratos do PNCP. Código ${response.status}.`);
  const result: unknown = await response.json();
  if (result === null || typeof result !== "object") throw new Error("O PNCP retornou uma resposta inválida.");
  return result as JsonValue;
}
