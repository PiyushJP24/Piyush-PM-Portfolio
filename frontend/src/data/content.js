export const email = "piyushjp24@gmail.com";

export const socials = [
    { name: "LinkedIn", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "X", href: "#" },
    { name: "Medium", href: "#" },
];

export const projects = [
    {
        id: "repmate",
        status: "Built & Shipping",
        tone: "ship",
        name: "RepMate",
        tag: "A home-gym fitness app built for India — and priced for it, too.",
        banner: "/assets/banner-repmate.jpg",
        problem:
            "Fitness apps in India are generic templates or priced for a US market — not built for a home-gym context.",
        judgment:
            "Priced against HealthifyMe and Cult.fit, not a copied US rate. AI photo-logging capped at 8 scans/day/user to keep costs predictable pre-revenue.",
        outcome:
            "74 exercises, AI feedback, and calorie tracking shipped — heading to the Play Store via an existing influencer network.",
        tools: ["Mobile App", "AI Feedback", "Solo Build"],
        link: "/work/repmate",
    },
    {
        id: "decideai",
        status: "Case Study — 9/10",
        tone: "case",
        name: "DecideAI",
        tag: "A recommendation AI that ends the endless streaming scroll.",
        banner: "/assets/banner-decideai.jpg",
        problem:
            "Decision fatigue on streaming platforms — users scroll for minutes without picking anything to watch.",
        judgment:
            "Pivoted the full stack to Gemini for billing simplicity — a six-module pipeline through Supabase pgvector, tuned to a 0.60 match threshold.",
        outcome:
            "Perfect marks on Responsible AI, metrics, and panel defence, across six cross-checked deliverables.",
        tools: ["Recommendation AI", "RAG Pipeline", "Case Study"],
        link: "/work/decideai",
    },
    {
        id: "whyai",
        status: "In Progress",
        tone: "progress",
        name: "WhyAI",
        tag: "A Chrome extension that personalizes Amazon's AI Store for every kind of buyer.",
        banner: "/assets/banner-whyai.jpg",
        problem:
            "Amazon's AI Store explains features the same way to everyone — but a student and a creator need different information.",
        judgment:
            "Built a Chrome extension personalizing explanations by use case, sharing DecideAI's backend architecture for consistency.",
        outcome:
            "Fully functional across five use-case personas, with an existing referral path into Amazon.",
        tools: ["Chrome Extension", "Personalization", "E-Commerce"],
        link: "/work/whyai",
    },
    {
        id: "swiggy-aov",
        status: "Case Study",
        tone: "case",
        name: "Increasing Swiggy Instamart's AOV",
        tag: "A quick-commerce AOV problem, solved with survey data instead of guesswork.",
        banner: "/assets/banner-swiggy.jpg",
        problem:
            "50% of Instamart users were ordering 5+ times a month at an average order value under ₹400 — frequent, fragmented orders were capping profitability, not pricing.",
        judgment:
            "Validated the root cause with a 40-person Tier-1 user survey before proposing anything — traced the shortfall to urgency-driven ordering and poor pantry tracking, not price sensitivity. Scored two competing solutions with an Impact×Confidence−Effort model and killed the price-comparer idea (score: −1.5) in favor of an AI restocking nudge, 'InstaRestocker' (score: 2.2), then modeled the AOV lift (₹400→₹440) against a 3-month impact map before wireframing.",
        tools: [],
        link: "/work/instarestocker",
    },
    {
        id: "alfred",
        status: "Case Study / Wireframe",
        tone: "case",
        name: "Alfred — AI Travel Assistant",
        tag: "Designing an AI travel planning assistant for EaseMyTrip, from JTBD to wireframe.",
        banner: "/assets/banner-alfred.jpg",
        problem:
            "EaseMyTrip users plan trips across fragmented sources — Instagram for inspiration, TripAdvisor for research, separate sites for booking — with no single assistant tying it together.",
        judgment:
            "Framed the JTBD around three real moments — finding inspiration, discovering realistic options in-budget, booking quickly — rather than a generic feature list. Defined a single North Star Metric (% of bookings made through the assistant) before designing any screen, and wireframed specific failure modes, like a booking correction or typo'd input, rather than only the happy path.",
        tools: [],
        link: "/work/alfred",
    },
    {
        id: "windows11",
        status: "Case Study",
        tone: "case",
        name: "Windows 11 File Explorer Redesign",
        tag: "A teardown of Windows 11 and a Figma redesign of search, right-click and Properties.",
        banner: "/assets/banner-windows11.jpg",
        problem:
            "Windows 11's growth came from the Windows 10 end-of-support deadline, not preference — and File Explorer's slow, cluttered search and crowded right-click menu are its most visible friction points.",
        judgment:
            "Chose a problem Microsoft's own 2026 roadmap already points at, then redesigned search with inline filter chips, cut the right-click menu to six Tier-1 actions, and rebuilt Properties around what users actually open first.",
        tools: [],
        link: "/work/windows11",
    },
];

