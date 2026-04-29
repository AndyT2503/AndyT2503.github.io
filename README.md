# NewPortfolio

Angular portfolio + blog, deployed to GitHub Pages.

## Development server

Run `npm start` and open `http://localhost:4500/`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build`.

- Output is written to `docs/` (GitHub Pages artifact).
- Blog detail pages (`/blog/:slug`) are prerendered to static HTML for SEO.
- Routes are generated from `content/article/*.md` into `src/prerender-routes.txt`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
