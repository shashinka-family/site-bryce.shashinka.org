<!-- summary: Personal portfolio site for Bryce covering engineering leadership, CM, infrastructure, and systems experience. -->
# PROJECT_LOG — bryce.shashinka.org

## Overview

Personal portfolio site for Bryce P. Shashinka, targeting day-job roles in engineering, CM, project management, and technical leadership. Migrated design language from Base44 version, combined with real career content.

## Stack

- Vite 7 + React 19 + Tailwind CSS v4 + framer-motion + lucide-react
- Deployed to Cloudflare Pages via GitHub Actions
- Repo: `shashinka-family/site-bryce.shashinka.org` (public)
- CF Pages project: `site-bryce-shashinka-org`
- Domain: `bryce.shashinka.org`

## 2026-09-10 — Hero and profile copy refinement

- Replaced the repetitive career-summary hero with a concise infrastructure/automation lead-in and one mode-dependent current-status clause.
- Steady-state mode names the current defense engineering work and 1507 Systems; job-search mode restores the “right engineering team” wording.
- Refined job-search mode to make Bryce's continuing work through 1507 Systems explicit while he looks for the right engineering team.
- Presented the founder experience solely as 1507 Systems in Longmont and removed the BPS legal entity name from public profile copy and metadata.
- Worked the current nLIGHT role into About while retaining ASML in the historical career path and timeline.
- Added `SPEC.md` during the documentation audit so the build-time mode and public-content contract are explicit.

### Audit summary

- Functionality: ESLint clean; 18 tests passing; default and job-search builds successful; both metadata modes resolve without placeholders.
- Cleanup: no TODO/FIXME/debug-code findings in production JavaScript; working diff passes whitespace validation.
- Security: no critical, high, or moderate dependency vulnerabilities and no hardcoded-secret findings. One accepted low-severity esbuild advisory affects only the Windows development server, not the production bundle or this macOS build environment.
- Known dependency warning: Node reports the existing dependency-level `module.register()` deprecation during tests/builds.

## 2026-09-09 — Current role and build-time job-search mode

- Added the 2026–Present Sr. Engineering Documents Manager role at nLIGHT DEFENSE Systems and updated public location/current-employer metadata.
- Centralized steady-state and job-search copy behind `VITE_JOB_SEARCH_MODE`; it defaults off and has no visitor-facing control.
- Kept the resume timeline shared across modes while switching hero, CTA, and OpenGraph/Twitter copy together.
- Replaced the signature favicon with a blue/slate BPS monogram and added automated coverage for both modes.
- Cleared 9 existing development-tool advisories through non-breaking lockfile updates. One low-severity esbuild advisory remains: it affects the Windows development server, not the production bundle or this macOS build environment. Node also emits a dependency-level `module.register()` deprecation warning.


## 2026-04-17 — SEO: Schema.org Person + full meta stack

### Why
Stale LinkedIn vanity URL (`/in/bryceshashinka`) still indexed in Google for the name query "Bryce Shashinka" despite being retired years ago. Out-ranking beats whack-a-mole: boost bryce.shashinka.org's authority for the name so the site becomes the canonical SERP result.

### What changed
- Added Schema.org `Person` JSON-LD with canonical `@id`, `sameAs` (LinkedIn `/in/shashinka`, GitHub `/bryce-shashinka`), `worksFor` (BPS Enterprises + 1507 Systems), `alumniOf` (WGU), `hasCredential` (CM2, Six Sigma, BS), `knowsAbout`, and CT address.
- Added canonical URL, keywords, robots directive, author meta tags.
- Added Twitter card + expanded Open Graph (og:type=profile, first_name/last_name).
- Expanded `<title>` and description to surface "Bryce Shashinka" + credentials in the rendered snippet.

### Follow-up
- Mirror pattern on 1507.systems and bps.enterprises with `Organization` schema where `founder` points back to `https://bryce.shashinka.org/#person` — creates bidirectional entity graph for Knowledge Graph consolidation.
- After deploy: submit `bryce.shashinka.org` to Google Search Console + Refresh request for stale LinkedIn URL.

## 2026-03-23 — CI pipeline updated

### What changed
- Updated `.github/workflows/ci.yml`: pinned Node version to 20 (was 22).
- Added `audit` job: `npm audit --audit-level=high` — runs in parallel with lint/test.
- `build` job now gates on `[lint, test, audit]`.
- Branch protection attempted via `gh api` (expected failure on private free-tier repos).

## Build History

### 2026-03-12 — Initial build

- Scaffolded Vite + React + Tailwind v4 project
- Created GitHub repo under `shashinka-family` org (public — org Actions restrictions require it)
- Set up CF Pages auto-deploy via GitHub Actions (`npx wrangler` with env vars)
- Built all 8 sections: Navigation, Hero, About, Experience, Skills, Projects, Contact, Footer
- Content sourced from the resume source document (kept outside this repository) and a brainstorming session
- DNS CNAME pointed `bryce.shashinka.org` → `site-bryce-shashinka-org.pages.dev`

### Post-launch fixes (2026-03-12)

- Fixed SNaI description: changed from "SIEM" to RAG-powered technical knowledgebase
- Darkened pi easter egg symbol (slate-800/60 on slate-900 background)
- Removed "Bryce" logo from nav, right-aligned links
- Swapped social link order: LinkedIn before GitHub in hero
- Updated experience count to 20 years (from 2006 IT support founding)
- Corrected P&W focus: "engineering change management and BoM releases" not "supply chains"

## Architecture Decisions

- **No backend**: All content hardcoded in `src/data/` JS files — no API, no database
- **No contact form**: LinkedIn and GitHub only (privacy)
- **No proficiency bars**: Skill tags only — percentages were arbitrary
- **No Cablevision entry**: Different industry than target roles
- **No school names**: Degrees mentioned naturally in About prose
- **BPS.svg favicon**: Stylized monogram provided as SVG
- **Deploy via env vars**: `cloudflare/wrangler-action` failed auth on this org; using `npx wrangler` with `CLOUDFLARE_API_TOKEN` env var instead

## Full Audit Complete — 2026-03-12

### Summary
All functionality verified. Security scan clean. Code cleanup complete.
Project declared production-ready.

### What Was Audited
- Vite 7 + React 19 + Tailwind v4 static site
- 8 components, 3 data files, GitHub Actions deploy workflow
- Build verification, browser smoke test (all sections rendered)
- Dependency audit (npm audit, npm outdated)
- Secrets scan, input validation review, access control review

### Issues Found and Resolved
- Meta description in `index.html` still referenced "15+ years" — updated to "20 years"
- README.md was missing — created with stack, dev commands, and deployment info

### Outstanding Known Issues (Accepted Risk)
- None

### Final State
- Build: passes (339 KB JS, 30 KB CSS gzipped)
- Security vulnerabilities: 0
- Dead code: none found
- Documentation: complete and accurate (README, PROJECT_LOG, spec, plan)

## Current State

- Live at https://bryce.shashinka.org
- Auto-deploys on push to main
- All sections functional and visually verified
- Production-ready (v1.0-audit-clean)

## 2026-03-17/19: Profile & Content Updates

- Added CM2 (IpX) certification to profile
- Restructured project cards with AI infrastructure and developer tooling groups
- Fixed Hellga's Kitchen description (preserved goods, not restaurant)
