import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const greetings = ["Hello", "नमस्ते", "Bonjour", "Hello"];
const STEP = 650;

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
    return (
        <motion.div
            data-testid="welcome-splash"
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-cream"
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
                    className={`text-6xl text-forest md:text-7xl ${
                        word === "नमस्ते" ? "font-medium" : "font-serifit italic"
                    }`}
                    style={word === "नमस्ते" ? { fontFamily: "system-ui, sans-serif" } : undefined}
                >
                    {reduced ? "Hello" : word}
                </motion.span>
            </AnimatePresence>
        </motion.div>
    );
}
