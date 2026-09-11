import { motion } from "framer-motion";

const links = [
    ["About", "#about", "nav-link-about"],
    ["Work", "#work", "nav-link-work"],
    ["Experience", "#experience", "nav-link-experience"],
    ["Toolbox", "#tools", "nav-link-tools"],
];

export function scrollToHash(e, hash) {
    e.preventDefault();
    if (hash === "#connect") {
        const target = document.documentElement.scrollHeight;
        if (window.__lenis) window.__lenis.scrollTo(target);
        else window.scrollTo({ top: target, behavior: "smooth" });
        return;
    }
    const el = document.querySelector(hash);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -12 });
    else el.scrollIntoView({ behavior: "smooth" });
}

export default function Nav() {
    return (
        <motion.header
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
        >
            <nav
                data-testid="main-nav"
                className="flex items-center gap-5 rounded-full border border-line bg-cream/85 px-5 py-2.5 shadow-[0_10px_30px_-14px_rgba(34,38,31,0.3)] backdrop-blur-md md:gap-7"
            >
                <a
                    href="#home"
                    onClick={(e) => scrollToHash(e, "#home")}
                    data-cursor="Home"
                    data-testid="nav-logo"
                    className="font-script text-2xl leading-none text-ink"
                >
                    Piyush Paliwal
                </a>
                <span className="hidden h-4 w-px bg-ink/15 md:block" aria-hidden="true" />
                <div className="hidden items-center gap-6 md:flex">
                    {links.map(([label, hash, testid]) => (
                        <a
                            key={hash}
                            href={hash}
                            onClick={(e) => scrollToHash(e, hash)}
                            data-testid={testid}
                            className="sweep text-sm font-medium text-fog transition-colors hover:text-ink"
                        >
                            {label}
                        </a>
                    ))}
                </div>
                <a
                    href="#connect"
                    onClick={(e) => scrollToHash(e, "#connect")}
                    data-cursor="Say Hello"
                    data-testid="nav-connect-button"
                    className="rounded-full bg-forest px-4 py-1.5 text-sm font-medium text-cream transition-colors duration-300 hover:bg-ink"
                >
                    Let&rsquo;s Connect
                </a>
            </nav>
        </motion.header>
    );
}
