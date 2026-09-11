const items = [
    "Product Strategy",
    "Systems Thinking",
    "AI-Native Building",
    "Ship · Measure · Learn",
    "Editorial Craft",
    "Data-Informed Judgment",
];

function Half() {
    return (
        <div className="flex shrink-0 items-center">
            {items.map((t) => (
                <span key={t} className="flex items-center gap-10 pr-10 text-2xl font-medium tracking-tight text-ink/60 md:text-3xl">
                    <span className="inline-block h-2.5 w-2.5 rotate-45 bg-forest" aria-hidden="true" />
                    {t}
                </span>
            ))}
        </div>
    );
}

export default function Marquee() {
    return (
        <section aria-hidden="true" className="overflow-hidden border-y border-line bg-panel/60 py-8">
            <div className="marquee-track">
                <Half />
                <Half />
            </div>
        </section>
    );
}
