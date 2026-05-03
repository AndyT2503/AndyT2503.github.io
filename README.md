# NewPortfolio

Angular portfolio + blog using Angular v21 with `ng-zorro-antd`, `ngx-markdown`, and SEO prerendering for blog pages. The project builds to the `docs/` folder and is ready for GitHub Pages deployment.

## Project overview

- Standalone Angular v21 application with `@angular/router`, `@angular/cdk`, and `ng-zorro-antd`.
- Blog posts are stored in `content/article/*.md` and rendered with `ngx-markdown`.
- Static pages are generated into `docs/` for GitHub Pages and SEO-friendly blog routing.
- Project development is assisted by GitHub Copilot for faster authoring and consistency.

## Setup

Install dependencies:

```bash
npm install
```

## Run development server

```bash
npm start
```

Open `http://localhost:4500/` in your browser.

## Build

```bash
npm run build
```

- The build uses a custom builder to generate `404.html`.
- `postbuild` runs `node scripts/prerender-seo.js` to prerender blog detail pages and generate `sitemap.xml`.
- Output is written to `docs/`.
- Blog metadata is loaded from `src/assets/data/blog.json`, and content Markdown files are stored in `content/article/*.md`.
- Static blog pages are generated into `docs/blog/{slug}/index.html` during postbuild.

## Testing

### Unit tests

```bash
npm run test
```

The project uses `vitest` for unit testing.

### End-to-end tests

```bash
cd e2e
npm install
npm test
```



## Notes

- `src/app`: main application source code, including layout, homepage, blog, and shared components.
- `src/assets`: static assets used by the app.
- `content/article`: blog posts written in Markdown.
- `content/images`: blog images organized by slug.
- `src/assets/data/blog.json`: blog metadata used by the prerender script.
- `scripts/prerender-seo.js`: SEO prerender script executed after build to generate static blog pages, sitemap, and `404.html`.
- `docs/`: production output and GitHub Pages artifact.
- `e2e/`: Playwright configuration and tests for end-to-end coverage.
- GitHub Copilot is used as a development assistant for code and docs.
