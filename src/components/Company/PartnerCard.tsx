import {
  formatDate,
} from "@/src/utils/formatters";

interface PartnerProps {
  atualizado_em: string;
  cpf_cnpj_socio?: string;
  cpf_representante_legal?: number;
  data_entrada?: string;
  faixa_etaria?: string;
  nome?: string;
  nome_representante?: string;
  pais?: object;
  qualificacao_representante?: object;
  qualificacao_socio?: {
    descricao: string;
  };
  tipo?: string;
}

export interface PartnerCardProps {
  cpf_cnpj_socio: string;
  nome_socio: any;
  partner?: PartnerProps;
}

export function PartnerCard({ partner }: PartnerCardProps) {
  if (!partner) return null;

  const {
    nome,
    tipo,
    data_entrada,
    atualizado_em,
    qualificacao_socio,
    cpf_cnpj_socio
  } = partner;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 p-4">
        <ContractInfo
          label={isCnpj(cpf_cnpj_socio) ? "CNPJ do Sócio" : "CPF / Nome do Sócio"}
          value={getValue(nome)}
        />

        <ContractInfo
          label="Qualificação"
          value={getValue(qualificacao_socio?.descricao)}
        />

        <ContractInfo
          label="Tipo"
          value={getValue(tipo)}
        />

        <ContractInfo
          label="Data de entrada"
          value={formatDate(data_entrada)}
        />

        <ContractInfo
          label="Atualizado em"
          value={formatDate(atualizado_em)}
          className="sm:col-span-2 xl:col-span-1"
        />
      </div>
    </div>
  );
}

function getValue(
  value: string | undefined
): string {
  return value?.trim() || "Não informado";
}

function isCnpj(value?: string): boolean {
  if (!value) return false;

  const cleanValue = value.replace(/\D/g, '');

  return cleanValue.length === 14;
};

interface ContractInfoProps {
  label: string;
  value: string;
  className?: string;
}

function ContractInfo({
  label,
  value,
  className = "",
}: ContractInfoProps) {
  return (
    <div className={className}>
      <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>

      <span className="mt-1 block text-sm text-slate-700 dark:text-slate-300">
        {value}
      </span>
    </div>
  );
}