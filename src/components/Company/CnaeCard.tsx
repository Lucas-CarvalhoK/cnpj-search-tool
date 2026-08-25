export interface CnaeData {
  codigo?: string | number;
  descricao?: string;

  secao?: string;
  divisao?: string;
  grupo?: string;
  classe?: string;
  subclasse?: string;
}

export interface CnaeCardProps {
  cnae: CnaeData;
}

export function CnaeCard({ cnae }: CnaeCardProps) {
    if (!cnae) return null;

    const {
  
        secao,
        divisao,
        grupo,
        classe,
        subclasse,
        descricao,
    } = cnae;

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
            <div className="grid grid-cols-1 gap-4 p-4">
                <div className="flex flex-row items-center justify-between">
                    <span className="flex flex-col">
                        <strong className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Subclasse CNAE
                        </strong>
                        <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            {subclasse}
                        </span>
                    </span>
                </div>

                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/50">
                    <strong className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Descrição
                    </strong>
                    <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {descricao}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600 sm:grid-cols-4 dark:text-slate-400">
                    <div>
                        <strong className="block text-slate-900 dark:text-slate-200">Seção:</strong>
                        {secao}
                    </div>
                    <div>
                        <strong className="block text-slate-900 dark:text-slate-200">Divisão:</strong>
                        {divisao}
                    </div>
                    <div>
                        <strong className="block text-slate-900 dark:text-slate-200">Grupo:</strong>
                        {grupo}
                    </div>
                    <div>
                        <strong className="block text-slate-900 dark:text-slate-200">Classe:</strong>
                        {classe}
                    </div>
                </div>
            </div>
        </div>
    );
}