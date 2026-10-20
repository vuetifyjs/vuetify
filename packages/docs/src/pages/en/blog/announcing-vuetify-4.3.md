---
layout: blog
meta:
  title: Announcing Vuetify v4.3
  description: Vuetify v4.3 "Paladin" brings data table and form controls, new labs components, right-click menus, opt-in MD Expressive styles and a steadier SSR layout.
  keywords: Vuetify v4.3, Vuetify Paladin, VDataTable, VAutocomplete, VMenu, contextmenu, Material Design Expressive, VBtn, VSlider, VTabs, VSlideGroup, SSR, v-touch-hold, Vuetify0
---

# Announcing Vuetify v4.3

---

🖊️ John Leider • 📅 October 20th, 2026

<PromotedEntry />

<!-- TODO: banner image -->

---

<!-- TODO: code examples in this post have not been run against 4.3.0 -->

## Introduction

Vuetify v4.3 is a minor release with no breaking changes.

It adds more control over filtering and selection in data tables and forms, a batch of new labs components, right-click menus for VMenu, and opt-in Material Design Expressive styles for 7 components. It also includes new options for carousels and slide groups, and a more stable layout for SSR apps.

This post covers the highlights. For everything else, see [the full changelog](https://github.com/vuetifyjs/vuetify/releases/tag/v4.3.0).

---

- [Data tables & forms](#data-tables-forms)
- [Labs preview](#labs-preview)
- [VMenu contextmenu](#vmenu-contextmenu)
- [7 components aligned with Material Design Expressive](#7-components-aligned-with-material-design-expressive)
  - [Button sizes](#button-sizes)
  - [Progress](#progress)
  - [Sliders](#sliders)
  - [Tabs](#tabs)
- [Carousel alternatives](#carousel-alternatives)
  - [VSlideGroup padding and gap](#vslidegroup-padding-and-gap)
  - [VCarousel pause-on-hover](#vcarousel-pause-on-hover)
  - [Wheel navigation](#wheel-navigation)
  - [VInfiniteCarousel](#vinfinitecarousel)
- [Stable layout & SSR](#stable-layout-ssr)
- [Under the hood](#under-the-hood)
- [v-touch-hold](#v-touch-hold)
- [Promoted from labs](#promoted-from-labs)

## Data tables & forms

More control over how lists filter and how rows select.

### Filtered order

`VAutocomplete` and `VCombobox` have a **filtered-order** prop for controlling the order of items after filtering.

**Details:** [PR#23282](https://github.com/vuetifyjs/vuetify/pull/23282)

### Filtered select strategy

`VDataTable` adds a **filtered** select strategy, so select all applies to the rows that match the current filter.

**Details:** [Commit 041bb72](https://github.com/vuetifyjs/vuetify/commit/041bb7269d228e97f9dda210362d149a4d0ff709), closes [#22867](https://github.com/vuetifyjs/vuetify/issues/22867)

### Row state in row-props

`isSelected` and `isExpanded` are now passed to **row-props**, and selected and expanded rows are marked with data attributes, so you can style them without extra bookkeeping.

**Details:** [PR#23238](https://github.com/vuetifyjs/vuetify/pull/23238), [Commit 1b4a6b4](https://github.com/vuetifyjs/vuetify/commit/1b4a6b430340a5dc32a441b3ba281ae1d874a711), closes [#17670](https://github.com/vuetifyjs/vuetify/issues/17670)

### Descriptions on selection controls

Checkboxes, radios and switches can show a description through the new **description** prop and slot on `VSelectionControl`.

**Details:** [Commit 3e734be](https://github.com/vuetifyjs/vuetify/commit/3e734be3d6e9141237f1b57dd32a1010f5a4f7b8), closes [#21773](https://github.com/vuetifyjs/vuetify/issues/21773)

### Smaller form updates

- `VDateInput` shows a localized format hint ([PR#23173](https://github.com/vuetifyjs/vuetify/pull/23173))
- `VTextarea` keeps native undo history when **auto-grow** is on ([PR#23279](https://github.com/vuetifyjs/vuetify/pull/23279))

## Labs preview

These are new in labs. You can try them today, but the API may still change before they move to core, so pin your version if you use them in production.

- `VAudio` ([PR#23227](https://github.com/vuetifyjs/vuetify/pull/23227))
- `VSplitBtn` ([PR#23267](https://github.com/vuetifyjs/vuetify/pull/23267))
- `VTimeInput` ([PR#23141](https://github.com/vuetifyjs/vuetify/pull/23141))
- `VLoadingIndicator` ([Commit c5ce339](https://github.com/vuetifyjs/vuetify/commit/c5ce3396e1c3e51c6925aab8f3a63365f7acc42a))

`VVideo` also picked up an **actions** prop and an overhauled progress bar and volume control ([PR#23241](https://github.com/vuetifyjs/vuetify/pull/23241)).

Try them out and let us know what you think on [Discord](https://community.vuetifyjs.com/).

## VMenu contextmenu

[v-menu](https://vuetifyjs.com/components/menus/) can now open on right click with the new **contextmenu** prop.

```html
<template>
  <v-menu contextmenu>
    <template #activator="{ props }">
      <v-card v-bind="props" text="Right click me" />
    </template>

    <v-list>
      <v-list-item title="Rename" />
      <v-list-item title="Delete" />
    </v-list>
  </v-menu>
</template>
```

**Details:** [PR#23196](https://github.com/vuetifyjs/vuetify/pull/23196), closes [#9235](https://github.com/vuetifyjs/vuetify/issues/9235)

<!-- TODO: confirm count 7 with J-Sek -->

## 7 components aligned with Material Design Expressive

`VBtn`, `VIconBtn`, `VBtnGroup`, `VProgressLinear`, `VProgressCircular`, `VSlider` and `VTabs` have new options that follow Material Design Expressive. All of it is opt-in through the `md3` blueprint. **If you don't use the blueprint, nothing in your app changes.**

```ts { resource="src/plugins/vuetify.ts" }
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'

export default createVuetify({
  blueprint: md3,
})
```

### Button sizes

`VBtn`, `VIconBtn` and `VBtnGroup` support the Expressive sizes, plus the radius animation on press. There's a new guide that walks through it: [MD3 button sizes](https://vuetifyjs.com/features/md3-button-sizes/).

**Details:** [PR#23253](https://github.com/vuetifyjs/vuetify/pull/23253)

### Progress

[v-progress-linear](https://vuetifyjs.com/components/progress-linear/) and [v-progress-circular](https://vuetifyjs.com/components/progress-circular/) add a split variant, a stop indicator, a rounded bar and a wavy track.

**Details:** [PR#23276](https://github.com/vuetifyjs/vuetify/pull/23276)

### Sliders

[v-slider](https://vuetifyjs.com/components/sliders/) has a new **pill** variant and a **centered** prop for values that start from the middle.

```html
<v-slider variant="pill" />

<v-slider centered min="-50" max="50" />
```

**Details:** [PR#22699](https://github.com/vuetifyjs/vuetify/pull/22699), [PR#23277](https://github.com/vuetifyjs/vuetify/pull/23277)

### Tabs

`VTab` gets a **slider-variant** prop for the primary tab indicator style.

**Details:** [PR#23181](https://github.com/vuetifyjs/vuetify/pull/23181)

## Carousel alternatives

A few new options for content that scrolls or cycles.

<!-- TODO: VSlideGroup padding/gap: confirmed in the v4.3.0 release notes (#23184), but rendering has not been visually verified on 4.3.0. Check a live render before publishing. -->

### VSlideGroup padding and gap

[v-slide-group](https://vuetifyjs.com/components/slide-groups/) has **padding** and **gap** props, so you can space items without custom CSS. VTabs and VChipGroup are built on VSlideGroup, so they get these too.

**Details:** [PR#23184](https://github.com/vuetifyjs/vuetify/pull/23184), closes [#11972](https://github.com/vuetifyjs/vuetify/issues/11972)

### VCarousel pause-on-hover

The new **pause-on-hover** prop pauses a cycling carousel while the pointer is over it.

```html
<v-carousel cycle pause-on-hover />
```

**Details:** [Commit e835b88](https://github.com/vuetifyjs/vuetify/commit/e835b885a181052f830f75e80cb716764e634da6), closes [#10544](https://github.com/vuetifyjs/vuetify/issues/10544)

### Wheel navigation

`VWindow` and `VCarousel` support mouse wheel navigation, and the wrap animation is now correct when using arrows or touch.

**Details:** [PR#22906](https://github.com/vuetifyjs/vuetify/pull/22906)

### VInfiniteCarousel

`VInfiniteCarousel` is new in labs, for content that loops continuously.

**Details:** [PR#23116](https://github.com/vuetifyjs/vuetify/pull/23116)

## Stable layout & SSR

Layout item sizes and offsets now render before mount, so SSR apps keep a stable layout on load instead of shifting once the app hydrates.

**Details:** [PR#23250](https://github.com/vuetifyjs/vuetify/pull/23250)

A few other layout updates:

- `VRow` has responsive gap props ([PR#23246](https://github.com/vuetifyjs/vuetify/pull/23246))
- A new `layers.css` entry point for projects that manage CSS layers themselves ([Commit ed2dbea](https://github.com/vuetifyjs/vuetify/commit/ed2dbeaa96c944052e85e7bf9678f8b8da9956a3))
- `VNavigationDrawer` has a **modal** prop and `v-model:expanded` ([PR#23182](https://github.com/vuetifyjs/vuetify/pull/23182))

## Under the hood

We've started porting core framework features over to use Vuetify0 under the hood. The first pieces are the display, locale, RTL and observer composables ([PR#23210](https://github.com/vuetifyjs/vuetify/pull/23210), [PR#23220](https://github.com/vuetifyjs/vuetify/pull/23220)). You shouldn't notice anything in your app, but more of the framework will follow in upcoming releases, so a fix in one place lands in both.

## v-touch-hold

`v-touch-hold` is a new directive for long-press interactions on mobile and other touch devices.

**Details:** [PR#23269](https://github.com/vuetifyjs/vuetify/pull/23269), closes [#5322](https://github.com/vuetifyjs/vuetify/issues/5322)

## Promoted from labs

[v-avatar-group](https://vuetifyjs.com/components/avatar-groups/), [v-highlight](https://vuetifyjs.com/components/highlights/) and [v-progress](https://vuetifyjs.com/components/progress/) graduated from labs to core, so update any `vuetify/labs` imports.

<!-- TODO: no single PR link for the labs promotions; add if there is one -->

---

::: warning

**Vuetify needs your support.** Open Collective is how we fund the team that builds releases like this one. If your team relies on Vuetify, point your organization at [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider).

:::

For a complete list of all the changes and features in v4.3, please see the [full changelog](https://github.com/vuetifyjs/vuetify/releases/tag/v4.3.0).

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements.*
