import { useEffect, useRef, useState } from "react";

export default function ScrollIndicator() {
    const [fine] = useState(() => window.matchMedia("(pointer: fine)").matches);
    const [visible, setVisible] = useState(false);
    const barRef = useRef(null);

    useEffect(() => {
        if (!fine) return undefined;
        let t;
        let lastY = window.scrollY;
        const update = () => {
            const doc = document.documentElement.scrollHeight;
            const vh = window.innerHeight;
            const max = doc - vh;
            const barH = Math.max((vh / doc) * vh, 40);
            const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
            if (barRef.current) {
                barRef.current.style.height = `${barH}px`;
                barRef.current.style.transform = `translateY(${p * (vh - barH)}px)`;
            }
        };
        const onScroll = () => {
            update();
            const y = window.scrollY;
            if (Math.abs(y - lastY) < 1) return;
            lastY = y;
            setVisible(true);
            clearTimeout(t);
            t = setTimeout(() => setVisible(false), 800);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            clearTimeout(t);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", update);
        };
    }, [fine]);

    if (!fine) return null;
    return (
        <div
            data-testid="scroll-indicator"
            aria-hidden="true"
            className={`pointer-events-none fixed right-[6px] top-0 z-[75] h-screen w-1 transition-opacity duration-300 ${
                visible ? "opacity-100" : "opacity-0"
            }`}
        >
            <div ref={barRef} className="w-full rounded-full bg-forest/50" />
        </div>
    );
}
