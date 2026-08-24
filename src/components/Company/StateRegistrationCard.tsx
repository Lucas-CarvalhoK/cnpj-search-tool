import Image from "next/image";

interface StateRegistrationProps {
  inscricao_estadual?: string | number;
  ativo?: boolean;
  estado?: {
    nome?: string;
    sigla?: string;
  };
}

export interface RegistrationProps {
  inscricao_estadual: number;
  stateRegistration?: StateRegistrationProps;
}

function getStatus(ativo?: boolean) {
  if (ativo === true) {
    return {
      label: "Ativa",
      container:
        "border-emerald-500/20 bg-emerald-500/10",
      text:
        "text-emerald-700 dark:text-emerald-300",
      labelText:
        "text-emerald-600 dark:text-emerald-400",
    };
  }

  if (ativo === false) {
    return {
      label: "Inativa",
      container:
        "border-red-500/20 bg-red-500/10",
      text:
        "text-red-700 dark:text-red-300",
      labelText:
        "text-red-700 dark:text-red-300",
    };
  }

  return {
    label: "Não informado",
    container:
      "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50",
    text:
      "text-slate-700 dark:text-slate-300",
    labelText:
      "text-slate-500 dark:text-slate-400",
  };
}

export function StateRegistrationCard({
  stateRegistration,
}: RegistrationProps) {
  if (!stateRegistration) {
    return null;
  }

  const {
    inscricao_estadual,
    ativo,
    estado,
  } = stateRegistration;

  const status = getStatus(ativo);

  const stateName =
    estado?.nome || "Não informado";

  const stateInitials =
    estado?.sigla || "--";

  const hasStateFlag =
    Boolean(estado?.sigla);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
      <div className="space-y-5 p-5 sm:p-6">

        <div className="flex items-start justify-between gap-4">

          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Estado
            </span>

            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {stateName}
            </h3>

            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {stateInitials}
            </span>
          </div>

          {hasStateFlag && (
            <Image
              width={48}
              height={48}
              className="shrink-0 rounded-lg"
              src={`https://assets.codante.io/codante-apis/bandeiras-dos-estados/${estado?.sigla?.toLowerCase()}-square-rounded.svg`}
              alt={`Bandeira do estado ${stateName}`}
            />
          )}

        </div>

        <div className="border-y border-slate-100 py-4 dark:border-slate-800">
          <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Número da inscrição
          </span>

          <strong className="mt-1 block break-all text-base text-slate-900 dark:text-white">
            {inscricao_estadual || "Não informado"}
          </strong>
        </div>

        <div
          className={`rounded-xl border px-4 py-3 ${status.container}`}
        >
          <span
            className={`text-xs font-semibold uppercase tracking-wider ${status.labelText}`}
          >
            Situação da inscrição
          </span>

          <p
            className={`mt-1 text-base font-bold ${status.text}`}
          >
            {status.label}
          </p>
        </div>

      </div>
    </article>
  );
}