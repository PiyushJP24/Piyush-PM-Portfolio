import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const greetings = ["Hello", "नमस्ते", "Bonjour"];
const STEP = 650;
const HOLD = 300; // hold after the last greeting has fully appeared
const LETTERS = ["B", "o", "n", "j", "o", "u", "r"];
const LETTER_STAGGER = 0.07;
const LETTER_DUR = 0.3;
const LAST_LETTER_LAND = (LETTERS.length - 1) * LETTER_STAGGER + LETTER_DUR;

const SparkleSvg = () => (
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

export default function Splash({ onReveal, onDone }) {
    const reduced = useReducedMotion();
    const [i, setI] = useState(0);
    const [phase, setPhase] = useState("cycle"); // cycle -> letters -> center -> bloom -> fade
    const [targets, setTargets] = useState(null);
    const [starTo, setStarTo] = useState({ x: 0, y: 0 });
    const [bloomScale, setBloomScale] = useState(80);
    const starRef = useRef(null);
    const letterRefs = useRef([]);
    const cbRef = useRef({ onReveal, onDone });
    cbRef.current = { onReveal, onDone };

    // lock scrolling while the splash is up (App unlocks in onDone)
    useEffect(() => {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    }, []);

    // reduced motion: hold the word + star, fade them out together, then fade the splash out
    useEffect(() => {
        if (!reduced) return undefined;
        const ts = [
            setTimeout(() => setPhase("wordOut"), 800),
            setTimeout(() => {
                setPhase("fade");
                if (cbRef.current.onReveal) cbRef.current.onReveal();
            }, 1150),
            setTimeout(() => cbRef.current.onDone(), 1500),
        ];
        return () => ts.forEach(clearTimeout);
    }, [reduced]);

    useEffect(() => {
        if (reduced) return undefined;
        const lettersAt = STEP * 2 + 600 + HOLD; // Bonjour fully in (~0.6s swap) + hold
        const centerAt = lettersAt + LAST_LETTER_LAND * 1000 + 80;
        const bloomAt = centerAt + 300;
        const fadeAt = bloomAt + 700 + 400; // bloom + cream hold
        const doneAt = fadeAt + 900;
        const ts = [
            setTimeout(() => setI(1), STEP),
            setTimeout(() => setI(2), STEP * 2),
            setTimeout(() => setPhase("letters"), lettersAt),
            setTimeout(() => setPhase("center"), centerAt),
            setTimeout(() => setPhase("bloom"), bloomAt),
            setTimeout(() => {
                setPhase("fade");
                if (cbRef.current.onReveal) cbRef.current.onReveal(); // hero entrance starts with the fade
            }, fadeAt),
            setTimeout(() => cbRef.current.onDone(), doneAt),
        ];
        return () => ts.forEach(clearTimeout);
    }, [reduced]);

    // measure letter -> star offsets once the letters are on screen
    useLayoutEffect(() => {
        if (phase !== "letters" || reduced) return;
        const star = starRef.current;
        if (!star) return;
        const sr = star.getBoundingClientRect();
        if (!sr.width) return;
        const scx = sr.left + sr.width / 2;
        const scy = sr.top + sr.height / 2;
        setTargets(
            letterRefs.current.map((el) => {
                if (!el) return { x: 0, y: 0 };
                const r = el.getBoundingClientRect();
                return { x: scx - (r.left + r.width / 2), y: scy - (r.top + r.height / 2) };
            })
        );
        setStarTo({ x: window.innerWidth / 2 - scx, y: window.innerHeight / 2 - scy });
        setBloomScale(Math.ceil((Math.max(window.innerWidth, window.innerHeight) * 3) / sr.width));
    }, [phase, reduced]);

    const word = greetings[i];
    const isDevanagari = word === "नमस्ते";
    const groupStyle = {
        gap: "0.35em",
        color: "#f5f2ea",
        fontSize: "clamp(56px, 9vw, 130px)",
        fontWeight: 400,
        letterSpacing: "-0.02em",
        fontFamily: isDevanagari
            ? '"Noto Sans Devanagari", "General Sans", ui-sans-serif, system-ui, sans-serif'
            : '"General Sans", ui-sans-serif, system-ui, sans-serif',
    };

    const starAnim =
        phase === "letters" && targets
            ? { scale: [1, 1.15, 1] }
            : phase === "center"
              ? { x: starTo.x, y: starTo.y, scale: 1 }
              : phase === "bloom" || phase === "fade"
                ? { x: starTo.x, y: starTo.y, scale: bloomScale }
                : {};
    const starTransition =
        phase === "letters"
            ? { delay: LAST_LETTER_LAND - 0.15, duration: 0.3, times: [0, 0.5, 1], ease: "easeInOut" }
            : phase === "center"
              ? { duration: 0.3, ease: "easeInOut" }
              : { duration: 0.7, ease: [0.7, 0, 0.2, 1] };

    if (reduced) {
        return (
            <motion.div
                data-testid="welcome-splash"
                className="fixed inset-0 z-[10000] flex items-center justify-center"
                style={{ backgroundColor: "#1f2d25" }}
                animate={{ opacity: phase === "fade" ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
            >
                <motion.span
                    className="flex items-baseline"
                    style={groupStyle}
                    animate={{ opacity: phase === "wordOut" || phase === "fade" ? 0 : 1 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                    <SparkleSvg />
                    <span>Hello</span>
                </motion.span>
            </motion.div>
        );
    }

    return (
        <motion.div
            data-testid="welcome-splash"
            className="fixed inset-0 z-[10000] flex items-center justify-center"
            style={{ backgroundColor: "#1f2d25" }}
            animate={{ opacity: phase === "fade" ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={phase === "fade" ? { duration: 0.9, ease: "easeInOut" } : { duration: 0.2 }}
        >
            {/* cream fill fades in behind the growing star so the corners are fully covered */}
            <motion.div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ backgroundColor: "#f5f2ea" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "bloom" || phase === "fade" ? 1 : 0 }}
                transition={{ duration: 0.6, delay: phase === "bloom" ? 0.15 : 0, ease: "easeInOut" }}
            />
            <AnimatePresence mode="wait">
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex items-baseline"
                    style={groupStyle}
                >
                    <motion.span
                        ref={starRef}
                        className="inline-flex"
                        style={{ transformOrigin: "center" }}
                        animate={starAnim}
                        transition={starTransition}
                    >
                        <SparkleSvg />
                    </motion.span>
                    {phase === "cycle" ? (
                        <span>{word}</span>
                    ) : (
                        <span className="whitespace-nowrap">
                            {LETTERS.map((ch, k) => (
                                <motion.span
                                    key={k}
                                    ref={(el) => (letterRefs.current[k] = el)}
                                    className="inline-block"
                                    animate={
                                        targets
                                            ? { x: targets[k].x, y: targets[k].y, scale: 0.3, opacity: 0 }
                                            : { x: 0, y: 0, scale: 1, opacity: 1 }
                                    }
                                    transition={{ duration: LETTER_DUR, delay: k * LETTER_STAGGER, ease: "easeIn" }}
                                >
                                    {ch}
                                </motion.span>
                            ))}
                        </span>
                    )}
                </motion.span>
            </AnimatePresence>
        </motion.div>
    );
}
