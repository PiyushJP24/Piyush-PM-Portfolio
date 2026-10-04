import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];
const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
});

export function Badge() {
    return (
        <div className="relative h-36 w-36" data-testid="crafted-badge">
            <svg viewBox="0 0 100 100" className="badge-rotate h-full w-full" aria-hidden="true">
                <defs>
                    <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" fill="none" />
                </defs>
                <text className="fill-ink" style={{ fontSize: "8.4px", letterSpacing: "1.6px", fontWeight: 500 }}>
                    <textPath href="#badge-circle">CRAFTED WITH INTENT &amp; CAFFEINE ✦ VIBE CODED 2026 ✦</textPath>
                </text>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-forest">
                <ArrowUpRight size={20} />
            </span>
        </div>
    );
}

function Accent({ children }) {
    return <span className="font-serifit font-normal italic text-forest">{children}</span>;
}

function Section({ testid, title, accent, children }) {
    return (
        <motion.section {...rise(0.05)} className="mt-14 border-t border-line pt-12">
            <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                {title} <Accent>{accent}</Accent>
            </h2>
            <div data-testid={testid}>{children}</div>
        </motion.section>
    );
}

function DotBullets({ items, testidPrefix }) {
    return (
        <ul className="mt-6 space-y-4">
            {items.map((t, i) => (
                <li
                    key={i}
                    data-testid={`${testidPrefix}-${i}`}
                    className="flex gap-3.5 text-sm leading-relaxed text-ink/80 md:text-base"
                >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
                    {t}
                </li>
            ))}
        </ul>
    );
}

const actionPill =
    "btn-circle inline-flex items-center justify-center gap-3 rounded-full border border-ink/25 py-3.5 pl-11 pr-8 text-sm font-medium tracking-wide text-ink";

