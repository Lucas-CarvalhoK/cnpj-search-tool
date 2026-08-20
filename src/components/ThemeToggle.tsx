import { MoonIcon } from "@/public/icons/MoonIcon";
import { SunIcon } from "@/public/icons/SunIcon";

export interface ThemeToggleProps { darkMode: boolean; onToggle: () => void; }

export function ThemeToggle({
  darkMode,
  onToggle,
}: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Alternar tema"
      title="Alternar tema"
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-all hover:scale-105 hover:bg-slate-100 active:scale-95 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
    >
      {darkMode ? (
        <SunIcon />
      ) : (
        <MoonIcon />
      )}
    </button>
  );
}