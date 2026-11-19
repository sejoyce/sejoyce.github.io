# Personal site (Gatsby 5)

One page with three sections (About, Projects, Art), built with Gatsby and
deployed to GitHub Pages. The nav bar scrolls to each section.

## Run it locally

```bash
npm install
npm run develop     # http://localhost:8000
npm run build       # production build into /public
```

Needs Node 18 or newer (the deploy workflow uses Node 20).

## Where things live

| To change...                      | Edit this                                        |
| --------------------------------- | ------------------------------------------------ |
| Name, headline, bio, links, photo | `gatsby-config.js` (`siteMetadata`)              |
| Projects                          | `content/projects/projects.yaml` + cover images  |
| Art                               | `content/art/art.yaml` + the image files         |
| Colors, spacing, fonts            | `src/styles/global.css` (variables at the top)   |
| Page layout                       | `src/pages/index.js`                             |

### Add a project
Add an entry to `content/projects/projects.yaml` (newest first):

```yaml
- title: My Project
  summary: One or two sentences about it.
  date: "2026-10"          # only the year is shown; also sets the order
  tech: [React, Vite]
  repo: https://github.com/sejoyce/my-project
  demo: https://sejoyce.github.io/my-project/   # optional
  cover: ./my-project.jpg                       # optional screenshot in the same folder
  coverAlt: Screenshot of the app
```
Projects without a `cover` get a tinted tile with the first letter of the title.
Screenshots can be large; Gatsby resizes them for you, but keeping the files
under about 1 MB keeps the repository light.

### Add art
Copy the image into `content/art/`, then add an entry to `content/art/art.yaml`:

```yaml
- title: Harbor at Dusk
  medium: Watercolor
  year: 2026
  alt: A watercolor of boats in a harbor at sunset
  image: ./harbor.jpg
```

The three `sample-` art files are placeholders. Delete them (and their entries)
when you add your own.

### Add a photo of yourself
Put `me.jpg` in a new `static/` folder, then set `photo: "/me.jpg"` in `gatsby-config.js`.

## Deploy to GitHub Pages

1. Put this project in your `sejoyce.github.io` repository on the `main` branch.
2. In the repo: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
3. Push. The workflow in `.github/workflows/deploy.yml` builds and publishes the site.

If you use a project repository instead (for example `github.com/sejoyce/portfolio`),
the site lives under `/portfolio/`, so add `pathPrefix: "/portfolio"` to
`gatsby-config.js` and build with `npx gatsby build --prefix-paths`.
