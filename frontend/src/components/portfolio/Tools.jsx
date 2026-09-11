import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "./SectionHead";
import { analysis, fluentIn, frameworks, tools } from "../../data/content";

const rise = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
};

export default function Tools() {
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
            <div className="mt-8 grid gap-5 md:grid-cols-3">
                {analysis.map((a, i) => (
                    <motion.div
                        key={a.title}
                        {...rise}
                        transition={{ ...rise.transition, delay: i * 0.08 }}
                        data-testid={`analysis-card-${i}`}
                        className="rounded-2xl border border-line bg-panel/40 p-6"
                    >
                        <h4 className="text-base font-semibold text-ink">{a.title}</h4>
                        <p className="mt-2 text-sm leading-relaxed text-fog">{a.caption}</p>
                        <a
                            href={a.link}
                            onClick={(e) => {
                                if (a.link === "#") e.preventDefault();
                            }}
                            data-cursor="Peek"
                            data-testid={`analysis-link-${i}`}
                            className="sweep mt-4 inline-flex items-center gap-1 text-sm font-medium text-forest"
                        >
                            View the board
                            <ArrowUpRight size={13} />
                        </a>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
