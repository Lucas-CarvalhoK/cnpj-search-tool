import { InfoCard } from "./InfoCard";
import type { CnpjApiResponse } from "@/src/types/cnpj";
import { formatCnpj, formatCep, formatPhone } from "@/src/utils/formatters";

export interface CompanySummaryProps { data: CnpjApiResponse; fieldCount: number; }

export function CompanySummary({
  data,
  fieldCount,
}: CompanySummaryProps) {
  const establishment =
    data.estabelecimento;

  const city =
    establishment?.cidade?.nome ??
    establishment?.municipio?.nome ??
    "";

  const state =
    establishment?.estado?.sigla ?? "";

  const cnae =
    establishment?.atividade_principal?.descricao ??
    "Não informado";

  const phone =
    establishment?.telefone1 ??
    establishment?.telefone ??
    "";

  const email =
    establishment?.email ?? "";

  const address = [
    establishment?.tipo_logradouro,
    establishment?.logradouro,
    establishment?.numero,
    establishment?.complemento,
  ]
    .filter(Boolean)
    .join(", ");

  const neighborhood =
    establishment?.bairro ?? "";

  const cep =
    establishment?.cep
      ? formatCep(establishment.cep)
      : "";

  const stateRegistration =
    establishment?.inscricoes_estaduais ??
    data.inscricoes_estaduais;

  const situation =
    establishment?.situacao_cadastral ??
    "Não informado";

  const fantasyName =
    typeof establishment?.nome_fantasia === "string"
      ? establishment.nome_fantasia
      : "Nome fantasia não informado";

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-600/10 via-blue-500/5 to-transparent p-6 dark:border-slate-800">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div className="min-w-0">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-600/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                CNPJ {formatCnpj(data.cnpj)}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                {fieldCount} campos preenchidos
              </span>
            </div>

            <h2 className="break-words text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
              {data.razao_social ??
                "Razão social não informada"}
            </h2>

            <p className="mt-2 text-slate-500">
             Nome Fantasia: {fantasyName}
            </p>
          </div>

          <div className="w-fit rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Situação cadastral
            </p>

            <p className="mt-1 font-bold text-emerald-700 dark:text-emerald-300">
              {situation}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          label="Endereço"
          value={address}
          className="sm:col-span-2"
        />

        <InfoCard
          label="Bairro / CEP"
          value={[neighborhood, cep ? `CEP ${cep}` : ""]
            .filter(Boolean)
            .join(" • ")}
        />

        <InfoCard
          label="Cidade / UF"
          value={[city, state]
            .filter(Boolean)
            .join(" / ")}
        />

        <InfoCard
          label="CNAE principal"
          value={cnae}
          className="lg:col-span-2"
        />

        <InfoCard
          label="Telefone"
          value={formatPhone(phone)}
        />

        <InfoCard
          label="E-mail"
          value={email}
        />

        <InfoCard
          label="Inscrições estaduais"
          value={
            Array.isArray(stateRegistration)
              ? stateRegistration.length > 0
                ? `${stateRegistration.length} registro(s)`
                : "Não informado"
              : stateRegistration
                ? String(stateRegistration)
                : "Não informado"
          }
        />
      </div>
    </section>
  );
}
