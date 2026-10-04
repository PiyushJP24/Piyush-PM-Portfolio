import { motion } from "framer-motion";
import { instantReveal } from "./instant";

export default function SectionHead({ no, kicker, title, desc }) {
    const iv = instantReveal.current;
    return (
        <motion.div
            initial={iv ? false : { opacity: 0, y: 24 }}
            whileInView={iv ? undefined : { opacity: 1, y: 0 }}
            animate={iv ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-forest">{no}</span>
                <span className="h-px w-10 bg-ink/20" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.25em] text-fog">{kicker}</span>
            </div>
            <h2 className="mt-5 text-4xl font-bold tracking-[-0.02em] text-ink sm:text-5xl">{title}</h2>
            {desc && <p className="mt-4 max-w-xl text-sm text-fog md:text-base">{desc}</p>}
        </motion.div>
    );
}
