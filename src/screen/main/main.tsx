"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Sili from "@/public/images/sili-logo.png";
import { useCnpjQuery } from "@/src/hooks/useCnpjQuery";
import { countFilledFields } from "@/src/utils/json";
import { ErrorIcon } from "@/public/icons/ErrorIcon";
import { BuildingIcon } from "@/public/icons/BuildingIcon";
import {
  CnpjForm,
  CompanySummary,
  PncpContracts,
  RecursiveDataViewer,
  JsonViewer,
  ThemeToggle,
  ResultSkeleton,
  Tabs
} from "@/src/components/index"
import { PartnerCard, type PartnerProps } from "@/src/components/Company/PartnerCard";
import { StateRegistrationCard } from "@/src/components/Company/StateRegistrationCard";
import { CnaeCard } from "@/src/components/Company/CnaeCard";
import { getPartners, getStateRegistrations, getSecondaryActivities } from "@/src/utils/normalizers/companyData";
import { DataSection } from "@/src/components/DataSection/DataSection";

export function Main() {
  const {
    data,
    error,
    loading,
    pncpData,
    pncpError,
    pncpLoading,
    queryCnpj,
  } = useCnpjQuery();

  const [darkMode, setDarkMode] =
    useState<boolean>(false);

  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem("theme");

    const prefersDark =
      window.matchMedia?.(
        "(prefers-color-scheme: dark)"
      ).matches;

    setDarkMode(
      savedTheme
        ? savedTheme === "dark"
        : prefersDark
    );
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      window.localStorage.setItem(
        "theme",
        "dark"
      );
    } else {
      root.classList.remove("dark");
      window.localStorage.setItem(
        "theme",
        "light"
      );
    }
  }, [darkMode]);

  const fieldCount = data
    ? countFilledFields(data)
    : 0;

  const partners = getPartners(data?.socios);

  const stateRegistrations =
    getStateRegistrations(
      data?.estabelecimento?.inscricoes_estaduais
    );

  const secondaryActivities =
    getSecondaryActivities(
      data?.estabelecimento?.atividades_secundarias
    );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <header className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3 bg-white rounded-3xl border border-slate-200 dark:border-slate-800 dark:bg-slate-950 p-5">
            <div className="flex h-22 w-48 items-center justify-center rounded-xl font-bold text-white shadow-lg shadow-blue-600/20 bg-white">
              <Image src={Sili} alt="sili logo" width={160} height={60} />
            </div>

            <div>
              <h1 className="text-lg font-bold">
                Consulta CNPJ
              </h1>

              <p className="text-sm text-slate-500">
                Dados empresariais em uma única tela
              </p>
            </div>
          </div>

          <ThemeToggle
            darkMode={darkMode}
            onToggle={() =>
              setDarkMode(
                (current) => !current
              )
            }
          />
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 py-10 shadow-sm sm:px-10 dark:border-slate-800 dark:bg-slate-950">
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-8 max-w-3xl text-center">
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Consulta empresarial
              </span>

              <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
                Consulte qualquer CNPJ
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-500">
                Consulte dados cadastrais e explore
                automaticamente toda a estrutura retornada
                pela API.
              </p>
            </div>

            <CnpjForm
              onSearch={queryCnpj}
              loading={loading}
            />
          </div>
        </section>

        <div className="mt-8">

          {error && (
            <div
              role="alert"
              className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
            >
              <ErrorIcon />

              <div>
                <p className="font-bold">
                  Não foi possível concluir a consulta
                </p>

                <p className="mt-1 text-sm">
                  {error}
                </p>
              </div>
            </div>
          )}

          {loading && <ResultSkeleton />}

          {!loading && data && (
            <div className="space-y-6">
              <Tabs
                defaultTab="resumo"
                tabs={[
                  {
                    id: "resumo",
                    label: "Resumo",
                    content: (
                      <section className="space-y-6 pt-6">
                        <CompanySummary
                          data={data}
                          fieldCount={fieldCount}
                        />

                        {/* Sócios */}
                        {partners.length > 0 && (
                          <DataSection
                            title="Quadro societário"
                            description={`${partners.length} ${partners.length === 1
                              ? "sócio encontrado"
                              : "sócios encontrados"
                              }`}
                          >
                            <div className="grid gap-4 lg:grid-cols-2">
                              {partners.map((partner, index) => (
                                <PartnerCard
                                  key={index}
                                  partner={partner}
                                />
                              ))}
                            </div>
                          </DataSection>
                        )}

                        {/* Inscrições estaduais */}
                        {stateRegistrations.length > 0 && (
                          <DataSection
                            title="Inscrições estaduais"
                            description={`${stateRegistrations.length} ${stateRegistrations.length === 1
                              ? "registro encontrado"
                              : "registros encontrados"
                              }`}
                          >
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                              {stateRegistrations.map(
                                (registration, index) => (
                                  <StateRegistrationCard
                                    key={
                                      index
                                    }
                                    stateRegistration={registration}
                                  />
                                )
                              )}
                            </div>
                          </DataSection>
                        )}

                        {/* CNAEs */}
                        {secondaryActivities.length > 0 && (
                          <DataSection
                            title="Atividades econômicas secundárias"
                            description={`${secondaryActivities.length} ${secondaryActivities.length === 1
                              ? "atividade encontrada"
                              : "atividades encontradas"
                              }`}
                          >
                            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                              {secondaryActivities.map(
                                (activity, index) => (
                                  <CnaeCard
                                    key={
                                      activity.codigo ??
                                      index
                                    }
                                    cnae={activity}
                                  />
                                )
                              )}
                            </div>
                          </DataSection>
                        )}

                        {/* Dados completos */}
                        <DataSection
                          title="Dados completos"
                          description="Visualização completa dos dados retornados pela API."
                        >
                          <RecursiveDataViewer
                            data={data}
                            label={null}
                          />
                        </DataSection>

                        {/* JSON */}
                        <DataSection
                          title="JSON bruto"
                          description="Resposta original retornada pela API."
                        >
                          <JsonViewer data={data} />
                        </DataSection>
                      </section>
                    ),
                  },

                  {
                    id: "contratos",
                    label: "Contratos PNCP",
                    content: (
                      <div className="pt-6">
                        <PncpContracts
                          data={pncpData}
                          loading={pncpLoading}
                          error={pncpError}
                        />
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>

        <footer className="py-10 text-center text-xs text-slate-400">
          Dados fornecidos pelas APIs públicas do CNPJ.ws e PNCP.
        </footer>
      </div>
    </div >
  );
}

