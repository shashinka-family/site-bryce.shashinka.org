# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static portfolio site for Bryce P. Shashinka at bryce.shashinka.org, migrating design language from Base44 and combining with real career content.

**Architecture:** Single-page React app with 8 section components. All content is hardcoded (no API, no backend). Scroll-triggered animations via framer-motion. Responsive layout with mobile hamburger nav.

**Tech Stack:** Vite 7, React 19, Tailwind CSS v4 (via @tailwindcss/vite plugin), framer-motion, lucide-react. Deployed to Cloudflare Pages via GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-03-12-portfolio-redesign.md`

---

## File Structure

```
site-bryce.shashinka.org/
├── index.html                          # Entry point with meta/OG tags, favicon
├── BPS.svg                             # Favicon (already in project root)
├── package.json                        # Dependencies
├── vite.config.js                      # Vite + React + Tailwind plugins
├── .github/workflows/deploy.yml        # CF Pages auto-deploy
├── docs/                               # Spec + plan (already exists)
├── resume-reference.md                 # Content reference (already exists)
├── src/
│   ├── main.jsx                        # React root mount
│   ├── index.css                       # Tailwind v4 import + @source
│   ├── App.jsx                         # Renders Home page
│   ├── data/
│   │   ├── experience.js               # Work history array
│   │   ├── skills.js                   # Skill categories + tags
│   │   └── projects.js                 # Featured project cards
│   └── components/
│       ├── Navigation.jsx              # Fixed nav, scroll-aware, mobile menu
│       ├── HeroSection.jsx             # Dark gradient hero with blur orbs
│       ├── AboutSection.jsx            # Two-column about with stats grid
│       ├── ExperienceSection.jsx       # Timeline layout
│       ├── SkillsSection.jsx           # Tag cloud cards by category
│       ├── ProjectsSection.jsx         # Dark cards with tech tags
│       ├── ContactSection.jsx          # LinkedIn + GitHub cards
│       └── Footer.jsx                  # Copyright + pi easter egg
```

---

## Chunk 1: Project Scaffolding and Infrastructure

### Task 1: Initialize Vite project and install dependencies

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`
- Create: `src/index.css`
- Create: `src/App.jsx`

- [ ] **Step 1: Initialize npm project and install dependencies**

```bash
cd "/Users/pickleresistor/Library/Mobile Documents/com~apple~CloudDocs/Developer/Websites/site-bryce.shashinka.org"
npm init -y
npm install react@^19.2.0 react-dom@^19.2.0 framer-motion@^12.35.2 lucide-react@^0.577.0
npm install -D vite@^7.3.1 @vitejs/plugin-react@^5.1.1 @tailwindcss/vite@^4.2.1 tailwindcss@^4.2.1
```

- [ ] **Step 2: Create vite.config.js**

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

- [ ] **Step 3: Create index.html with meta tags, OG tags, and favicon**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Portfolio of Bryce P. Shashinka -- 15+ years in configuration management, infrastructure, and technical leadership across aerospace and semiconductor manufacturing." />
    <meta property="og:title" content="Bryce P. Shashinka -- Engineering Leader" />
    <meta property="og:description" content="Portfolio of Bryce P. Shashinka -- 15+ years in configuration management, infrastructure, and technical leadership across aerospace and semiconductor manufacturing." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://bryce.shashinka.org" />
    <link rel="icon" type="image/svg+xml" href="/BPS.svg" />
    <title>Bryce P. Shashinka -- Engineering Leader</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create src/index.css**

```css
@import "tailwindcss";
@source "./";
```

- [ ] **Step 5: Create src/main.jsx**

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- [ ] **Step 6: Create src/App.jsx with placeholder**

```jsx
export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <h1 className="text-4xl text-white font-light">bryce.shashinka.org</h1>
    </div>
  )
}
```

- [ ] **Step 7: Verify dev server starts and Tailwind generates utilities**

```bash
npx vite build 2>&1 | tail -5
# Expected: build completes, dist/ created, CSS output > 3KB (confirms Tailwind utilities are generating)
```

- [ ] **Step 8: Commit scaffolding**

```bash
git init
git add package.json package-lock.json vite.config.js index.html BPS.svg src/ docs/ resume-reference.md
git commit -m "feat: scaffold Vite + React + Tailwind v4 project"
```

---

