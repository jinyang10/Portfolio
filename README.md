# Jin Yang

**My Portfolio**.

**https://jinyang10.github.io/Portfolio/**

## Sections

1. **Home** — a calm opening welcome and introduction
2. **Education** — Computer Engineering at York University, Lassonde
3. **Projects** — selected work
4. **Extracurriculars** — hackathons, clubs, and self-directed learning
5. **Hobbies** — fitness & health, gaming, and technology
6. **Contact** — a dark closing movement with email & LinkedIn

## Contact

- Email: [sjy6@my.yorku.ca](mailto:sjy6@my.yorku.ca)
- LinkedIn: [jin-yang-aa7352301](https://www.linkedin.com/in/jin-yang-aa7352301/)

## Switching styles

The site ships with five complete visual themes:

- **Luxury** (default) — warm gallery-paper palette, editorial serif
  typography, terracotta/forest/gold accents
- **Modernist** — clean lines, functional beauty, timeless: flat white
  surfaces, Space Grotesk + Inter typography, sharp geometry, and primary
  blue/red/yellow accents
- **Art Deco** — elegant patterns, luxury, vintage sophistication: charcoal
  surfaces, champagne gold, Cinzel roman capitals, sunburst geometry, and
  diamond markers
- **Retro-Future** — an 80s vision of the future, refined nostalgia: indigo
  night, restrained neon magenta/cyan, Orbitron display type, soft glows
- **Glass** — translucent layers, blurred backgrounds, depth: a soft mesh
  gradient behind frosted panels, rounded geometry, indigo/pink accents

Two ways to switch:

1. **On the site** — use the `Style` picker in the header. The choice is
   saved in the visitor's browser and persists across visits.
2. **Change the default** — in `index.html`, find the small script in the
   `<head>` and change the fallback:

   ```js
   document.documentElement.dataset.theme =
     localStorage.getItem("theme") || "luxury";
   // change "luxury" to "modernist", "artdeco", "retro", or "glass"
   ```

Each theme lives in its own override stylesheet (`theme-modernist.css`,
`theme-artdeco.css`, `theme-retro.css`, `theme-glass.css`), so the shared
layout and content stay in one place (`index.html` + `styles.css`).

## Design notes

- Warm gallery-paper palette with restrained accents of terracotta, forest
  green, and muted gold
- Cormorant Garamond (display) paired with Outfit (body)
- Weightless interactions: scroll-linked reveals, a reading-progress hairline,
  active navigation states, and a live Toronto clock in the footer
- Fully responsive, with `prefers-reduced-motion` respected throughout
- No frameworks, no build step — plain HTML, CSS, and JavaScript

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy

Pushing to `main` runs `.github/workflows/pages.yml` and deploys the site to
GitHub Pages.
