import { ArrowUpRight } from "lucide-react";
import { resumeUrl } from "../../data/site";

export default function ResumeButton({ light = false, testid = "view-resume-button", className = "" }) {
    return (
        <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="Resume"
            data-testid={testid}
            className={`btn-circle ${light ? "light border-cream/40 text-cream" : "border-ink/25 text-ink"} inline-flex items-center gap-3 rounded-full border py-3.5 pl-11 pr-8 text-sm font-medium tracking-wide ${className}`}
        >
            <span className="fill-dot" aria-hidden="true" />
            <span className="btn-label relative">View Resume</span>
            <ArrowUpRight size={15} className="btn-label relative" aria-hidden="true" />
        </a>
    );
}
