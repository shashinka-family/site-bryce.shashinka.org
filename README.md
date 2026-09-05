# bryce.shashinka.org

Personal portfolio site for Bryce P. Shashinka — engineering leadership, configuration management, infrastructure, and systems.

## Stack

- Vite 7 + React 19 + Tailwind CSS v4
- framer-motion (scroll-triggered animations)
- lucide-react (icons)
- Cloudflare Pages (deployment)

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview production build
```

## Deployment

Auto-deploys to Cloudflare Pages on push to `main` via GitHub Actions.

- **CF Pages project:** `site-bryce-shashinka-org`
- **Domain:** [bryce.shashinka.org](https://bryce.shashinka.org)
- **Secrets required:** `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` (set in GitHub repo settings). Values are held outside this repository.

## Project Docs

- `PROJECT_LOG.md` — build history and decisions

The design spec, the deploy runbook and the resume source were removed from this
repository: they carried account identifiers and personal history that a public
repo should not publish. They live outside it now.
