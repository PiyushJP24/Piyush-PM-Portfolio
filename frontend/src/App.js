import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
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
import Splash from "./components/portfolio/Splash";
import ScrollIndicator from "./components/portfolio/ScrollIndicator";
import { instantReveal } from "./components/portfolio/instant";
import { detailPages } from "./data/details";
import { projects } from "./data/projects";
import { analysis } from "./data/analysis";

export default function App() {
    const footerRef = useRef(null);
    const [curtain, setCurtain] = useState(false);
    const [footerH, setFooterH] = useState(0);
    const reduced = useReducedMotion();
    const [splashDone, setSplashDone] = useState(() => sessionStorage.getItem("pjp_splash") === "1");
    const [path, setPath] = useState(() => window.location.pathname);
    const [wipe, setWipe] = useState(0); // 0 parked, 1 covering, 2 covered, 3 revealing
    const [backLeaving, setBackLeaving] = useState(null);
    const wipingRef = useRef(false);
    const restoreRef = useRef(false);
    const heroPlayedRef = useRef(false);
    const backNavRef = useRef(null);

    const legacyFor = (h) => {
        const pair = (k) => (h.overview ? h.overview.find(([key]) => key === k) : null)?.[1] || "";
        const analysisEntry = analysis.projects.find((a) => a.title === `${h.titleMain} ${h.titleAccent}`.trim());
        return {
            role: pair("My Role"),
            team: pair("Team"),
            timeline: pair("Timeline"),
            outcome: pair("Outcome"),
            overview: h.narrative,
            myRole: h.roleBullets,
            stack: h.stack,
            takeaways: h.takeaways,
            liveUrl: "",
            docsUrl: "",
            docs: [],
            githubUrl: (analysisEntry && analysisEntry.githubUrl) || "",
            githubLabel: (analysisEntry && analysisEntry.githubLabel) || "",
        };
    };
    const detailFor = (p) => {
        if (!p.startsWith("/work/")) return null;
        const h = detailPages[p.split("/")[2]];
        if (!h) return null;
        const d = projects.find((x) => x.slug === p.split("/")[2]) || legacyFor(h);
        return d ? { hero: h, data: d } : null;
    };
    const cur = detailFor(path);
    const detail = cur ? cur.hero : null;

    const renderRoute = (p) => {
        const d = detailFor(p);
        if (d) return <ProjectDetail key={d.hero.slug} hero={d.hero} data={d.data} />;
        return (
            <>
                <Hero start={splashDone} instant={heroPlayedRef.current} />
                <Marquee />
                <About />
                <Projects />
                <Experience />
                <Tools />
            </>
        );
    };

    const backNav = (newPath) => {
        if (wipingRef.current) return;
        wipingRef.current = true;
        const saved = sessionStorage.getItem("pjp_home_scroll");
        if (saved !== null && (newPath === "/" || newPath === "")) instantReveal.current = true;
        if (!reduced) setBackLeaving({ route: window.location.pathname, y: window.scrollY });
        restoreRef.current = true;
        setPath(newPath);
        setTimeout(() => {
            setBackLeaving(null);
            wipingRef.current = false;
        }, reduced ? 250 : 620);
    };
    backNavRef.current = backNav;

    useEffect(() => {
        const onPop = () => {
            if (wipingRef.current) return;
            backNavRef.current(window.location.pathname);
        };
        window.addEventListener("popstate", onPop);
        window.__navigate = (href) => {
            if (wipingRef.current) return;
            if ((window.location.pathname === "/" || window.location.pathname === "") && href.startsWith("/work/")) {
                sessionStorage.setItem("pjp_home_scroll", String(window.scrollY));
            }
            wipingRef.current = true;
            setWipe(1);
            setTimeout(() => {
                window.history.pushState({}, "", href);
                setPath(href.split("#")[0] || "/");
                setWipe(2);
            }, 400);
            setTimeout(() => setWipe(3), 430);
            setTimeout(() => {
                setWipe(0);
                wipingRef.current = false;
            }, 860);
        };
        window.__navigateBack = (href) => {
            if (wipingRef.current) return;
            window.history.pushState({}, "", href);
            backNavRef.current(href.split("#")[0] || "/");
        };
        return () => {
            window.removeEventListener("popstate", onPop);
            window.__navigate = null;
            window.__navigateBack = null;
        };
    }, []);

    useEffect(() => {
        if (!detail) heroPlayedRef.current = true;
        if (restoreRef.current) {
            restoreRef.current = false;
            const saved = sessionStorage.getItem("pjp_home_scroll");
            if (saved !== null) {
                const y = parseFloat(saved);
                if (window.__lenis) window.__lenis.scrollTo(y, { immediate: true });
                else window.scrollTo(0, y);
                return undefined;
            }
        }
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
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reducedMotion) return undefined;
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

    const finishSplash = () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        sessionStorage.setItem("pjp_splash", "1");
        setSplashDone(true);
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className="grain" aria-hidden="true" />
            <Cursor />
            <ScrollIndicator />
            <Nav />
            <div
                data-testid="page-wipe"
                aria-hidden="true"
                className="fixed inset-0 z-[9000] bg-pinedeep"
                style={
                    reduced
                        ? {
                              opacity: wipe === 1 || wipe === 2 ? 1 : 0,
                              transition: "opacity 0.2s ease",
                              pointerEvents: wipe ? "auto" : "none",
                          }
                        : {
                              transform:
                                  wipe === 0
                                      ? "translateY(100%)"
                                      : wipe === 3
                                        ? "translateY(-100%)"
                                        : "translateY(0%)",
                              transition: wipe === 0 ? "none" : "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
                              pointerEvents: wipe ? "auto" : "none",
                          }
                }
            />
            <AnimatePresence>{!splashDone && <Splash key="splash" onDone={finishSplash} />}</AnimatePresence>
            {backLeaving && !reduced && (
                <motion.div
                    key={`leaving-${backLeaving.route}`}
                    data-testid="back-slide-layer"
                    aria-hidden="true"
                    className="fixed inset-0 z-[8000] overflow-hidden bg-cream"
                    initial={{ y: 0 }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                        borderRadius: "0 0 2.5rem 2.5rem",
                        boxShadow: "0 -40px 80px -20px rgba(20,28,22,0.45)",
                        pointerEvents: "none",
                    }}
                >
                    <div style={{ transform: `translateY(${-backLeaving.y}px)` }}>{renderRoute(backLeaving.route)}</div>
                </motion.div>
            )}
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
                {reduced ? (
                    <motion.div key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                        {renderRoute(path)}
                    </motion.div>
                ) : (
                    renderRoute(path)
                )}
            </main>
            <Footer ref={footerRef} curtain={curtain} pathKey={path} />
        </MotionConfig>
    );
}
