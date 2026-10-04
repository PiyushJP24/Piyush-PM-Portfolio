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
import { projects } from "./data/projects";
import { analysis } from "./data/analysis";

export default function App() {
    const footerRef = useRef(null);
    const [curtain, setCurtain] = useState(false);
    const [footerH, setFooterH] = useState(0);
    const [path, setPath] = useState(() => window.location.pathname);
    const slug = path.split("/")[2];
    const hero = path.startsWith("/work/") ? detailPages[slug] : null;
    const pair = (k) => (hero && hero.overview ? hero.overview.find(([key]) => key === k) : null)?.[1] || "";
    const analysisEntry = hero
        ? analysis.projects.find((a) => a.title === `${hero.titleMain} ${hero.titleAccent}`.trim())
        : null;
    const legacyData =
        hero && !projects.find((p) => p.slug === slug)
            ? {
                  role: pair("My Role"),
                  team: pair("Team"),
                  timeline: pair("Timeline"),
                  outcome: pair("Outcome"),
                  overview: hero.narrative,
                  myRole: hero.roleBullets,
                  stack: hero.stack,
                  takeaways: hero.takeaways,
                  liveUrl: "",
                  docsUrl: "",
                  docs: [],
                  githubUrl: (analysisEntry && analysisEntry.githubUrl) || "",
                  githubLabel: (analysisEntry && analysisEntry.githubLabel) || "",
              }
            : null;
    const detailData = (hero && projects.find((p) => p.slug === slug)) || legacyData;
    const detail = hero && detailData ? hero : null;

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
                    <ProjectDetail key={detail.slug} hero={detail} data={detailData} />
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
