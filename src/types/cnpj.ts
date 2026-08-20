import type { JsonValue } from "./json";

export interface CnpjApiResponse {
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
  capital_social?: number | string;

  estabelecimento?: Estabelecimento;

  inscricoes_estaduais?: JsonValue;

  [key: string]:
  | JsonValue
  | Estabelecimento
  | undefined;
}

export interface CnpjFormProps {
  onSearch: (cnpj: string) => Promise<void>;
  loading: boolean;
}

export interface Estabelecimento {
  situacao_cadastral?: string;

  tipo_logradouro?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;

  telefone1?: string;
  telefone?: string;
  email?: string;

  cidade?: {
    nome?: string;
    [key: string]: JsonValue | undefined;
  };

  municipio?: {
    nome?: string;
    [key: string]: JsonValue | undefined;
  };

  estado?: {
    sigla?: string;
    [key: string]: JsonValue | undefined;
  };

  atividade_principal?: {
    descricao?: string;
    [key: string]: JsonValue | undefined;
  };

  inscricoes_estaduais?: JsonValue;

  [key: string]:
  | JsonValue
  | undefined;
}
