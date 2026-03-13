# site-bryce.shashinka.org - Claude Development Guide

## Production Change Workflow

This project is live in production. All changes must go through CI-validated PRs.

### Process
1. Create feature branch: `git checkout -b feature/description`
2. Make changes, commit with conventional commits
3. Push branch: `git push -u origin feature/description`
4. Open PR to main: `gh pr create`
5. Wait for CI checks to pass (lint, test, build)
6. Preview via CF Pages branch deploy
7. Merge PR (squash merge preferred)
8. Main auto-deploys to production via CI

### Rules
- Never push directly to main
- All changes go through PRs
- CI must pass before merging
