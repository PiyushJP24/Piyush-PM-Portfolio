import { forwardRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import ResumeButton from "./ResumeButton";
import { email, githubUrl, linkedinUrl } from "../../data/site";

const socials = [
    { name: "LinkedIn", href: linkedinUrl },
    { name: "GitHub", href: githubUrl },
];

function Reveal({ p, t0, t1, curtain, className, children, testid }) {
    const o = useTransform(p, [t0, t1], [0, 1]);
    const y = useTransform(p, [t0, t1], [28, 0]);
    if (curtain) {
        return (
            <motion.div data-testid={testid} style={{ opacity: o, y }} className={className}>
                {children}
            </motion.div>
        );
    }
    return (
        <motion.div
            data-testid={testid}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: t0 * 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

const Footer = forwardRef(function Footer({ curtain, pathKey, containerRef, inFlow }, ref) {
    const { scrollY } = useScroll(containerRef ? { container: containerRef } : undefined);
    const [range, setRange] = useState([0, 1]);

    useEffect(() => {
        const calc = () => {
            const fh = ref && ref.current ? ref.current.offsetHeight : 640;
            const doc =
                containerRef && containerRef.current
                    ? containerRef.current.scrollHeight
                    : document.documentElement.scrollHeight;
            const vh = containerRef && containerRef.current ? containerRef.current.clientHeight : window.innerHeight;
            setRange([Math.max(doc - fh - vh, 0), Math.max(doc - vh, 1)]);
        };
        calc();
        const t = setTimeout(calc, 600);
        window.addEventListener("resize", calc);
        return () => {
            clearTimeout(t);
            window.removeEventListener("resize", calc);
        };
    }, [ref, curtain, pathKey, containerRef]);

    const p = useTransform(scrollY, range, [0, 1], { clamp: true });

    const toTop = () => {
        if (containerRef && containerRef.current) containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        else if (window.__lenis) window.__lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            id="connect"
            ref={ref}
            data-testid="connect-section"
            className={inFlow ? "bg-pinedeep text-cream" : "overflow-hidden bg-pinedeep text-cream"}
            style={curtain ? { position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 0 } : undefined}
        >
            <div className="mx-auto max-w-5xl px-6 pb-10 pt-24 text-center md:pt-28">
                <Reveal p={p} t0={0.05} t1={0.3} curtain={curtain} testid="footer-tagline">
                    <div className="flex items-center justify-center gap-5">
                        <span className="h-px w-14 bg-cream/25" aria-hidden="true" />
                        <span className="font-serifit text-lg italic text-cream/75">Reach out anytime</span>
                        <span className="h-px w-14 bg-cream/25" aria-hidden="true" />
                    </div>
                </Reveal>

                <Reveal p={p} t0={0.2} t1={0.5} curtain={curtain} testid="footer-heading">
                    <h2 className="mt-8 text-5xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl md:text-7xl">
                        Let&rsquo;s Stay{" "}
                        <span className="font-serifit font-normal italic text-sage">Connected</span>
                    </h2>
                </Reveal>

                <Reveal p={p} t0={0.35} t1={0.6} curtain={curtain} testid="footer-invite">
                    <p className="mx-auto mt-6 max-w-md text-sm text-cream/70 md:text-base">
                        Have a role, a project, or a good product debate? My inbox is always open.
                    </p>
                </Reveal>

                <Reveal p={p} t0={0.5} t1={0.75} curtain={curtain} testid="footer-actions">
                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href={`mailto:${email}`}
                            data-cursor="Say Hi"
                            data-testid="email-button"
                            className="rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-white"
                        >
                            {email}
                        </a>
                        <ResumeButton light testid="view-resume-button-footer" />
                    </div>
                </Reveal>

                <Reveal p={p} t0={0.6} t1={0.85} curtain={curtain} testid="footer-socials">
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-x-9 gap-y-3">
                        {socials.map((s) => (
                            <a
                                key={s.name}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                data-cursor="Visit"
                                data-testid={`social-link-${s.name.toLowerCase()}`}
                                className="sweep inline-flex items-center gap-1 text-sm font-medium text-cream/80 transition-colors hover:text-cream"
                            >
                                {s.name}
                                <ArrowUpRight size={12} />
                            </a>
                        ))}
                    </div>
                </Reveal>

                <Reveal p={p} t0={0.7} t1={0.95} curtain={curtain} testid="footer-bottom">
                    <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/15 pt-6 text-xs text-cream/55 sm:flex-row">
                        <p>© 2026 Piyush Jairam Paliwal. Crafted with intent &amp; caffeine.</p>
                        <button
                            type="button"
                            onClick={toTop}
                            data-cursor="Top"
                            data-testid="back-to-top-button"
                            className="inline-flex items-center gap-2 text-cream/70 transition-colors hover:text-cream"
                        >
                            Back to top
                            <ArrowUp size={13} />
                        </button>
                    </div>
                </Reveal>
            </div>
        </footer>
    );
});

export default Footer;