### Task 2: Create GitHub repo and deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `.gitignore`

- [ ] **Step 1: Create .gitignore**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 2: Create deploy workflow**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy dist --project-name site-bryce-shashinka-org
```

- [ ] **Step 3: Create GitHub repo (private, under shashinka-family org)**

```bash
gh repo create shashinka-family/site-bryce.shashinka.org --private --source=. --remote=origin --push
```

- [ ] **Step 4: Set GitHub secrets**

Retrieve the CF Pages token from keychain:
```bash
CF_TOKEN=$(security find-generic-password -s "Claude Code - CF Pages Token" -w)
gh secret set CLOUDFLARE_API_TOKEN --body "$CF_TOKEN" --repo shashinka-family/site-bryce.shashinka.org
gh secret set CLOUDFLARE_ACCOUNT_ID --body "0f458e208989b5fb2fd5e514346d026b" --repo shashinka-family/site-bryce.shashinka.org
```

- [ ] **Step 5: Create CF Pages project**

```bash
CF_TOKEN=$(security find-generic-password -s "Claude Code - CF Pages Token" -w)
WRANGLER_API_TOKEN=$CF_TOKEN npx wrangler pages project create site-bryce-shashinka-org --production-branch main
```

- [ ] **Step 6: Commit and push to trigger first deploy**

```bash
git add .gitignore .github/
git commit -m "ci: add CF Pages deploy workflow and .gitignore"
git push
```

- [ ] **Step 7: Verify deploy succeeds**

```bash
gh run list --repo shashinka-family/site-bryce.shashinka.org --limit 1
# Expected: workflow run with status "completed" and conclusion "success"
```

- [ ] **Step 8: Add custom domain**

```bash
CF_TOKEN=$(security find-generic-password -s "Claude Code - CF Pages Token" -w)
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/0f458e208989b5fb2fd5e514346d026b/pages/projects/site-bryce-shashinka-org/domains" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"bryce.shashinka.org"}'
```

Then update the DNS CNAME for `bryce.shashinka.org` to point to `site-bryce-shashinka-org.pages.dev`:
```bash
DNS_TOKEN=$(security find-generic-password -s "Claude Code - DNS" -w)
# Get zone ID for shashinka.org
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=shashinka.org" \
  -H "Authorization: Bearer $DNS_TOKEN" | python3 -c "import sys,json; print(json.load(sys.stdin)['result'][0]['id'])")

# Check for existing CNAME record
RECORD=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=bryce.shashinka.org&type=CNAME" \
  -H "Authorization: Bearer $DNS_TOKEN")

# Update or create CNAME to site-bryce-shashinka-org.pages.dev (proxied)
RECORD_ID=$(echo "$RECORD" | python3 -c "import sys,json; r=json.load(sys.stdin)['result']; print(r[0]['id'] if r else '')")
if [ -n "$RECORD_ID" ]; then
  curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$RECORD_ID" \
    -H "Authorization: Bearer $DNS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"type":"CNAME","name":"bryce","content":"site-bryce-shashinka-org.pages.dev","proxied":true}'
else
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
    -H "Authorization: Bearer $DNS_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"type":"CNAME","name":"bryce","content":"site-bryce-shashinka-org.pages.dev","proxied":true}'
