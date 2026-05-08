# GitHub Copilot instructions

## Project overview

- This is a Angular SSR blog/portfolio project.
- It uses Angular v21 with a zoneless setup.
- The project relies on `@angular/router`, `@angular/ssr`, and `ngx-markdown`.
- The build output lives in `dist/` after `npm run build`.

## Development rules

- Create standalone components.
- Keep each component split into three files: `.ts`, `.html`, and `.scss`.
- Do not use inline CSS in templates.
- Use Angular v21 control flow syntax: `@if`,`@for`, `@switch`.
- Avoid deprecated features such as `ngIf`, `ngFor`, `ngSwitch`,...
- Use `ChangeDetectionStrategy.OnPush` for components.
- Prefer modern animation APIs such as `animate.enter` and `animate.leave` instead of legacy `@angular/animations` triggers.
- Prefer `signals API` such as `signal`, `computed`, `input()`, `output()`,... for state management and reactivity.
- Avoid `RxJS` as much as possible, especially for component-level state management. Use it only when necessary for complex async operations or when integrating with third-party libraries that require it.
- Follow the existing code style and patterns for consistency.

## Project structure

- `src/app`: main application code.
- `src/app/shell`: shell components such as header, footer, and sidebar.
- `src/app/home`: home page component.
- `src/app/blog-detail`: blog detail page component.
- `src/app/shared`: shared pieces used across the app, including components, config, constants, directives, services, and models.
- `src/assets`: static data files such as JSON used to load blog and works sections.
- `src/styles`: global style configuration before it is tied to a component.
- `content/images`: blog images stored in folders named after each blog slug.
- `content/article`: blog content written in Markdown files named with the slug, such as `slug.md`.
- `scripts`: helper scripts for the system. Currently `generate-sitemap.js` generates `sitemap.xml`. Use it before building the project to update the sitemap.
- `docs`: contain index.html that have redirect script to redirect andyt2503.github.io to tuhoangdev.netlify.app.

## Blog guidance

- Use `.github/blog.instructions.md` for detailed blog writing rules.
- Store image assets in `content/images/{slug}`.
- Follow the tone and structure of existing articles, especially `content/article/how-angular-change-detection-works-without-zonejs.md`.
- Keep paragraphs concise and maintain readable flow.
- When illustrating code, show only the needed excerpt and use comments for omitted parts.
- Add new post metadata to `src/assets/data/blog.json` when creating a blog entry.

## Testing guidance

- Use `.github/testing.instructions.md` for unit and end-to-end testing rules.
- Follow the repository’s preferred async and zoneless test patterns.

## Service notes

- Keep changes minimal and consistent with current naming and folder conventions.
- Preserve existing content structure unless a fix or improvement clearly needs refactoring.