export default function ProjectDetail({ hero, data }) {
    const goNext = (e) => {
        if (!hero.next.href.startsWith("/work/")) return;
        e.preventDefault();
        if (window.__navigate) window.__navigate(hero.next.href);
    };
    const overviewItems = [
        ["My Role", data.role],
        ["Team", data.team],
        ["Timeline", data.timeline],
        ["Outcome", data.outcome],
    ].filter(([, v]) => v);
    const showActions = Boolean(
        data.liveUrl || data.docsUrl || (data.liveDisabled && data.liveLabel) || (data.githubUrl && data.githubLabel)
    );

    return (
        <article data-testid={`${hero.slug}-detail`} className="mx-auto max-w-4xl px-6 pb-32 pt-32 md:pt-40">
            <motion.div {...rise(0)}>
                <a
                    href="/#work"
                    onClick={(e) => {
                        e.preventDefault();
                        if (window.__navigate) window.__navigate("/#work");
                    }}
                    data-cursor="All Work"
                    data-testid="back-to-work-link"
                    className="sweep inline-flex items-center gap-2 text-sm font-medium text-fog transition-colors hover:text-ink"
                >
                    <ArrowLeft size={14} />
                    Back to all work
                </a>
            </motion.div>

            <motion.div {...rise(0.08)} className="mt-8">
                <span className="whitespace-nowrap rounded-full bg-forest px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream">
                    {data.tag || hero.status}
                </span>
                <h1
                    data-testid="detail-title"
                    className="mt-6 text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-ink sm:text-5xl md:text-6xl"
                >
                    {hero.titleMain} <Accent>{hero.titleAccent}</Accent>
                </h1>
                <p className="mt-4 max-w-xl text-sm text-fog md:text-lg">{hero.subtitle}</p>
            </motion.div>

            <motion.div {...rise(0.16)} className="mt-10 overflow-hidden rounded-[1.75rem] border border-line">
                <img src={hero.banner} alt={hero.bannerAlt} data-testid="detail-banner" className="block w-full" />
            </motion.div>

            <motion.dl
                {...rise(0.2)}
                data-testid="detail-overview"
                className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-10 md:grid-cols-4"
            >
                {overviewItems.map(([k, v]) => (
                    <div key={k}>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">{k}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-ink/85">{v}</dd>
                    </div>
                ))}
            </motion.dl>

            {showActions && (
                <motion.div {...rise(0.24)} data-testid="detail-actions" className="mt-10 flex flex-col gap-4 sm:flex-row">
                    {data.liveUrl ? (
                        <a
                            href={data.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="Live"
                            data-testid="live-button"
                            className={actionPill}
                        >
                            <span className="fill-dot" aria-hidden="true" />
                            <span className="btn-label relative">{data.liveLabel || "View live project"}</span>
                            <ArrowUpRight size={15} className="btn-label relative" aria-hidden="true" />
                        </a>
                    ) : data.liveDisabled && data.liveLabel ? (
                        <span
                            data-testid="live-button-disabled"
                            className={`${actionPill} pointer-events-none opacity-50 [cursor:none]`}
                        >
                            <span className="fill-dot" aria-hidden="true" />
                            <span className="relative">{data.liveLabel}</span>
                            <ArrowUpRight size={15} className="relative" aria-hidden="true" />
                        </span>
                    ) : null}
                    {data.docsUrl && (
                        <a
                            href={data.docsUrl}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="Read"
                            data-testid="docs-button"
                            className={actionPill}
                        >
                            <span className="fill-dot" aria-hidden="true" />
                            <span className="btn-label relative">{data.docsLabel || "Read the documentation"}</span>
                            <ArrowUpRight size={15} className="btn-label relative" aria-hidden="true" />
                        </a>
                    )}
                    {data.githubUrl && data.githubLabel && (
                        <a
                            href={data.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            data-cursor="GitHub"
                            data-testid="github-button"
                            className={actionPill}
                        >
                            <span className="fill-dot" aria-hidden="true" />
                            <span className="btn-label relative">{data.githubLabel}</span>
                            <ArrowUpRight size={15} className="btn-label relative" aria-hidden="true" />
                        </a>
                    )}
                </motion.div>
            )}

            {data.overview && (
                <motion.section {...rise(0.05)} className="mt-14">
                    <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Overview</h2>
                    <p data-testid="detail-narrative" className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">
                        {data.overview}
                    </p>
                </motion.section>
            )}

            {data.myRole && data.myRole.length > 0 && (
                <motion.section {...rise(0.05)} className="mt-14">
                    <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                        My role in <Accent>this project</Accent>
                    </h2>
                    <ul className="mt-6 space-y-4">
                        {data.myRole.map((b, i) => (
                            <li
                                key={i}
                                data-testid={`detail-role-${i}`}
                                className="flex gap-3.5 border-t border-line pt-4 text-sm leading-relaxed text-ink/80 md:text-base"
                            >
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                                    <Check size={12} strokeWidth={3} />
                                </span>
                                {b}
                            </li>
                        ))}
                    </ul>
                </motion.section>
            )}

            {data.stack && data.stack.length > 0 && (
                <motion.section {...rise(0.05)} className="mt-14">
                    <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Tech stack</h2>
                    <div className="mt-5 flex flex-wrap gap-3" data-testid="detail-stack">
                        {data.stack.map((t) => (
                            <span
                                key={t}
                                className="rounded-full border border-line bg-panel px-4 py-2 text-sm font-medium text-ink"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </motion.section>
            )}

            {data.problem && (
                <Section testid="detail-problem" title="01 Problem and" accent="evidence">
                    <p className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">{data.problem}</p>
                </Section>
            )}

            {data.insight && (data.insight.intro || (data.insight.calls || []).length > 0) && (
                <Section testid="detail-insight" title="02 Insight and" accent="decision">
                    {data.insight.intro && (
                        <p className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">{data.insight.intro}</p>
                    )}
                    {(data.insight.calls || []).length > 0 && (
                        <DotBullets items={data.insight.calls} testidPrefix="detail-call" />
                    )}
                </Section>
            )}

            {data.solution && data.solution.length > 0 && (
                <Section testid="detail-solution" title="03" accent="Solution">
                    {data.solution.map((p, i) => (
                        <p key={i} className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">
                            {p}
                        </p>
                    ))}
                </Section>
            )}

            {data.metrics && (
                <Section testid="detail-metrics" title="04" accent="Metrics">
                    <p className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">{data.metrics}</p>
                </Section>
            )}

            {data.limits && (
                <Section testid="detail-limits" title="05 Limits and" accent="what's next">
                    <p className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">{data.limits}</p>
                </Section>
            )}

            {data.takeaways && data.takeaways.length > 0 && (
                <motion.section {...rise(0.05)} className="mt-14">
                    <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                        Takeaways &amp; <Accent>learnings</Accent>
                    </h2>
                    <DotBullets items={data.takeaways} testidPrefix="detail-takeaway" />
                </motion.section>
            )}

            <motion.div
                {...rise(0.05)}
                className="mt-20 flex flex-col items-center gap-10 border-t border-line pt-14 sm:flex-row sm:justify-between"
            >
                <Badge />
                <div className="flex flex-col items-center gap-3 sm:items-end">
                    <p className="text-sm text-fog">{hero.next.note}</p>
                    <a
                        href={hero.next.href}
                        onClick={goNext}
                        data-cursor="Next"
                        data-testid="next-project-button"
                        className={actionPill}
                    >
                        <span className="fill-dot" aria-hidden="true" />
                        <span className="btn-label relative">Check Next Project</span>
                        <ArrowUpRight size={15} className="btn-label relative" aria-hidden="true" />
                    </a>
                </div>
            </motion.div>
        </article>
    );
}
