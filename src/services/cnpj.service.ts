import type { CnpjApiResponse } from "@/src/types/cnpj";

const CNPJ_API_URL = process.env.NEXT_PUBLIC_CNPJ_API_URL;

function getApiUrl(): string {
  if (!CNPJ_API_URL) throw new Error("NEXT_PUBLIC_CNPJ_API_URL não foi configurada.");
  return CNPJ_API_URL.replace(/\/$/, "");
}

export async function fetchCnpj(cnpj: string, signal?: AbortSignal): Promise<CnpjApiResponse> {
  const response = await fetch(`${getApiUrl()}/${cnpj}`, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) {
    if (response.status === 404) throw new Error("CNPJ não encontrado.");
    if (response.status === 429) throw new Error("Muitas consultas em pouco tempo. Aguarde um momento e tente novamente.");
    throw new Error(`Não foi possível consultar o CNPJ. Código ${response.status}.`);
  }
  const result: unknown = await response.json();
  if (result === null || typeof result !== "object" || Array.isArray(result)) throw new Error("A API retornou uma resposta inválida.");
  return result as CnpjApiResponse;
}
