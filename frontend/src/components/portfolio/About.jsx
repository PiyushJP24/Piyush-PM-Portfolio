import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHead from "./SectionHead";
import ResumeButton from "./ResumeButton";
import { githubUrl, linkedinUrl } from "../../data/site";
import { instantReveal } from "./instant";

const facts = [
    ["Based in", "Gurgaon, India"],
    ["Currently", "MBA, IIM Visakhapatnam"],
    ["Building at the intersection of", "AI products & user judgment"],
];

export default function About() {
    const iv = instantReveal.current;
    const figureMotion = iv
        ? { initial: false, animate: { opacity: 1, y: 0 } }
        : {
              initial: { opacity: 0, y: 32 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.3 },
          };
    const bodyMotion = iv
        ? { initial: false, animate: { opacity: 1, y: 0 } }
        : {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.4 },
          };
    return (
        <section id="about" data-testid="about-section" className="mx-auto max-w-6xl px-6 py-28 md:py-36">
            <div className="grid items-center gap-14 md:grid-cols-[5fr_6fr]">
                <motion.figure
                    {...figureMotion}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative overflow-hidden rounded-[2rem] border border-line bg-panel"
                    data-cursor="That's me"
                >
                    <img
                        src="/assets/portrait.jpg"
                        alt="Portrait of Piyush Jairam Paliwal"
                        data-testid="about-photo"
                        className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 bg-gradient-to-t from-ink/75 to-transparent p-5 pt-14 text-sm text-cream opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        Piyush Jairam Paliwal — Product Manager.
                    </figcaption>
                </motion.figure>

                <div>
                    <SectionHead
                        no="01"
                        kicker="About"
                        title={
                            <>
                                An engineer&rsquo;s toolkit,
                                <br />a PM&rsquo;s{" "}
                                <span className="font-serifit font-normal italic text-forest">judgment.</span>
                            </>
                        }
                    />
                    <motion.div {...bodyMotion} transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
                        <p className="mt-6 text-sm leading-relaxed text-ink/80 md:text-base">
                            I&rsquo;m Piyush Jairam Paliwal — an MBA candidate with an engineering degree, and the kind
                            of PM who would rather prototype the idea than schedule a meeting about it.
                        </p>
                        <p className="mt-4 text-sm leading-relaxed text-ink/80 md:text-base">
                            I build AI-native products end to end: user interviews, PRDs, and working prototypes wired
                            up with LLMs and automation tooling. Currently looking for APM / Product Manager roles
                            where judgment matters more than Jira theatre.
                        </p>
                        <dl className="mt-8">
                            {facts.map(([k, v]) => (
                                <div key={k} className="flex items-baseline justify-between gap-6 border-t border-line py-3 text-sm">
                                    <dt className="text-fog">{k}</dt>
                                    <dd className="text-right font-medium text-ink">{v}</dd>
                                </div>
                            ))}
                        </dl>
                        <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                            <ResumeButton testid="view-resume-button-about" />
                            <a
                                href={linkedinUrl}
                                target="_blank"
                                rel="noreferrer"
                                data-cursor="Visit"
                                data-testid="about-linkedin-link"
                                className="sweep inline-flex items-center gap-1 text-sm font-medium text-fog transition-colors hover:text-ink"
                            >
                                LinkedIn
                                <ArrowUpRight size={12} />
                            </a>
                            <a
                                href={githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                data-cursor="Visit"
                                data-testid="about-github-link"
                                className="sweep inline-flex items-center gap-1 text-sm font-medium text-fog transition-colors hover:text-ink"
                            >
                                GitHub
                                <ArrowUpRight size={12} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
