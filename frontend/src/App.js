import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import Cursor from "./components/portfolio/Cursor";
import Nav from "./components/portfolio/Nav";
import Hero from "./components/portfolio/Hero";
import Marquee from "./components/portfolio/Marquee";
import About from "./components/portfolio/About";
import Projects from "./components/portfolio/Projects";
import Experience from "./components/portfolio/Experience";
import Tools from "./components/portfolio/Tools";
import Footer from "./components/portfolio/Footer";
import ProjectDetail from "./components/portfolio/ProjectDetail";
import { detailPages } from "./data/details";

export default function App() {
    const footerRef = useRef(null);
    const [curtain, setCurtain] = useState(false);
    const [footerH, setFooterH] = useState(0);
    const [path, setPath] = useState(() => window.location.pathname);
    const detail = path.startsWith("/work/") ? detailPages[path.split("/")[2]] : null;

    useEffect(() => {
        const onPop = () => setPath(window.location.pathname);
        window.addEventListener("popstate", onPop);
        return () => window.removeEventListener("popstate", onPop);
    }, []);

    useEffect(() => {
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
        if (!detail && window.location.hash) {
            const t = setTimeout(() => {
                const el = document.querySelector(window.location.hash);
                if (!el) return;
                if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96, immediate: true });
                else el.scrollIntoView();
            }, 500);
            return () => clearTimeout(t);
        }
        return undefined;
    }, [path, detail]);

    useEffect(() => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduced) return undefined;
        const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        window.__lenis = lenis;
        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    useEffect(() => {
        const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setCurtain(!rm.matches);
        update();
        rm.addEventListener("change", update);
        return () => rm.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        if (!footerRef.current) return undefined;
        const ro = new ResizeObserver((entries) => setFooterH(entries[0].contentRect.height));
        ro.observe(footerRef.current);
        return () => ro.disconnect();
    }, []);

    return (
        <MotionConfig reducedMotion="user">
            <div className="grain" aria-hidden="true" />
            <Cursor />
            <Nav />
            <main
                className="relative z-10 bg-cream"
                style={
                    curtain
                        ? {
                              marginBottom: footerH,
                              borderRadius: "0 0 2.5rem 2.5rem",
                              boxShadow: "0 60px 100px -30px rgba(20,28,22,0.55)",
                          }
                        : undefined
                }
            >
                {detail ? (
                    <ProjectDetail key={detail.slug} data={detail} />
                ) : (
                    <>
                        <Hero />
                        <Marquee />
                        <About />
                        <Projects />
                        <Experience />
                        <Tools />
                    </>
                )}
            </main>
            <Footer ref={footerRef} curtain={curtain} pathKey={path} />
        </MotionConfig>
    );
}
