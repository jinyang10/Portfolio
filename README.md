# Jin Yang — Portfolio

A luxury-minimal, single-page portfolio for **Jin Yang** — a third-year
Computer Engineering student at York University's Lassonde School of
Engineering, focused on full-stack development with AI workflows and projects
for real-world applications.

The page reads as one uninterrupted scrolling experience, paced like a
gallery: a quiet opening welcome, a manifesto interlude, chaptered sections,
and a decisive closing invitation.

## Live site

Once GitHub Pages is enabled (Settings → Pages → Source: **GitHub Actions**),
the site is available at:

**https://jinyang10.github.io/Portfolio/**

## Sections

1. **Home** — a calm opening welcome and introduction
2. **Experience** — a refined timeline of work
3. **Education** — Computer Engineering at York University, Lassonde
4. **Projects** — selected work, distilled
5. **Hobbies** — what restores attention
6. **Contact** — a dark closing movement with email & LinkedIn

## Contact

- Email: [sjy6@my.yorku.ca](mailto:sjy6@my.yorku.ca)
- LinkedIn: [jin-yang-aa7352301](https://www.linkedin.com/in/jin-yang-aa7352301/)

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
