# Blog instructions

## Writing tone and style
- Be conversational and friendly while staying professional.
- Use second person (`you`) and active voice.
- Keep sentences short and focused.
- Use standard American English spelling and punctuation.
- Do not make unsupported claims or mention unreleased features.
- Use descriptive link text.

## Blog file rules
- Write blog content in `content/article/{slug}.md`.
- Use `content/images/{slug}` for all images used by that post.
- Name image folders after the blog slug.
- Follow the structure and style of existing posts, especially `how-angular-change-detection-works-without-zonejs.md`.
- Keep paragraphs flowing. Do not add extra line breaks unless they improve readability.

## Markdown and code samples
- Show only the relevant code excerpt when the example is long.
- Replace omitted sections with a comment explaining the reason.
- Use code formatting for filenames, commands, and code elements.
- Keep examples correct and minimal.

## Blog content guidelines
- Focus on the user’s needs and not just the system behavior.
- Introduce new terms when first used.
- Be consistent with terminology across the post.
- Make sure each paragraph conveys a single idea.
- Avoid unnecessary repetition.

## Image guidance
- All images for a blog post must be stored in `content/images/{slug}/`.
- The blog thumbnail must be named `default.jpg` in that folder.
- Running `npm run generate-blog-thumbnails` creates responsive variants (`default-480.jpg`, `default-720.jpg`, `default-960.jpg`) used by blog cards on the home page.
- Other images used within the article (diagrams, screenshots, etc.) are also stored in the same folder.
- In Markdown, reference images using the path `content/images/{slug}/filename.png`.
- Use simple, clear artwork or screenshots that help explain the blog point.

## Example for long code excerpts
```ts
notify(source: NotificationSource): void {
  // Check whether zoneless is enabled and whether this source should notify the scheduler.
  ...

  // Convert the notification source into ApplicationRef dirty flags.
  ...

  // Stop here if a tick is already scheduled, already running, or the app is destroyed.
  ...

  const scheduleCallback = this.useMicrotaskScheduler
    ? scheduleCallbackWithMicrotask
    : scheduleCallbackWithRafRace;

  this.pendingRenderTaskId = this.taskService.add();

  if (this.scheduleInRootZone) {
    this.cancelScheduledCallback = Zone.root.run(() => scheduleCallback(() => this.tick()));
  } else {
    this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
      scheduleCallback(() => this.tick()),
    );
  }
}
```
