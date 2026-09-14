import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { projects } from "../../data/content";

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

function ProjectCard({ p, i }) {
    return (
        <motion.a
            href={p.link}
            onClick={(e) => {
                if (p.link === "#") e.preventDefault();
            }}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: (i % 2) * 0.12, ease: [0.22, 1, 0.36, 1] }}
            data-cursor="View Project"
            data-testid={`project-card-${p.id}`}
            className="group block overflow-hidden rounded-[1.75rem] border border-line bg-panel/50 transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-18px_rgba(34,38,31,0.28)]"
        >
            <div className="relative aspect-[16/9] overflow-hidden">
                <img
                    src={p.banner}
                    alt={`${p.name} banner`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
                <span
                    data-testid={`project-status-${p.id}`}
                    className={`absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] backdrop-blur-sm ${tones[p.tone]}`}
                >
                    {p.status}
                </span>
            </div>
            <div className="p-7">
                <h3 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">{p.name}</h3>
                <p className="mt-1.5 text-sm text-fog">{p.tag}</p>
                <div className="mt-6 space-y-4">
                    {blocks
                        .filter(([, key]) => p[key])
                        .map(([label, key]) => (
                            <div key={key}>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-forest">{label}</p>
                                <p className="mt-1 text-sm leading-relaxed text-ink/75">{p[key]}</p>
                            </div>
                        ))}
                </div>
                {p.tools && p.tools.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                        {p.tools.map((t) => (
                            <span key={t} className="rounded-full border border-line bg-cream px-3 py-1 text-xs font-medium text-fog">
                                {t}
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
                desc="Things I've shipped, studied, or stress-tested — each with the problem, the calls I made, and what actually happened."
            />
            <div className="mt-14 grid gap-8 md:grid-cols-2">
                {projects.map((p, i) => (
                    <ProjectCard key={p.id} p={p} i={i} />
                ))}
            </div>
        </section>
    );
}
