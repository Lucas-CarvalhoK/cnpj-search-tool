import { formatDate } from "@/src/utils/formatters";

export interface PartnerProps {
  atualizado_em?: string;
  cpf_cnpj_socio?: string;
  cpf_representante_legal?: number;
  data_entrada?: string;
  faixa_etaria?: string;
  nome?: string;
  nome_representante?: string;

  pais?: {
    nome?: string;
  };

  qualificacao_representante?: {
    descricao?: string;
  };

  qualificacao_socio?: {
    descricao?: string;
  };

  tipo?: string;
}

export interface PartnerCardProps {
  partner: PartnerProps;
}

export function PartnerCard({
  partner,
}: PartnerCardProps) {
  const {
    nome,
    tipo,
    data_entrada,
    atualizado_em,
    qualificacao_socio,
    cpf_cnpj_socio,
    faixa_etaria,
    pais,
    nome_representante,
    qualificacao_representante,
  } = partner;

  const documentType = getDocumentType(
    cpf_cnpj_socio
  );

  const hasRepresentative =
    Boolean(nome_representante);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-5 p-5 sm:p-6">

        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sócio
            </span>

            <h3 className="mt-1 truncate text-base font-bold text-slate-900 dark:text-white">
              {getValue(nome)}
            </h3>
          </div>

          <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            {getValue(tipo)}
          </span>
        </div>

        <div className="grid gap-4 border-y border-slate-100 py-5 sm:grid-cols-2 xl:grid-cols-3 dark:border-slate-800">
          <PartnerInfo
            label={documentType}
            value={getValue(cpf_cnpj_socio)}
          />

          <PartnerInfo
            label="Qualificação"
            value={getValue(
              qualificacao_socio?.descricao
            )}
          />

          <PartnerInfo
            label="Data de entrada"
            value={formatDate(data_entrada)}
          />

          <PartnerInfo
            label="Faixa etária"
            value={getValue(faixa_etaria)}
          />

          <PartnerInfo
            label="País"
            value={getValue(pais?.nome)}
          />

          <PartnerInfo
            label="Última atualização"
            value={formatDate(atualizado_em)}
          />
        </div>

        {hasRepresentative && (
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-900/50">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Representante legal
            </span>

            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <PartnerInfo
                label="Nome"
                value={getValue(
                  nome_representante
                )}
              />

              <PartnerInfo
                label="Qualificação"
                value={getValue(
                  qualificacao_representante?.descricao
                )}
              />
            </div>
          </div>
        )}

      </div>
    </article>
  );
}

function getValue(
  value?: string
): string {
  return value?.trim() || "Não informado";
}

function getDocumentType(
  value?: string
): string {
  if (!value) {
    return "CPF / CNPJ";
  }

  const digits =
    value.replace(/\D/g, "");

  if (digits.length === 14) {
    return "CNPJ do sócio";
  }

  if (digits.length === 11) {
    return "CPF do sócio";
  }

  return "Documento do sócio";
}

interface PartnerInfoProps {
  label: string;
  value: string;
  className?: string;
}

// Criar esse componente em um arquivo separado, pois o mesmo também é utilizado no ContractCard
function PartnerInfo({
  label,
  value,
  className = "",
}: PartnerInfoProps) {
  return (
    <div className={className}>
      <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
        {label}
      </span>

      <span className="mt-1 block break-words text-sm text-slate-700 dark:text-slate-300">
        {value}
      </span>
    </div>
  );
}