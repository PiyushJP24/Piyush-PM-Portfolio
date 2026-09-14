import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "./SectionHead";
import { analysisProjects, analysisViz, fluentIn, frameworks, tools } from "../../data/content";

const rise = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function Tools() {
    const [tab, setTab] = useState("projects");
    return (
        <section id="tools" data-testid="tools-section" className="mx-auto max-w-6xl px-6 py-24 pb-36 md:py-32 md:pb-44">
            <SectionHead
                no="04"
                kicker="Toolbox"
                title="Tools & frameworks"
                desc="The stack I build with, and the mental models I lean on when the roadmap gets loud."
            />

            <motion.div {...rise} className="mt-12 flex flex-wrap gap-3" data-testid="tools-tag-row">
                {tools.map((t) => (
                    <span
                        key={t}
                        className="rounded-full border border-line bg-panel px-4 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:border-forest hover:text-forest"
                    >
                        {t}
                    </span>
                ))}
            </motion.div>

            <motion.h3 {...rise} className="mt-20 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                How I <span className="font-serifit font-normal italic text-forest">think</span>
            </motion.h3>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {frameworks.map((f, i) => (
                    <motion.div
                        key={f.name}
                        {...rise}
                        transition={{ ...rise.transition, delay: (i % 3) * 0.08 }}
                        data-testid={`framework-card-${i}`}
                        className="rounded-2xl border border-line bg-panel/70 p-6"
                    >
                        <p className="text-xs font-semibold text-forest">{String(i + 1).padStart(2, "0")}</p>
                        <h4 className="mt-2 text-base font-semibold text-ink">{f.name}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-fog">{f.example}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div {...rise} className="mt-16">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-fog">Also fluent in</p>
                <div className="mt-4 flex flex-wrap gap-2.5" data-testid="fluent-tag-row">
                    {fluentIn.map((t) => (
                        <span key={t} className="rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-fog">
                            {t}
                        </span>
                    ))}
                </div>
            </motion.div>

            <motion.h3 {...rise} className="mt-20 text-xl font-semibold tracking-tight text-ink md:text-2xl">
                Supporting <span className="font-serifit font-normal italic text-forest">analysis</span>
            </motion.h3>

            <motion.div {...rise} className="mt-8">
                <div data-testid="analysis-tabs" className="inline-flex rounded-full border border-line bg-panel p-1">
                    {[
                        ["projects", "Projects"],
                        ["viz", "Visualisations"],
                    ].map(([key, label]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setTab(key)}
                            data-cursor="Switch"
                            data-testid={`analysis-tab-${key}`}
                            className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300 ${
                                tab === key ? "text-cream" : "text-fog hover:text-ink"
                            }`}
                        >
                            {tab === key && (
                                <motion.span
                                    layoutId="analysis-tab-pill"
                                    className="absolute inset-0 rounded-full bg-forest"
                                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                />
                            )}
                            <span className="relative">{label}</span>
                        </button>
                    ))}
                </div>
            </motion.div>

            <AnimatePresence mode="wait">
                {tab === "projects" ? (
                    <motion.div
                        key="projects"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        data-testid="analysis-projects-panel"
                        className="mt-8 grid gap-6 md:grid-cols-2"
                    >
                        {analysisProjects.map((a, i) => (
                            <div
                                key={a.title}
                                data-testid={`analysis-project-${i}`}
                                className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/40 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_44px_-16px_rgba(34,38,31,0.22)]"
                            >
                                <div className="aspect-[16/10] overflow-hidden">
                                    <img src={a.banner} alt={`${a.title} banner`} className="h-full w-full object-contain" />
                                </div>
                                <div className="flex flex-1 flex-col p-6">
                                    <h4 className="text-base font-semibold text-ink">{a.title}</h4>
                                    <p className="mt-2 text-sm leading-relaxed text-fog">{a.caption}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {a.tags.map((t) => (
                                            <span key={t} className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-fog">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-5">
                                        <a
                                            href={a.link}
                                            onClick={(e) => {
                                                if (a.link === "#") e.preventDefault();
                                            }}
                                            data-cursor="Open"
                                            data-testid={`analysis-project-link-${i}`}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-xs font-medium text-ink transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-cream"
                                        >
                                            View Project
                                            <ArrowUpRight size={13} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        key="viz"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        data-testid="analysis-viz-panel"
                    >
                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                            <p className="text-sm text-fog md:text-base">
                                Explore my interactive Tableau dashboards and data visualisations
                            </p>
                            <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                data-cursor="Tableau"
                                data-testid="tableau-public-link"
                                className="inline-flex items-center gap-1.5 rounded-full bg-forest px-5 py-2.5 text-xs font-medium text-cream transition-colors duration-300 hover:bg-ink"
                            >
                                View All on Tableau Public
                                <ArrowUpRight size={13} />
                            </a>
                        </div>
                        <div className="mt-6 grid gap-6 md:grid-cols-3">
                            {analysisViz.map((v, i) => (
                                <div
                                    key={v.title}
                                    data-testid={`analysis-viz-${i}`}
                                    className="overflow-hidden rounded-2xl border border-line bg-panel/40 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_44px_-16px_rgba(34,38,31,0.22)]"
                                >
                                    <div className="aspect-[16/10] overflow-hidden">
                                        <img src={v.thumb} alt={`${v.title} thumbnail`} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-base font-semibold text-ink">{v.title}</h4>
                                        <p className="mt-2 text-sm leading-relaxed text-fog">{v.caption}</p>
                                        <a
                                            href={v.link}
                                            onClick={(e) => {
                                                if (v.link === "#") e.preventDefault();
                                            }}
                                            data-cursor="Open"
                                            data-testid={`analysis-viz-link-${i}`}
                                            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-ink/20 px-4 py-2 text-xs font-medium text-ink transition-colors duration-300 hover:border-forest hover:bg-forest hover:text-cream"
                                        >
                                            View Dashboard
                                            <ArrowUpRight size={13} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
