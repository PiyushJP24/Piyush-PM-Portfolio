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
import { detailPages } from "./data/details";
import { projects } from "./data/projects";
import { analysis } from "./data/analysis";

const LAYER_EASE = [0.32, 0.72, 0, 1];
const LAYER_TRANSITION = { duration: 0.5, ease: LAYER_EASE };

function ProjectLayer({ layer, hero, data, reduced, top, onSwipeBack }) {
    const scrollRef = useRef(null);

    // while this is the top layer, its scroll container drives the scroll indicator
    useEffect(() => {
        if (!top || !scrollRef.current) return undefined;
        const el = scrollRef.current;
        window.__activeScroller = el;
        window.dispatchEvent(new Event("pjp:scroller"));
        return () => {
            if (window.__activeScroller === el) {
                window.__activeScroller = null;
                window.dispatchEvent(new Event("pjp:scroller"));
            }
        };
    }, [top]);

    // trackpad two-finger swipe right -> back (deltaX negative under natural scrolling)
    useEffect(() => {
        const el = scrollRef.current;
        if (!el || reduced) return undefined;
        let acc = 0;
        let last = 0;
        let coolUntil = 0;
        const onWheel = (e) => {
            const now = performance.now();
            if (now < coolUntil) return;
            if (now - last > 250) acc = 0;
            last = now;
            if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
            if (e.deltaX < 0) {
                acc += -e.deltaX;
                if (acc >= 80) {
                    acc = 0;
                    coolUntil = now + 700;
                    onSwipeBack();
                }
            } else {
                acc = 0;
            }
        };
        el.addEventListener("wheel", onWheel, { passive: true });
        return () => el.removeEventListener("wheel", onWheel);
    }, [reduced, onSwipeBack]);

    // keep keyboard scrolling (Space/arrows/PageDown) on the layer while the home document is locked
    useEffect(() => {
        if (top && scrollRef.current) scrollRef.current.focus({ preventScroll: true });
    }, [top]);

    return (
        <motion.div
            data-testid={`project-layer-${hero.slug}`}
            className="fixed inset-0 z-40 bg-cream"
            initial={reduced ? false : { x: "100%" }}
            animate={{ x: layer.exiting ? "100%" : "0%" }}
            transition={reduced ? { duration: 0 } : LAYER_TRANSITION}
            style={{ boxShadow: "-28px 0 56px -16px rgba(20,28,22,0.4)" }}
        >
            <div
                ref={scrollRef}
                data-lenis-prevent
                tabIndex={-1}
                className="layer-scroll h-full overflow-y-auto focus:outline-none"
                style={{ overscrollBehaviorX: "none" }}
            >
                <ProjectDetail key={hero.slug} hero={hero} data={data} />
            </div>
        </motion.div>
    );
}

