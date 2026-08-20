import {
  formatDate,
  formatCurrency,
} from "@/src/utils/formatters";

export interface ContractProps {
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

function getValue(
  value: string | undefined
): string {
  return value?.trim() || "Não informado";
}

export function ContractCard({
  numero_controle_pncp,
  valor_global,
  title,
  data_atualizacao_pncp,
  data_inicio_vigencia,
  data_fim_vigencia,
  orgao_nome,
  uf,
  municipio_nome,
  modalidade_licitacao_nome,
  description,
}: ContractProps) {
  const location =
    municipio_nome || uf
      ? `${municipio_nome ?? "Não informado"}/${uf ?? "--"}`
      : "Não informado";

  const validity =
    data_inicio_vigencia || data_fim_vigencia
      ? `${formatDate(data_inicio_vigencia)} até ${formatDate(data_fim_vigencia)}`
      : "Não informado";

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 space-y-5 p-5 sm:p-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {getValue(title)}
            </h3>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="font-semibold">
                ID do contrato PNCP:
              </span>{" "}
              {getValue(numero_controle_pncp)}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <ContractInfo
              label="Modalidade"
              value={getValue(modalidade_licitacao_nome)}
            />

            <ContractInfo
              label="Última atualização"
              value={formatDate(data_atualizacao_pncp)}
            />

            <ContractInfo
              label="Órgão"
              value={getValue(orgao_nome)}
            />

            <ContractInfo
              label="Local"
              value={location}
            />

            <ContractInfo
              label="Vigência"
              value={validity}
              className="sm:col-span-2 xl:col-span-1"
            />
          </div>

          <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Objeto
            </span>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {getValue(description)}
            </p>
          </div>
        </div>

        <div className="flex min-w-full flex-col justify-center border-t border-slate-200 bg-slate-50 p-5 sm:p-6 lg:min-w-60 lg:border-l lg:border-t-0 dark:border-slate-800 dark:bg-slate-900/50">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Valor total contratado
          </span>

          <strong className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {typeof valor_global === "number"
              ? formatCurrency(valor_global)
              : "Não informado"}
          </strong>
        </div>
      </div>
    </article>
  );
}

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