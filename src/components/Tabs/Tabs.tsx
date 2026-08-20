"use client";

import { useState, type ReactNode } from "react";

export interface TabItem {
    id: string;
    label: string;
    content: ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    defaultTab?: string;
}

export function Tabs({
    tabs,
    defaultTab,
}: TabsProps) {
    const [activeTab, setActiveTab] = useState(
        defaultTab ?? tabs[0]?.id
    );

    const currentTab = tabs.find(
        (tab) => tab.id === activeTab
    );

    return (
        <section className="overflow-hidden rounded-2xl  border-slate-200 dark:border-slate-800 dark:bg-slate-950">
            <div className="overflow-x-auto border-b border-slate-200 dark:border-slate-800">
                <div
                    className="flex min-w-max gap-1 p-2"
                    role="tablist"
                >
                    {tabs.map((tab) => {
                        const isActive =
                            activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() =>
                                    setActiveTab(tab.id)
                                }
                                className={[
                                    "relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                                    isActive
                                        ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white",
                                ].join(" ")}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div
                role="tabpanel"
                className="animate-in fade-in duration-200 mb-2"
            >
                {currentTab?.content}
            </div>
        </section>
    );
}