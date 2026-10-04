import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const greetings = ["Hello", "नमस्ते", "Bonjour", "Hello"];
const STEP = 650;

const Sparkle = () => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="inline-block shrink-0 align-middle"
        style={{ width: "0.45em", height: "0.45em", marginTop: "-0.08em" }}
        fill="#f5f2ea"
    >
        <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" />
    </svg>
);

export default function Splash({ onDone }) {
    const reduced = useReducedMotion();
    const [i, setI] = useState(0);

    useEffect(() => {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
        if (reduced) {
            const t = setTimeout(onDone, 800);
            return () => clearTimeout(t);
        }
        const timers = greetings.slice(1).map((_, k) => setTimeout(() => setI(k + 1), STEP * (k + 1)));
        const doneT = setTimeout(onDone, STEP * greetings.length);
        return () => {
            timers.forEach(clearTimeout);
            clearTimeout(doneT);
        };
    }, [reduced, onDone]);

    const word = greetings[i];
    const isDevanagari = word === "नमस्ते";
    return (
        <motion.div
            data-testid="welcome-splash"
            className="fixed inset-0 z-[10000] flex items-center justify-center"
            style={{ backgroundColor: "#1f2d25" }}
            exit={reduced ? { opacity: 0 } : { y: "-100%" }}
            transition={reduced ? { duration: 0.3 } : { duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
            <AnimatePresence mode="wait">
                <motion.span
                    key={reduced ? "static" : i}
                    initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: reduced ? 0.3 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-baseline"
                    style={{
                        gap: "0.35em",
                        color: "#f5f2ea",
                        fontSize: "clamp(56px, 9vw, 130px)",
                        fontWeight: 400,
                        letterSpacing: "-0.02em",
                        fontFamily: isDevanagari
                            ? '"Noto Sans Devanagari", "General Sans", ui-sans-serif, system-ui, sans-serif'
                            : '"General Sans", ui-sans-serif, system-ui, sans-serif',
                    }}
                >
                    <Sparkle />
                    <span>{reduced ? "Hello" : word}</span>
                </motion.span>
            </AnimatePresence>
        </motion.div>
    );
}
