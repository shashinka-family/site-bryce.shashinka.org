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
- Content sourced from `resume-reference.md` and brainstorming session
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
