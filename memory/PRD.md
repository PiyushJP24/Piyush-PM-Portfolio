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
- Email `hello@piyushpaliwal.com`, social links, project links, resume link — all `#`/dummy in `/app/frontend/src/data/content.js`
- `/assets/portrait.png` → real photo; banner-1..4.png → real project shots

## Backlog
- P0: real content swap (photos, links, resume PDF), custom favicon/OG image
- P1: per-project case study detail pages, lightbox for analysis boards
- P2: blog/writing section, contact form via Resend, SEO meta + structured data
