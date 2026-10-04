import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { projects } from "../../data/content";
import { projects as detailProjects } from "../../data/projects";
import { instantReveal } from "./instant";

const tones = {
    ship: "bg-forest text-cream",
    case: "border border-forest/40 bg-cream/90 text-forest",
    progress: "bg-ink text-cream",
    practice: "border border-line bg-panel/95 text-ink",
};

const blocks = [
    ["Problem", "problem"],
    ["Judgment calls", "judgment"],
    ["Outcome", "outcome"],
];

const slugFor = { "swiggy-aov": "instarestocker" };

function tileData(p) {
    const d = detailProjects.find((x) => x.slug === (slugFor[p.id] || p.id));
    const t = (d && d.tile) || {};
    return {
        id: p.id,
        link: p.link,
        tone: p.tone,
        badge: (d && d.tag) || p.status,
        name: t.title || p.name,
        tagline: t.subtitle || p.tag,
        banner: t.image ? `/assets/${t.image}` : p.banner,
        problem: t.problem || p.problem,
        judgment: t.judgmentCalls || p.judgment,
        outcome: t.outcome || p.outcome,
        tools: t.chips || p.tools,
    };
}

function ProjectCard({ p, i }) {
    const t = tileData(p);
    const iv = instantReveal.current;
    return (
        <motion.a
            href={t.link}
            onClick={(e) => {
                if (t.link === "#") {
                    e.preventDefault();
                    return;
                }
                if (t.link.startsWith("/")) {
                    e.preventDefault();
                    if (window.__navigate) window.__navigate(t.link);
                }
            }}
            initial={iv ? false : { opacity: 0, y: 36 }}
            whileInView={iv ? undefined : { opacity: 1, y: 0 }}
            animate={iv ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            data-cursor="View Project"
            data-testid={`project-card-${t.id}`}
            className="group block overflow-hidden rounded-[1.75rem] border border-line bg-panel/50 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-18px_rgba(34,38,31,0.28)]"
        >
            <div className="relative aspect-[16/9] overflow-hidden">
                <img
                    src={t.banner}
                    alt={`${t.name} banner`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
                <span
                    data-testid={`project-status-${t.id}`}
                    className={`absolute left-4 top-4 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm ${tones[t.tone]}`}
                >
                    {t.badge}
                </span>
            </div>
            <div className="p-7">
                <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">{t.name}</h3>
                <p className="mt-1.5 text-sm text-fog">{t.tagline}</p>
                <div className="mt-6 space-y-4">
                    {blocks
                        .filter(([, key]) => t[key])
                        .map(([label, key]) => (
                            <div key={key}>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">{label}</p>
                                <p className="mt-1 text-sm leading-relaxed text-ink/75">{t[key]}</p>
                            </div>
                        ))}
                </div>
                {t.tools && t.tools.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                        {t.tools.map((tool) => (
                            <span key={tool} className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-fog">
                                {tool}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.a>
    );
}

export default function Projects() {
    return (
        <section id="work" data-testid="work-section" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
            <SectionHead
                no="02"
                kicker="Featured Projects"
                title="Work"
                desc="Things I've shipped, studied, or stress-tested, each with the problem, the calls I made, and what actually happened."
            />
            <div className="mt-14 grid gap-8 md:grid-cols-2">
                {projects.map((p, i) => (
                    <ProjectCard key={p.id} p={p} i={i} />
                ))}
            </div>
        </section>
    );
}
