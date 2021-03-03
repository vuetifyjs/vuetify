---
meta:
  title: Alpha release notes
  description: Stay up to date with the latest release notes. The migration guides will also help you migrate applications though major releases.
  keywords: migration, releases, upgrading vuetify, v3, alpha
related:
  - /getting-started/installation/
  - /getting-started/contributing/
  - /introduction/roadmap/
---

# Alpha Release Notes

This is a full master list of release notes covering all of Vuetify 3 Alpha. This will be updated as new components and features become available. For more details and answers to common questions related to the Alpha, visit the [Installation](/getting-started/installation/) page.

## Current changes

feat: add global prop defaults, update bootstrapping (#12344)

feat(dimensions): create composition function (#10410)

- props:
  - **height**
  - **maxHeight**
  - **maxWidth**
  - **minHeight**
  - **minWidth**
  - **width**

feat(size): create new effect (#10418)

- props:
  - **x-small**
  - **small**
  - **default**
  - **large**
  - **x-large**
- usage: `v-size--${size}`

feat(framework): add (global) global default prop values #12498

- adds a global property to defaults object where one can specify prop values that will override any values set on a component level in defaults, or locally in the component itself.

feat(scroll): create composition functions #10413

- props:
  - **scrollTarget**
  - **scrollThreshold**

feat: add group composable #12533

- Adds composable for selection and group behavior, checkboxes radios carousel etc.
- Supports **mandatory**, **multiple**, and **max** props
- Supports implicit and explicit item values

feat: update grid system to Vue 3 #12822

- **BREAKING CHANGE:** grid classes now have a `v-` prefix
- **BREAKING CHANGE:** `v-layout`, `v-flex`, and `<v-container grid-list-{size}>` have been removed

feat: initial theme implementation #12542

- **BREAKING CHANGE:** theme **isDark** prop removed
  - should use **theme** prop instead, e.g. `theme: 'dark'`
- new **context** prop added

feat(tag): create new composable #12887

- custom **tag** on components

feat(border-radius): add new composable #12886

- prop for border-radius rounded,
- usage: `rounded: tile** || circle || pill || tr-xl br-lg`
- **BREAKING CHANGE:** `v-btn` keeps rounded/outlined utility props -> discord-> #core

style(theme): rename themeClass variable to themeClasses

style(elevation.ts): rename useElevationClasses to useElevation

- naming conventions in line with other composables

feat(position.ts): add new composable (#12976)

- position props added:
  - **bottom**
  - **left**
  - **position**
  - **right**
  - **top**
- examples:
  - **absolute** gives `position-absolute`
  - `left: 15 | 15` gives `15px left`

feat(border.ts): add new composable #12975

- prop **border** added
- examples: `tr opacity-50` gives `border-tr`, `border-opacity-50`

feat: update VResponsive and VImg to Vue 3 (#12943)

- **BREAKING CHANGE:** Removed `contain`, it's now the default. Added `cover`.
- **BREAKING CHANGE:** Reordered `v-intersect` arguments, `isIntersecting` is now the first arg
- **BREAKING CHANGE:** Changed `v-img` class names
- **BREAKING CHANGE:** No longer using `background-image`

feat(VBanner): port to v3 #13035

- props:
  - **avatar**
  - **icon**
  - **mobile**
  - **single-line**
  - **sticky**
- prop value removed

feat(color): create composition functions #10337

- added composite for color and bg, e.g. `color="primary" bg="secondary"`, or `color="#ff0000" bg="#00ff00"`

feat: update VIcon to Vue 3 #12741

- usage:
  - `$close`
  - `md:close` (material icons)
  - `mdi:mdi-close` (md icons)
  - `fa5:fas fa-home`
  - `mdi-svg:{svgPath}`

feat: update VBtn to Vue 3 #13097

- **BREAKING CHANGE:** Removed individual size props, use `size="..."` instead
- **BREAKING CHANGE:** depressed changed to flat

<backmatter />
