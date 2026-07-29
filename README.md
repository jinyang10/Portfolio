# Jin Yang

**My Portfolio**.

**https://jinyang10.github.io/Portfolio/**

## Sections

1. **Home** — a calm opening welcome and introduction
2. **Experience** — a refined timeline of work
3. **Education** — Computer Engineering at York University, Lassonde
4. **Projects** — selected work
5. **Hobbies** — fitness & health, gaming, and technology
6. **Contact** — a dark closing movement with email & LinkedIn

## Contact

- Email: [sjy6@my.yorku.ca](mailto:sjy6@my.yorku.ca)
- LinkedIn: [jin-yang-aa7352301](https://www.linkedin.com/in/jin-yang-aa7352301/)

## Switching styles

The site ships with two complete visual themes:

- **Luxury** (default) — warm gallery-paper palette, editorial serif
  typography, terracotta/forest/gold accents
- **Modernist** — clean lines, functional beauty, timeless: flat white
  surfaces, Space Grotesk + Inter typography, sharp geometry, and primary
  blue/red/yellow accents

Two ways to switch:

1. **On the site** — use the `Luxe / Modern` toggle in the header. The choice
   is saved in the visitor's browser and persists across visits.
2. **Change the default** — in `index.html`, find the small script in the
   `<head>` and change the fallback:

   ```js
   document.documentElement.dataset.theme =
     localStorage.getItem("theme") || "luxury"; // change to "modernist"
   ```

All Modernist styling lives in `theme-modernist.css` as overrides, so the
shared layout and content stay in one place (`index.html` + `styles.css`).

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
