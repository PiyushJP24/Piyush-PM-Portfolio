import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
    ["About", "#about", "nav-link-about"],
    ["Work", "#work", "nav-link-work"],
    ["Experience", "#experience", "nav-link-experience"],
    ["Toolbox", "#tools", "nav-link-tools"],
];

export function scrollToHash(e, hash) {
    e.preventDefault();
    if (window.__closeLayers) window.__closeLayers();
    if (hash === "#connect") {
        const target = document.documentElement.scrollHeight;
        if (window.__lenis) window.__lenis.scrollTo(target);
        else window.scrollTo({ top: target, behavior: "smooth" });
        return;
    }
    const el = document.querySelector(hash);
    if (!el) {
        window.location.href = hash === "#home" ? "/" : `/${hash}`;
        return;
    }
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -96 });
    else el.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
    const [open, setOpen] = useState(false);
    const go = (e, hash) => {
        setOpen(false);
        scrollToHash(e, hash);
    };
    return (
        <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
        >
            <nav
                data-testid="main-nav"
                className="relative flex w-full items-center justify-between gap-5 rounded-full border border-line bg-cream/85 px-5 py-2.5 shadow-[0_10px_30px_-14px_rgba(34,38,31,0.3)] backdrop-blur-md md:w-auto md:justify-start md:gap-7"
            >
                <a
                    href="#home"
                    onClick={(e) => go(e, "#home")}
                    data-cursor="Home"
                    data-testid="nav-logo"
                    className="whitespace-nowrap font-script text-xl leading-none text-ink sm:text-2xl"
                >
                    Piyush Jairam Paliwal
                </a>
                <span className="hidden h-4 w-px bg-ink/15 md:block" aria-hidden="true" />
                <div className="hidden items-center gap-6 md:flex">
                    {links.map(([label, hash, testid]) => (
                        <a
                            key={hash}
                            href={hash}
                            onClick={(e) => go(e, hash)}
                            data-testid={testid}
                            className="sweep text-sm font-medium text-fog transition-colors hover:text-ink"
                        >
                            {label}
                        </a>
                    ))}
                </div>
                <a
                    href="#connect"
                    onClick={(e) => go(e, "#connect")}
                    data-cursor="Say Hello"
                    data-testid="nav-connect-button"
                    className="hidden rounded-full bg-forest px-4 py-1.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-ink md:block"
                >
                    Let&rsquo;s Connect
                </a>
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    data-cursor="Menu"
                    data-testid="nav-menu-button"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-panel/70 text-ink md:hidden"
                >
                    {open ? <X size={16} /> : <Menu size={16} />}
                </button>
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            data-testid="mobile-nav-panel"
                            className="absolute inset-x-0 top-[calc(100%+10px)] flex flex-col gap-1 rounded-3xl border border-line bg-cream/95 p-3 shadow-[0_24px_50px_-18px_rgba(34,38,31,0.4)] backdrop-blur-md md:hidden"
                        >
                            {links.map(([label, hash, testid]) => (
                                <a
                                    key={hash}
                                    href={hash}
                                    onClick={(e) => go(e, hash)}
                                    data-testid={`mobile-${testid}`}
                                    className="rounded-2xl px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-panel"
                                >
                                    {label}
                                </a>
                            ))}
                            <a
                                href="#connect"
                                onClick={(e) => go(e, "#connect")}
                                data-testid="mobile-nav-connect-button"
                                className="mt-1 rounded-2xl bg-forest px-4 py-3 text-center text-sm font-medium text-cream"
                            >
                                Let&rsquo;s Connect
                            </a>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}
