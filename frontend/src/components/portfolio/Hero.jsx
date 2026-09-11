import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

function MaskedLine({ children, delay, className }) {
    return (
        <span className="-mb-[0.09em] -mt-[0.08em] block overflow-hidden pb-[0.09em] pt-[0.08em]">
            <motion.span
                className={`block ${className}`}
                initial={{ y: "115%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay, ease: EASE }}
            >
                {children}
            </motion.span>
        </span>
    );
}

const pills = [
    { label: "MBA × Engineering", cls: "top-[11vh] right-[4vw] md:top-[24vh] md:right-[36vw]", rot: "-3deg", delay: 1.2, testid: "pill-mba" },
    { label: "Ships with AI, not hype", cls: "bottom-[34vh] left-[5vw] md:bottom-[24vh] md:left-auto md:right-[4vw]", rot: "2.5deg", delay: 1.35, testid: "pill-ai" },
];

export default function Hero() {
    const ref = useRef(null);
    const reduced = useReducedMotion();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
    const charY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

    return (
        <section ref={ref} id="home" data-testid="hero-section" className="relative h-[108svh] overflow-hidden">
            {/* Layer 1 — office background, 0.4x scroll */}
            <motion.div style={reduced ? undefined : { y: bgY }} className="absolute inset-0 z-0" aria-hidden="true">
                <img src="/assets/office.webp" alt="" className="h-full w-full scale-[1.12] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-cream/35 via-cream/5 to-cream" />
            </motion.div>

            {/* Layer 3a — headline text behind character, 1x scroll */}
            <div className="absolute left-[6vw] top-[19vh] z-20 md:top-[15vh]">
                <MaskedLine delay={0.15} className="text-base font-medium text-ink/70 md:text-xl">
                    Hey I&rsquo;m a
                </MaskedLine>
                <div data-testid="hero-headline">
                    <MaskedLine
                        delay={0.3}
                        className="text-[16vw] font-bold leading-[0.92] tracking-[-0.03em] text-ink md:text-[11vw]"
                    >
                        Product
                    </MaskedLine>
                </div>
            </div>

            {/* Layer 2 — character, 0.75x scroll, overlaps bg + text */}
            <motion.div
                style={reduced ? undefined : { y: charY }}
                className="absolute bottom-0 right-[3vw] z-30 h-[62vh] md:right-[20vw] md:h-[86vh]"
            >
                <motion.img
                    src="/assets/character.png"
                    alt="Illustration of Piyush"
                    initial={{ y: 90, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.15, delay: 0.55, ease: EASE }}
                    className="h-full w-auto object-contain drop-shadow-[0_34px_44px_rgba(20,28,22,0.28)]"
                />
            </motion.div>

            {/* Layer 3b — "Manager" in front of character */}
            <div className="absolute bottom-[12vh] left-[10vw] z-40 md:bottom-[11vh] md:left-[27vw]">
                <MaskedLine
                    delay={0.45}
                    className="text-[16vw] font-bold leading-[0.92] tracking-[-0.03em] text-forest md:text-[11vw]"
                >
                    Manager
                </MaskedLine>
            </div>

            {/* Floating pills */}
            {pills.map((p) => (
                <div
                    key={p.testid}
                    className={`drift absolute z-40 ${p.cls}`}
                    style={{ "--rot": p.rot, animationDelay: `${p.delay}s` }}
                >
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: p.delay, ease: EASE }}
                        data-testid={p.testid}
                        className="flex items-center gap-2.5 rounded-full border border-line bg-cream/85 px-4 py-2 text-xs font-medium text-ink shadow-[0_12px_28px_-12px_rgba(34,38,31,0.35)] backdrop-blur-md md:text-sm"
                    >
                        {p.dot && (
                            <span className="relative flex h-2 w-2" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
                            </span>
                        )}
                        {p.label}
                    </motion.div>
                </div>
            ))}

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="absolute bottom-8 left-[6vw] z-40 flex items-center gap-4"
                data-testid="scroll-cue"
            >
                <span className="text-[11px] uppercase tracking-[0.3em] text-fog">Scroll</span>
                <span className="relative h-px w-14 overflow-hidden bg-ink/15" aria-hidden="true">
                    <motion.span
                        className="absolute inset-y-0 left-0 w-full bg-forest"
                        animate={reduced ? undefined : { x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                    />
                </span>
            </motion.div>
        </section>
    );
}
