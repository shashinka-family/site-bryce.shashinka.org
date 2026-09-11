# bryce.shashinka.org Specification

## Purpose

Personal portfolio and resume site for Bryce P. Shashinka, presenting current engineering leadership, configuration-management, infrastructure, and systems experience.

## Architecture

- React 19 single-page application built by Vite 7 and styled with Tailwind CSS.
- Static content lives in `src/data`; mode-dependent profile copy lives in `src/config/profile-content.js`.
- `VITE_JOB_SEARCH_MODE=true` enables job-search presentation copy. Any other value selects steady-state copy.
- The same build-time mode controls rendered hero/contact copy and OpenGraph/Twitter metadata.
- The production build is deployed to Cloudflare Pages; the contact endpoint is supplied by the sibling `functions` directory.

## Content Contract

- Employment history is identical in both modes.
- Steady-state mode describes current defense-engineering document-control work.
- Job-search mode states that Bryce is looking for the right engineering team.
- Public profile branding uses 1507 Systems; it does not expose the BPS legal entity name.
- Current location is Longmont, Colorado.

## Verification

Run `npm run lint`, `npm test`, and `npm run build`. Also run `VITE_JOB_SEARCH_MODE=true npm run build` to verify the alternate metadata and rendered-copy build.
