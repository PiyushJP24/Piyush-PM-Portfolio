# PRD — Piyush Jairam Paliwal · Product Manager Portfolio

## Original Problem Statement
Personal portfolio for a Product Manager (Piyush Jairam Paliwal). React + Tailwind. Light "old money" editorial aesthetic: warm cream `#F7F3EA`, panels `#EFE9DA`, ink `#22261F`, muted `#7A7A6B`, forest accent `#3E5C46`, dividers at 10% ink. General Sans body + light script logo font. Custom lerped difference-blend cursor that expands into labeled pills over interactive elements. Sections: 3-layer parallax hero (provided office illustration @0.4x, character @0.75x overlapping headline, text @1x), About with circle-reveal View Resume button, Featured Projects (status tags, Problem→Judgment calls→Outcome structure), quiet text-first Experience, Tools & Frameworks (tags, How I Think grid, also-fluent row, supporting-analysis cards, underline-sweep links), curtain-reveal footer with staggered content. No scroll-jacking except footer curtain; respect prefers-reduced-motion; fully responsive.

## User Personas
- Recruiters/hiring managers scanning quickly for PM craft (fast load, scannable sections)
- Founders/peers evaluating side-project depth
- Piyush himself editing placeholder content later

## Architecture
- Frontend-only React SPA (CRA + craco + Tailwind); no backend endpoints needed
- framer-motion (reveals, parallax via useScroll/useTransform, MotionConfig reducedMotion="user"), lenis (momentum scroll, disabled under reduced-motion)
- Components in `/app/frontend/src/components/portfolio/`; all copy centralized in `/app/frontend/src/data/content.js`
- Assets in `/app/frontend/public/assets/` — office.webp (provided), character.png (provided illustration, white bg flood-fill removed via /app/scripts/process_character.py), banner-1..4.png + portrait.png (on-palette PIL placeholders, /app/scripts/gen_placeholders.py)

## Implemented (2026-07-11)
- Hero: masked line-by-line headline reveal, 3-layer parallax, character overlapping "Manager" (z-layered depth), floating Available-for-Work + 2 annotation pills with drift, scroll cue
- Custom cursor: spring-lerped circle, mix-blend-difference, expands to labeled pill ("View Project", "Resume", etc.) via data-cursor attributes
- Nav: floating pill, Meow Script signature logo, underline-sweep links, lenis smooth anchor scrolling
- Slow editorial marquee between hero and about
- About: placeholder portrait with hover caption, bio, quick-facts list, circle-reveal View Resume button
- Projects: 4 placeholder PM case cards (SupportPilot, OpsFlow, Pulseboard, DormEats) with status tags, P→J→O copy, banner placeholders, hover lift + shadow
- Experience: quiet numbered list (MBA, PM internship, SWE, B.Tech)
- Tools & Frameworks: tool tags, How I Think grid (6 frameworks w/ applied examples), also-fluent row, 3 supporting-analysis cards with sweep links
- Footer: curtain reveal (fixed-behind + measured margin, all viewports), scroll-progress-staggered content, email pill, light circle-reveal resume button, social sweep links, back-to-top
- Fixes (2026-07-11): nav scroll-margin so anchored sections always land below the floating nav; mobile hamburger menu with all links + Connect; curtain reveal enabled on mobile; "Available for Work" pill removed from hero
- Grain overlay, custom scrollbar, reduced-motion support throughout

## Placeholders to swap (user follow-up)
- Email now piyushjp24@gmail.com; social links, project links, resume link still `#` in `/app/frontend/src/data/content.js`
- DONE (2026-07-16c): projects.js replaced with updated user file (untouched). Detail pages: docs-card section removed; live/docs pill buttons under the header strip (muted non-clickable when liveDisabled, skipped when URL empty, new tab). Hero + tile badges now use per-project tag (APP BUILD/CAPSTONE/PROTOTYPE/CASE STUDY/TEARDOWN). Homepage tiles overlay tile{} fields from projects.js (swiggy-aov → instarestocker slug map; windows11 tile image = windows_11_teardown_.png, original PNG kept). New src/data/site.js (resumeUrl, linkedinUrl, githubUrl, email) drives footer + both View Resume buttons (new tab); footer socials trimmed to LinkedIn + GitHub, new tab. Nav has no such links, so nothing to wire there. Windows 11 File Explorer Redesign tile added to the Work grid (6th card, Case Study status, banner-windows11.jpg, links to /work/windows11). All detail pages now read body content from user-supplied /src/data/projects.js (DO NOT EDIT per user). Template (ProjectDetail.jsx) gained sections after Tech stack: 01 Problem and evidence, 02 Insight and decision, 03 Solution, Read the full thinking (docs cards, link only when href set), 04 Metrics, 05 Limits and what's next. Hero/status/banner/next stay in details.js; live/GitHub buttons render only when valued (DecideAI has GitHub). New /work/windows11 page with banner-windows11.jpg. Next chain follows projects.js array order (…alfred → windows11 → repmate). Analysis pages (vendor/airline) keep working via a legacy-field fallback in App.js since they're not in projects.js. Vendor Performance Analysis + Airline Data Analysis detail pages (/work/vendor-performance-analysis, /work/airline-data-analysis) — details.js entries only, analysis cards in Toolbox now link to them. Deliberately no source/report/doc buttons (links come later per user). Chain: vendor → airline → repmate loop. Alfred detail page at /work/alfred — details.js entry only. Detail chain complete: RepMate → DecideAI → WhyAI → InstaRestocker → Alfred → loops back to RepMate. All 5 Work tiles now have detail pages. Detail pages refactored to a shared data-driven template — ProjectDetail.jsx + data/details.js drive /work/repmate and /work/decideai (add a details.js entry for future pages). Fixed footer-not-revealing on detail pages: shared Footer now takes pathKey prop and recomputes its reveal range per route. RepMate Next button → /work/decideai; DecideAI Next → /work/whyai (falls back to home until that page is added). Old RepmateDetail.jsx deleted.
- DONE (2026-07-14): Supporting Analysis restructured into a Projects / Visualisations pill-toggle — 2 analysis project cards (Vendor Performance, Airline Data) + 3 Tableau viz cards (Netflix Usage V3, Spotify Analysis, LLM Trends). Real user-provided images swapped in (analysis-vendor/airline.jpg, viz-netflix/spotify/llm.jpg). Tableau Public + per-card links still "#" pending URLs.

## Backlog
- P0: real content swap (photos, links, resume PDF), custom favicon/OG image
- P1: per-project case study detail pages, lightbox for analysis boards
- P2: blog/writing section, contact form via Resend, SEO meta + structured data
