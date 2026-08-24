"use client";

import {
  useState,
  type ReactNode,
} from "react";

interface DataSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function DataSection({
  title,
  description,
  children,
  defaultOpen = false,
}: DataSectionProps) {
  const [isOpen, setIsOpen] =
    useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors dark:border-slate-800 dark:bg-slate-950">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="hover:cursor-pointer flex w-full items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>

        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-lg text-slate-500 transition-transform duration-200 dark:border-slate-800 dark:text-slate-400 ${
            isOpen
              ? "rotate-180"
              : ""
          }`}
        >
          ↓
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-slate-200 p-5 dark:border-slate-800">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}