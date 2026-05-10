# Tu Hoang Portfolio

A personal portfolio and technical blog built with Angular v21, focusing on performance, modern reactivity, and SEO best practices.

🌐 Live site: https://tuhoangdev.netlify.app  
📦 Repository: Public on GitHub

---

## Overview

This project serves as both:

- A **personal portfolio** showcasing experience, projects, and background
- A **technical blog** where I share knowledge about Angular and TypeScript

The application is built with a modern Angular stack using **zoneless change detection**, **Signals**, and **SSR deployment on Netlify**.

---

## Features

### Core
- Angular v21 standalone application
- Zoneless change detection (no Zone.js)
- Signal-based reactivity
- Fully responsive custom UI (no UI libraries)

### Blog System
- Markdown-based blog (`content/article/*.md`)
- Dynamic rendering using `ngx-markdown`
- Blog metadata managed via JSON

### SEO Optimization
- Server-side rendering with `@angular/ssr` + `@netlify/angular-runtime`
- Dynamic SEO via `SeoService`
- Meta tags (title, description, keywords)
- Open Graph support
- JSON-LD structured data
- Auto-generated `sitemap.xml`

### Deployment Strategy
- Primary: Netlify (SSR)
- Secondary: GitHub Pages (redirect only)

---

## Tech Stack

- **Framework:** Angular v21
- **Rendering:** SSR (`@angular/ssr`, `@netlify/angular-runtime`)
- **Reactivity:** Angular Signals
- **Styling:** Pure CSS (no frameworks)
- **Content:** Markdown + JSON
- **Tooling:** GitHub Copilot (development assistance)
- **Design:** Figma AI-assisted

---

## Project Structure

```
📁 src/
├── 📁 app/
│   ├── 📁 shell/              # Layout (header, footer, sidebar)
│   ├── 📁 home/               # Home page
│   ├── 📁 blog-detail/        # Blog detail page
│   ├── 📁 shared/             # Shared (components, services, directives, models, config)
|   └── 📁 environments/
|       └── 📄 environment.ts  # Environment config
│
├── 📁 assets/
│   └── 📁 data/               # JSON data (blog, experience, projects)
│   
└── 📁 styles/                 # Global styles
   
📁 content/   
├── 📁 article/                # Blog posts
└── 📁 images/                 # Blog images
   
📁 scripts/   
└── 📄 generate-sitemap.js     # Generate sitemap.xml (run before build when adding/removing blog posts)
   
📁 docs/   
└── 📄 index.html              # Redirect GitHub Pages → tuhoangdev.netlify.app
   
📁 e2e/                        # Playwright end-to-end tests
```

---


## Content Management

### Blog Posts
- Stored in: `content/article`
- Format: Markdown
- Naming: `slug.md`

### Blog Images
- Stored in: `content/images`
- Each blog has its own folder:
  `content/images/{slug}/`

### Metadata
- Stored in: `src/assets/data/blog.json`

---

## Development

### Install dependencies

```bash
npm install
```

### Run development server:

```bash
npm start
```

### App runs at:

http://localhost:4500/

---

## Build & SEO

### Build the project:

```bash
npm run build
```

### Sitemap generation

- Run `generate-sitemap.js` **before build** when adding or removing blog posts.
- The script generates `sitemap.xml` into `src/`.
- During build, Angular will copy `sitemap.xml` into the output folder (`dist/`).

> Note: You do not need to regenerate the sitemap on every build—only when blog content changes.

---

## Testing

### Unit Tests

```bash
npm run test
```

Using `vitest`.

### End-to-End Tests

```bash
cd e2e
npm install
npm test
```

Using `Playwright`.

---

## Deployment

### Netlify (Primary)

- SSR powered by `@netlify/angular-runtime`
- Main domain: https://tuhoangdev.netlify.app

### GitHub Pages (Legacy)

- `docs/index.html` contains a redirect script
- Redirects traffic to the main Netlify site

---

## Notes

- No external state management library is used
- No UI framework is used (fully custom styling)
- SEO is handled centrally via `SeoService`
- Environment config is located at: `src/environments/environment.ts`

---

## Author

**Tu Hoang**

- Portfolio: https://tuhoangdev.netlify.app
- Focus: Angular, TypeScript, performance optimization, modern frontend architecture

---

## License

This project is for personal use and portfolio demonstration.
