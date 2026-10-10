# Vuetify

Vuetify 4 component framework. Ships Material Design as the default look, but is meant to fit non-material design systems too. `@vuetify/v0` (headless primitives) has been a direct dependency since 4.2.0 and gets adopted gradually. The next major builds fully on it to split design systems out and stop shipping CSS for every visual variant.

This file and `.claude/` help AI tooling tuned for fast output deliver results closer to what maintainers expect, and lower the barrier for contributions.

Monorepo:

- `packages/vuetify` — the `vuetify` npm package
- `packages/api-generator` — builds API data (props, events, slots, descriptions) for docs
- `packages/docs` — documentation site

Contributor guide: `packages/docs/src/pages/en/getting-started/contributing.md`
Supported browsers: `packages/docs/src/pages/en/getting-started/browser-support.md`

## Branches

| Base     | For                                                   | Docs               |
|----------|-------------------------------------------------------|--------------------|
| `master` | safe bug fixes, docs                                  | vuetifyjs.com      |
| `dev`    | new props/features, fixes that risk visual regression | dev.vuetifyjs.com  |
| `next`   | breaking changes                                      | next.vuetifyjs.com |

## Commands

```bash
pnpm dev                 # root: playground at localhost:8090
pnpm dev docs            # root: docs at localhost:8095

# in packages/vuetify
pnpm test <path>         # single file or folder
pnpm lint:fix            # tsgo typecheck + eslint --fix
```

## Workflow

1. Reproduce in `packages/vuetify/dev/Playground.vue` — see `.claude/skills/playground/SKILL.md`
2. Change code, observe the impact in the playground
3. Write tests unless the change is trivial. The bar for trivial is higher than in most projects — see `.claude/skills/tests/SKILL.md`
4. Lint, fix, refactor — see `.claude/rules/code-readability.md`
5. Consider a11y and i18n/RTL. They are usually the implementation's concern; leaving them to framework users is the rare exception

## Principles

- `shallowRef` / `toRef` by default; `ref` / `computed` only when the cost is justified
- When passing props down to composables or children, usually pass the reactive source (getter or `toRef`), not the unwrapped value — see `.claude/rules/components.md`
- Less is more, until it isn't. A minimal patch that fixes the reported case often breaks or ignores neighbouring prop combinations. Extend the playground to cover those combinations before calling it done

## Rules

Path-scoped rules in `.claude/rules/`. Claude Code loads them automatically; other tools should read the ones matching the touched paths:

| Rule                  | Paths                                               |
|-----------------------|-----------------------------------------------------|
| `components.md`       | `packages/vuetify/src/components/**`, `src/labs/**` |
| `composables.md`      | `packages/vuetify/src/composables/**`               |
| `sass.md`             | `packages/vuetify/src/**/*.{sass,scss}`             |
| `utilities.md`        | `packages/vuetify/src/util/**`                      |
| `code-readability.md` | `packages/vuetify/src/**`                           |

## Review rubric

Each item is a real finding when a diff violates it. Details in the rule named at the end.

- Comments that narrate code, or reference issues/URLs — `code-readability.md`
- Abbreviated names outside short lambdas (`idx`, `opts`, `handleX`) — `code-readability.md`
- Props passed down unwrapped instead of as getter / `toRef` — `components.md`
- Utility classes in component markup — `components.md`
- Non-component exports from a component `index.ts` (breaks api-generator) — `components.md`
- New prop without `new-in.json` entry or api-generator description — `components.md`
- Changed arguments or return shape of a public composable outside `next` — `composables.md`
- Raw `typeof` / `== null` checks instead of `@/util` guards — `utilities.md`
- Hardcoded tunable values instead of `!default` variables, styles outside `tools.layer`, physical `left`/`right` where logical properties work — `sass.md`
- Surfaces or states invisible in forced-colors mode — `sass.md`
- `transition` followed by `transition-*` in one rule — `sass.md`
- Missing tests for a non-trivial change; fixed `wait(ms)` where polling works
- Base branch not matching the change type (see Branches)

Not findings: legacy patterns in lines the diff doesn't touch, and a11y/RTL gaps the PR explicitly scopes out.