export default function App() {
    const footerRef = useRef(null);
    const [curtain, setCurtain] = useState(false);
    const [footerH, setFooterH] = useState(0);
    const reduced = useReducedMotion();
    const [splashDone, setSplashDone] = useState(() => sessionStorage.getItem("pjp_splash") === "1");
    const [path, setPath] = useState(() => window.location.pathname);
    const [homeShown, setHomeShown] = useState(() => !window.location.pathname.startsWith("/work/"));
    const [layers, setLayers] = useState([]);
    const heroPlayedRef = useRef(false);
    const layersRef = useRef([]);
    const homeShownRef = useRef(homeShown);
    const reducedRef = useRef(reduced);
    const layerIdRef = useRef(0);

    layersRef.current = layers;
    homeShownRef.current = homeShown;
    reducedRef.current = reduced;

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
    const directDetail = !homeShown && cur ? cur : null;

    const removeExiting = () => {
        setTimeout(() => setLayers((ls) => ls.filter((l) => !l.exiting)), reducedRef.current ? 0 : 520);
    };
    const closeTopLayer = () => {
        const top = [...layersRef.current].reverse().find((l) => !l.exiting);
        if (!top) return false;
        setLayers((ls) => ls.map((l) => (l.id === top.id ? { ...l, exiting: true } : l)));
        removeExiting();
        return true;
    };
    const openLayer = (p) => {
        const id = ++layerIdRef.current;
        setLayers((ls) => [...ls.filter((l) => !l.exiting), { id, path: p, exiting: false }]);
    };

    useEffect(() => {
        const onPop = () => {
            const p = window.location.pathname;
            const isWork = p.startsWith("/work/") && detailFor(p);
            if (isWork) {
                const open = layersRef.current.filter((l) => !l.exiting);
                const idx = open.findIndex((l) => l.path === p);
                if (idx >= 0 && idx < open.length - 1) {
                    // back to an earlier project: close everything above it
                    const closing = new Set(open.slice(idx + 1).map((l) => l.id));
                    setLayers((ls) => ls.map((l) => (closing.has(l.id) ? { ...l, exiting: true } : l)));
                    removeExiting();
                } else if (idx === -1 && homeShownRef.current) {
                    openLayer(p); // forward to a project
                }
            } else {
                closeTopLayer(); // back home
            }
            setPath(p);
        };
        window.addEventListener("popstate", onPop);
        window.__navigate = (href) => {
            const target = href.split("#")[0] || "/";
            window.history.pushState({}, "", href);
            if (target.startsWith("/work/") && homeShownRef.current && detailFor(target)) openLayer(target);
            setPath(target);
        };
        window.__navigateBack = (href) => {
            const target = href.split("#")[0] || "/";
            const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
            window.history.pushState({}, "", href);
            const closed = closeTopLayer();
            setPath(target);
            if (!closed && hash) {
                // project opened directly by URL: home mounts fresh, jump to the section
                const t = setTimeout(() => {
                    const el = document.querySelector(hash);
                    if (!el) return;
                    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96, immediate: true });
                    else el.scrollIntoView();
                }, 400);
                return () => clearTimeout(t);
            }
            return undefined;
        };
        window.__closeLayers = () => {
            if (!layersRef.current.length) return false;
            window.history.pushState({}, "", "/");
            setLayers([]);
            setPath("/");
            document.documentElement.style.overflow = "";
            document.documentElement.style.overscrollBehaviorX = "";
            if (window.__lenis) window.__lenis.start();
            return true;
        };
        return () => {
            window.removeEventListener("popstate", onPop);
            window.__navigate = null;
            window.__navigateBack = null;
            window.__closeLayers = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!path.startsWith("/work/")) setHomeShown(true);
    }, [path]);

    useEffect(() => {
        if (!cur) heroPlayedRef.current = true;
    }, [cur]);

    // direct-URL project pages scroll to top on change; the home page's scroll is never touched
    useEffect(() => {
        if (homeShown) return undefined;
        if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
        return undefined;
    }, [path, homeShown]);

    // initial load with a hash (e.g. /#about)
    useEffect(() => {
        if (window.location.pathname.startsWith("/work/") || !window.location.hash) return undefined;
        const t = setTimeout(() => {
            const el = document.querySelector(window.location.hash);
            if (!el) return;
            if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96, immediate: true });
            else el.scrollIntoView();
        }, 500);
        return () => clearTimeout(t);
    }, []);

    // lock the home page's scroll (in place) while a layer is open
    const layerOpen = layers.length > 0;
    useEffect(() => {
        if (!layerOpen) return undefined;
        document.documentElement.style.overflow = "hidden";
        document.documentElement.style.overscrollBehaviorX = "none";
        if (window.__lenis) window.__lenis.stop();
        return () => {
            document.documentElement.style.overflow = "";
            document.documentElement.style.overscrollBehaviorX = "";
            if (window.__lenis) window.__lenis.start();
        };
    }, [layerOpen]);

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

    const onSwipeBack = () => {
        const top = [...layersRef.current].reverse().find((l) => !l.exiting);
        if (!top) return;
        window.history.back();
    };

    const exiting = layers.some((l) => l.exiting);

    return (
        <MotionConfig reducedMotion="user">
            <div className="grain" aria-hidden="true" />
            <Cursor />
            <ScrollIndicator />
            <Nav />
            <AnimatePresence>{!splashDone && <Splash key="splash" onDone={finishSplash} />}</AnimatePresence>
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
                {homeShown ? (
                    <>
                        <Hero start={splashDone} instant={heroPlayedRef.current} />
                        <Marquee />
                        <About />
                        <Projects />
                        <Experience />
                        <Tools />
                    </>
                ) : (
                    directDetail && (
                        <ProjectDetail key={directDetail.hero.slug} hero={directDetail.hero} data={directDetail.data} />
                    )
                )}
            </main>
            {exiting && !reduced && (
                <motion.div
                    data-testid="back-dim"
                    aria-hidden="true"
                    className="pointer-events-none fixed inset-0 z-30 bg-ink"
                    initial={{ opacity: 0.15 }}
                    animate={{ opacity: 0 }}
                    transition={LAYER_TRANSITION}
                />
            )}
            {layers.map((l, i) => {
                const d = detailFor(l.path);
                if (!d) return null;
                return (
                    <ProjectLayer
                        key={l.id}
                        layer={l}
                        hero={d.hero}
                        data={d.data}
                        reduced={reduced}
                        top={i === layers.length - 1}
                        onSwipeBack={onSwipeBack}
                    />
                );
            })}
            <Footer ref={footerRef} curtain={curtain} pathKey={path} />
        </MotionConfig>
    );
}
