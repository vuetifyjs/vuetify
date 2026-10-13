---
paths: ['packages/vuetify/src/util/**']
---

# Utilities

`@/util` is imported by nearly every component — a changed signature or semantics ripples everywhere.

## Before adding

Grep `helpers.ts`, `dom.ts` and `v0.ts` first. Most requests already exist: `wrapInArray`, `pick` / `omit`, `mergeDeep`, `debounce`, `clamp`, `focusableChildren`, `getActiveElement` (Shadow DOM-safe — use it instead of `document.activeElement`).

## Where things go

- Framework plumbing (`propsFactory`, `defineComponent`, `useRender`, `getCurrentInstance`) — its own file
- Generic helpers — `helpers.ts`
- DOM helpers — `dom.ts`
- Environment flags — `globals.ts` (`IN_BROWSER`, `SUPPORTS_*`)
- A new file needs `export *` in `util/index.ts`

## v0 first

- Type guards (`isString`, `isNullOrUndefined`, …) come from `v0.ts` — no raw `typeof x === 'string'` or `x == null`
- A new framework-agnostic helper is a v0 candidate — mention it to the dev instead of growing `helpers.ts`
- When core adopts a v0 helper: add it to `v0.ts`, rename on export if it would shadow common local names (`range as createRange`), delete the core copy

## Changing an existing helper

Grep call sites first. Don't change behavior under an existing name — add a new function or update every caller in the same change.

## Console

- Debugging: raw `console.*` is fine, even preferred — lint flags leftovers before they can merge
- Messages shipped to app developers: `consoleWarn`, `consoleError`, `deprecate`, `breaking`, `removed`

## Tests

`util/__tests__/`, unit project by default. Browser project only for layout or DOM measurement.
