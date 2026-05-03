# GitHub Copilot instructions

## Project overview
- This is a static Angular blog/portfolio project.
- It uses Angular v21 with a zoneless setup.
- The project relies on `@angular/router`, `@angular/cdk`, `ng-zorro-antd`, and `ngx-markdown`.
- The build output lives in `docs/` after `npm run build`.

## Development rules
- Create standalone components.
- Keep each component split into three files: `.ts`, `.html`, and `.scss`.
- Do not use inline CSS in templates.
- Use Angular v21 control flow syntax: `@if` and `@for`.
- Avoid deprecated structural directives such as `ngIf` and `ngFor`.
- Use `ChangeDetectionStrategy.OnPush` for components.
- Prefer modern animation APIs such as `animate.enter` and `animate.leave` instead of legacy `@angular/animations` triggers.

## Project structure
- `src/app`: main application code.
- `src/app/layout`: layout components such as header, footer, and loading UI.
- `src/app/main`: homepage sections and feature pages. This project currently has one homepage and one blog-detail page.
- `src/app/shared`: shared pieces used across the app, including components, config, constants, directives, services, and models.
- `src/assets`: static data files such as JSON used to load blog and works sections.
- `src/styles`: global style configuration before it is tied to a component.
- `builders`: custom builder configuration to generate the 404 page.
- `content/images`: blog images stored in folders named after each blog slug.
- `content/article`: blog content written in Markdown files named with the slug, such as `slug.md`.
- `scripts`: helper scripts for the system. Currently `prerender-seo.js` prerenders blog-detail pages for SEO after `npm run build`.
- `docs`: build output after `npm run build`. The folder is not ignored in Git yet because GitHub Pages uses it; it may be ignored later.

## Blog guidance
- Use `blog-instructions.md` for detailed blog writing rules.
- Store image assets in `content/images/{slug}`.
- Follow the tone and structure of existing articles, especially `content/article/how-angular-change-detection-works-without-zonejs.md`.
- Keep paragraphs concise and maintain readable flow.
- When illustrating code, show only the needed excerpt and use comments for omitted parts.

## Testing guidance
- Use `testing-instructions.md` for unit and end-to-end testing rules.
- Follow the repository’s preferred async and zoneless test patterns.

## Service notes
- Keep changes minimal and consistent with current naming and folder conventions.
- Preserve existing content structure unless a fix or improvement clearly needs refactoring.
