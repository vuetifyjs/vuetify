---
paths: ['packages/vuetify/src/**/*.sass', 'packages/vuetify/src/**/*.scss']
---

# Styles

No stylelint — nothing below is enforced mechanically.

## Files

- `VExample.sass` — rules, inside `@include tools.layer('components')` so users override without fighting specificity
- `_variables.scss` — `$example-*: … !default`

## Values

- Anything a user may want to tune gets a `$example-*` variable
- Values that change at runtime or cascade into children are custom properties (`--v-example-*`)
- Colors from `rgb(var(--v-theme-*))`, never literals
- Shared tokens from `settings.$*` (rounded, typography, border, easing)

## Tools before hand-rolling

`tools.states`, `rounded`, `elevation`, `density`, `border`, `variant`, `typography`, `absolute`. Grep an existing component using the mixin before inventing a variant of it.

## RTL

Logical properties first (`margin-inline-start`, `inset-inline-end`, `padding-inline`). `tools.rtl` / `tools.ltr` only for what logical properties can't express — transforms, icon flips, gradients.

## Forced colors

Backgrounds, shadows and overlays disappear in forced-colors mode. Anything relying on them to be visible (surfaces, selected/active states, focus, progress fills, dividers drawn with background) needs a fallback:

```sass
@media (forced-colors: active)
  .v-example
    &:not(&--variant-text, &--variant-plain)
      border: thin solid

    &:focus-visible
      outline: 2px solid
      outline-offset: 2px
```

Prefer `currentColor` / plain `solid`; system colors (`Highlight`, `Canvas`) only when state must be distinguishable.

## Motion

Transitions and animations that move or resize need `@media (prefers-reduced-motion: reduce)` handling.

`transition` followed by `transition-*` in the same rule is merged into one shorthand by newest Vite. The source looks fine in review while the shipped CSS differs. Write the full shorthand instead:

```sass
// ❌
transition: .2s settings.$standard-easing
transition-property: width, height

// ✅
transition: width .2s settings.$standard-easing, height .2s settings.$standard-easing
```

Existing files still use the two-line form — don't copy it.

## Direction

Keep CSS per visual variant minimal. Prefer toggling a custom property over another block of generated modifier classes — future design systems drop MD-only CSS.

## Hand-off

You can't see the result. After a style change, tell the dev what to check in the Playground instead of claiming it looks right:

- affected variants, densities, sizes
- dark theme and RTL
- forced colors: DevTools → Rendering → Emulate CSS media feature `forced-colors: active`
- reduced motion, when transitions changed
