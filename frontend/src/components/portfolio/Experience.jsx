import { motion } from "framer-motion";
import SectionHead from "./SectionHead";
import { experience } from "../../data/content";

export default function Experience() {
    return (
        <section id="experience" data-testid="experience-section" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <SectionHead no="03" kicker="Experience" title="The road so far" />
            <div className="mt-12">
                {experience.map((e, i) => (
                    <motion.div
                        key={`${e.years}-${e.org}`}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        data-testid={`experience-item-${i}`}
                        className="grid gap-1.5 border-t border-line py-6 last:border-b md:grid-cols-[170px_1.1fr_1.6fr] md:gap-6"
                    >
                        <span className="text-sm text-fog">{e.years}</span>
                        <div>
                            <h3 className="text-base font-semibold text-ink">{e.role}</h3>
                            <p className="text-sm text-fog">{e.org}</p>
                        </div>
                        <p className="max-w-xl text-sm leading-relaxed text-fog">{e.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
