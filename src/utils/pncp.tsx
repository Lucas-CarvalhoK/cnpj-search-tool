import type {
  JsonObject,
  JsonValue,
} from "@/src/types/json";

export interface PncpContract {
  id: string;
  numero_controle_pncp?: string;
  valor_global?: number;
  title?: string;
  data_atualizacao_pncp?: string;
  data_inicio_vigencia?: string;
  data_fim_vigencia?: string;
  orgao_nome?: string;
  uf?: string;
  municipio_nome?: string;
  modalidade_licitacao_nome?: string;
  description?: string;
}

function isJsonObject(
  value: JsonValue
): value is JsonObject {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

export function extractPncpContracts(
  data: JsonValue | null
): PncpContract[] {
  if (!data) {
    return [];
  }

  if (Array.isArray(data)) {
    return data
      .filter(isJsonObject)
      .map(toContract);
  }

  if (!isJsonObject(data)) {
    return [];
  }

  const possibleArrays = [
    data.items,
    data.data,
    data.resultados,
    data.results,
  ];

  for (const value of possibleArrays) {
    if (Array.isArray(value)) {
      return value
        .filter(isJsonObject)
        .map(toContract);
    }
  }

  return [];
}

function toContract(
  data: JsonObject
): PncpContract {
  return {
    id: getString(data.id) ??
      getString(data.numero_controle_pncp) ??
      crypto.randomUUID(),

    numero_controle_pncp:
      getString(data.numero_controle_pncp),

    valor_global:
      getNumber(data.valor_global),

    title:
      getString(data.title) ??
      getString(data.titulo),

    data_atualizacao_pncp:
      getString(data.data_atualizacao_pncp),

    data_inicio_vigencia:
      getString(data.data_inicio_vigencia),

    data_fim_vigencia:
      getString(data.data_fim_vigencia),

    orgao_nome:
      getString(data.orgao_nome),

    uf:
      getString(data.uf),

    municipio_nome:
      getString(data.municipio_nome),

    modalidade_licitacao_nome:
      getString(data.modalidade_licitacao_nome),

    description:
      getString(data.description) ??
      getString(data.descricao),
  };
}

function getString(
  value: JsonValue | undefined
): string | undefined {
  return typeof value === "string"
    ? value
    : undefined;
}

function getNumber(
  value: JsonValue | undefined
): number | undefined {
  return typeof value === "number"
    ? value
    : undefined;
}