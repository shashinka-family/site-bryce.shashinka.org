# bryce.shashinka.org — Portfolio Redesign Spec

*2026-03-12 — Migrating from Base44 + existing static site to a self-hosted Cloudflare Pages portfolio.*

---

## Overview

Personal portfolio site for Bryce P. Shashinka, targeting day-job roles in engineering, configuration management, project management, and technical leadership. The design takes the visual language from the Base44 version (dark gradients, framer-motion animations, modern card layouts) and combines it with real career content. The site is fully static — no backend, no API calls, no contact form.

## Goals

- Present a professional portfolio optimized for hiring managers in engineering/CM/PM roles
- Showcase 15+ year career arc from aerospace CM through semiconductor manufacturing to founding an MSP
- Demonstrate technical range through curated project descriptions (no repo links — all private)
- Keep contact surface minimal: LinkedIn and GitHub only, no email or phone publicly listed

## Stack

- **Framework:** Vite + React
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"` + `@source "./"`)
- **Animation:** framer-motion (scroll-triggered animations, hero entrance)
- **Icons:** lucide-react
- **Deployment:** Cloudflare Pages via GitHub Actions (same pattern as site-bps.enterprises and site-shashinka.org)
- **Repo:** `shashinka-family/site-bryce.shashinka.org` (private)
- **CF Account:** BPS Personal (`0f458e208989b5fb2fd5e514346d026b`)
- **Domain:** bryce.shashinka.org (subdomain of shashinka.org, already on Cloudflare)

## Sections

### 1. Navigation

Fixed top nav, transparent over hero, transitions to `white/80 backdrop-blur` once scrolled past the hero. Stays white/blur for all subsequent sections (including dark-background sections like Projects and Footer) — the nav does not toggle back to transparent. Smooth-scroll anchor links.

**Links:** About, Experience, Skills, Projects, Contact

**Mobile:** Hamburger menu → full-screen overlay with centered links, dark background (`slate-900/95`).

### 2. Hero

Dark slate gradient (`from-slate-900 via-slate-800 to-slate-900`) with ambient blur orbs (blue and slate tones). No avatar photo.

**Content:**
- Tagline (small, uppercase, blue-400, tracked): `ENGINEERING LEADER — CONFIGURATION MANAGEMENT, INFRASTRUCTURE, & SYSTEMS`
- Name (5xl–8xl, font-light, white): `Bryce P. Shashinka`
- Subtitle (xl–2xl, slate-400): "Building infrastructure, automating systems, and leading technical projects — currently founding an MSP while looking for the right engineering team to join."
- Social links: GitHub (`github.com/shasb`) + LinkedIn (`linkedin.com/in/shashinka`) as circular icon buttons
- Scroll indicator: "Explore" + bouncing arrow — clicking smooth-scrolls to the About section

**Animation:** Staggered fade-in/slide-up via framer-motion.

### 3. About

Light background (`slate-50`). Two-column on desktop, stacked on mobile.

**Left column — prose:**
- Section label: `ABOUT ME` (blue-700, uppercase, tracked)
- Heading: "Crafting systems that work" (4xl–5xl, font-light)
- 2-3 paragraphs covering:
  - 15+ year career arc: started in aerospace engineering (Pratt & Whitney supply chain), moved into configuration management and master data at ASML in semiconductor manufacturing, now founding a managed service provider
  - Degrees woven in naturally: AS in Computer Engineering, BS in Business Management, Six Sigma Green Belt — showing both the technical and management foundations
  - Builder emphasis: builds production systems, not prototypes. Infrastructure that runs, automation that scales.
- Location line: Connecticut (with MapPin icon)

**Right column — stats grid (2x2):**

| Label | Value |
|-------|-------|
| Experience | 15+ Years |
| Focus | CM & Infrastructure |
| Education | BS Business Management |
| Certification | Six Sigma Green Belt |

Cards with border, hover effect (border turns blue), matching the BPS Enterprises about section style.

### 4. Experience

Light background (`slate-50`). Timeline layout with vertical line, dot markers, alternating left/right on desktop.

**Section header:**
- Label: `CAREER JOURNEY` (blue-700, uppercase, tracked)
- Heading: "Work Experience" (4xl–5xl)

**Entries (reverse chronological):**

1. **Founder & Principal Engineer** — BPS Enterprises LLC / 1507 Systems — 2024–Present, Connecticut
   - Most detailed entry: 2-3 sentences on what 1507 Systems does (MSP delivering infrastructure design, network administration, cloud architecture, and security for SMBs). Hands-on across the full stack — from Cloudflare edge deployment to on-premise networking and automation.
   - Link to 1507.systems

2. **Change Management Specialist** — ASML — 2021–2026, Wilton, CT
   - Configuration Management and Master Data Management for semiconductor manufacturing. Engineering Change screening, SAP BoM and material master data management, cross-sectoral CCB collaboration with Development Engineering.

3. **Quality Assurance & IT Specialist** — EDCO Engineering — 2019–2021, Newington, CT
   - Document quality control and process improvement. Project manager and technical specialist for NIST SP 800-171 and CMMC Level 3 compliance. ERP master data and IT infrastructure.

4. **Configuration Analyst II** — Belcan Engineering Group — 2015–2019, Windsor, CT
   - Engineering change management and design package review for the PW1100G-JM development program (Pratt & Whitney). Project management for $5M+ SOWs. Team lead with training and evaluation responsibilities.

5. **Senior Engineer** — QuEST Global Services — 2011–2015, East Hartford, CT
   - Pratt & Whitney Engineering: BoM management for NGPF development engines, Teamcenter/Unigraphics NX, $2M+ SOW project management. Backup Team Lead for a team of 10.

**Animation:** Each entry slides in from alternating sides on scroll.

