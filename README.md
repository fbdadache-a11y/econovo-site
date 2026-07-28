# Econovo Club — Official Website

> **"Turning students into problem solvers."**

Econovo is a university club at **Mohamed El Bachir El Ibrahimi University**, Bordj Bou Arreridj, Algeria, connecting economics, business, innovation, and practical skills. Through workshops, projects, and discussions, we help students turn knowledge into real-world skills.

This repository holds the source code for the club's official website: a fast, bilingual, no-build-step site designed to run on GitHub Pages.

**Live site:** [fbdadache-a11y.github.io](https://fbdadache-a11y.github.io)

---

## ✨ Features

- **Bilingual by design** — English and Arabic, with automatic RTL layout, switchable with one tap.
- **Content lives in JSON, not HTML** — the Stats, Why Econovo, Focus Areas, Journey, Team, Events and FAQ sections are all rendered from `data/content-en.json` / `data/content-ar.json`. Updating copy, adding a team member, or posting a new event never requires touching code.
- **Dark mode** with a manual toggle, remembered per visitor, synced to the mobile browser's chrome color.
- **Glass UI** — a light, Samsung One UI–inspired glassmorphism treatment: frosted navigation and overlays, softly tinted cards, all tuned for performance (real blur is reserved for the few elements that need it; card grids use a cheaper tinted-glass look so scrolling stays smooth on mid-range phones).
- **Considered motion** — an orchestrated hero entrance, scroll-batched card reveals, a ledger-style stat count-up, a scrolling trust ticker, and a subtle parallax, built with GSAP and fully aware of `prefers-reduced-motion`.
- **Mobile-first** — safe-area–aware floating call-to-action, tap feedback in place of hover, a dedicated slide-out menu, and a scroll-progress indicator.
- **SEO-ready** — Open Graph tags, descriptive meta, semantic HTML.
- **Zero build step** — plain HTML/CSS/JS. Clone it, open it, deploy it.

## 🧱 Tech Stack

| Layer          | Choice                                                    |
|----------------|-------------------------------------------------------------|
| Markup         | Semantic HTML5                                              |
| Styling        | Hand-written CSS with design tokens (custom properties) — no framework |
| Motion         | [GSAP 3](https://gsap.com/) + ScrollTrigger                 |
| Icons          | [Lucide](https://lucide.dev/)                               |
| Content        | Static JSON, fetched client-side                            |
| Hosting        | GitHub Pages                                                 |

No npm, no bundler, no build step — the site runs exactly as it sits in this repository.

## 📁 Project Structure

```
econovo-site/
├── index.html            # Homepage
├── pages/                # Reserved for future pages (about, activities, team, join, contact)
├── css/
│   ├── style.css         # Design tokens (colors, type, spacing, glass), reset, dark mode
│   ├── components.css    # Navbar, buttons, cards, badges, FAQ, mobile menu
│   ├── sections.css      # Hero, trust bar, stats, journey, team, events, footer
│   └── responsive.css    # Tablet + mobile breakpoints
├── js/
│   ├── main.js            # Navbar scroll state, mobile menu, dark mode, scroll progress
│   ├── language.js       # Loads content-{lang}.json and renders every section
│   ├── faq.js              # FAQ accordion (GSAP height animation)
│   └── animations.js     # Hero entrance/parallax, scroll reveals, stat counters
├── data/
│   ├── content-en.json   # All English copy
│   └── content-ar.json   # All Arabic copy
└── assets/                # Real photos / icons go here
```

## 🚀 Running Locally

Content is loaded with `fetch()`, so opening `index.html` directly from disk (`file://`) will fail due to browser CORS restrictions. Serve it over HTTP instead:

```bash
git clone https://github.com/<your-org>/<repo>.git
cd <repo>
python3 -m http.server 8000
# then open http://localhost:8000
```

On GitHub Pages this isn't an issue, since files are already served over `https://`.

## ✍️ Editing Content

Almost no text lives in `index.html`. To update copy, add a board member, or publish an event:

1. Open `data/content-en.json` (and the matching entry in `content-ar.json`).
2. Edit the relevant field or array — e.g. add an object to `events.items`.
3. Commit. No HTML, CSS, or JavaScript knowledge required.

## 🎨 Design System

Colors and type follow the club's official brand book:

| Token | Hex | Use |
|---|---|---|
| Obsidian Green | `#0E2A24` | Primary brand color |
| Obsidian Black | `#1F1F1F` | Dark-mode ground |
| Silver Sage | `#8FB8A6` | Accent |
| Chalk White | `#F4F7F2` / `#F6F4F0` | Light backgrounds |

**Typefaces:** [Host Grotesk](https://fonts.google.com/specimen/Host+Grotesk) (primary, Latin) · [IBM Plex Sans Arabic](https://fonts.google.com/specimen/IBM+Plex+Sans+Arabic) (Arabic) · IBM Plex Mono (stats, timeline numbers — a small "ledger" accent fitting an economics/fintech club).

## 🧩 Adding a New Page

`pages/` is reserved for `about.html`, `activities.html`, `team.html`, `join.html`, and `contact.html`. New pages should link to the shared `css/`, `js/`, and `data/` files so the whole site stays visually and behaviorally consistent.

## 🚢 Deployment (GitHub Pages)

1. Push to the branch configured under **Settings → Pages → Branch**.
2. Make sure `css/`, `js/`, `data/`, and `assets/` keep their folder structure relative to `index.html` — the page links to them with relative paths (`css/style.css`, `js/main.js`, etc.), so files placed flat in the repo root instead of inside their folders will 404.
3. Give GitHub Pages a minute to rebuild, then verify the live URL.

## 👥 Maintainers

| Role | Name |
|---|---|
| President | Dadache Fouad |
| Vice President | Houssem Yettou |
| Team Lead | Abdelilah |
| Team Lead | Rahal Akram El Mokhtar |

## 📬 Contact

- Instagram: [@econovo.club](https://www.instagram.com/econovo.club)
- Facebook: [Econovo Club](https://www.facebook.com/share/1BmnaFPMX7/)

## 📄 License

© 2026 Econovo Club, Bordj Bou Arreridj, Algeria. All rights reserved. Brand assets (logo, name, color palette) belong to Econovo Club; the site's code may be reused and adapted by club members for club purposes.
