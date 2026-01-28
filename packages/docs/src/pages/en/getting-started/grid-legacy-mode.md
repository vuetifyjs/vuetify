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

Vuetify 4 introduced a new grid system that uses CSS `gap` instead of negative margins on rows and padding on columns. If you need to maintain compatibility with the previous layout behavior, you can use the CSS overrides below.

## Differences between old and new

| Aspect         | Previous (v4.0.0-alpha.0)                 | New (v4)                             |
|----------------|-------------------------------------------|--------------------------------------|
| Row spacing    | Negative margins (`margin: -12px`)        | CSS `gap` property                   |
| Column spacing | Padding (`padding: 12px`)                 | No padding (gap handles spacing)     |
| Column width   | Simple percentage (e.g., `flex: 0 0 50%`) | Calculated width accounting for gaps |
| Offset classes | `.offset-{n}`                             | `.v-col-offset-{n}`                  |

## CSS Override

Add the following CSS to your application to restore the legacy grid behavior.

```scss
@layer vuetify-overrides {
  .v-row {
    gap: unset;
    margin: calc(var(--v-col-gap-x) * -.5);
  }
  .v-row + .v-row {
    margin-top: calc(var(--v-col-gap-y) * .5);
  }
  .v-col {
    padding: calc(var(--v-col-gap-x) * .5);
  }
  .v-row > [class*='v-col-'] {
    flex: 0 0 calc(100% * var(--v-col-size) / var(--v-row-columns));
    max-width: calc(100% * var(--v-col-size) / var(--v-row-columns));
  }
  .v-row > [class*='v-col-offset-'] {
    margin-inline-start: calc(100% * var(--v-col-offset) / var(--v-row-columns));
  }
  .v-row > .v-col-auto { flex: 0 0 auto; max-width: auto; max-width: 100% }
  @media (min-width: 600px) { .v-row > .v-col-sm-auto { flex: 0 0 auto; max-width: auto; max-width: 100% } }
  @media (min-width: 840px) { .v-row > .v-col-md-auto { flex: 0 0 auto; max-width: auto; max-width: 100% } }
  @media (min-width: 1145px) { .v-row > .v-col-lg-auto { flex: 0 0 auto; max-width: auto; max-width: 100% } }
  @media (min-width: 1545px) { .v-row > .v-col-xl-auto { flex: 0 0 auto; max-width: auto; max-width: 100% } }
  @media (min-width: 2138px) { .v-row > .v-col-xxl-auto { flex: 0 0 auto; max-width: auto; max-width: 100% } }
}
```

## Caveats

- the `gap` prop on VRow will have no effect when using legacy mode
- this should be treated as temporary migration aid