### 5. Skills

White background. Tag clouds grouped in cards with category badges.

**Section header:**
- Label: `EXPERTISE` (blue-700, uppercase, tracked)
- Heading: "Skills & Technologies" (4xl–5xl)

**Categories:**

- **Configuration Management** — SAP, Teamcenter, Unigraphics NX, Bill of Material Management, Engineering Change Management, CM2, MyChange, Document Control
- **Infrastructure & Cloud** — Cloudflare (Workers, Pages, D1, KV, R2), Linux, Networking, DNS, VoIP/SIP, Zigbee, Z-Wave, Docker
- **Development** — JavaScript/TypeScript, React, Node.js, Python, Hono, Vite, Git, CI/CD
- **Compliance & Quality** — NIST SP 800-171, CMMC, Six Sigma, ISO, QMS, ERP Systems
- **Leadership** — Project Management ($5M+ SOWs), Team Leadership (15+ reports), Vendor/Supplier Relations, Cross-functional Collaboration

Each category is a card with a gradient badge label and tags as pills inside. Cards have hover shadow effect. Grid layout: 2-3 columns on desktop, 1 on mobile.

**No proficiency bars or percentages.** Tags only.

### 6. Projects

Dark background (`slate-800`). Cards with tech tags, no external links.

**Section header:**
- Label: `PORTFOLIO` (blue-300, uppercase, tracked)
- Heading: "Featured Projects" (4xl–5xl, white)

**Cards:**

1. **SNaI** — "SIEM and log aggregation platform processing 1,000+ events per second with semantic search via vector embeddings"
   - Tags: Cloudflare Workers, D1, Vectorize, Hono, React

2. **VoIP Phone System** — "Multi-line business phone system with automated IVR, call routing, voicemail, and fax gateway"
   - Tags: Asterisk, SIP, VoIP.ms, Cloudflare Workers

3. **Infrastructure Automation** — "Comprehensive automation platform integrating 50+ devices across Zigbee, Z-Wave, and HomeKit with centralized control"
   - Tags: Home Assistant, Hubitat, Node.js, MQTT

4. **Memory Sync** — "Cross-platform knowledge persistence system syncing context between AI agents via REST API and MCP server"
   - Tags: Cloudflare Workers, D1, KV, MCP

5. **1507.systems & Portfolio Sites** — "Suite of static marketing sites migrated from third-party hosting to self-managed Cloudflare Pages with CI/CD auto-deploy"
   - Tags: React, Vite, Tailwind, GitHub Actions, Cloudflare Pages

Cards have dark background (`slate-700/60`), border, hover border transition. No image area — just title, description, and tech tags. No "Live Demo" or "Code" buttons. Grid: 2 columns on desktop, 1 on mobile.

### 7. Contact

Light background (`slate-50`).

**Section header:**
- Label: `GET IN TOUCH` (blue-700, uppercase, tracked)
- Heading: "Let's connect" (4xl–5xl)
- Subtext: "Interested in discussing opportunities, technical projects, or collaboration — reach out through LinkedIn or GitHub."

**Two styled cards** (side by side on desktop):
- **LinkedIn** — icon + "LinkedIn" + "linkedin.com/in/shashinka" — links to profile
- **GitHub** — icon + "GitHub" + "github.com/shasb" — links to profile

No contact form. No email. No phone.

### 8. Footer

Dark background (`slate-900`), border-t.

- Left: "© 2026 Bryce P. Shashinka. All rights reserved."
- Right: `π` character in `slate-700` (barely distinguishable from background), links to `https://github.com/shasb`. Easter egg — nod to 1995's *The Net*.

## Content Tone

Follow Bryce's writing style guide:
- Active voice, confident, no hedging
- Technical precision where appropriate
- Practical and builder-oriented — "ships production systems, not prototypes"
- No fluff, no generic AI resume language
- Keep descriptions grounded in what was actually done

## What's Not Included

- No avatar/headshot
- No contact form
- No email or phone number
- No resume download
- No proficiency bars or percentage claims
- No Cablevision entry (different industry)
- No school names in the main content (degrees mentioned naturally in About prose; institutions in resume-reference.md only)
- No links to project repos (all private)

## Deployment

Same pattern as site-bps.enterprises and site-shashinka.org:
1. GitHub repo: `shashinka-family/site-bryce.shashinka.org`
2. CF Pages project: `site-bryce-shashinka-org`
3. GitHub Actions workflow for auto-deploy on push to main
4. Custom domain: `bryce.shashinka.org` (CNAME update from current target)
5. GitHub secrets: `CLOUDFLARE_API_TOKEN` (keychain "Claude Code - CF Pages Token"), `CLOUDFLARE_ACCOUNT_ID` (`0f458e208989b5fb2fd5e514346d026b`)

## Meta & SEO

- **Title:** `Bryce P. Shashinka — Engineering Leader`
- **Meta description:** "Portfolio of Bryce P. Shashinka — 15+ years in configuration management, infrastructure, and technical leadership across aerospace and semiconductor manufacturing."
- **OG tags:** `og:title`, `og:description`, `og:type` (website), `og:url` (https://bryce.shashinka.org)
- **No OG image** (no headshot or brand graphic to use)
- **Favicon:** `BPS.svg` — stylized BPS monogram (provided in project root), referenced as `<link rel="icon" type="image/svg+xml" href="/BPS.svg">`
- **Viewport/charset:** Standard responsive meta tags

## Notes

- ASML dates (2021–2026) are correct — employment ended in 2026.
- "15+ Years" in the stats grid refers to total career length (from 2011), not CM-specific tenure.

## Reference Files

- `resume-reference.md` — Full resume content in markdown (not published, for content reference only)
- Writing style guide in memory: `bryce-writing-style-guide.md`
