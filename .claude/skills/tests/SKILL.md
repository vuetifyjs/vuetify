---
name: tests
description: Use when writing, fixing or debugging tests in packages/vuetify (unit or browser specs, flaky tests, screenshot stories).
---

# Tests

## When

Write tests unless the change is trivial — the bar for trivial is higher than in most projects. A bug fix gets a test that fails without the fix: write it first, see it red, then fix.

## Where

Colocated in `__tests__/` next to the source.

| File                 | Project                         | For                                                        |
| -------------------- | ------------------------------- | ---------------------------------------------------------- |
| `*.spec.ts(x)`       | `unit` (jsdom)                  | pure logic: composables, util, local composables           |
| `*.spec.browser.tsx` | `browser` (Playwright Chromium) | anything with layout, focus, keyboard, overlays, scrolling |

Prefer extracting logic into a local composable and unit-testing it over mounting a component for a calculation.

## Running

In `packages/vuetify`:

```bash
pnpm test <path>                     # both projects
pnpm test <path> --project browser
pnpm test:open <path>                # headed browser with devtools, bails on first failure
```

## Writing

- Vitest globals (`describe`, `it`, `expect`, `vi`) are auto-imported
- Helpers from `@test`: `render`, `screen`, `userEvent`, `page`, `commands`, `wait*`, `click`, `waitForClickable`, `scroll`
- Assert what users observe: roles, ARIA attributes, text, emitted events, focus. Classes only when they are public API (`v-btn--active`)
- Test names describe behavior: `it('should close on Escape')`
- No comments referencing issues or URLs — older specs have them, don't copy

## Console

Any unexpected `console.warn` / `console.error` fails the test. Assert expected ones:

```ts
expect("is not a valid value").toHaveBeenTipped(); // console.warn — consoleWarn/consoleError/deprecate go through Vue's warn
expect("…").toHaveBeenWarned(); // console.error
```

## Stability

Flaky tests get fixed in follow-up commits regularly — avoid the usual causes:

- `expect.poll(() => …)` or `waitForClickable` instead of fixed `await wait(100)`
- Focus or clipboard work runs parallel with other tests — take the lock before focusing:

  ```ts
  const lock = await commands.getLock();
  input.focus();
  await userEvent.paste();
  await commands.releaseLock(lock);
  ```

- Opening submenus with arrow keys is racy — press the key again until focus lands
- Reduced motion is on by default; `commands.setReduceMotionDisabled()` when a transition matters, re-enable in `afterEach`

## Screenshots

Visual stories use `showcase({ stories, props, component })` with `gridOn(rows, columns, render)`, captured by Vizzly (`pnpm tdd`, then `pnpm test:screen`). Add them only for visual changes; never commit updated baselines unless asked.