fi
```

---

## Chunk 2: Data Layer and Content

### Task 3: Create static data files

All portfolio content lives in `src/data/` as plain JavaScript arrays. No API calls, no database. Content sourced from spec and resume-reference.md.

**Files:**
- Create: `src/data/experience.js`
- Create: `src/data/skills.js`
- Create: `src/data/projects.js`

- [ ] **Step 1: Create experience data**

```javascript
// src/data/experience.js
export const experiences = [
  {
    id: 1,
    position: 'Founder & Principal Engineer',
    company: 'BPS Enterprises LLC / 1507 Systems',
    location: 'Connecticut',
    startYear: '2024',
    endYear: 'Present',
    isCurrent: true,
    description:
      'Managed service provider delivering infrastructure design, network administration, cloud architecture, and security for SMBs. Hands-on across the full stack -- from Cloudflare edge deployment to on-premise networking and automation.',
    url: 'https://1507.systems',
  },
  {
    id: 2,
    position: 'Change Management Specialist',
    company: 'ASML',
    location: 'Wilton, CT',
    startYear: '2021',
    endYear: '2026',
    isCurrent: false,
    description:
      'Configuration Management and Master Data Management for semiconductor manufacturing. Engineering Change screening, SAP BoM and material master data management, cross-sectoral CCB collaboration with Development Engineering.',
  },
  {
    id: 3,
    position: 'Quality Assurance & IT Specialist',
    company: 'EDCO Engineering',
    location: 'Newington, CT',
    startYear: '2019',
    endYear: '2021',
    isCurrent: false,
    description:
      'Document quality control and process improvement. Project manager and technical specialist for NIST SP 800-171 and CMMC Level 3 compliance. ERP master data and IT infrastructure.',
  },
  {
    id: 4,
    position: 'Configuration Analyst II',
    company: 'Belcan Engineering Group',
    location: 'Windsor, CT',
    startYear: '2015',
    endYear: '2019',
    isCurrent: false,
    description:
      'Engineering change management and design package review for the PW1100G-JM development program (Pratt & Whitney). Project management for $5M+ SOWs. Team lead with training and evaluation responsibilities.',
  },
  {
    id: 5,
    position: 'Senior Engineer',
    company: 'QuEST Global Services',
    location: 'East Hartford, CT',
    startYear: '2011',
    endYear: '2015',
    isCurrent: false,
    description:
      'Pratt & Whitney Engineering: BoM management for NGPF development engines, Teamcenter/Unigraphics NX, $2M+ SOW project management. Backup Team Lead for a team of 10.',
  },
];
```

- [ ] **Step 2: Create skills data**

```javascript
// src/data/skills.js
export const skillCategories = [
  {
    id: 'cm',
    label: 'Configuration Management',
    gradient: 'from-blue-600 to-blue-700',
    tags: [
      'SAP', 'Teamcenter', 'Unigraphics NX', 'Bill of Material Management',
      'Engineering Change Management', 'CM2', 'MyChange', 'Document Control',
    ],
  },
  {
    id: 'infra',
    label: 'Infrastructure & Cloud',
    gradient: 'from-slate-600 to-slate-700',
    tags: [
      'Cloudflare (Workers, Pages, D1, KV, R2)', 'Linux', 'Networking',
      'DNS', 'VoIP/SIP', 'Zigbee', 'Z-Wave', 'Docker',
    ],
  },
  {
    id: 'dev',
    label: 'Development',
    gradient: 'from-blue-500 to-slate-600',
    tags: [
      'JavaScript/TypeScript', 'React', 'Node.js', 'Python', 'Hono',
      'Vite', 'Git', 'CI/CD',
    ],
  },
  {
    id: 'compliance',
    label: 'Compliance & Quality',
    gradient: 'from-slate-500 to-blue-600',
    tags: [
      'NIST SP 800-171', 'CMMC', 'Six Sigma', 'ISO', 'QMS', 'ERP Systems',
    ],
  },
  {
    id: 'leadership',
    label: 'Leadership',
    gradient: 'from-blue-700 to-slate-700',
    tags: [
      'Project Management ($5M+ SOWs)', 'Team Leadership (15+ reports)',
      'Vendor/Supplier Relations', 'Cross-functional Collaboration',
    ],
  },
];
```

- [ ] **Step 3: Create projects data**

```javascript
// src/data/projects.js
export const projects = [
  {
    id: 1,
    title: 'SNaI',
    description:
      'SIEM and log aggregation platform processing 1,000+ events per second with semantic search via vector embeddings.',
    tags: ['Cloudflare Workers', 'D1', 'Vectorize', 'Hono', 'React'],
  },
  {
    id: 2,
    title: 'VoIP Phone System',
    description:
      'Multi-line business phone system with automated IVR, call routing, voicemail, and fax gateway.',
    tags: ['Asterisk', 'SIP', 'VoIP.ms', 'Cloudflare Workers'],
  },
  {
    id: 3,
    title: 'Infrastructure Automation',
    description:
      'Comprehensive automation platform integrating 50+ devices across Zigbee, Z-Wave, and HomeKit with centralized control.',
    tags: ['Home Assistant', 'Hubitat', 'Node.js', 'MQTT'],
  },
  {
    id: 4,
    title: 'Memory Sync',
    description:
      'Cross-platform knowledge persistence system syncing context between AI agents via REST API and MCP server.',
    tags: ['Cloudflare Workers', 'D1', 'KV', 'MCP'],
  },
  {
    id: 5,
    title: '1507.systems & Portfolio Sites',
    description:
      'Suite of static marketing sites migrated from third-party hosting to self-managed Cloudflare Pages with CI/CD auto-deploy.',
    tags: ['React', 'Vite', 'Tailwind', 'GitHub Actions', 'Cloudflare Pages'],
  },
];
```

- [ ] **Step 4: Commit data layer**

```bash
git add src/data/
git commit -m "feat: add static data for experience, skills, and projects"
```

---

## Chunk 3: Navigation and Hero Components

### Task 4: Build Navigation component

**Files:**
- Create: `src/components/Navigation.jsx`

- [ ] **Step 1: Create Navigation with scroll-aware background and mobile menu**

Key behaviors from spec:
- Transparent over hero, transitions to `white/80 backdrop-blur` when `scrollY > 50`
- Stays white/blur for ALL subsequent sections (never toggles back)
- Mobile: hamburger menu with full-screen overlay, `slate-900/95` background
- Logo: "Bryce" -- clicks scroll to top
- Nav items: About, Experience, Skills, Projects, Contact

```jsx
// src/components/Navigation.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`text-lg font-semibold tracking-tight transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              Bryce
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-sm font-medium transition-colors ${
                    isScrolled
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-slate-900/95 md:hidden pt-20"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="text-2xl font-light text-white hover:text-blue-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Commit Navigation**

```bash
git add src/components/Navigation.jsx
git commit -m "feat: add Navigation with scroll-aware styling and mobile menu"
```

---

### Task 5: Build HeroSection component

**Files:**
- Create: `src/components/HeroSection.jsx`

- [ ] **Step 1: Create HeroSection with blur orbs and staggered animation**

Key elements from spec:
- Dark slate gradient background with 3 ambient blur orbs (blue-600/10, slate-500/10, gradient center)
- Tagline: uppercase, blue-400, tracked
- Name: 5xl-8xl, font-light, white
- Subtitle: xl-2xl, slate-400
- Social links: GitHub + LinkedIn as circular icon buttons
- Scroll indicator: "Explore" + bouncing arrow, smooth-scrolls to #about
- Staggered fade-in/slide-up via framer-motion

```jsx
// src/components/HeroSection.jsx
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin } from 'lucide-react';

export default function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Ambient blur orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-slate-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/5 to-slate-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          className="text-blue-400 text-sm tracking-[0.3em] uppercase mb-4 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Engineering Leader &mdash; Configuration Management, Infrastructure, &amp; Systems
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Bryce P. Shashinka
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-slate-400 mb-12 font-light max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Building infrastructure, automating systems, and leading technical projects &mdash; currently founding an MSP while looking for the right engineering team to join.
        </motion.p>

        {/* Social links */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <a
            href="https://github.com/shasb"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/shashinka"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          className="text-slate-400 hover:text-white transition-colors inline-flex flex-col items-center gap-2 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span className="text-sm">Explore</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit HeroSection**

```bash
git add src/components/HeroSection.jsx
git commit -m "feat: add HeroSection with blur orbs and staggered animations"
```

---

## Chunk 4: About and Experience Components

### Task 6: Build AboutSection component

**Files:**
- Create: `src/components/AboutSection.jsx`

- [ ] **Step 1: Create AboutSection with prose and stats grid**

Key elements from spec:
- Light background (slate-50), two-column on desktop, stacked on mobile
- Left: section label, heading "Crafting systems that work", 2-3 paragraphs, location with MapPin
- Right: 2x2 stats grid with hover border effect (border turns blue)
- Content: 15+ year career arc, degrees woven naturally, builder emphasis
- Follow Bryce's writing style: active voice, confident, technical precision, no fluff

```jsx
// src/components/AboutSection.jsx
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const stats = [
  { label: 'Experience', value: '15+ Years' },
  { label: 'Focus', value: 'CM & Infrastructure' },
  { label: 'Education', value: 'BS Business Management' },
  { label: 'Certification', value: 'Six Sigma Green Belt' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-32 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-start"
        >
          {/* Left column -- prose */}
          <div>
            <p className="text-blue-700 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
              About Me
            </p>
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-8 tracking-tight">
              Crafting systems that work
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                Fifteen years building and managing engineered systems &mdash; from aerospace supply chains at Pratt &amp; Whitney to configuration management and master data at ASML in semiconductor manufacturing. Every role reinforced the same principle: disciplined systems thinking scales, whether the deliverable is a jet engine BoM or a cloud deployment pipeline.
              </p>
              <p>
                That foundation now drives BPS Enterprises and 1507 Systems, the managed service provider I founded in 2024. I design infrastructure, automate operations, and secure networks for small and mid-size businesses &mdash; production systems, not prototypes. An AS in Computer Engineering gave me the technical baseline; a BS in Business Management and a Six Sigma Green Belt sharpened the operational and leadership edge.
              </p>
              <p>
                I build things that run. Infrastructure that holds up under load, automation that eliminates repetitive work, and documentation that makes the next person's job easier. Currently looking for the right engineering team where that mindset fits &mdash; individual contributor or technical lead.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-slate-500">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Connecticut</span>
            </div>
          </div>

          {/* Right column -- stats grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="border border-slate-200 rounded-xl p-6 hover:border-blue-500 transition-colors duration-300"
              >
                <p className="text-blue-700 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-slate-900 text-xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit AboutSection**

```bash
git add src/components/AboutSection.jsx
git commit -m "feat: add AboutSection with career prose and stats grid"
```

---

### Task 7: Build ExperienceSection component

**Files:**
- Create: `src/components/ExperienceSection.jsx`

- [ ] **Step 1: Create ExperienceSection with timeline layout**

Key elements from spec:
- Light background (slate-50), timeline with vertical line and dot markers
- Alternating left/right on desktop, stacked on mobile
- Each entry slides in from alternating sides on scroll
- 5 entries reverse chronological, BPS/1507 most detailed with link

```jsx
// src/components/ExperienceSection.jsx
import { motion } from 'framer-motion';
import { Briefcase, MapPin, ExternalLink } from 'lucide-react';
import { experiences } from '../data/experience';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-blue-700 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Career Journey
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            Work Experience
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-3 h-3 bg-blue-700 rounded-full transform -translate-x-1/2 mt-6 ring-4 ring-white" />

                {/* Content card */}
                <div
                  className={`md:w-1/2 ${
                    index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                  } pl-8 md:pl-0`}
                >
                  <div className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {exp.position}
                        </h3>
                        <div className="flex items-center gap-2 text-blue-700 mt-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                      </div>
                      {exp.isCurrent && (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-4">
                      <span>
                        {exp.startYear} &mdash; {exp.endYear}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-slate-600 leading-relaxed">{exp.description}</p>

                    {exp.url && (
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-4 text-blue-700 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        {exp.url.replace('https://', '')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit ExperienceSection**

```bash
git add src/components/ExperienceSection.jsx
git commit -m "feat: add ExperienceSection with alternating timeline layout"
```

---

## Chunk 5: Skills, Projects, Contact and Footer Components

### Task 8: Build SkillsSection component

**Files:**
- Create: `src/components/SkillsSection.jsx`

- [ ] **Step 1: Create SkillsSection with tag cloud cards**

Key elements from spec:
- White background, tags as pills (no proficiency bars)
- Category cards with gradient badge labels
- Hover shadow effect, grid 2-3 columns desktop / 1 mobile

```jsx
// src/components/SkillsSection.jsx
import { motion } from 'framer-motion';
import { skillCategories } from '../data/skills';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-blue-700 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Expertise
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight">
            Skills &amp; Technologies
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <div
                className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${category.gradient} text-white text-xs font-medium mb-6`}
              >
                {category.label}
              </div>

              <div className="flex flex-wrap gap-2">
                {category.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit SkillsSection**

```bash
git add src/components/SkillsSection.jsx
git commit -m "feat: add SkillsSection with tag cloud cards"
```

---

### Task 9: Build ProjectsSection component

**Files:**
- Create: `src/components/ProjectsSection.jsx`

- [ ] **Step 1: Create ProjectsSection with dark cards and tech tags**

Key elements from spec:
- Dark background (slate-800), cards with slate-700/60 bg
- Border + hover border transition, no image area
- Title, description, and tech tags only -- no buttons
- Grid: 2 columns on desktop, 1 on mobile

```jsx
// src/components/ProjectsSection.jsx
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-32 bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-blue-300 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-700/60 rounded-2xl p-8 border border-slate-600 hover:border-slate-400 transition-all duration-500"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {project.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-800 text-slate-400 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit ProjectsSection**

```bash
git add src/components/ProjectsSection.jsx
git commit -m "feat: add ProjectsSection with dark cards and tech tags"
```

---

### Task 10: Build ContactSection component

**Files:**
- Create: `src/components/ContactSection.jsx`

- [ ] **Step 1: Create ContactSection with LinkedIn and GitHub cards**

Key elements from spec:
- Light background (slate-50)
- Two styled cards side by side on desktop
- No contact form, no email, no phone

```jsx
// src/components/ContactSection.jsx
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const contactLinks = [
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/shashinka',
    display: 'linkedin.com/in/shashinka',
    icon: Linkedin,
    hoverBg: 'hover:bg-blue-600 hover:text-white hover:border-blue-600',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/shasb',
    display: 'github.com/shasb',
    icon: Github,
    hoverBg: 'hover:bg-slate-900 hover:text-white hover:border-slate-900',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-blue-700 text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Get in Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight mb-6">
            Let's connect
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Interested in discussing opportunities, technical projects, or collaboration &mdash; reach out through LinkedIn or GitHub.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-200 transition-all duration-300 group ${link.hoverBg}`}
              >
                <div className="p-3 bg-slate-100 rounded-xl group-hover:bg-white/20 transition-colors">
                  <Icon className="w-6 h-6 text-slate-600 group-hover:text-current transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 group-hover:text-current transition-colors">
                    {link.label}
                  </p>
                  <p className="text-sm text-slate-500 group-hover:text-current/80 transition-colors">
                    {link.display}
                  </p>
                </div>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit ContactSection**

```bash
git add src/components/ContactSection.jsx
git commit -m "feat: add ContactSection with LinkedIn and GitHub cards"
```

---

### Task 11: Build Footer component

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Create Footer with pi easter egg**

Key elements from spec:
- Dark background (slate-900), border-t
- Left: copyright, Right: pi character in slate-700 (barely visible), links to GitHub
- Pi is a nod to 1995's The Net

```jsx
// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="py-8 bg-slate-900 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Bryce P. Shashinka. All rights reserved.
          </p>
          <a
            href="https://github.com/shasb"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-slate-600 transition-colors text-lg"
            aria-label="GitHub"
          >
            &pi;
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit Footer**

```bash
git add src/components/Footer.jsx
git commit -m "feat: add Footer with pi easter egg linking to GitHub"
```

---

## Chunk 6: Assembly, Verification and Deploy

### Task 12: Wire up App.jsx with all components

**Files:**
- Modify: `src/App.jsx`

- [ ] **Step 1: Update App.jsx to render all sections**

```jsx
// src/App.jsx
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Build and verify no errors**

```bash
npx vite build 2>&1
# Expected: build completes with 0 errors, CSS output > 10KB
```

- [ ] **Step 3: Commit assembly**

```bash
git add src/App.jsx
git commit -m "feat: wire up all section components in App"
```

---

### Task 13: Visual verification and deploy

- [ ] **Step 1: Start dev server and verify in browser**

```bash
npx vite --host
```

Use browser automation to navigate to localhost and verify:
- Hero renders with blur orbs, name, tagline, social links, scroll indicator
- Nav is transparent over hero, turns white/blur on scroll
- About section has prose and 2x2 stats grid
- Experience shows timeline with alternating cards
- Skills shows category cards with tag pills
- Projects shows dark cards with tech tags
- Contact shows LinkedIn and GitHub cards
- Footer shows copyright and barely-visible pi
- Mobile: hamburger menu works, sections stack properly

- [ ] **Step 2: Fix any visual issues found during verification**

- [ ] **Step 3: Push to trigger deploy**

```bash
git push
```

- [ ] **Step 4: Verify GitHub Actions deploy succeeds**

```bash
gh run list --repo shashinka-family/site-bryce.shashinka.org --limit 1
# Wait for completion, then:
gh run view --repo shashinka-family/site-bryce.shashinka.org $(gh run list --repo shashinka-family/site-bryce.shashinka.org --limit 1 --json databaseId -q '.[0].databaseId')
```

- [ ] **Step 5: Verify live site at bryce.shashinka.org**

Navigate to https://bryce.shashinka.org and verify all sections render correctly.

- [ ] **Step 6: Final commit with any fixes, push**

```bash
git push
```
