import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1];
const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: EASE },
});

const overview = [
    ["My Role", "Solo Product Owner — PRD Writing, 0-1 Product Development, End-to-End Build Direction"],
    ["Team", "Solo Builder"],
    ["Timeline", "Pre-launch, ongoing"],
    ["Outcome", "Near Play Store submission"],
];

const roleBullets = [
    "Wrote the PRD as the authoritative product document — not hedged for alternative platforms",
    "Approved nine wireframes and directed the full styling pass",
    "Defined and shipped RepMate's 5 core functions: workout tracking with history, a calorie counter built for the Indian market, AI-generated workout plans, the exercise library, and workout analytics",
    "Diagnosed and directed fixes for two critical launch-blocking bugs: a MongoDB ObjectId serialization error blocking authentication, and a deprecated Gemini model reference (resolved by switching to gemini-flash-latest)",
    "Benchmarked and set pricing at ₹299/month or ₹2,399/year against HealthifyMe and Cult.fit, rather than a copied US rate",
    "Scoped the Calorie Counter as a dual-path feature — manual food lookup for users who want precision, AI photo-based logging (capped at 8 scans/user/day) for users who want speed",
    "Built workout Analytics as a standalone core function, not an afterthought — turning raw session history into a view of actual progress over time",
];

const stack = ["React Native / Expo", "FastAPI", "MongoDB", "Gemini", "RevenueCat", "Mixpanel"];

const takeaways = [
    "Owning the PRD end-to-end meant every scope decision (like capping AI photo-based calorie logging at 8 scans/user/day) had a documented reason, not just a gut call.",
    "Pricing against direct competitors (HealthifyMe, Cult.fit) rather than assuming a US price point was a deliberate call for the Indian market.",
    "Shipping constraints are real: resolving two launch-blocking bugs before adding the calorie counter meant sequencing fixes by what was blocking users, not by what was most interesting to build.",
];

function Badge() {
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

export default function RepmateDetail() {
    return (
        <article data-testid="repmate-detail" className="mx-auto max-w-4xl px-6 pb-32 pt-32 md:pt-40">
            <motion.div {...rise(0)}>
                <a
                    href="/#work"
                    data-cursor="All Work"
                    data-testid="back-to-work-link"
                    className="sweep inline-flex items-center gap-2 text-sm font-medium text-fog transition-colors hover:text-ink"
                >
                    <ArrowLeft size={14} />
                    Back to all work
                </a>
            </motion.div>

            <motion.div {...rise(0.08)} className="mt-8">
                <span className="rounded-full bg-forest px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-cream">
                    Built &amp; Shipping
                </span>
                <h1
                    data-testid="repmate-title"
                    className="mt-6 text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-ink sm:text-5xl md:text-6xl"
                >
                    RepMate — AI Gym Buddy for{" "}
                    <span className="font-serifit font-normal italic text-forest">Indian Lifters</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm text-fog md:text-lg">
                    A home-gym fitness app built for India — and priced for it, too.
                </p>
            </motion.div>

            <motion.div {...rise(0.16)} className="mt-10 overflow-hidden rounded-[1.75rem] border border-line">
                <img
                    src="/assets/banner-repmate.jpg"
                    alt="RepMate app banner"
                    data-testid="repmate-banner"
                    className="block w-full"
                />
            </motion.div>

            <motion.dl
                {...rise(0.2)}
                data-testid="repmate-overview"
                className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-y border-line py-10 md:grid-cols-4"
            >
                {overview.map(([k, v]) => (
                    <div key={k}>
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">{k}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-ink/85">{v}</dd>
                    </div>
                ))}
            </motion.dl>

            <motion.section {...rise(0.05)} className="mt-14">
                <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Overview</h2>
                <p data-testid="repmate-narrative" className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">
                    Built as a mobile app for the Indian lifting community, based on firsthand knowledge of that user
                    base. Most fitness apps in India make you piece together three or four different tools — one for
                    workout tracking, another for calorie counting, a third for progress analytics — usually at a
                    US-calibrated price. RepMate puts all of it in one place: a 74-exercise library across six muscle
                    groups, a calorie counter built for the Indian market (manual food lookup plus AI photo-based
                    logging), AI-generated workout plans that adapt to a user&rsquo;s own training history, and workout
                    analytics that turn session history into visible progress — all wrapped in a premium dark theme
                    with gold/amber and purple accents, priced at ₹299/month or ₹2,399/year against HealthifyMe and
                    Cult.fit rather than a copied US rate.
                </p>
            </motion.section>

            <motion.section {...rise(0.05)} className="mt-14">
                <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    My role in <span className="font-serifit font-normal italic text-forest">this project</span>
                </h2>
                <ul className="mt-6 space-y-4">
                    {roleBullets.map((b, i) => (
                        <li
                            key={i}
                            data-testid={`repmate-role-${i}`}
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

            <motion.section {...rise(0.05)} className="mt-14">
                <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">Tech stack</h2>
                <div className="mt-5 flex flex-wrap gap-3" data-testid="repmate-stack">
                    {stack.map((t) => (
                        <span
                            key={t}
                            className="rounded-full border border-line bg-panel px-4 py-2 text-sm font-medium text-ink"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </motion.section>

            <motion.section {...rise(0.05)} className="mt-14">
                <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    Takeaways &amp; <span className="font-serifit font-normal italic text-forest">learnings</span>
                </h2>
                <ul className="mt-6 space-y-4">
                    {takeaways.map((t, i) => (
                        <li
                            key={i}
                            data-testid={`repmate-takeaway-${i}`}
                            className="flex gap-3.5 text-sm leading-relaxed text-ink/80 md:text-base"
                        >
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
                            {t}
                        </li>
                    ))}
                </ul>
            </motion.section>

            <motion.div
                {...rise(0.05)}
                className="mt-20 flex flex-col items-center gap-10 border-t border-line pt-14 sm:flex-row sm:justify-between"
            >
                <Badge />
                <div className="flex flex-col items-center gap-3 sm:items-end">
                    <p className="text-sm text-fog">Up next: DecideAI — recommendation engine case study</p>
                    <a
                        href="/#work"
                        data-cursor="Next"
                        data-testid="next-project-button"
                        className="btn-circle inline-flex items-center gap-3 rounded-full border border-ink/25 py-3.5 pl-11 pr-8 text-sm font-medium tracking-wide text-ink"
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
