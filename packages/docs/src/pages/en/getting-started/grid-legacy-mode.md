---
meta:
  nav: Grid legacy mode
  title: Grid legacy mode
  description: How to restore the previous grid behavior using negative margins and column padding
  keywords: grid, legacy, v-row, v-col, migration, upgrade, negative margins, padding
related:
  - /getting-started/upgrade-guide/
  - /components/grids/
---

# Grid Legacy Mode

Vuetify 4 introduces an overhaul to the grid system utilizing CSS `gap` instead of negative margins on rows and padding on columns. If you need to maintain compatibility with the previous layout behavior, you can use the CSS overrides below.

## Differences between old and new

| Previous                                 | New                                  |
|------------------------------------------|--------------------------------------|
| Negative margins in VRow                 | CSS `gap` property                   |
| Column spaced by padding                 | No padding (gap handles spacing)     |
| Simple percentage (e.g. `flex: 0 0 75%`) | Calculated width accounting for gaps |

Internal class names changed as well

| Previous                  | New                             |
|---------------------------|---------------------------------|
| `.v-row--dense`           | `.v-row--density-comfortable`   |
| `.v-row--no-gutters`      | `.v-row--density-compact`       |
| `.v-col-{n}`              | `.v-col--cols-{n}`              |
| `.v-col-{breakpoint}-{n}` | `.v-col--cols-{breakpoint}-{n}` |
| `.offset-{n}`             | `.v-col--offset-{n}`            |

## CSS Override

Add the following CSS to your application to restore the legacy grid behavior.

```scss
@layer vuetify-overrides {
  .v-row {
    gap: unset;
    margin: calc(var(--v-col-gap-y) * -.5) calc(var(--v-col-gap-x) * -.5);
  }
  .v-row + .v-row {
    margin-top: calc(var(--v-col-gap-y) * .5);
  }
  .v-col {
    padding: calc(var(--v-col-gap-y) * .5) calc(var(--v-col-gap-x) * .5);
    flex-basis: var(--v-col-is-size, calc(100% * var(--v-col-size) / var(--v-col-size-columns))) var(--v-col-is-auto, auto) var(--v-col-is-grow, 0);
  }
  .v-col:where([class*='v-col--offset-']) {
    margin-inline-start: calc(100% * var(--v-col-offset) / var(--v-col-size-columns))
  }
}
```
