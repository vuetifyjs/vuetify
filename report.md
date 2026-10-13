# Handwritten component declarations — report

Experiment for [#23005](https://github.com/vuetifyjs/vuetify/issues/23005): ship hand-maintained `*.types.d.ts` next to each component instead of the `tsc`-emitted declarations.

Before: `c5ce3396e1`. After: `cd3c8d7b97` plus uncommitted api-generator fixes. Same machine, same `node_modules`.

## Consumer type-checking (`tsc`, `skipLibCheck: true`)

Median of 5 runs.

| Import | Files | Memory | Time |
|---|---|---|---|
| `createVuetify()` | 553 → 588 | 591 MB → 190 MB (−68%) | 1.37 s → 0.43 s (−69%) |
| `vuetify/components` + labs | 543 → 576 | 570 MB → 178 MB (−69%) | 1.36 s → 0.45 s (−67%) |
| `VSelect` only | 215 → 193 | 230 MB → 138 MB (−40%) | 0.66 s → 0.44 s (−33%) |

The file count goes up slightly: there are more, much smaller files. The big drop in memory comes from duplication in the emitted declarations disappearing.

## Shipped declarations

| | Before | After |
|---|---|---|
| `dist/vuetify.d.ts` + `vuetify-labs.d.ts` | 15.1 MB | 0.9 MB |
| VSelect public types | 823 KB | 5 KB |
| Errors with `skipLibCheck: false` (all components) | 656 | 328, none in handwritten files |

## Repo tooling

Median of 5 alternating runs.

| Task | Time | Peak RSS |
|---|---|---|
| `pnpm build` (packages/vuetify) | 31.4 s → 25.4 s (**−18.9%**) | 2.34 GB → 2.36 GB (+0.9%) |
| api-generator | 15.1 s → 13.0 s (**−13.9%**) | 12.5 GB → 9.3 GB (**−26.2%**) |

## What changed

- 216 components (all of `vuetify/components` and labs) have a handwritten `X.types.d.ts`. Each contains `XProps` with alphabetical keys, `XDefaultKeys`, slots, emits and exposed members, typed through `VuetifyComponent<…>`.
- Shared types moved into `.types.d.ts` files next to the composable or component that owns them. `util/shared.types.d.ts` keeps only the generic ones.
- The build copies `src/**/*.types.d.ts` into `lib/` and points each folder's `index.d.ts` at them. The emitted `X.d.ts` files still ship for deep imports.
- The api-generator reads `lib/**/index.d.ts`, which resolves to the handwritten types, instead of the sources.
- `X['$props']` and `ref<X>()` keep their old shape, including generic `v-model` inference and the exposed members.

## Drift protection

`src/components/__tests__/types.spec.ts` compares every handwritten component with its source: `$props`, resolved props, exposed members, emits, default keys and slots. A missing or mistyped prop fails typecheck. All 216 components pass.

The regular typecheck uses `skipLibCheck`, which hides errors inside `.d.ts` files, including the handwritten ones. They need a pass with `--skipLibCheck false`, or a dedicated tsconfig, in CI.

## Known gaps

- Data-table and calendar slot types are built from `ReturnType<typeof provideSort>` and similar function types. Their handwritten files still import the source modules, which load the emitted declarations.
- Docs output: all 236 API pages generate. Differences from before:
  - Type links now point at `src/**/*.types.d.ts`.
  - Unions print in a different order.
  - VExpandBothTransition, VHeatmapLegend and VHeatmapLegendCell gain props that were missing before.
  - About 60 props show a different description. When several locale files describe the same prop, the first source wins, and the new type order changes which one comes first. The api-generator now follows declaration order to keep this stable, but it still differs from before. Fixing it properly means deduplicating those locale entries.
