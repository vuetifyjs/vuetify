---
layout: blog
meta:
  title: May 2026 Update
  description: May shipped Vuetify 4.1 — seven labs promotions, four new components, and a wave of fixes across four releases, with Vuetify0 racing toward its own beta.
  keywords: Vuetify May 2026, Vuetify 4.1 Ascendant, labs promotion, VHeatmap, VHighlight, VMonthPicker, VDateRangePicker, Vuetify0 drag and drop, createSortable, createKanban
---

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const vuetifylogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vuetify-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const onelogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const releasesimg = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/may-2026-update/releases-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const v0img = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/may-2026-update/v0-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# May 2026 Update

**May was a feature-focused sprint.** With Vuetify 4 stable since February, we spent the month building out the first minor — and on May 21 that work opened [v4.1.0](/getting-started/release-notes/?version=v4.1.0). The whole month ran at full throttle, working through a long backlog of features and fixes we had lined up for v4.1: **seven components promoted out of labs**, four brand-new ones, and a broad sweep of new props and bug fixes across the framework. Four releases shipped over the month, while Vuetify0 ran in parallel toward its own beta.

![Hero image for May update](https://cdn.vuetifyjs.com/docs/images/blog/may-2026-update/may-hero.png "May hero image"){ height=112 }

🖊️ Jacek Czarniecki • 📅 June 5th, 2026

<PromotedEntry />

---

## A release chock-full of goodies

May was our busiest framework month of the year so far, and nearly all of it pointed at one goal: shipping v4.1. **89 commits**, **34 features**, **19 fixes**, and **4 releases**, with [v4.1.0](/getting-started/release-notes/?version=v4.1.0) at the center. Rather than spreading ourselves across the ecosystem, we put the energy into clearing the framework backlog — graduating labs components that had earned their place, finishing half-built features, and dealing with the fixes that had to land before the minor. The effort shows up in the numbers: open issues dropped from 436 at the start of May to 386 by the 31st — and zooming out, the backlog is down 22% over the last three months. Meanwhile [Vuetify0](https://0.vuetifyjs.com/) wrapped up its alpha work with a headless drag-and-drop family and a testing push that set up the [beta announced June 2](/blog/announcing-vuetify0-beta/).

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Spotlight: Vuetify 4.1](#vuetify-4-1)
* [Framework Updates](#framework-updates)
  * [New Components](#new-components)
  * [Out of Labs](#out-of-labs)
  * [New Features](#new-features)
  * [Bug Fixes](#bug-fixes)
  * [In Development](#in-development)
* [Vuetify0 Progress Update](#vuetify0-progress)
* [Product Updates](#product-updates)
* [May 2026 Changelog](#may-2026-changelog)
* [What's Next](#whats-next)
  * [Looking Further Ahead](#looking-ahead)

---

## Releases

May shipped **four framework releases**. [v4.0.7](/getting-started/release-notes/?version=v4.0.7) (May 8) was a patch with seven bug fixes. The feature work then opened the [v4.1.0](/getting-started/release-notes/?version=v4.1.0) minor — a first drop on May 21 carried the labs promotions and new components, and a May 28 follow-up focused on data table accessibility. A [v4.0.8](/getting-started/release-notes/?version=v4.0.8) patch (May 29) shipped a round of fixes on the stable v4.0 line — the same fixes that merge forward into v4.1.

<AppFigure :src="releasesimg" alt="May Releases Banner" title="May Releases Banner" />

### Key Improvements

* **[Vuetify 4.1](/getting-started/release-notes/?version=v4.1.0)** — first minor since 4.0.0, with seven labs promotions and four new components
* **[VHeatmap](/components/heatmaps/)** — new component for calendar/grid heatmaps (v4.1)
* **[VHighlight](/components/highlights/)** — new component for highlighting matched text (v4.1)
* **[VMonthPicker](/components/month-pickers/) / [VDateRangePicker](/components/date-pickers/)** — new date components (v4.1)
* **[VFileUpload](/components/file-upload/), [VDateInput](/components/date-inputs/), [VColorInput](/components/color-inputs/), [VIconBtn](/components/icon-buttons/), [VPicker](/components/pickers/), [VStepperVertical](/components/vertical-steppers/), [VPullToRefresh](/components/pull-to-refresh/)** — promoted from labs to core
* **[VSparkline](/components/sparklines/)** — interactive markers, a vertical guideline, and hover tooltips (v4.1)
* **[VOtpInput](/components/otp-input/)** — field grouping, a11y improvements, and emoji support (v4.1)
* **[VOverlay](/components/overlays/) / [VCommandPalette](/components/command-palette/)** — viewport location strategy for precise placement (v4.1)

View the complete list of changes in the [Full Changelog](#may-2026-changelog).

**Details:**

* [v4.1.0](https://vuetifyjs.com/getting-started/release-notes/?version=v4.1.0)
* [v4.0.8](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.8)
* [v4.0.7](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.7)

---

## Spotlight: Vuetify 4.1 (Ascendant) { #vuetify-4-1 }

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

After February's stable [Vuetify 4.0.0](/blog/february-2026-update/) and a string of patches, **May opened the first minor of the v4 line**. [v4.1.0](/getting-started/release-notes/?version=v4.1.0) is a feature release rather than a fix release — its theme is graduating components that proved themselves in labs, adding new ones, and expanding data table and date picker functionality.

The headline is volume. **Seven components moved out of labs** into core in a single release, and **four entirely new components** joined the framework. Alongside them came a wave of feature props across data tables, pickers, overlays, and the theme system — the breadth you'd expect from a minor, not a patch.

The work shipped in two drops in May — May 21 and May 28 — with the later one dedicated almost entirely to data table and table accessibility.

**Details:**

* [v4.1 Release Notes](/getting-started/release-notes/?version=v4.1.0)
* [Roadmap](/introduction/roadmap/)

---

## Framework Updates

### New Components

Four new components landed in v4.1:

**[VHeatmap](/components/heatmaps/)** — A calendar/grid heatmap for visualizing values across a matrix of cells, with a configurable legend, group gaps, and rounded cells ([#22535](https://github.com/vuetifyjs/vuetify/pull/22535)).

**[VHighlight](/components/highlights/)** — Highlights matched substrings within text — useful for search results, filtering, and command palettes. It pairs with the `toHighlight` transformer being added in v0 ([#22817](https://github.com/vuetifyjs/vuetify/pull/22817)).

**[VMonthPicker](/components/month-pickers/)** — A dedicated month-and-year selection component, split out from the date picker family ([#22534](https://github.com/vuetifyjs/vuetify/pull/22534)).

**[VDateRangePicker](/components/date-pickers/)** — Range selection as a first-class component, with MD3-aligned range styling and keyboard grid navigation ([#22860](https://github.com/vuetifyjs/vuetify/pull/22860)).

### Out of Labs

Seven components graduated from labs to core in v4.1. For most of them this is just a formality — they've been stable and largely untouched since 2025, so the promotion simply acknowledges APIs that had already settled. VFileUpload is the exception, picking up real additions on its way out:

* **[VFileUpload](/components/file-upload/)** — also gained a `loading` prop and support for pasting files and folders
* **[VDateInput](/components/date-inputs/)**
* **[VColorInput](/components/color-inputs/)**
* **[VIconBtn](/components/icon-buttons/)**
* **[VPicker](/components/pickers/)**
* **[VStepperVertical](/components/vertical-steppers/)**
* **[VPullToRefresh](/components/pull-to-refresh/)**

### New Features

**[VDataTable](/components/data-tables/basics/)** — The data table received the most attention of any component this month. Some additions are quick to summarize: search-match highlighting ([#22852](https://github.com/vuetifyjs/vuetify/pull/22852)), a mobile header slot ([#21429](https://github.com/vuetifyjs/vuetify/pull/21429)), and full ARIA support — `aria-sort` on sortable headers and labels for selection controls. Others deserve a closer look:

* The new **`expanded`** slot ([#22871](https://github.com/vuetifyjs/vuetify/pull/22871)) renders custom detail content with a built-in transition, and the accompanying **`expand-strategy`** prop makes the table behave like an accordion — set it to `"single"` and opening one row collapses the others, no extra state-juggling required (`expand-transition` can swap or disable the animation).
* **`v-model:opened`** ([#22772](https://github.com/vuetifyjs/vuetify/pull/22772)) two-way binds which groups are open and adds an `open-all` prop and a custom `group-key`, which lets you drive group state from code — expand everything by default, or save and restore a user's open groups across sessions.
* The **`loading`** prop now accepts a `{ side, color }` object ([#22872](https://github.com/vuetifyjs/vuetify/pull/22872)), which lets you place the progress bar on a chosen edge — for example, at the bottom to signal a load-more-on-scroll footer is fetching the next page.
* Filtered **`itemsLength`** in slot props ([#22874](https://github.com/vuetifyjs/vuetify/pull/22874)) exposes the post-filter row count, which closes the last gap to fully replacing `VDataTableFooter` with your own — you can now render "X results" and wire pagination from the slot without reaching into the table's internals.

**[VOtpInput](/components/otp-input/)** — Fields can now be grouped into segments, with accessibility improvements and emoji support, co-authored by [Yanis-Riani](https://github.com/Yanis-Riani) ([#22803](https://github.com/vuetifyjs/vuetify/pull/22803)).

**[VSparkline](/components/sparklines/)** — gained `interactive` prop to show markers, a vertical guideline, and hover tooltips ([#22748](https://github.com/vuetifyjs/vuetify/pull/22748)).

<video width="100%" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/may-2026-update/interactive-sparkline.webm" type="video/webm"></source>
</video>

**[VOverlay](/components/overlays/) and [VCommandPalette](/components/command-palette/)** — A new viewport location strategy lets overlays enforce a specific on-screen placement ([#22698](https://github.com/vuetifyjs/vuetify/pull/22698)), and `location`/`origin` now behave the way you'd expect ([#22720](https://github.com/vuetifyjs/vuetify/pull/22720)).

**[VTable](/components/tables/)** — Added a `caption` slot with pass-through of `aria-*` attributes and a `gridlines` prop ([#22873](https://github.com/vuetifyjs/vuetify/pull/22873)).

**[VDatePicker](/components/date-pickers/)** — Keyboard-arrow navigation in the selection grid ([#22857](https://github.com/vuetifyjs/vuetify/pull/22857)) plus MD3-aligned range selection ([#22858](https://github.com/vuetifyjs/vuetify/pull/22858)).

![Date Picker - new range selection](https://cdn.vuetifyjs.com/docs/images/blog/may-2026-update/date-picker.png)

**[VNumberInput](/components/number-inputs/)** — The new `grouping` prop is a deep piece of work, not just a thousands-separator toggle ([#22134](https://github.com/vuetifyjs/vuetify/pull/22134)). It applies locale-aware grouping and decimal separators that hold together while you type, paste, cut, and delete — the separators reflow as you edit rather than only on blur — honors custom decimal and group separators.

**[VProgressLinear](/components/progress-linear/)** — A new `split` variant aligns the bar with Material Design 3, drawing a gap between the filled portion and the remaining track instead of one continuous line ([#22662](https://github.com/vuetifyjs/vuetify/pull/22662)). It reworked how the bar's chunks are calculated and rendered to match the MD3 progress indicator.

**Arbitrary `rounded` values** — The list is already long, but this one earns its spot ([#22721](https://github.com/vuetifyjs/vuetify/pull/22721)): `rounded` now accepts any value, finally letting you break out of the strict `sm`/`md`/`lg`/`xl` scale and dial in the exact corner radius your design calls for.

<video width="100%" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/may-2026-update/rounded.webm" type="video/webm"></source>
</video>

**[VSwitch](/components/switches/)** — Late in the month, the switch was aligned with the MD3 spec ([#22879](https://github.com/vuetifyjs/vuetify/pull/22879)) and gained a `size` prop ([#22882](https://github.com/vuetifyjs/vuetify/pull/22882)) and a `square` inset variant ([#22881](https://github.com/vuetifyjs/vuetify/pull/22881)).

<video width="100%" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/may-2026-update/switch.webm" type="video/webm"></source>
</video>

Rounding out the month, a handful of smaller additions: `VCalendar` gained 24-hour support ([#22853](https://github.com/vuetifyjs/vuetify/pull/22853)), the theme system picked up optional page transitions ([#22623](https://github.com/vuetifyjs/vuetify/pull/22623)), and a `hover-elevation` prop with matching CSS utilities ([#22621](https://github.com/vuetifyjs/vuetify/pull/22621)) and a long awaited `color` prop for `VTooltip` ([#19689](https://github.com/vuetifyjs/vuetify/pull/19689)).

### Bug Fixes

| Component                               | Fix                                              | Version | PR                                                        |
|-----------------------------------------|--------------------------------------------------|---------|-----------------------------------------------------------|
| **VAlert**                              | Border opacity should win over theme variables   | v4.0.7  | [#22832](https://github.com/vuetifyjs/vuetify/pull/22832) |
| **VTreeview / VList**                   | Wire `value-comparator` into selection logic     | v4.0.7  | [#22841](https://github.com/vuetifyjs/vuetify/pull/22841) |
| **VField**                              | Correct baseline alignment                       | v4.0.7  | [#22812](https://github.com/vuetifyjs/vuetify/pull/22812) |
| **VCheckbox**                           | Align indeterminate opacity and color with MD3   | v4.1.0  | [#22804](https://github.com/vuetifyjs/vuetify/pull/22804) |
| **VSnackbarQueue**                      | Avoid stale z-index                              | v4.1.0  | [#22796](https://github.com/vuetifyjs/vuetify/pull/22796) |
| **VProgressLinear**                     | Correct calculation for filled chunks            | v4.0.7  | —                                                         |
| **VBtnToggle**                          | Correct background when active                   | v4.0.7  | —                                                         |
| **VHover**                              | Reconcile actual hover state when re-enabled     | v4.1.0  | [#22845](https://github.com/vuetifyjs/vuetify/pull/22845) |
| **VAutocomplete / VCombobox**           | Click in empty space should not close menu       | v4.0.8  | [#22754](https://github.com/vuetifyjs/vuetify/pull/22754) |
| **VSelect / VAutocomplete / VCombobox** | Keep menu open when scrolling                    | v4.0.8  | [#22877](https://github.com/vuetifyjs/vuetify/pull/22877) |
| **VOverlay**                            | Restore focus without preventing Enter keydown   | v4.0.8  | [#22276](https://github.com/vuetifyjs/vuetify/pull/22276) |
| **theme**                               | Support transparent hex color for CSS variables  | v4.0.8  | [#22875](https://github.com/vuetifyjs/vuetify/pull/22875) |
| **VForm**                               | Avoid eager `.value` reads in default slot props | v4.0.8  | [#22846](https://github.com/vuetifyjs/vuetify/pull/22846) |
| **VProgressLinear**                     | Avoid `opacity:NaN` when rendering with SSR      | v4.1.0  | [#22880](https://github.com/vuetifyjs/vuetify/pull/22880) |
| **focusTrap**                           | Prevent page scroll when capturing focus         | v4.1.0  | —                                                         |

---

## Vuetify0 Progress Update { #vuetify0-progress }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

May was Vuetify0's bridge from alpha to beta — **163 commits** across **three releases** ([v1.0.0-alpha.3](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.3) on May 5, [alpha.4](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.4) on May 12, [alpha.5](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.5) on May 19). The headline addition was a **headless drag-and-drop family** — three composables that handle state and behavior only, with no markup or styling — alongside a testing and hardening push that set up the [beta announced on June 2](/blog/announcing-vuetify0-beta/).

<AppFigure :src="v0img" alt="Vuetify0 Progress" title="Vuetify0 May Progress" />

### Drag and Drop

* **[useDragDrop](https://0.vuetifyjs.com/composables/system/use-drag-drop)** ([#225](https://github.com/vuetifyjs/0/pull/225)) — the base primitive: a pointer and keyboard input adapter owning two registries (draggables and drop zones) plus the active-drag state.
* **[createSortable](https://0.vuetifyjs.com/composables/data/create-sortable)** ([#231](https://github.com/vuetifyjs/0/pull/231)) — ordered-list state with `move`, `swap`, and `reorder` mutations and a typed `move:ticket` event. No DOM or input handling of its own, so it can be driven from buttons, gestures, or server updates.
* **[createKanban](https://0.vuetifyjs.com/composables/data/create-kanban)** ([#234](https://github.com/vuetifyjs/0/pull/234)) — two levels of `createSortable` (columns and items) plus a `transfer` method for moving items between columns.

### Other Additions

* **[createOtp](https://0.vuetifyjs.com/composables/forms/create-otp)** ([#238](https://github.com/vuetifyjs/0/pull/238)) — state and focus management for one-time-code inputs.
* **[Overflow](https://0.vuetifyjs.com/components/semantic/overflow)** ([#220](https://github.com/vuetifyjs/0/pull/220)) — a container that detects overflow and exposes scroll state to children.
* **[toHighlight](https://0.vuetifyjs.com/composables/transformers/to-highlight)** ([#222](https://github.com/vuetifyjs/0/pull/222)) — a transformer that marks matched substrings, the companion to VHighlight.
* **useDelay** ([#224](https://github.com/vuetifyjs/0/pull/224)) — debounce and delayed-execution timing.
* **Avatar** ([#245](https://github.com/vuetifyjs/0/pull/245)) — added `Avatar.Group` and `Avatar.Indicator` compound parts.

`createRegistry`, which the stateful composables build on, also gained a bulk `reorder` primitive and an `offboard` that returns removed entries — the latter is what `createKanban` uses to move items between columns.

### Genesis Design System

May also brought the first design system built on Paper: **[@paper/genesis](https://github.com/vuetifyjs/0/pull/240)** — a minimal set of docs primitives extracted from the v0 documentation site. It's an early, working example of the Paper layer the rest of the ecosystem will build on.

### Testing and Performance

By the end of the alpha cycle, v0 had **5,700+ unit tests** across 142 spec files, **98.7% average coverage** across 105 primitives, and 12 benchmark suites covering hot paths like `createDataTable`, `createFilter`, and the registry core. `createSortable`'s reorder was rewritten to use the registry's bulk operation instead of a per-item loop.

::: success

**Adopting Vuetify0 for your business?** Teams building production design systems, internal tooling, or product UI on top of v0 can [reach out](mailto:john@vuetifyjs.com) to talk through adoption, partnership, and roadmap input.

:::

**Details:**

* [Announcing the Vuetify0 Beta](/blog/announcing-vuetify0-beta/)
* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [v1.0.0-alpha.5 Release](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.5)
* [v1.0.0-alpha.4 Release](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.4)
* [v1.0.0-alpha.3 Release](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.3)
* [useDragDrop PR#225](https://github.com/vuetifyjs/0/pull/225)
* [createSortable PR#231](https://github.com/vuetifyjs/0/pull/231)
* [createKanban PR#234](https://github.com/vuetifyjs/0/pull/234)
* [Genesis Design System PR#240](https://github.com/vuetifyjs/0/pull/240)

---

## Product Updates

### Vuetify One

<AppFigure :src="onelogo" alt="Vuetify One logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify One Logo" />

<br>

A new [enterprise sponsorship landing page](https://github.com/vuetifyjs/vuetify/pull/22813) was added for teams that want to support the framework at the organization level. The docs also picked up an upgrade-guide pass — a [CSS reset fallback for non-Sass setups](https://github.com/vuetifyjs/vuetify/pull/22821), a more conservative typography mapping, and codemod annotations — to smooth the v3 → v4 migration.

### Nuxt Module

[Andrei Elkin](https://github.com/AndreyYolkin) kept pushing the [Nuxt Module](https://github.com/vuetifyjs/nuxt-module) toward a stable v1, with `beta.3` (May 3) and `beta.4` (May 7) and a focus on more reliable package resolution. That work carried into June — we'll cover it in the next update, so stay tuned.

---

## May 2026 Changelog

The following section provides an overview of the changes made in May 2026 across the Vuetify framework.

**Key Improvements:**

* v4.0.7: bug-fix patch — VAlert border opacity, VTreeview/VList value-comparator, VField baseline, VProgressLinear chunks, VBtnToggle, VList focus, VSelects contentClass
* v4.1.0: seven labs promotions, new VHeatmap/VHighlight/VMonthPicker/VDateRangePicker, VSparkline markers, VOtpInput groups, VOverlay viewport strategy, theme page transitions, VTooltip cursor target, VExpansionPanels customization, VNumberInput grouping, VPagination/VDataTableFooter hide-last-page, plus VDataTable/VTable accessibility (aria-sort, aria-labels, caption slot, gridlines)
* v4.0.8: stable-line fixes — VSelect/VAutocomplete/VCombobox menu, VOverlay focus, theme transparent hex, VForm slot perf

**Expand** this section to see the detailed changelog for May 2026:

<details>
<summary>May 2026 Full Changelog</summary>

### v4.0.7 (2026-05-08)

**:wrench: Bug Fixes**

* **VAlert:** border opacity should win over theme variables ([#22832](https://github.com/vuetifyjs/vuetify/issues/22832))
* **VTreeview, VList:** wire `value-comparator` into selection logic ([#22841](https://github.com/vuetifyjs/vuetify/issues/22841))
* **VField:** correct baseline alignment ([#22812](https://github.com/vuetifyjs/vuetify/issues/22812))
* **VProgressLinear:** correct calculation for filled chunks
* **VBtnToggle:** correct background when active
* **VList:** invisibly focus first element after open
* **VSelects:** merge `menuProps.contentClass`

---

### v4.1.0-beta.0 (2026-05-21)

**:rocket: Features**

* **VFileUpload:** promote from labs; add `loading` prop
* **VFileInput, VFileUpload:** support pasting files and folders
* **VIconBtn:** promote from labs
* **VDateInput:** promote from labs
* **VStepperVertical:** promote from labs
* **VColorInput:** promote from labs
* **VPicker:** promote from labs
* **VPullToRefresh:** promote from labs
* **VHeatmap:** add new component ([#22535](https://github.com/vuetifyjs/vuetify/issues/22535))
* **VHighlight:** add new component ([#22817](https://github.com/vuetifyjs/vuetify/issues/22817))
* **VMonthPicker:** add new component ([#22534](https://github.com/vuetifyjs/vuetify/issues/22534))
* **VDateRangePicker:** add new component ([#22860](https://github.com/vuetifyjs/vuetify/issues/22860))
* **VSparkline:** markers & tooltips ([#22748](https://github.com/vuetifyjs/vuetify/issues/22748))
* **VOtpInput:** groups, a11y improvements, emoji ([#22803](https://github.com/vuetifyjs/vuetify/issues/22803))
* **VDataTable:** highlight search matches ([#22852](https://github.com/vuetifyjs/vuetify/issues/22852)); add mobile header slot ([#21429](https://github.com/vuetifyjs/vuetify/issues/21429)); add `v-model:opened` for group-by ([#22772](https://github.com/vuetifyjs/vuetify/issues/22772))
* **vCalendar:** 24hour support ([#22853](https://github.com/vuetifyjs/vuetify/issues/22853))
* **VDatePicker:** keyboard arrows navigation in selection grid ([#22857](https://github.com/vuetifyjs/vuetify/issues/22857))
* **theme:** add optional page transitions ([#22623](https://github.com/vuetifyjs/vuetify/issues/22623))
* **elevation:** add `hover-elevation` prop and CSS utilities ([#22621](https://github.com/vuetifyjs/vuetify/issues/22621))
* **rounded:** accept arbitrary values ([#22721](https://github.com/vuetifyjs/vuetify/issues/22721))
* **VCommandPalette, VOverlay:** introduce viewport location strategy ([#22698](https://github.com/vuetifyjs/vuetify/issues/22698))
* **VProgressLinear:** add `split` variant to align with MD3 ([#22662](https://github.com/vuetifyjs/vuetify/issues/22662))
* **VTooltip:** add `color` prop ([#19689](https://github.com/vuetifyjs/vuetify/issues/19689)); `target="cursor"` should work for hoverable tooltips ([#22728](https://github.com/vuetifyjs/vuetify/issues/22728))
* **VExpansionPanels:** add more props for customization ([#22723](https://github.com/vuetifyjs/vuetify/issues/22723))
* **VNumberInput:** add `grouping` prop ([#22134](https://github.com/vuetifyjs/vuetify/issues/22134))
* **VPagination, VDataTableFooter:** ability to hide last page ([#22788](https://github.com/vuetifyjs/vuetify/issues/22788))
* **VTreeview:** bind indentLines to item slot
* **VColorPicker:** add `hide-input-labels` prop

**:wrench: Bug Fixes**

* **VHover:** reconcile actual hover state when re-enabled ([#22845](https://github.com/vuetifyjs/vuetify/issues/22845))
* **VCheckbox:** align indeterminate opacity and color with MD3 ([#22804](https://github.com/vuetifyjs/vuetify/issues/22804))
* **VSnackbarQueue:** avoid stale z-index ([#22796](https://github.com/vuetifyjs/vuetify/issues/22796))
* **VDatePicker:** align range selection with MD3 ([#22858](https://github.com/vuetifyjs/vuetify/issues/22858))
* **VOverlay:** make `location` and `origin` actually useful ([#22720](https://github.com/vuetifyjs/vuetify/issues/22720)); `contained` should opt-out from static strategy
* **Dialog, VSnackbar:** correct position with static location strategy

---

### v4.1.0-beta.1 (2026-05-28)

**:rocket: Features**

* **VTable:** add `caption` slot and pass aria-* to `<table>`; add `gridlines` prop ([#22873](https://github.com/vuetifyjs/vuetify/issues/22873))
* **VDataTable:** add aria-sort to sortable headers; add aria-labels for selection controls; `loading` prop to accept object with `side` ([#22872](https://github.com/vuetifyjs/vuetify/issues/22872)); add `expanded` slot with transition support ([#22871](https://github.com/vuetifyjs/vuetify/issues/22871)); add filtered `itemsLength` to slot props ([#22874](https://github.com/vuetifyjs/vuetify/issues/22874))
* **VRating:** expose activeColor in item slot props ([#22814](https://github.com/vuetifyjs/vuetify/issues/22814))

**:wrench: Bug Fixes**

* **theme:** support transparent hex color for CSS variables ([#22875](https://github.com/vuetifyjs/vuetify/issues/22875))
* **VForm:** avoid eager `.value` reads in default slot props ([#22846](https://github.com/vuetifyjs/vuetify/issues/22846))
* **VBtnToggle:** restore active overlay when no color is set
* **VOverlay:** pull focus to trap when it briefly escapes

---

### v4.0.8 (2026-05-29)

**:wrench: Bug Fixes**

* **VSelect/VAutocomplete/VCombobox:** keep menu open when scrolling ([#22877](https://github.com/vuetifyjs/vuetify/issues/22877))
* **VAutocomplete/VCombobox:** click in empty space should not close menu ([#22754](https://github.com/vuetifyjs/vuetify/issues/22754))
* **VOverlay:** restore focus without preventing Enter keydown ([#22276](https://github.com/vuetifyjs/vuetify/issues/22276))
* **theme:** support transparent hex color for CSS variables ([#22875](https://github.com/vuetifyjs/vuetify/issues/22875))
* **VForm:** avoid eager `.value` reads in default slot props ([#22846](https://github.com/vuetifyjs/vuetify/issues/22846))
* **VSwitch:** suppress user-agent styles to avoid click dead-zone

</details>

---

## What's Next { .mt-4 }

June stabilizes what May opened. **Vuetify 4.1** moves toward its stable release, with a final round of VSwitch MD3 work, VExpansionPanel focus polish, and the SSR and focus-trap fixes that landed late in the month. **Vuetify0** reached [beta on June 2](/blog/announcing-vuetify0-beta/) with its API frozen — from here the focus is edge cases, documentation, and the road to v1.0 in July. And the **theme**, **locale**, and **date** v0 migrations in the framework now have a frozen target to build against.

* [Vuetify 4.1](/getting-started/release-notes/?version=v4.1.0) is live — try the new components and labs promotions in your project today
* The [Vuetify0 beta](/blog/announcing-vuetify0-beta/) froze its public API ahead of v1 — try it via [v0play](https://v0play.vuetifyjs.com)

### Looking Further Ahead { #looking-ahead }

Looking past June, the theme for the rest of the year is a simple one: **finishing what we started**.

**A focused roadmap, and a clean finish for labs**: We've deliberately narrowed our roadmap commitments for the remainder of 2026 to concentrate the team on one outcome — **by November 1st, 2026, labs will be drained**. Every component still incubating will either graduate into core or be retired; nothing will be left sitting in an "unfinished" state. This isn't just housekeeping — a stable framework API is the foundation for a smooth migration as Vuetify0 moves in underneath.

**A community-driven issue board**: We're building a curated view into the issue board where the community can surface and vote on what matters most. Today, prioritization happens largely behind the scenes — this opens a direct line into what we tackle next, and gives us a far clearer read on where the framework's real pain points and most-wanted features actually are. We'll share more as it takes shape.

**A modernized docs experience (later this year)**: We're planning a significant UX upgrade to Vuetify documentation pages, porting over many of the features introduced first to the [Vuetify0 documentation](https://0.vuetifyjs.com/). For a preview of where we're headed, you are more than welcome to spend some time in the [v0 docs](https://0.vuetifyjs.com/) — the navigation, search, and interactive code samples there are an early taste of what's coming.

**Community snips**: [Vuetify Snips](https://snips.vuetifyjs.com/) has always been a hand-curated collection, but we know plenty of talented community members are sitting on gems worth sharing. Once [Vuetify Play](https://play.vuetifyjs.com) gets the stability overhaul it deserves, we'd like to open the door to community submissions — a curated set of community snips contributed by you. It's early days for this one, but it's something we're excited about.

::: error

**Vuetify needs your support.** OpenCollective funds are exhausted and we're currently unable to compensate contributors for ongoing work on the framework and ecosystem tools. If your team relies on Vuetify, please consider sponsoring us via [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider). Every contribution keeps Vuetify shipping.

:::

Vuetify is and always will be free and open source. If your team builds on the framework, the v0 beta, the MCP, the CLI, the Nuxt module, the ESLint plugin, or any of the design systems coming behind them, your support directly funds continued development. [Vuetify One](https://one.vuetifyjs.com/) and [GitHub Sponsors](https://github.com/sponsors/johnleider) are the most direct ways to help.

Thanks also to the community members who sent patches this month — [mixelburg](https://github.com/mixelburg), [webdevnerdstuff](https://github.com/webdevnerdstuff), [VaishnaviD5900](https://github.com/VaishnaviD5900), [Spatlani](https://github.com/Spatlani), and [Haviles04](https://github.com/Haviles04) — for the fixes and additions that made it into this release.

Thank you for being part of the Vuetify community. See you in June!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/vuetify), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
