# PFEC Global — Portfolio Website

A modern, animated multi-page portfolio website for **PFEC Global**, a study abroad and visa consultancy firm based in Bangladesh. Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with hero, services, destinations, stats, steps, awards, and offices |
| About | `about.html` | Company story, timeline, mission/vision, core values, leadership, global presence, testimonials |
| Contact | `contact.html` | Contact form, office locations, FAQ accordion, trust stats |

---

## Features

- **Custom cursor** with smooth follow and hover states
- **Scroll progress bar** at the top of the viewport
- **Scroll-reveal animations** using Intersection Observer (fade up, left, right, scale, clip)
- **Staggered animations** for grouped elements
- **Counter animation** with ease-out-cubic easing
- **3D tilt cards** on mouse move (destination cards, service cards)
- **Magnetic buttons** that follow the cursor
- **Hero parallax** background effect
- **Floating particles** generated dynamically
- **Animated SVG timeline** with stroke-dashoffset draw
- **Section indicator** (fixed dot navigation) on the About page
- **Interactive map tooltips** on the About page
- **Expandable timeline cards** with click-to-reveal details
- **Flip cards** for Mission & Vision (hover to flip)
- **Partners marquee** with infinite seamless loop
- **Fully responsive** — desktop, tablet, and mobile breakpoints
- **CSS custom properties** for consistent theming

---

## Project Structure

```
pefc-portfolio/
├── index.html   # Home page
├── about.html                  # About page
├── contact.html                # Contact page
├── css/
│   ├── styles.css              # Stylesheet (home page)
│   ├── about.css               # Stylesheet (about page)
│   └── contact.css             # Stylesheet (contact page)
├── js/
│   ├── script.js               # JavaScript (home page)
│   ├── about.js                # JavaScript (about page)
│   └── contact.js              # JavaScript (contact page)
├── README.md                   # This file
└── LICENSE                     # Custom license
```

---

## Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations, `clip-path`, `backdrop-filter`, `mix-blend-mode`
- **Vanilla JavaScript** — Intersection Observer, `requestAnimationFrame`, DOM manipulation
- **No build tools** — Open any `.html` file directly in a browser

---

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/animeshkarmitun/PEFC.git
   ```
2. Open `index.html` in your browser.

No installation or build step required.

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--navy` | `#0d1b3e` | Dark backgrounds |
| `--navy-light` | `#1a237e` | Primary brand, headings |
| `--red` | `#e53935` | Accent, CTAs, highlights |
| `--cream` | `#f8f9fa` | Light section backgrounds |
| `--text` | `#333` / `#1e293b` | Body text |
| `--text-light` | `#666` / `#64748b` | Secondary text |

---

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 14+
- Edge 80+

---

## Author

**Animesh Kar**
Email: animeshkar.connect@gmail.com
GitHub: [@animeshkarmitun](https://github.com/animeshkarmitun)

---

## License

This project is licensed under a custom license. See the [LICENSE](./LICENSE) file for details. **No one may sell, sublicense, or commercially distribute this project without explicit written permission from the author.**
