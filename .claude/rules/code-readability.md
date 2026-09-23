---
paths: ['packages/vuetify/src/**']
---

# Code Readability

Run `pnpm lint:fix` first (in `packages/vuetify`), then review your own diff against this list. Anything ESLint enforces is not repeated here. Only touch lines the change needs — no drive-by renames, reordering or reformatting.

## Comments

Default to none. Most AI-written comments narrate what the next line does and get deleted in review.

Write one only when the reason can't be read from the code: a browser quirk, an ordering constraint, a footgun that bites if someone "simplifies" it. One line, plain wording.

Never:

- restate the code (`// set open to false`)
- narrate intent or history (`// fixed the bug where…`, `// new approach`)
- link or reference issues (`// see #12345`, GitHub URLs) — that belongs in the commit message
- add JSDoc to internal functions

Import group headers (`// Components`, `// Composables`, `// Utilities`, `// Types`) are the file convention — keep them.

## Naming

No abbreviations in variables, params or functions:

```ts
// ❌
const idx = items.indexOf(item)
const opts = { ...defaults, ...options }
function handleKeydown (e: KeyboardEvent) {}

// ✅
const index = items.indexOf(item)
const merged = { ...defaults, ...options }
function onKeydown (e: KeyboardEvent) {}
```

Short lambda params are fine: `items.map(v => v.value)`, `(a, b) => a - b`. Established names stay too: `e` for events, `vm`, the `El` suffix for element refs (`activatorEl`, `contentEl`). Older code in `util` still has `val`/`cb`/`obj` — don't copy it.

Prefer single words when context makes them unambiguous: `open` over `isMenuOpen` inside VMenu. `on<Action>` for handlers, never `handle<Action>`.

## Functions

Function declarations over `const` arrows in `setup` and modules:

```ts
// ❌
const toggle = () => { … }

// ✅
function toggle () { … }
```

## Abstractions

- No helper for a single call site — inline it
- Grep `src/util` and `src/composables` before writing a new helper
- No wrapper that only renames or forwards arguments
- Derive instead of syncing: a `toRef`/`computed` over a `watch` that writes into another ref
