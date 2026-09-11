import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Cursor() {
    const [label, setLabel] = useState(null);
    const [visible, setVisible] = useState(false);
    const [fine, setFine] = useState(false);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const sx = useSpring(x, { stiffness: 420, damping: 42, mass: 0.55 });
    const sy = useSpring(y, { stiffness: 420, damping: 42, mass: 0.55 });

    useEffect(() => {
        const mq = window.matchMedia("(pointer: fine)");
        setFine(mq.matches);
        if (!mq.matches) return undefined;
        const move = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
            setVisible(true);
        };
        const over = (e) => {
            const t = e.target.closest("[data-cursor]");
            setLabel(t ? t.getAttribute("data-cursor") : null);
        };
        const leave = () => setVisible(false);
        window.addEventListener("mousemove", move);
        document.addEventListener("mouseover", over);
        document.documentElement.addEventListener("mouseleave", leave);
        return () => {
            window.removeEventListener("mousemove", move);
            document.removeEventListener("mouseover", over);
            document.documentElement.removeEventListener("mouseleave", leave);
        };
    }, [x, y]);

    if (!fine) return null;

    return (
        <motion.div
            data-testid="custom-cursor"
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-[9999]"
            style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
        >
            <div className="-translate-x-1/2 -translate-y-1/2">
                <AnimatePresence mode="wait">
                    {label ? (
                        <motion.div
                            key="pill"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                            className="flex items-center gap-1.5 whitespace-nowrap rounded-full bg-ink py-1.5 pl-3.5 pr-3 text-xs font-semibold text-cream shadow-[0_12px_28px_-8px_rgba(34,38,31,0.55)]"
                        >
                            {label}
                            <ArrowUpRight size={13} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="dot"
                            initial={{ scale: 0.4 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.4 }}
                            transition={{ duration: 0.15 }}
                            className="h-3 w-3 rounded-full bg-ink"
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
