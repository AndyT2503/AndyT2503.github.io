# Testing instructions

## Unit test rules
- Write unit tests for `.ts` files.
- Test public functions and public component behavior.
- Do not test private functions directly.
- Cover private behavior through user-facing actions or public methods.
- Assert output or state after the action completes.

## Zoneless and async-first pattern
- Assume a zoneless environment.
- Do not use `fixture.detectChanges()` to manually trigger updates.
- Always follow the `Act, Wait, Assert` pattern:
  1. Act: perform a state change or interaction.
  2. Wait: `await fixture.whenStable()` to process scheduled updates.
  3. Assert: verify the resulting UI or state.

## Test style and naming
- Keep test names descriptive and task-based.
- Use short, clear test cases.
- Group related tests with `describe` blocks.

## E2E test rules
- Create a separate E2E project inside this repository.
- The E2E project must use its own `package.json`.
- Use Playwright for end-to-end testing.
- Keep E2E tests isolated from the main application test setup.
- Organize E2E code by page: each page gets its own folder.
- Inside each page folder, include a `selectors` file and a `spec` file.
- Define selectors as an object, not an array.

## Additional guidance
- Prefer tests that mimic real user interactions.
- Use snapshots or assertions that focus on behavior, not implementation details.
- Keep test files aligned with the source feature when possible.
