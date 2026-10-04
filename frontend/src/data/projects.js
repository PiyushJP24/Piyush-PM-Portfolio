// Single source of truth for all six project detail pages and the homepage Work tiles.
// Order = site order = "Check Next Project" order (last links back to first).
// Render rules: skip any field that is an empty string or empty array.
// tag: one short capsule label, used for BOTH the homepage tile badge and the project page hero badge.
// tile: homepage tile text. Replace only the fields present in the block; keep any tile field not listed.
// Two buttons sit under the header strip, above Overview: liveUrl (label liveLabel) and docsUrl (label docsLabel).
// If liveUrl is empty and liveDisabled is true, show the live button muted and not clickable.
// The hero title, subtitle and banner are NOT driven by this file.

export const projects = [
  {
    "slug": "repmate",
    "name": "RepMate",
    "role": "Product owner, AI-assisted build",
    "team": "Solo",
    "timeline": "Jul 2026 to ongoing",
    "outcome": "All five core functions working end to end; launch paused on build cost",
    "liveUrl": "",
    "overview": "Indian lifters, especially outside the big metros, mostly track workouts informally, and mainstream fitness apps are built for other markets. RepMate combines quick set logging, a 74 exercise library, a calorie counter, AI workout plans and progress analytics. The decision I care about most is where the AI sits: only on the server, only in the features people would pay for, behind one entitlement check. It is an unreleased build.",
    "myRole": [
      "Wrote the PRD as the single source of truth and approved nine wireframes designed in Google Stitch, using real screenshots of a reference app to set the visual language",
      "A stage by stage review of my first Flutter and Firebase plan caught a database rule that never checked who owned a logged set, so I moved the build to Emergent",
      "Directed the vibe coded build with one detailed change prompt to save credits: model pin, retries with backoff, scope cuts, tiers and paywall states",
      "Set pricing, the free and premium split and the AI cost guardrails",
      "Hand tested all five core functions against the PRD and directed the fixes, including a sign in bug, a retired model name and a misleading label"
    ],
    "stack": [
      "React Native",
      "Expo",
      "Python",
      "FastAPI",
      "MongoDB",
      "gemini-2.5-flash-lite",
      "Gemini Vision",
      "USDA FoodData Central",
      "RevenueCat",
      "Mixpanel (planned)",
      "Emergent",
      "Google Stitch"
    ],
    "problem": "I started from what I see in gyms and compared HealthifyMe, Cult.fit and Hevy. Each solves part of the problem for a different audience: food and coaching in one, logging in another. None is built around a lifter in India who wants to log sets quickly, count calories from the food they actually eat and pay a price that fits locally. I ran no survey, so this is a hypothesis from my own training, lifters around me and a competitor review. Testing it with real users is the first job after launch.",
    "insight": {
      "intro": "I used no scoring framework. Each wireframe round I tested every proposed feature against the PRD's five core functions and cut the rest, then put AI effort where the premium value and the cost sit.",
      "calls": [
        "Five core functions only, because every round added features outside the PRD, such as gender selection, CSV export and recovery scores. Trade-off: a smaller product to show early.",
        "Free logging and library, premium for the calorie counter, AI plan and analytics, because basic tracking builds the habit and the AI cost sits in the premium features. Trade-off: free users may leave before they meet the premium value.",
        "Cut the natural language AI Log and cap photo scans at 8 per user per day, because the log was a good demo that competed with features people would pay for, and scans carry real cost. Trade-off: a flashy feature is gone and heavy users hit a ceiling."
      ]
    },
    "solution": [
      "The app talks to one FastAPI backend. That backend owns the data and is the only part that calls Gemini or the USDA database, so no AI key ships inside the app. Three features use Gemini: workout plans built from the user's own history, a short feedback note after a session, and meal photo reading through Gemini Vision. The calorie counter has two ways in, and the manual USDA lookup always sits beside the photo path, so a wrong reading never traps the user. Values show as estimates.",
      "The model is pinned to one version so behaviour does not shift, and rate limit errors retry with backoff instead of appearing raw. Every gated feature passes through a single entitlement check, so the free and premium split lives in one place, and a locked feature opens an in app paywall modal. There is no retrieval layer or embeddings here. The split is deliberate: Gemini produces estimates and text, and the backend decides access, limits and what gets labelled as AI."
    ],
    "metrics": "North star: workouts logged per active user per week. First numbers to watch: day 7 and day 30 retention, free to paid conversion and AI cost per active user. Experiment: show the paywall after the first calorie lookup in one group and only on tapping a premium feature in the other, with free to paid conversion as the primary metric and day 7 retention as the guardrail. Pricing of ₹299 a month or ₹2,399 a year (about 33% off) is an untested hypothesis. Mixpanel is not switched on, so nothing here is measured.",
    "limits": "The app is not published, because build costs outran my budget, and the purchase is simulated. USDA data is not India specific, so estimates for local dishes will be rough. The AI plan text still shows raw markdown symbols, and I have not measured latency or error rates. Next: polish, real billing through RevenueCat, Mixpanel events, an Indian dish dataset, a beta with gym friends and fitness creators, then the Play Store.",
    "takeaways": [
      "Scope discipline is most of the job. Every wireframe round tried to grow the product, and pruning kept it coherent.",
      "Labels are promises. Removing an AI Analyzed badge from analytics that were not AI generated did more for honesty than any feature I added.",
      "Cost is a product constraint. It shaped the scan cap and the pinned model, and it is why launch is paused."
    ],
    "liveLabel": "App coming soon",
    "docsUrl": "https://drive.google.com/drive/folders/1h1PL8jrOv38okHiAyefuusrwDCCs2g3Z?usp=sharing",
    "docsLabel": "Read the documentation",
    "liveDisabled": true,
    "tag": "APP BUILD",
    "tile": {
      "problem": "Mainstream fitness apps are built for other markets, and none is built around a lifter in India who wants quick set logging, calorie counts from local food and a fair price.",
      "judgmentCalls": "Five core functions only, free logging with premium AI features, and photo scans capped at 8 per user per day to keep AI cost predictable.",
      "outcome": "All five core functions working end to end; launch paused on build cost."
    }
  },
  {
    "slug": "decideai",
    "name": "DecideAI",
    "role": "Product owner, AI-assisted build",
    "team": "Solo",
    "timeline": "May to Jun 2026",
    "outcome": "Masai capstone, scored 9/10: a typed mood returns three catalogue grounded picks with reasons and logs the session",
    "liveUrl": "https://netflix-decide-ai.lovable.app",
    "overview": "Viewers on a streaming service spend more time choosing than watching, and the home screen knows what they watched before but not how they feel tonight. DecideAI lets a viewer type their mood and available time in one message and returns three titles, each with a one line reason. It is retrieval augmented generation over a catalogue: the model writes the reason, but runtime, language and rating come from catalogue data, and the model is told never to invent them. This is an unofficial capstone concept with a simulated catalogue.",
    "myRole": [
      "Audited the content discovery flow in the Netflix iOS app, mapping an eight step loop, and mined 12 public user quotes for evidence",
      "Ranked five frictions on an impact versus effort matrix and chose the one that needs AI",
      "Wrote the product spec: user stories, acceptance criteria, requirements and a responsible AI plan",
      "Designed the architecture, the six module Make.com workflow and the pgvector retrieval step, and directed the interface build in Lovable with Figma wireframes",
      "Tuned the prompt over five iterations and moved the retrieval cutoff from 0.70 to 0.60, checking outputs by hand"
    ],
    "stack": [
      "React",
      "TypeScript",
      "Lovable",
      "Make.com",
      "Gemini 2.5 Flash",
      "gemini-embedding-001",
      "Supabase",
      "pgvector",
      "Figma",
      "GitHub"
    ],
    "problem": "I audited the content discovery flow in the Netflix iOS app, mapping an eight step loop from opening the app to giving up: grid scanning, trailer hopping, leaving for Google or IMDb, a mismatched pick and a language surprise after pressing play. For evidence I mined 12 public quotes from a UserTesting survey (December 2024), Reddit, Substack, Medium, Team Blind, Trustpilot, a Reelgood study and tech press. The method was a flow audit plus review mining, with no interviews of my own. The survey reports about 110 hours a year spent deciding what to watch, and 51 percent find suggestions overwhelming. The quotes also show the recommender ignores the time a viewer has and the mood they are in.",
    "insight": {
      "intro": "I logged five frictions: too many tiles, a recommender blind to time and mood, misleading thumbnails, no filter for time available, and language or audio surprises after pressing play. I placed them on an impact versus effort matrix and asked one more question of each: can plain UX fix it? A runtime filter and a language badge can, so they stayed out. Only the missing explanation of why a title fits tonight needs a model reasoning over mood, time and title attributes together.",
      "calls": [
        "One free text message, not a form, because each extra input adds decision fatigue. Trade-off: time and social context are not split into fields yet.",
        "The model writes the reason while the catalogue supplies runtime, language and rating. Trade-off: quality depends on the metadata.",
        "A retrieval cutoff of 0.60, lowered from 0.70, because strict matching rejected niche moods. Trade-off: weaker matches can pass."
      ]
    },
    "solution": [
      "The viewer types how they feel and how long they have into a chat built in Lovable. A Make.com scenario of six modules handles each message: webhook in, embedding, vector search, ranking, session log, webhook response. gemini-embedding-001 turns the message into a 768 dimension vector. A Supabase function (match_content) runs cosine similarity search over the pgvector catalogue and returns the closest titles with runtime, language, age rating and mood tags, using a 0.60 cutoff. Gemini 2.5 Flash then receives those candidates with a rule to use only the supplied metadata, invent no attribute and return three picks with a one line reason as JSON. The session goes into a decidedai_sessions table, and a 12 second timeout with a fallback response guards the model call.",
      "This is single layer retrieval in a fixed pipeline, not an autonomous agent. My spec describes a multi step agent, and the build has no tool choice or loop. I moved to an all Gemini stack after billing constraints ruled out my first OpenAI and Claude plan. Eligibility and hard attributes come from data, while ranking and wording come from the model, and I checked its claims by hand over five prompt iterations because no automatic check exists yet."
    ],
    "metrics": "All metrics are proposed. North star: time to play via DecideAI, from tapping the button to pressing play, with a target under 3 minutes against an assumed baseline of about 18 minutes (110 hours a year divided by 365 days). Inputs: recommendation acceptance rate, skip rate and P95 latency under 4 seconds. Guardrails: genre diversity, total session watch time and the distress false positive rate. Experiment: a 50/50 A/B test for 14 days against the standard home screen, with time to play as the primary metric.",
    "limits": "The catalogue is a simulated seed set, not Netflix data. Only part of the designed system is built: the distress fallback, age gating, low confidence question and monitoring are specified but not wired. Latency and retrieval precision have not been measured. Next: size and document the catalogue, measure precision on the 15 test inputs, log skips, wire the distress and age filters and test with real viewers.",
    "takeaways": [
      "Pick the friction only AI can fix. A runtime filter and a language badge are ordinary UX work, so I kept them out of the AI scope.",
      "A spec should say what the prototype is not. My spec describes an agent, the build is a six step pipeline, and the page says so.",
      "Tune thresholds on real inputs. The retrieval cutoff moved from 0.70 to 0.60 because strict matching rejected niche moods."
    ],
    "liveLabel": "View live project",
    "docsUrl": "https://drive.google.com/drive/folders/1lcH0OHbe2SBrBkQjpocqX5Ix_9iGMgRD?usp=sharing",
    "docsLabel": "Read the documentation",
    "tag": "CAPSTONE",
    "tile": {
      "problem": "Viewers spend more time choosing than watching, and the home screen knows what they watched before but not how they feel tonight.",
      "judgmentCalls": "The model writes the reason while the catalogue supplies runtime, language and rating, and the retrieval cutoff was lowered from 0.70 to 0.60 because strict matching rejected niche moods.",
      "outcome": "Masai capstone scored 9/10: a typed mood returns three catalogue grounded picks with reasons."
    }
  },
  {
    "slug": "whyai",
    "name": "WhyAI",
    "role": "Product owner, AI-assisted build",
    "team": "Solo",
    "timeline": "Jul to Sep 2026",
    "outcome": "Live prototype with confidence scores the model cannot influence",
    "liveUrl": "https://amazon-why-ai.vercel.app/",
    "overview": "Shoppers on an AI store see the same generic feature copy on every product page, so nobody can tell which features matter for their own use. WhyAI asks for one sentence about how you will use a product, then rewrites each AI feature for that use with its own confidence score. A dual RAG layer does the grounding, with one retrieval pass over feature specs and one over review evidence. The model writes the words and the score is computed in code, so the model cannot influence it. This is an unofficial concept: a marketplace storefront clone with a side panel standing in for an in-app feature.",
    "myRole": [
      "Audited the live AI Store flow and ranked five frictions by impact and effort",
      "Wrote the product spec, the per feature scoring design and the grounding rules",
      "Directed a vibe coded build in Emergent across three prompt rounds, caught that round one showed the same score on every card, and had it rebuilt",
      "Deployed on Vercel, Render and MongoDB Atlas with Claude's help, and directed the fixes for free tier quota errors: a pinned model, retries with backoff and a fallback model",
      "Documented the product thinking and a full architecture review in two PDFs"
    ],
    "stack": [
      "React 19",
      "Tailwind CSS",
      "shadcn/ui",
      "framer-motion",
      "Python",
      "FastAPI",
      "NumPy",
      "gemini-3.5-flash-lite",
      "gemini-3.5-flash",
      "gemini-embedding-001",
      "MongoDB Atlas",
      "Vercel",
      "Render",
      "GitHub",
      "Emergent E-1"
    ],
    "problem": "I audited the live AI Store on a large Indian marketplace on 9 August 2026, walking from the landing page through category browsing to a flagship phone listing. It was a single flow product audit, not interviews or surveys, so it shows what the page does and not how many shoppers struggle with it. I logged five frictions: jargon, contextual blindness, reactive only personalization, no confidence signal and category level grouping. The clearest evidence is on the phone listing, where every AI feature sits in one marketing paragraph, so a parent photographing kids indoors and a traveller who wants live translation read identical text. The comparison table below it is raw specs with no synthesis.",
    "insight": {
      "intro": "I ranked the five frictions by impact and effort. Jargon and grouping are ordinary UX fixes, and hand written copy per buyer type does not scale. The root cause is reactive only personalization, and fixing it reduces the other four, so it ranked first.",
      "calls": [
        "Free text instead of chips, because use cases vary too much for fixed categories. Trade-off: a vague sentence falls back to a general family cluster.",
        "A score per feature that is allowed to be low, because my first build showed one number on every card and a score that always reassures is worthless. Trade-off: some cards look negative, so purchase completion is a guardrail.",
        "The model never sees the reviews, so it cannot inflate a score. Trade-off: it only rewrites pre written templates, so cards cannot quote buyers."
      ]
    },
    "solution": [
      "The shopper types one sentence. Gemini 3.5 Flash Lite classifies it into one of eight use case clusters (temperature 0.2, JSON mode), and gemini-embedding-001 embeds it as a retrieval query. Retrieval then runs in two layers with NumPy cosine similarity in memory. Layer one grounds the wording: the product's five features are ranked against a 90 entry spec base, each entry holding a technical meaning and a pre written benefit template per cluster. Layer two grounds the number: for each feature, the 7 most similar of 307 authored seed reviews are kept if they share the shopper's cluster or score at least 0.60 similarity, and the score is the positive share, shown with its sample size.",
      "Gemini then rewrites the cluster's template for each feature (temperature 0.5, JSON mode) under rules to use only the supplied meaning and invent no specification or number. It never receives the reviews, and the server attaches the score afterwards. A 503 busy error retries three times with backoff, then falls back to gemini-3.5-flash. A 429 quota error returns a plain message, repeat queries hit an in memory cache, and embeddings are cached in the repo so a cold start makes no embedding calls. Language is the model's job. Ranking, evidence selection and arithmetic are code, so the one thing a shopper might act on, the number, never depends on the model."
    ],
    "metrics": "North star: the share of AI product page visits where the shopper uses WhyAI and decides without leaving to research elsewhere. Guardrail: purchase completion must not fall. Experiment: an A/B test against the standard page, with external research detour rate as the primary metric.",
    "limits": "The reviews behind the scores are authored seed data, so the percentages show how the system behaves, not how real buyers feel. The case study targets under 4 seconds, but one uncached call took about 23 seconds, and the free tier sleeps when idle. The redirect banner and the clarifying question are designed but not built. Next: build both, time 20 uncached queries, automate a groundedness check, test with real shoppers and replace the seed reviews.",
    "takeaways": [
      "The first build got the core idea wrong. One confidence number on every card taught me the scoring logic is the product.",
      "Trust breaks visually before it breaks logically. A Samsung phone showing an iOS screen undermined an otherwise correct page.",
      "Free tier limits are a product constraint. Retries, backoff and a fallback model turned errors into an honest message."
    ],
    "liveLabel": "View live project",
    "docsUrl": "https://drive.google.com/drive/folders/1TER623mjgYvhp28JRmQSKFJId5vCighJ?usp=drive_link",
    "docsLabel": "Read the documentation",
    "tag": "PROTOTYPE",
    "tile": {
      "title": "WhyAI: AI Feature Translator",
      "subtitle": "Explaining what an AI feature actually does, for the person actually buying it.",
      "problem": "Shoppers on an AI store see the same generic feature copy on every product page, so nobody can tell which features matter for their own use.",
      "judgmentCalls": "Free text instead of chips, and a confidence score per feature computed in code from review evidence, so the model cannot inflate it. The model never sees the reviews.",
      "outcome": "Live prototype on Vercel and Render with per feature confidence scores the model cannot influence.",
      "chips": [
        "Dual RAG",
        "Personalization",
        "E-Commerce"
      ]
    }
  },
  {
    "slug": "instarestocker",
    "name": "InstaRestocker",
    "role": "Product owner, vibe coded front end",
    "team": "Solo",
    "timeline": "Feb to Mar 2026",
    "outcome": "Deployed front end prototype of the cart restock flow; the 10 percent order value lift is a proposed target, not a result",
    "liveUrl": "https://swiggy-instamart-instarestocker.vercel.app/",
    "overview": "Quick commerce shoppers in my survey mostly place many small orders because they do not track what is running out at home, and every small order costs the platform money. InstaRestocker adds a cart section that shows which past purchases are likely to run out soon and lets the shopper add them in one tap, so several small orders become one larger one. The decision I like most is placement: the cart, where the shopper is already choosing what to buy, with the same list on the reorder page. This is an unofficial concept, and the prototype is front end only.",
    "myRole": [
      "Ran a survey of 40 shoppers plus interviews, then wrote the root cause and target segment",
      "Sized the profit gap with a unit economics model on stated assumptions",
      "Scored two solution ideas and chose InstaRestocker",
      "Designed the cart, pack size sheet, reorder and checkout screens, and wrote the restock rules and system design",
      "Directed the vibe coded front end in Emergent, fixed a dependency conflict with Claude's help and deployed it on Vercel"
    ],
    "stack": [
      "React",
      "React Router",
      "Context API",
      "Tailwind CSS",
      "shadcn/ui",
      "Mock data module",
      "Vercel",
      "GitHub",
      "Emergent",
      "Claude"
    ],
    "problem": "I built this from a survey of 40 participants aged 18 to 24 in a Tier 1 city, interviews and market sizing from industry reports. In the survey, 75 percent had an average order value under Rs 400, 13 percent were above Rs 800, 39 percent ordered five or fewer times a month and 18 percent ordered more than 15 times. My hypothesis was that people place several low value orders out of urgency because they do not manage their pantry, and the interviews supported it. A second pain point is price checking across apps. On assumed unit economics, a Rs 400 order brings about Rs 435 in revenue against about Rs 465 in cost, a loss near Rs 30 per order. Those inputs come from industry reports, not company data, and the sample is small and young, so the percentages are indicative.",
    "insight": {
      "intro": "The root cause is fragmented urgency orders from not tracking the pantry, with price doubt second. I segmented by order frequency and value and chose users who order more than five times a month with an average order value up to Rs 400, about half of users. I scored two ideas as impact times confidence minus effort: InstaRestocker 2.2 (9, 0.8, 5) and a price comparer -1.5 (5, 0.5, 4), using my own judgment for the inputs.",
      "calls": [
        "Restocking over price comparison, because the root cause is inventory. Trade-off: price doubt stays unsolved.",
        "Cart and reorder page placement, because the shopper is already deciding there. Trade-off: it only reaches people already in the app.",
        "Judge success by profit through order value, not order count. Trade-off: fewer orders could cut delivery partner earnings, which the deck flags for review."
      ]
    },
    "solution": [
      "The shopper adds items and opens the cart. A card asks \"Are you forgetting something? Stock up before you run out!\" and lists past purchases, each with when it was last bought, a colour toned status such as \"You ran out yesterday\", a discount badge and a price. A single pack adds with a quantity stepper, and items with several pack sizes open a bottom sheet with a running total. Scrolling expands the list to full screen, the same list appears on the reorder page, and the flow ends at checkout.",
      "The designed logic is a usage prediction model feeding a recommendation engine and a reminder scheduler. Perishables with a 1 to 10 day shelf life would surface 1 to 3 days before expected depletion, and non perishables would use a recorded lifespan and usage frequency. That is in the system design and is not built. What is built is a React app with React Router and Context cart state, with restock items, labels, status text and pack options as authored mock data. So the prototype tests placement, wording and cart behaviour, not prediction accuracy. When prediction is built, the model would only propose items and the shopper decides, so a wrong prediction costs one ignored card."
    ],
    "metrics": "All metrics are proposed. North star: the percentage increase in profitability driven by average order value, with a 10 percent target over three months that assumes half the target segment consolidates and moves 40 percent of its orders. Adoption: the share of users who add one restock item. Guardrail: total order value must not fall when order count falls. Experiment: an A/B test of the cart section against no section in the target segment, with average order value as the primary metric.",
    "limits": "There is no prediction: every restock item, date and status is authored mock data. The profit figures use assumed unit economics, and the survey covers 40 people aged 18 to 24. The deck's own risks apply: purchases made on other apps will skew predictions, and users may only reorder the same things. Next: replace the mock with a simple depletion estimate from past purchase intervals, test the cart placement with real shoppers and run the A/B test.",
    "takeaways": [
      "Pick the problem by its root cause. Frequent small orders were an inventory problem, so the price comparer scored negative on my own scale.",
      "A mock can still test the right thing. With no model, this prototype tests whether a cart nudge is clear, which comes before prediction accuracy.",
      "Every gain has a second order cost. Fewer, larger orders could lower delivery partner earnings, so the plan includes a compensation review."
    ],
    "liveLabel": "View live project",
    "docsUrl": "https://drive.google.com/file/d/1bplaoympxjUk4gMv8wWMtWkRI5pM_-Zs/view?usp=drive_link",
    "docsLabel": "Read the documentation",
    "tag": "CASE STUDY",
    "tile": {
      "problem": "Quick commerce shoppers place many small orders because they do not track what is running out at home, and every small order costs the platform money.",
      "judgmentCalls": "Chose restocking over a price comparer (2.2 against -1.5 on impact times confidence minus effort) and placed the nudge in the cart, where the shopper is already deciding.",
      "outcome": "Deployed front end prototype of the cart restock flow; the 10 percent order value lift is a proposed target, not a result."
    }
  },
  {
    "slug": "alfred",
    "name": "ALFRED",
    "role": "Product owner, AI-assisted build",
    "team": "Solo",
    "timeline": "Apr to Jun 2026",
    "outcome": "Live prototype where the model writes destinations, itineraries and hotels as JSON and booking steps are scripted",
    "liveUrl": "",
    "overview": "Planning a trip means hopping between inspiration sites, itinerary blogs and booking pages, and nothing connects them. ALFRED suggests destinations from a mood, builds a day by day itinerary and suggests hotels within a budget, then walks the traveller through a scripted booking confirmation. The design call I like most is the split: the model writes only the open ended pieces, as strict JSON that fills the wireframe's cards, while dates, budget, traveller details and confirmation are scripted. It began as a wireframe deck and became a live prototype.",
    "myRole": [
      "Wrote the problem statement, persona, jobs to be done map, user flow and wireframes, named the product and defined metrics and risks before any build",
      "Directed the first build in Emergent, then replaced Emergent's proprietary AI package with direct Gemini API calls, using fix scripts written with Claude",
      "Debugged why the frontend never reached the backend (a missing backend URL setting) and why Gemini calls failed or returned unreadable JSON, then added retries and JSON mode",
      "Connected hotel suggestions to the AI and tested the full flow end to end",
      "Deployed on Render and Vercel and documented the product thinking in the wireframe deck"
    ],
    "stack": [
      "React",
      "CRACO",
      "Tailwind CSS",
      "Python",
      "FastAPI",
      "Motor",
      "gemini-3.5-flash-lite",
      "google-genai SDK",
      "Render",
      "Vercel",
      "GitHub",
      "Emergent",
      "Claude"
    ],
    "problem": "I started with a one slide map of the travel industry (online agencies, metasearch, hotel chains, airlines, tour operators) and the roles AI plays in it, then built a persona and a jobs to be done map around her: a 26 year old yoga instructor who travels solo or in a small group, finds ideas on Instagram and Trip Advisor, and wants authentic local experiences. The method was persona and JTBD analysis, not interviews or surveys, so each pain point is an assumption to test. Her pain points: crowded tourist spots, itineraries that are out of date or confusing, and booking flights, hotels and cabs across different sites. Her jobs: find inspiration for a trip with friends, get a realistic itinerary for her plan and budget, and book faster with only essential details.",
    "insight": {
      "intro": "The root cause is that planning is split across many tools, so the traveller does the stitching. I used no scoring framework. I ordered the work along her journey, inspiration first, then itinerary, then booking, and built the first two as the AI parts.",
      "calls": [
        "One conversation instead of separate screens, because her pain was hopping between sites. Trade-off: the chat covers several intents, so the prototype guides it with quick actions.",
        "Structured JSON cards instead of free prose, because the wireframe uses cards and fixed itinerary slots. Trade-off: every itinerary has the same six stops a day.",
        "AI only for destinations, itineraries and hotels, with booking steps scripted. Trade-off: nothing is really booked and prices are demo values."
      ]
    },
    "solution": [
      "The traveller picks a mood or quick action in the React chat, and the frontend calls one endpoint, POST /api/alfred/chat, with a mode: chat, itinerary or hotels, each with its own prompt. Chat returns a short reply and two to three places, each with a description under 20 words, a category tag (Adventure, Culture or Relaxation) and a demo flight price and duration. Itinerary takes a day count, validated to 1 to 10 by Pydantic, and returns six ordered slots a day: Breakfast, Place 1, Lunch, Place 2, Place 3, Dinner. Hotels returns a premium pick and a value pick, with a rating between 7.5 and 9.5 and a budget cap passed in the prompt.",
      "The model is gemini-3.5-flash-lite in JSON response mode with default sampling. The schema lives in the prompt, and a tolerant parser strips code fences before reading the JSON. A failed call or bad parse retries three times, two seconds apart, then returns a 502 and the frontend falls back to static lists. There is no retrieval and no memory between calls. The wireframe assumed OpenAI, and I built on Gemini. The wireframe's cards became the schema, and code owns the flow, the day limit and every booking step, so the model never confirms anything."
    ],
    "metrics": "The prototype has no analytics, so every metric is a proposal. North star: the share of bookings made through ALFRED. Inputs: itineraries created and itinerary to booking conversion. Guardrail: booking conversion must not fall. Experiment: an A/B test with and without the ALFRED entry point, with itinerary to booking conversion as the primary metric.",
    "limits": "Flight prices and hotel rates are model generated demo values, and nothing is grounded in real inventory. The hotel budget cap is requested in the prompt but not checked by the backend, and booking steps are scripted. Next, in order: ground prices and hotels in a real data source, validate model output beyond JSON parsing, add retrieval over destination data and time response latency.",
    "takeaways": [
      "A wireframe is an output contract. The cards and fixed itinerary slots in my design became the JSON schema the model must fill.",
      "Fallbacks can hide failures. The frontend kept showing hardcoded destinations while it never reached the backend, so I only called it working once varied AI output appeared.",
      "Check what a vibe coded app depends on. Emergent's proprietary AI package only ran inside Emergent, and replacing it with direct Gemini calls made the app portable."
    ],
    "liveLabel": "View live project",
    "docsUrl": "https://drive.google.com/file/d/1To0bghYNVkLqLtt9OsiYvp9sghmSZJ4O/view?usp=drive_link",
    "docsLabel": "Read the documentation",
    "tag": "PROTOTYPE",
    "tile": {
      "problem": "Planning a trip means hopping between inspiration sites, itinerary blogs and booking pages, and nothing connects them.",
      "judgmentCalls": "One conversation instead of separate screens, structured JSON cards so the wireframe became the model output schema, and AI only for destinations, itineraries and hotels with booking steps scripted.",
      "outcome": "Prototype where the model writes destinations, itineraries and hotels as JSON and booking steps are scripted."
    }
  },
  {
    "slug": "windows11",
    "name": "Windows 11 File Explorer Redesign",
    "role": "Product analyst and designer",
    "team": "Solo",
    "timeline": "Sep 2026",
    "outcome": "A teardown, a prioritised recommendation and a five screen Figma prototype",
    "liveUrl": "https://www.figma.com/proto/q103zWJqbrL8lf6Yjiiupr/Untitled?node-id=209-3236&p=f&scaling=contain&content-scaling=fixed&starting-point-node-id=209%3A3236",
    "overview": "Windows 11 now holds about 72.6% of the Windows base, but much of that growth came from the Windows 10 end of support deadline, not from preference. I tore down the product, found File Explorer search and the right-click menu to be the most visible friction, and redesigned both along with the Properties panel. The decision I care about most is choosing a problem Microsoft's own 2026 roadmap already points at, which suggests the pain is real and keeps the fix inside the existing interface. This is an unofficial concept.",
    "myRole": [
      "Researched segments, positioning and competitors (macOS, ChromeOS Flex, Linux) and read adoption data to separate forced migration from real preference",
      "Ran a SWOT and rated four recommendation areas on impact and feasibility, then chose File Explorer",
      "Built two personas from forum and Feedback Hub evidence and traced each to one of four design goals",
      "Designed the information architecture, wireframes, high fidelity screens and the Figma prototype across three logged revisions",
      "Sized the opportunity with tiered guesstimates and wrote a four week plan with risks and mitigations"
    ],
    "stack": [
      "Figma",
      "Windows Fluent",
      "Segoe UI Variable",
      "Fluent System Icons",
      "StatCounter",
      "Feedback Hub",
      "SWOT",
      "Impact vs feasibility matrix",
      "Tiered market sizing"
    ],
    "problem": "The research was secondary: Microsoft Community forums, Feedback Hub and tech coverage, cross-checked against Microsoft's 2026 roadmap, with no interviews of my own. Windows 11 rose from 62.41% to 72.57% of the Windows base in one month (StatCounter, January to February 2026), right as Windows 10 support ended, so the jump says little about preference. The pain points were a slow and cluttered Windows Search, a crowded right-click menu whose New submenu reportedly holds around eight options many users never use, a Start menu Recommended section that reads like promotion, and basic settings split across Settings and Control Panel. The real pressure is at the edge, where frustrated holdouts try ChromeOS Flex or Linux.",
    "insight": {
      "intro": "File Explorer friction is both the biggest usability pain and the clearest retention opportunity. I rated four recommendation areas (product, marketing, support, pricing) on impact and feasibility. Redesigning Explorer search and right-click scored high on both, and closing the Feedback Hub loop scored high impact but medium feasibility.",
      "calls": [
        "File Explorer over the Feedback Hub, because it is mostly interface work, not a rebuild. Trade-off: the trust gap around feedback stays open.",
        "Six right-click actions with the rest under Show more, after an eight action first version still felt crowded. Trade-off: rarer actions take one extra click.",
        "Properties opens on General and Details, with Security and Previous Versions moved deeper, because my first layout opened on Security, which most users did not need first. Trade-off: admins take an extra step."
      ]
    },
    "solution": [
      "The flow is Search, Results, Right-click, Properties. When the search bar is selected, three filter chips (Type, Date, Location) fade and slide in over 150 ms inline with the bar, and results show the active scope at the top so the user always knows what is being searched. Right-click shows six Tier 1 actions in familiar positions, with Tier 2 under Show more. Properties slides in from the right in a dark theme that follows the system theme.",
      "Type is Segoe UI Variable at 14px for body and 12px semibold for labels, icons are Fluent System Icons at 20px, and tap targets stay at least 40 by 40px while keeping navigation keyboard first. I held scope to five screens and logged extra ideas for a later phase."
    ],
    "metrics": "Sizing is a tiered estimate from about 1,000M Windows 11 users: roughly 351M search File Explorer weekly, and about 168M do it three or more times a week and feel the friction. Adoption is a derived estimate of about 84% by 12 months, blending consumer and enterprise rollout speeds. Proposed success metrics: time to find and open a file as the north star, plus the share of searches using a filter chip and the share of right-click actions taken from the Tier 1 list. Explorer crash rate and search latency are guardrails, and I would test with Windows Insider users first.",
    "limits": "The research is secondary and the prototype has not been usability tested with real users. It is a Figma flow with no working search behind it, and the sizing inputs are my own assumptions. Microsoft may ship parts of this itself. Next: test with users matching both personas, then an Insider ring experiment, then take on the Start menu and the Settings versus Control Panel split, which I found but kept out of scope.",
    "takeaways": [
      "Pick a problem the company already half agrees with. Finding the fix on Microsoft's roadmap lowered the risk, and mine goes a step further.",
      "Iterate on the screen, not the spec. Chips moved inline, eight actions became six, and Properties stopped opening on Security.",
      "Adoption data can mislead. A 10 point jump in one month was a deadline, so I treated it as a retention test still to come."
    ],
    "liveLabel": "View Figma prototype",
    "docsUrl": "https://docs.google.com/presentation/d/1Jcf17nVGT8xQOXeAy-BRHhSKKfTEnBoi/edit?usp=drive_link",
    "docsLabel": "View the teardown deck",
    "tag": "TEARDOWN",
    "tile": {
      "image": "windows_11_teardown_.png",
      "title": "Windows 11 File Explorer Redesign",
      "subtitle": "A teardown of Windows 11 and a Figma redesign of search, right-click and Properties.",
      "problem": "Windows 11 reached about 72.6% of the Windows base largely because Windows 10 support ended, not by preference, and File Explorer search and the right-click menu are the most visible friction.",
      "judgmentCalls": "Chose File Explorer over closing the Feedback Hub loop because it is interface work, not a rebuild. Cut right-click to six actions and moved Security out of the first Properties view.",
      "outcome": "A teardown, a prioritised recommendation and a five screen Figma prototype.",
      "chips": [
        "Product Teardown",
        "UX Redesign",
        "Figma"
      ]
    }
  }
];