export const experience = [
    {
        years: "2025 — 2027",
        role: "MBA",
        org: "IIM Visakhapatnam",
        desc: "Coursework spanning AI & MLOps for Managers and Platform/Ecosystem Strategy, plus case work on CRM frameworks and an AI chatbot (HubSpot/Motion) — the product-adjacent side of a general management degree.",
    },
    {
        years: "Dec 2025 — ongoing",
        role: "AI PM Certification",
        org: "Masai School × IIT Roorkee",
        desc: "PM fundamentals and AI/LLM basics from a product manager's perspective — 8.9 CGPA in offline exams, 9/10 on the DecideAI (Netflix) capstone. Runs concurrently with the MBA.",
    },
    {
        years: "Dec 2024 — Aug 2025",
        role: "Financial Research Analyst Intern",
        org: "Sodhani Group, Jaipur",
        desc: "Built a return/risk/allocation KPI framework that relationship managers adopted to standardize advisory decisions; designed Excel/Google Sheets dashboards for portfolio and SIP tracking.",
    },
    {
        years: "Feb — Aug 2024",
        role: "BD & Sales Analysis Intern",
        org: "Ornaz Pvt. Ltd, Gurgaon",
        desc: "Applied the 80/20 rule to CRM lead scoring — cut conversion time 15% and lifted monthly revenue 22% (₹74L→₹81L); SWOT/gap analysis lifted lead response rate 30% and helped close 2 partnership deals.",
    },
    {
        years: "Jun — Jul 2023",
        role: "Research & Analysis Intern",
        org: "DRDO, Dehradun",
        desc: "On a 5-person team (2 scientists + 3 interns), supported a GUI-based contact application for a satellite-comms processor — cleaned 3,000+ weather/SMS/map records, built Tableau dashboards, and improved system response speed 15% via C++/QT enhancements.",
    },
    {
        years: "Jun — Jul 2022",
        role: "Research & Analysis Intern",
        org: "DRDO, Dehradun",
        desc: "Supported an ML project classifying satellite images via CNN models — ran EDA on 1,500+ image records with Pandas/Seaborn, built 10+ visualizations, and helped lift model accuracy to 82.46%.",
    },
    {
        years: "2020 — 2024",
        role: "B.Tech, Industrial & Production Engineering",
        org: "NIT Jalandhar",
        desc: "CGPA 7.85/10.",
    },
];

export const tools = [
    "Gemini",
    "Supabase",
    "Make.com",
    "FastAPI",
    "Figma",
    "Mixpanel",
    "Claude AI",
    "Miro",
    "Excel",
    "MySQL",
    "Amplitude",
    "Google Analytics",
    "Tableau",
];

export const frameworks = [
    {
        name: "RICE",
        example: "Sequenced RepMate's pre-launch backlog — fixed two launch-blocking bugs (MongoDB ObjectId serialization, a deprecated Gemini model reference) ahead of the calorie counter and Mixpanel integration.",
    },
    {
        name: "Jobs To Be Done",
        example: "Used JTBD and behavioral segmentation to trace Swiggy Instamart's AOV shortfall to urgency-driven ordering and poor pantry planning — not pricing, the obvious-but-wrong hypothesis.",
    },
    {
        name: "North Star Metric",
        example: "For the Alfred travel assistant, defined '% of bookings made through the assistant' as the single number that mattered — everything else fed into it.",
    },
    {
        name: "AARRR",
        example: "Mapped RepMate's funnel from fitness-influencer referral through to premium conversion at ₹299/month, priced against HealthifyMe and Cult.fit rather than a copied US rate.",
    },
    {
        name: "Kano Model",
        example: "Split RepMate's must-haves (74-exercise library, logging) from delighters (AI post-session feedback) when scoping what shipped before Play Store submission.",
    },
    {
        name: "CIRCLES",
        example: "Applied to a Zomato quick-commerce case with a Blinkit twist — structured the product design question end-to-end rather than jumping straight to a feature list.",
    },
    {
        name: "5C",
        example: "Applied to a MakeMyTrip visa-vertical market-entry question — Company → Context → Customer/Competitor → Challenges → Callouts.",
    },
    {
        name: "HEART",
        example: "For Instamart's InstaRestocker feature, defined Adoption, Engagement, Retention, and Satisfaction (NPS) metrics alongside the North Star — not just a single AOV number.",
    },
    {
        name: "Vibe Coding",
        example: "Built DecideAI's working frontend by prompting Lovable.dev (React/Tailwind) and orchestrating a 6-module Make.com pipeline — shipped a real product without hand-writing the frontend.",
    },
];

export const fluentIn = [
    "MoSCoW",
    "OKRs",
    "Opportunity Solution Trees",
    "PRD Writing",
    "A/B Testing",
    "SQL",
];

export const analysisProjects = [
    {
        title: "Vendor Performance Analysis",
        caption: "In-depth analysis of vendor- and product-level sales data for retail/wholesale optimisation — identified inefficiencies in vendor performance and opportunities for bulk purchasing strategies.",
        tags: ["SQL", "Tableau", "Excel", "Python", "Jupyter"],
        banner: "/assets/analysis-vendor.jpg",
        link: "/work/vendor-performance-analysis",
    },
    {
        title: "Airline Data Analysis",
        caption: "Operational data analysis for a regional airline — improving profit margins through aircraft-level revenue insights and occupancy optimisation strategies.",
        tags: ["Python", "SQL", "NumPy", "EDA", "Pandas"],
        banner: "/assets/analysis-airline.jpg",
        link: "/work/airline-data-analysis",
    },
];

export const analysisViz = [
    {
        title: "Netflix Usage V3",
        caption: "Personal viewing analytics — cumulative titles watched over time, viewing hours per day, and titles-per-year breakdown.",
        thumb: "/assets/viz-netflix.jpg",
        link: "#",
    },
    {
        title: "Spotify Music and Artist Analysis",
        caption: "Music classification and personalisation dashboard clustering tracks by danceability, acousticness, speechiness, and instrumentalness.",
        thumb: "/assets/viz-spotify.jpg",
        link: "#",
    },
    {
        title: "Impact of Large Language Models: Trends & Implications",
        caption: "Tracks 129 LLMs across 57 owners/developers — average parameter counts, yearly release trends, and a current-leaders ranking.",
        thumb: "/assets/viz-llm.jpg",
        link: "#",
    },
];
