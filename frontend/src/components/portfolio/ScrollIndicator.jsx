import { useEffect, useRef, useState } from "react";

export default function ScrollIndicator() {
    const [fine] = useState(() => window.matchMedia("(pointer: fine)").matches);
    const [visible, setVisible] = useState(false);
    const barRef = useRef(null);

    useEffect(() => {
        if (!fine) return undefined;
        let t;
        let lastY = 0;
        let target = null; // null => window scroll (home page)
        const metrics = () =>
            target
                ? { y: target.scrollTop, h: target.scrollHeight }
                : { y: window.scrollY, h: document.documentElement.scrollHeight };
        const update = () => {
            const { y, h } = metrics();
            const vh = window.innerHeight;
            const max = h - vh;
            const barH = Math.max((vh / h) * vh, 40);
            const p = max > 0 ? Math.min(y / max, 1) : 0;
            if (barRef.current) {
                barRef.current.style.height = `${barH}px`;
                barRef.current.style.transform = `translateY(${p * (vh - barH)}px)`;
            }
        };
        const onScroll = () => {
            update();
            const { y } = metrics();
            if (Math.abs(y - lastY) < 1) return;
            lastY = y;
            setVisible(true);
            clearTimeout(t);
            t = setTimeout(() => setVisible(false), 800);
        };
        const subscribe = () => {
            if (target) target.removeEventListener("scroll", onScroll);
            else window.removeEventListener("scroll", onScroll);
            target = window.__activeScroller || null;
            lastY = 0;
            if (target) target.addEventListener("scroll", onScroll, { passive: true });
            else window.addEventListener("scroll", onScroll, { passive: true });
            setVisible(false);
            update();
        };
        subscribe();
        window.addEventListener("pjp:scroller", subscribe);
        window.addEventListener("resize", update);
        return () => {
            clearTimeout(t);
            if (target) target.removeEventListener("scroll", onScroll);
            else window.removeEventListener("scroll", onScroll);
            window.removeEventListener("pjp:scroller", subscribe);
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
