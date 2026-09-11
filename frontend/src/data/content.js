export const email = "hello@piyushpaliwal.com";

export const socials = [
    { name: "LinkedIn", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "X", href: "#" },
    { name: "Medium", href: "#" },
];

export const projects = [
    {
        id: "supportpilot",
        status: "Built & Shipping",
        tone: "ship",
        name: "SupportPilot",
        tag: "AI copilot that triages SaaS support tickets before a human ever opens the queue.",
        banner: "/assets/banner-1.png",
        problem:
            "A B2B SaaS team was drowning in 900+ tickets a week. First-response time had slipped past 9 hours, and churn-risk accounts waited in the same queue as password resets.",
        judgment:
            "Chose to auto-draft replies instead of auto-sending them, with a confidence threshold that routes edge cases to humans. Shipped v1 in three weeks by scoping to the top four intent categories instead of boiling the ocean.",
        outcome:
            "Median first-response dropped from 9h to 40min. 62% of tickets now resolve from AI drafts, CSAT is up 11 points, and the team hired zero additional support headcount.",
        tools: ["Gemini", "FastAPI", "Supabase"],
        link: "#",
    },
    {
        id: "opsflow",
        status: "Case Study — 9/10",
        tone: "case",
        name: "OpsFlow",
        tag: "A no-code automation layer that killed 30 hours of weekly manual ops work.",
        banner: "/assets/banner-2.png",
        problem:
            "An ops team was copy-pasting between Sheets, Slack, and the CRM for every new order — error-prone, unglamorous, and completely invisible to leadership.",
        judgment:
            "Mapped the full workflow before automating anything, and deliberately kept one human approval gate in the loop after an early misfire fired 200 duplicate Slack alerts.",
        outcome:
            "30+ hours a week returned to the team, order-processing errors down 78%, and the playbook was adopted by two adjacent teams without being asked.",
        tools: ["Make.com", "Airtable", "Slack API"],
        link: "#",
    },
    {
        id: "pulseboard",
        status: "In Progress",
        tone: "progress",
        name: "Pulseboard",
        tag: "A product analytics dashboard that tells PMs what changed — not just what happened.",
        banner: "/assets/banner-3.png",
        problem:
            "Stakeholders needed five tools open to answer 'how is the product doing?' — so, in practice, nobody ever asked.",
        judgment:
            "Prioritized anomaly callouts and week-over-week deltas over chart variety, and cut three 'nice-to-have' widgets to protect a two-week MVP.",
        outcome:
            "In alpha with six pilot users; weekly active usage holding at 83%. Public beta targeted for next month.",
        tools: ["React", "FastAPI", "PostHog"],
        link: "#",
    },
    {
        id: "dormeats",
        status: "Case Practice",
        tone: "practice",
        name: "DormEats",
        tag: "Group food-ordering for hostels — a national case-competition entry turned working prototype.",
        banner: "/assets/banner-4.png",
        problem:
            "Hostel students place twelve separate delivery orders for the same dinner window — fees stack up and food arrives at twelve different times.",
        judgment:
            "Scoped the entire case around a single 'cart pool' mechanic, and validated it with twenty guerrilla interviews before writing a word of the PRD.",
        outcome:
            "Scored 9/10 at a national PM case competition; the prototype was tested with 40 students across two hostels.",
        tools: ["Figma", "React Native"],
        link: "#",
    },
];

export const experience = [
    {
        years: "2024 — 2026",
        role: "MBA, Business Analytics",
        org: "Graduate School of Management",
        desc: "Product strategy, analytics, and a steady diet of case competitions. Thesis on AI copilots in customer operations.",
    },
    {
        years: "Jun — Aug 2025",
        role: "Product Management Intern",
        org: "Early-stage SaaS",
        desc: "Owned the onboarding funnel end to end; shipped two experiments that lifted activation by 14%.",
    },
    {
        years: "2021 — 2024",
        role: "Software Engineer",
        org: "Product engineering team",
        desc: "Full-stack engineer shipping React and FastAPI features — the years that made me dangerous with a prototype.",
    },
    {
        years: "2017 — 2021",
        role: "B.Tech, Computer Science",
        org: "Undergraduate",
        desc: "Where the builder habit started — hackathons, side projects, and one very over-engineered hostel app.",
    },
];

export const tools = [
    "Gemini",
    "Supabase",
    "Make.com",
    "FastAPI",
    "React Native",
    "Figma",
    "PostHog",
    "Notion",
];

export const frameworks = [
    {
        name: "RICE",
        example: "Scored and sequenced the Pulseboard backlog — cut three widgets that scored high on effort and low on reach.",
    },
    {
        name: "Jobs To Be Done",
        example: "Framed SupportPilot interviews around the real 'job' — clearing the queue — not feature wishlists.",
    },
    {
        name: "North Star Metric",
        example: "Set 'tickets resolved without human touch' as the single number SupportPilot gets judged by.",
    },
    {
        name: "AARRR",
        example: "Rebuilt an onboarding funnel analysis on pirate metrics and found activation leaking at step two.",
    },
    {
        name: "Kano Model",
        example: "Separated delighters from table stakes before scoping the OpsFlow MVP — saved a month of polish nobody asked for.",
    },
    {
        name: "Working Backwards",
        example: "Wrote the launch press release for DormEats before the PRD. It killed two features on the spot.",
    },
];

export const fluentIn = [
    "MoSCoW",
    "HEART",
    "OKRs",
    "CIRCLES",
    "Opportunity Solution Trees",
    "PRD Writing",
    "A/B Testing",
    "SQL",
];

export const analysis = [
    {
        title: "Cohort Retention Board",
        caption: "SQL + dashboard deep-dive; the retention curve that anchors the OpsFlow case study.",
        link: "#",
    },
    {
        title: "Onboarding Funnel Teardown",
        caption: "Step-by-step drop-off analysis that shaped SupportPilot's activation flow.",
        link: "#",
    },
    {
        title: "Weekly Exec KPI Digest",
        caption: "Automated Monday-morning metrics brief — the seed idea behind Pulseboard.",
        link: "#",
    },
];
