# bryce.shashinka.org — Design Guide

## Overview
Personal portfolio site. Minimalist design with light-weight typography, alternating light/dark sections, and scroll-driven Framer Motion animations. Built with React + Vite + Tailwind CSS v4 + Framer Motion.

---

## Color Palette

### Primary Accent
- `blue-300` `#93c5fd` — Light accent (dark sections)
- `blue-400` `#60a5fa` — Medium accent
- `blue-500` `#3b82f6` — Standard accent
- `blue-600` `#2563eb` — Links, hover borders
- `blue-700` `#1d4ed8` — Labels, timeline dots, links on light bg
- `blue-800` `#1e40af` — Strong accent

### Light Sections
| Token | Hex | Usage |
|-------|-----|-------|
| `slate-50` | `#f8fafc` | Section backgrounds |
| `white` | `#ffffff` | Alternate section bg, cards |
| `slate-100` | `#f1f5f9` | Tag backgrounds |
| `slate-200` | `#e2e8f0` | Borders, timeline line |
| `slate-700` | `#334155` | Primary text on light |
| `slate-900` | `#0f172a` | Headings on light |

### Dark Sections (Hero, Projects, Footer)
| Token | Hex | Usage |
|-------|-----|-------|
| `slate-900` | `#0f172a` | Primary dark bg |
| `slate-800` | `#1e293b` | Gradient midpoint |
| `slate-700/60` | — | Project card bg |
| `slate-600` | `#475569` | Card borders on dark |
| `slate-300` | `#cbd5e1` | Body text on dark |
| `slate-400` | `#94a3b8` | Secondary text on dark |
| `white` | — | Headings on dark |

### Status Colors
- `emerald-400` `#34d399` — Success indicators
- `emerald-500/15` — Status badge bg
- `emerald-700` `#047857` — Status text on light

### Skill Badge Gradients
- Config Management: `from-blue-600 to-blue-700`
- Infrastructure: `from-slate-600 to-slate-700`
- Development: `from-blue-500 to-slate-600`
- Compliance: `from-slate-500 to-blue-600`
- Leadership: `from-blue-700 to-slate-700`

---

## Typography

### Font
System sans-serif (Tailwind default). No custom fonts loaded.

### Scale
| Element | Mobile | Desktop | Weight |
|---------|--------|---------|--------|
| Hero Name | `text-5xl` | `md:text-7xl lg:text-8xl` | `font-light` |
| Hero Subtitle | `text-xl` | `md:text-2xl` | `font-light` |
| Section H2 | `text-4xl` | `md:text-5xl` | `font-light` |
| Card Title | `text-xl` | — | `font-semibold` |
| Labels | `text-sm` | — | `font-medium` |
| Body | default | — | normal |
| Tags | `text-xs`–`text-sm` | — | `font-medium` |

### Tracking
- Headings: `tracking-tight`
- Labels: `tracking-[0.2em]` or `tracking-[0.3em]` uppercase
- Stat labels: `tracking-widest`

### Line Height
- Body: `leading-relaxed`

---

## Buttons & Links

### Social Icon Buttons
```
p-3 rounded-full bg-white/5 text-slate-400
hover:bg-white/10 hover:text-white transition-all duration-300
```

### Contact Links (Card Style)
```
flex items-center gap-4 p-6 bg-white rounded-xl border border-slate-200
transition-all duration-300
LinkedIn hover: hover:bg-blue-600 hover:text-white hover:border-blue-600
GitHub hover:  hover:bg-slate-900 hover:text-white hover:border-slate-900
```

### Text Links
- On light: `text-blue-700 hover:text-blue-800 text-sm font-medium`
- On dark: `text-blue-300 hover:text-blue-300`

### Status Badges
- Active: `px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full`
- Live: `bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-full`
- Coming: `bg-blue-500/15 text-blue-300 border border-blue-500/30 rounded-full`

---

## Layout

### Containers
| Width | Usage |
|-------|-------|
| `max-w-6xl` | Standard sections |
| `max-w-4xl` | Experience section |
| `max-w-3xl` | Hero subtitle, contact |

### Grids
```
Skills:     grid md:grid-cols-2 lg:grid-cols-3 gap-8
Projects:   grid md:grid-cols-2 gap-8
Contact:    grid md:grid-cols-2 gap-6
About Stats: grid grid-cols-2 gap-6
```

### Section Pattern
Alternating backgrounds: `bg-slate-50` ↔ `bg-white`, with centered label + heading.

### Padding
- Horizontal: `px-6`
- Vertical: `py-32` (sections)
- Cards: `p-6`, `p-8`

---

## Components

### Cards (Light)
```
border border-slate-200 rounded-2xl p-6
shadow-sm hover:shadow-lg transition-shadow duration-300
hover:border-blue-500 transition-colors duration-300
```

### Cards (Dark — Projects)
```
bg-slate-700/60 border border-slate-600 rounded-2xl
hover:border-slate-400 transition-all duration-500
```

### Skill Tags
```
px-3 py-1.5 bg-slate-100 text-slate-700 text-sm rounded-lg
```

### Skill Category Badge
```
inline-flex px-3 py-1 rounded-full bg-gradient-to-r text-white text-xs font-medium
```

### Navigation
```
fixed top-0 left-0 right-0 z-50
Default: transparent
Scrolled: white/80 backdrop-blur-xl
Links: text-sm gap-8
Desktop only: hidden md:flex
Mobile: full-screen overlay bg-slate-900/95
```

### Timeline (Experience)
```
Vertical line: absolute left-0 md:left-1/2 w-px bg-slate-200
Dots: w-3 h-3 bg-blue-700 rounded-full ring-4 ring-white
Alternating: even items flex-row-reverse
Spacing: space-y-12
```

---

## Animations

### Framer Motion
| Pattern | Initial | Animate | Duration |
|---------|---------|---------|----------|
| Hero title | `opacity: 0, y: 20` | `opacity: 1, y: 0` | 0.8s |
| Sections | `opacity: 0, y: 20` | `opacity: 1, y: 0` | 0.8s |
| Cards | — | — | stagger `index * 0.1` |
| Mobile menu | `opacity: 0, y: -20` | `opacity: 1, y: 0` | 0.2s |

All scroll animations use `whileInView` + `viewport={{ once: true }}`.

### CSS Transitions
- Standard: `transition-colors duration-300`
- Shadows: `transition-shadow duration-300`
- Nav: `transition-all duration-300`
- Scroll arrow: `animate-bounce`
- Ambient orbs: `blur-3xl` with various opacities

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| (default) | 0+ | Single column, mobile nav |
| `md:` | 768px | 2-col grids, desktop nav |
| `lg:` | 1024px | 3-col skills grid, hero text |

---

## Dark/Light Mode
**No toggle.** Uses mixed approach: dark hero/projects/footer, light about/experience/skills/contact. Blue accent adapts tone per section.
