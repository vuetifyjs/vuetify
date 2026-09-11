---
layout: blog
meta:
  title: August 2026 Update
  description: This August team delivered Vuetify 4.2 beta, which made @vuetify/v0 a runtime dependency of the framework.
  keywords: Vuetify August 2026, Vuetify 4.2, @vuetify/v0, open-on-focus, Sass variables, Vuetify0 1.2, Emerald, Vuetify MCP
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
  const mcplogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vmcp-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const releasesimg = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/august-2026-update/releases-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const v0img = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/august-2026-update/v0-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# August 2026 Update

**August was about v4.2.** The features and fixes have been steadily merged to `dev` branch eventually shipped as [v4.2.0-beta.0](/getting-started/release-notes/?version=v4.2.0-beta.0) on August 27 and as stable [v4.2.0](/getting-started/release-notes/?version=v4.2.0) week after. The v4.1 line got five additional patches along the way, and v3.13 got its first two LTS patches. Most notable change: starting with 4.2, `vuetify` depends on `@vuetify/v0` at runtime.

![Hero image for August update](https://cdn.vuetifyjs.com/docs/images/blog/august-2026-update/august-hero.png "August hero image"){ height=112 }

🖊️ Jacek Czarniecki • 📅 September 11th, 2026

<PromotedEntry />

---

## August in numbers

**33 merged PRs** in the framework repo, **16 features and 47 fixes** (unique commits, cherry-picks between `master`, `dev` and `v3-stable` counted once) and **8 releases**. Open issues went from 351 to 286: 96 closed, 29 of them as not planned, and 31 new ones opened. [Vuetify0](https://0.vuetifyjs.com/) merged 172 PRs and shipped its first two minors after 1.0.

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Spotlight: Vuetify 4.2](#vuetify-4-2)
  * [Before you upgrade](#before-you-upgrade)
* [Framework Updates](#framework-updates)
  * [New Features](#new-features)
  * [Bug Fixes](#bug-fixes)
  * [In Development](#in-development)
* [Vuetify0 Progress Update](#vuetify0-progress)
* [Tooling Updates](#ecosystem-tooling)
* [What's Next](#whats-next)

---

## Releases

**8 releases.** The v4.1 line kept reliable pace of weekly patches: [v4.1.8](/getting-started/release-notes/?version=v4.1.8) (August 7), [v4.1.9](/getting-started/release-notes/?version=v4.1.9) (August 13), [v4.1.10](/getting-started/release-notes/?version=v4.1.10) (August 18), [v4.1.11](/getting-started/release-notes/?version=v4.1.11) (August 19) and [v4.1.12](/getting-started/release-notes/?version=v4.1.12) (August 26). v3.13 LTS got [v3.13.1](/getting-started/release-notes/?version=v3.13.1) (August 7) and [v3.13.2](/getting-started/release-notes/?version=v3.13.2) (August 18) with some backported regression fixes. [v4.2.0-beta.0](/getting-started/release-notes/?version=v4.2.0-beta.0) (August 27) carried new props, emits, enhancements and important fixes.

<AppFigure :src="releasesimg" alt="August Releases Banner" title="August Releases Banner" />

### Key Improvements

* **[Vuetify 4.2](/getting-started/release-notes/?version=v4.2.0)** — beta on August 27, stable on September 2
* **[VSelect / VAutocomplete / VCombobox](/components/selects/)** — `open-on-focus`, persistent menus, `close-on-input-click`, and keyboard navigation that no longer breaks in long lists ([#23126](https://github.com/vuetifyjs/vuetify/pull/23126), [#23008](https://github.com/vuetifyjs/vuetify/pull/23008), [#23023](https://github.com/vuetifyjs/vuetify/pull/23023), [#23031](https://github.com/vuetifyjs/vuetify/pull/23031))
* **Defaults** — nested defaults can change the sizes and variants components hardcode on their inner controls ([#23108](https://github.com/vuetifyjs/vuetify/pull/23108))
* **[VDateInput](/components/date-inputs/)** — separators are inserted as user types ([#23052](https://github.com/vuetifyjs/vuetify/pull/23052))
* **[VSlideGroup](/components/slide-groups/)** — `scroll-snap`, `scroll-distance`, an `edge` event and an exposed `slide()` for programmatic control
* **Sass** — 125 variables that had no effect are gone in v4.2.0, and those might make your CI red if you did define them ([#23136](https://github.com/vuetifyjs/vuetify/issues/23136))

**Details:**

* [v4.2.0](/getting-started/release-notes/?version=v4.2.0) · [v4.2.0-beta.0](/getting-started/release-notes/?version=v4.2.0-beta.0)
* [v4.1.12](/getting-started/release-notes/?version=v4.1.12) · [v4.1.11](/getting-started/release-notes/?version=v4.1.11) · [v4.1.10](/getting-started/release-notes/?version=v4.1.10) · [v4.1.9](/getting-started/release-notes/?version=v4.1.9) · [v4.1.8](/getting-started/release-notes/?version=v4.1.8)
* [v3.13.2](/getting-started/release-notes/?version=v3.13.2) · [v3.13.1](/getting-started/release-notes/?version=v3.13.1)

---

## Spotlight: Vuetify 4.2 { #vuetify-4-2 }

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

[v4.2.0](/getting-started/release-notes/?version=v4.2.0) is the second minor of the v4 line. It collects everything merged to `dev` branch since June. That includes the work covered in the [July update](/blog/july-2026-update/): multi-selection events, `VSkeletonLoader` types, `size` on VBtnGroup, VTreeview keyboard navigation and a11y improvements to name a few. It adds the features [below](#new-features), and [`validation rules`](/features/rules/) are finally out of Labs.

### Before you upgrade

Three changes that aren't new props.

**`@vuetify/v0` is now a dependency.** Before 4.2, `vuetify` did not require any direct dependencies. v4.2.0 depends on `@vuetify/v0@^1.2.1` but for now, the surface is limited to safe and simple utilities (`isString`, `isObject`, …), `range` and the `toHighlight` transformer from it ([#23039](https://github.com/vuetifyjs/vuetify/pull/23039)). We expect v0 to slowly take over more and more of responsibility within the Vuetify codebase.

**Unused Sass variables were removed.** 125 variables across 39 components were declared but never read by any stylesheet ([2d01fae](https://github.com/vuetifyjs/vuetify/commit/2d01fae)). Setting them did not have any effect unless you decided to consume them in custom Sass code. Cleanup make it clear these were never part of the intended API of v3 and v4. If your `settings.scss` did include them, you might be prompted to remove them by the compiler:

```txt
Error: This variable was not declared with !default in the @used module.
```

The full list is posted in the dedicated page: [Unused Sass variables](/getting-started/unused-sass-variables/).

**Buttons clip their overlay.** VBtn and VIconBtn now set `overflow: hidden`, so hover overlays and tonal underlays do not have any gaps when combined with thick borders ([#22992](https://github.com/vuetifyjs/vuetify/pull/22992)). We anticipated it may susprise some developers and some of them already shared that VBadge placed inside button is clipped. There are at least 3 easy solutions to this and you only need to pick one that suites your project (see [#23179](https://github.com/vuetifyjs/vuetify/issues/23179)).

---

## Framework Updates

### New Features

Everything in this section shipped in v4.2.0.

**The select family.** VSelect, VAutocomplete and VCombobox received four additions:

* **Persistent menus.** `:menu-props="{ persistent: true }"` keeps the menu open, and `closeOnContentClick: false` keeps it open after a selection. Both were ignored before ([#23008](https://github.com/vuetifyjs/vuetify/pull/23008), closes [#20590](https://github.com/vuetifyjs/vuetify/issues/20590)).
* **`trim-values`** on VCombobox trims typed values and drops whitespace-only entries ([#22895](https://github.com/vuetifyjs/vuetify/pull/22895), closes [#14874](https://github.com/vuetifyjs/vuetify/issues/14874)).
* **`open-on-focus`** opens the menu when the field gets focus, from Tab as well as a click ([#23126](https://github.com/vuetifyjs/vuetify/pull/23126), closes [#22934](https://github.com/vuetifyjs/vuetify/issues/22934)). Focus returning to the field after the menu closes does not reopen it. VDateInput and VColorInput have the same prop.
* **`close-on-input-click`** on VAutocomplete and VCombobox makes a click on the input toggle the menu instead of always opening it ([#23023](https://github.com/vuetifyjs/vuetify/pull/23023)).

The last two help improve experience if end-users are used to clicking the input to dismiss/toggle the menu.

```html
<v-autocomplete
  :items="countries"
  :menu-props="{ closeOnContentClick: false }"
  open-on-focus
  close-on-input-click
/>
```

Keyboard navigation in these menus was reworked around the virtual list ([#23031](https://github.com/vuetifyjs/vuetify/pull/23031), [aae8fc4](https://github.com/vuetifyjs/vuetify/commit/aae8fc4)). The problem was haunting any list longer than 50 elements. While not very noticable in general it most certainly impacted form-heavy apps especially if users rely on the keyboard to navigate and update selections ([#18383](https://github.com/vuetifyjs/vuetify/issues/18383), [#22770](https://github.com/vuetifyjs/vuetify/issues/22770)).

**Defaults for inner controls.** Some components render inner controls with hardcoded props: chips in VSelect are `size="small"`, VStepperActions buttons are `text` and `tonal`, the items-per-page select in the data table footer has a fixed variant. Customizing those was previously very had and involved deep CSS overrides or forced developers to use slots. Now it is a straightforward nested object structure in using the standard configuration system ([#23108](https://github.com/vuetifyjs/vuetify/pull/23108)):

```js { resource="src/plugins/vuetify.js" }
createVuetify({
  defaults: {
    VSelect: { VChip: { size: 'large' } }, // also VAutocomplete, VCombobox, VFileInput
    VStepperActions: { VBtn: { variant: 'outlined' } },
    VDataTableFooter: { VSelect: { variant: 'solo-filled' } },
  },
})
```

Visit [Global configuration](/features/global-configuration/) to inspect the full list of nested keys, where we listed new `VStepperActionsPrevBtn` and `VStepperActionsNextBtn` role names as well.

**[VDateInput](/components/date-inputs/)** now types like a masked input ([#23052](https://github.com/vuetifyjs/vuetify/pull/23052), closes [#23051](https://github.com/vuetifyjs/vuetify/issues/23051)) while making sure user won't input invalid dates. Separators are inserted/enforced following current locale, range format and RTL. Further improvements are planned for v4.3.0 - input will show localized placeholders marking major i18n improvement ([#23173](https://github.com/vuetifyjs/vuetify/pull/23173)).

**[VSlideGroup](/components/slide-groups/)** closed three issues, the oldest from 2020:

* `scroll-snap` (`start`, `center` or `end`) enables CSS scroll snapping, and the prev/next arrows stop on item boundaries ([#15916](https://github.com/vuetifyjs/vuetify/issues/15916))
* `scroll-distance` sets how far the arrows scroll, in pixels or as a percentage
* `slide()` is exposed for scrolling programmatically: `slide('next')`, `slide({ by: 200 })`, `slide({ index: 3 })` ([#21250](https://github.com/vuetifyjs/vuetify/issues/21250))
* the `edge` event fires with `'start'` or `'end'` when scrolling reaches either end ([#11364](https://github.com/vuetifyjs/vuetify/issues/11364))

**[VProgressLinear](/components/progress-linear/) and [VProgressCircular](/components/progress-circular/)** take a `transition` prop: `false` turns off the value animation, and `{ duration: 600 }` changes its length ([#22442](https://github.com/vuetifyjs/vuetify/issues/22442)). VProgressLinear also supports `reveal`, which already existed in the circular counterpart.

Smaller additions:

* **[VNavigationDrawer](/components/navigation-drawers/)** — `width` accepts percentages ([#16150](https://github.com/vuetifyjs/vuetify/issues/16150), open since 2022). Don't combine it with a content-sized layout (`width: fit-content`); that ends in a ResizeObserver loop.
* **[VRadio](/components/radio-buttons/)** — `v-model` works on a radio without VRadioGroup ([#16245](https://github.com/vuetifyjs/vuetify/issues/16245))
* **[VFileInput](/components/file-inputs/)** — supports `placeholder` and `persistent-placeholder` ([#23048](https://github.com/vuetifyjs/vuetify/pull/23048)), and shows dashed outline while dragging files over it ([#22909](https://github.com/vuetifyjs/vuetify/pull/22909))
* **[VVirtualScroll](/components/virtual-scroller/)** — `scrollToIndex(index, position)` takes `'start'`, `'center'` or `'end'` ([#18574](https://github.com/vuetifyjs/vuetify/pull/18574))

### Bug Fixes

Most of August's fixes landed in overlays, virtual scrolling and the select family. Four worth reading about:

**Dialogs opened from menus.** Clicking inside a VDialog opened from a VMenu closed the whole menu chain ([#20468](https://github.com/vuetifyjs/vuetify/issues/20468), from 2024). Non-menu overlays now stop the close cascade ([e30eb47](https://github.com/vuetifyjs/vuetify/commit/e30eb47)), and custom overlays and tooltips no longer keep a menu from closing ([#22993](https://github.com/vuetifyjs/vuetify/pull/22993)).

**Click-outside cost.** On every mousedown, each open overlay ran a document-wide `querySelector` to find which activator owns it ([#23056](https://github.com/vuetifyjs/vuetify/issues/23056)). It's now a WeakMap lookup ([a57ec6e](https://github.com/vuetifyjs/vuetify/commit/a57ec6e), v4.1.8).

**Android "desktop site" mode** placed overlays wrong because the scaled visual viewport was used as the overlay's boundary ([#22124](https://github.com/vuetifyjs/vuetify/issues/22124)). The fix shipped in v4.1.8 and v3.13.1, but it also dropped the correction for CSS `zoom` on the page. v4.2.1 put that back.

**Active links on refresh.** In Nuxt, links with `to` could flash as active on a hard refresh while the router was still resolving the first navigation ([#23131](https://github.com/vuetifyjs/vuetify/pull/23131)).

| Component                 | Fix                                                                     | Version | PR / commit                                                     |
|---------------------------|-------------------------------------------------------------------------|---------|-----------------------------------------------------------------|
| **VNumberInput**          | Strip the grouping separator before parsing (German locale)             | v4.1.8  | [94e94a9](https://github.com/vuetifyjs/vuetify/commit/94e94a9)  |
| **theme**                 | Emit `color-scheme: light` so native scrollbars follow a theme switch   | v4.1.8  | [#23071](https://github.com/vuetifyjs/vuetify/pull/23071)       |
| **VFileUpload**           | No SSR crash with an empty file list                                    | v4.1.8  | [4cd5288](https://github.com/vuetifyjs/vuetify/commit/4cd5288)  |
| **package**               | Accept Vue 3.6 prereleases in the peer range                            | v4.1.8  | [#23040](https://github.com/vuetifyjs/vuetify/pull/23040)       |
| **rounded**               | Restore classes for per-side values containing `0`                     | v4.1.9  | [27962f3](https://github.com/vuetifyjs/vuetify/commit/27962f3)  |
| **validation**            | Run rules as soon as a field is cleared, not on blur                    | v4.1.9  | [58b5537](https://github.com/vuetifyjs/vuetify/commit/58b5537)  |
| **VDataTableVirtual**     | Correct height with several expanded rows per item                      | v4.1.9  | [6f5f04b](https://github.com/vuetifyjs/vuetify/commit/6f5f04b)  |
| **VSelect**               | Focus the right item when opened with the keyboard in Shadow DOM        | v4.1.9  | [#23102](https://github.com/vuetifyjs/vuetify/pull/23102)       |
| **VDataTable**            | Key cells so slot props don't leak between columns                      | v4.1.10 | [#23124](https://github.com/vuetifyjs/vuetify/pull/23124)       |
| **VNumberInput**          | Spin buttons snap an out-of-range value to `min`/`max`                  | v4.1.10 | [#23109](https://github.com/vuetifyjs/vuetify/pull/23109)       |
| **VDialog**               | No error when unmounted while closing                                   | v4.1.10 | [#23054](https://github.com/vuetifyjs/vuetify/pull/23054)       |
| **VProgressLinear**       | Keep indeterminate bars visible in Firefox                              | v4.1.10 | [694fcdb](https://github.com/vuetifyjs/vuetify/commit/694fcdb)  |
| **VProgressLinear**       | Restore the `split` variant animation, broken in v4.1.7                 | v4.1.10 | [537a5f7](https://github.com/vuetifyjs/vuetify/commit/537a5f7)  |
| **VDatePicker**           | Restore the hover preview in range selection                            | v4.1.10 | [6c1dee2](https://github.com/vuetifyjs/vuetify/commit/6c1dee2)  |
| **VOverlay**              | Return focus to the activator when `eager`                              | v4.1.10 | [c879795](https://github.com/vuetifyjs/vuetify/commit/c879795)  |
| **VBtn / VDivider / VImg**| No `value` on links, no redundant `role` on `<hr>`, no empty `aria-label` | v4.1.10 | [#23122](https://github.com/vuetifyjs/vuetify/pull/23122), [#23107](https://github.com/vuetifyjs/vuetify/pull/23107), [#23112](https://github.com/vuetifyjs/vuetify/pull/23112) |
| **VVirtualScroll**        | Measure dividers and subheaders, estimate item height by median         | v4.1.11 | [cb60a1f](https://github.com/vuetifyjs/vuetify/commit/cb60a1f)  |
| **VVirtualScroll**        | Scrolling no longer locks up when items contain a divider               | v4.1.11 | [f1cf0b0](https://github.com/vuetifyjs/vuetify/commit/f1cf0b0)  |
| **VRow**                  | Restore 8px gutters for `dense`                                         | v4.1.11 | [ea6c628](https://github.com/vuetifyjs/vuetify/commit/ea6c628)  |
| **VOverlay**              | Correct position when the activator changes mid-transition              | v4.1.12 | [63cccbb](https://github.com/vuetifyjs/vuetify/commit/63cccbb)  |
| **VProgressLinear**       | `rounded-bar` with `reverse` and buffer                                 | v4.1.12 | [55fed01](https://github.com/vuetifyjs/vuetify/commit/55fed01)  |
| **locale**                | Ukrainian translation fixes, missing Arabic keys                        | v4.1.12 | [#23139](https://github.com/vuetifyjs/vuetify/pull/23139)       |
| **VIconBtn**              | Default color matches VBtn (icons disappeared on colored backgrounds)  | v4.2.0  | [1695a49](https://github.com/vuetifyjs/vuetify/commit/1695a49)  |
| **VMenu**                 | One open submenu per level; Tab and ArrowLeft return focus to the activator | v4.2.0 | [#22904](https://github.com/vuetifyjs/vuetify/pull/22904)   |
| **VTextField**            | Keep caret and selection when toggling `type` in Chrome                 | v4.2.0  | [47c9cc1](https://github.com/vuetifyjs/vuetify/commit/47c9cc1)  |
| **VTreeview**             | Open matching nodes when searching                                      | v4.2.0  | [#22983](https://github.com/vuetifyjs/vuetify/pull/22983)       |
| **VInput**                | Consistent transitions for messages, details and counter                | v4.2.0  | [#23049](https://github.com/vuetifyjs/vuetify/pull/23049)       |
| **v-touch**               | Ignore scrolling inside the element                                     | v4.2.0  | [19ee74e](https://github.com/vuetifyjs/vuetify/commit/19ee74e)  |
| **VSlideGroup**           | A click on a partially visible item selects it instead of scrolling it  | v4.2.0  | [55d8e80](https://github.com/vuetifyjs/vuetify/commit/55d8e80)  |

The VTextField fix covers the password reveal pattern: toggling `type` from an `append-inner` icon put the caret back at the start. It had been open since 2022 ([#16109](https://github.com/vuetifyjs/vuetify/issues/16109)).

### In Development

The July update listed six PRs for 4.2: VSlider `pill` ([#22699](https://github.com/vuetifyjs/vuetify/pull/22699)), VMaskInput dynamic masks ([#22501](https://github.com/vuetifyjs/vuetify/pull/22501)), VTimePicker keyboard controls ([#22604](https://github.com/vuetifyjs/vuetify/pull/22604)), VBtn/VIconBtn MD3 sizing ([#21831](https://github.com/vuetifyjs/vuetify/pull/21831)), VDatePicker week selection ([#20867](https://github.com/vuetifyjs/vuetify/pull/20867)) and a VField `border` prop ([#19819](https://github.com/vuetifyjs/vuetify/pull/19819)). None of them made it. VSlider, VMaskInput and VDatePicker moved to the v4.3.0 milestone together with the VBreadcrumbs accessibility PR ([#22358](https://github.com/vuetifyjs/vuetify/pull/22358)). The other three have no target yet.

---

## Vuetify0 Progress Update { #vuetify0-progress }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

172 merged PRs, three patches ([v1.0.3](https://0.vuetifyjs.com/releases/?version=v1.0.3) on August 4, [v1.0.4](https://0.vuetifyjs.com/releases/?version=v1.0.4) on August 12, [v1.0.5](https://0.vuetifyjs.com/releases/?version=v1.0.5) on August 18) and two minors on August 25. [v1.1.0](https://0.vuetifyjs.com/releases/?version=v1.1.0) is small, just Splitter drag intent and `@vuetify/play`, because a `feat` commit on `master` took the version number before `dev` was merged. The table work shipped an hour later as [v1.2.0](https://0.vuetifyjs.com/releases/?version=v1.2.0).

<AppFigure :src="v0img" alt="Vuetify0 Progress" title="Vuetify0 August Progress" />

### New in 1.1 and 1.2

* **[DataTable](https://0.vuetifyjs.com/components/data/data-table)** and **[DataGrid](https://0.vuetifyjs.com/components/data/data-grid)** — headless compounds over `createDataTable` and `createDataGrid`. DataTable renders semantic `<table>` markup with `aria-sort` and `aria-rowcount`; DataGrid adds column pinning and resizing, cell editing and row spanning ([#825](https://github.com/vuetifyjs/0/pull/825), [#826](https://github.com/vuetifyjs/0/pull/826))
* **[Alert](https://0.vuetifyjs.com/components/semantic/alert)** — a live region, `role="alert"` by default and `role="status"` for messages that shouldn't interrupt ([#823](https://github.com/vuetifyjs/0/pull/823))
* **[usePopover](https://0.vuetifyjs.com/composables/system/use-popover)** — positioning adapters. CSS anchor positioning stays the default. Firefox ESR and Safari before 26 don't support it, so there is now a first-party floating-ui adapter at `@vuetify/v0/popover/adapters/floating-ui` (with `@floating-ui/dom` as a peer), and `createPopoverPlugin` sets an adapter for the whole app ([#846](https://github.com/vuetifyjs/0/pull/846), [#917](https://github.com/vuetifyjs/0/pull/917))
* **useTheme** — `system: { light, dark }` follows `prefers-color-scheme` until the user picks a theme ([#872](https://github.com/vuetifyjs/0/pull/872))
* **`persist`** for `createFeaturesPlugin` and `createNotificationsPlugin`. Features store only the flags the user changed; notifications store read/seen/archived/snoozed state, never content ([#388](https://github.com/vuetifyjs/0/pull/388), [#384](https://github.com/vuetifyjs/0/pull/384))
* **NumberField** — `commitOn: 'input'` writes the model on every keystroke and leaves clamping for blur. The same PR found that `NumberField.Root` never clamped unless you passed `:clamp="true"` ([#786](https://github.com/vuetifyjs/0/pull/786))

### Fixes

* **useDate** — every locale got Sunday-start weeks in Firefox, and server and client could disagree when Node and browser ICU versions differ. Week data now comes from CLDR 48 on every runtime ([#796](https://github.com/vuetifyjs/0/pull/796)). This matters for Vuetify too, since the framework's date composables are moving onto v0.
* **`getActiveElement()`** walks open shadow roots, the same fix Vuetify made for Shadow DOM in July. `useHotkey`, `useClickOutside` and `useDragDrop` use it ([#693](https://github.com/vuetifyjs/0/pull/693)).
* **Snackbar** — NVDA skipped toasts injected into a fresh `role="status"` region. `Snackbar.Portal` now renders persistent polite and assertive live regions and mirrors each toast into them ([#774](https://github.com/vuetifyjs/0/pull/774)).
* **AlertDialog** focuses the Cancel action on open, per the APG pattern ([#630](https://github.com/vuetifyjs/0/pull/630)).

### Design systems on v0

**[Emerald](https://0.vuetifyjs.com/systems/emerald)** (`@paper/emerald` 0.1.0) is a styled design system on v0: 28 component families, Figma-sourced tokens, light and dark themes that follow the OS, and an icon set addressed by role. There's a [live demo](https://0.vuetifyjs.com/demo/emerald/) and a [Figma UI kit](https://store.vuetifyjs.com/products/official-emerald-ui-kit-for-figma).

**[Bulma](https://0.vuetifyjs.com/systems/bulma)** (`@paper/bulma` 0.1.0) goes the other way. Its components render the markup Bulma documents against the `bulma.css` you already load, and add the JavaScript Bulma never had: open state, click-outside, Escape, focus and form wiring. The package ships no CSS.

The [v0 playground](https://v0play.vuetifyjs.com) can save playgrounds to Vuetify One ([#817](https://github.com/vuetifyjs/0/pull/817)) and switch Vuetify versions, nightly included ([#836](https://github.com/vuetifyjs/0/pull/836)).

::: success

**Adopting Vuetify0 for your business?** Teams building production design systems, internal tooling, or product UI on top of v0 can [reach out](mailto:john@vuetifyjs.com) to talk through adoption, partnership, and roadmap input.

:::

**Details:**

* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [v1.2.0 Release](https://0.vuetifyjs.com/releases/?version=v1.2.0)
* [v1.1.0 Release](https://0.vuetifyjs.com/releases/?version=v1.1.0)
* [v0play](https://v0play.vuetifyjs.com)

---

## Tooling Updates { #ecosystem-tooling }

### Vuetify MCP

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

<br>

Four releases: v0.9.0 and v0.9.1 (August 13), v0.10.0 (August 27) and v0.11.0 (August 28). The hosted server now has two endpoints ([#41](https://github.com/vuetifyjs/mcp/pull/41)):

| URL                               | Auth                  | Tools                                        |
|-----------------------------------|-----------------------|----------------------------------------------|
| `https://mcp.vuetifyjs.com/mcp`   | none                  | docs, API, issues                            |
| `https://mcp.vuetifyjs.com/one`   | OAuth (Vuetify One)   | the same, plus bins, playgrounds and links   |

v0.11.0 adds a Vuetify 2 → 3 upgrade toolkit that targets 3.13 LTS ([#43](https://github.com/vuetifyjs/mcp/pull/43)): `get_v3_upgrade_playbook` (ordered phases, starting with a Playwright baseline), `get_v2_to_v3_component_map`, `get_v3_breaking_changes` and an `upgrade-v2-to-v3` prompt. Before this, `get_upgrade_guide('v2.7')` returned the v4 guide. The v3 upgrade guide got an MCP quick start to go with it ([#23154](https://github.com/vuetifyjs/vuetify/pull/23154)).

### Vuetify CLI

No release in August. Two features are merged and wait for the next one: `vuetify add` copies v0 examples from the docs registry into your project and tracks them in `vuetify.json`, with `diff` and `refresh` against the source ([#27](https://github.com/vuetifyjs/cli/pull/27)), and `create --features=mcp` writes client config for Cursor, Claude Code and Grok pointing at the hosted server ([#29](https://github.com/vuetifyjs/cli/pull/29)).

### Nuxt Module

[v1.0.0-rc.4](https://github.com/vuetifyjs/nuxt-module/releases/tag/v1.0.0-rc.4) (August 2) and [rc.5](https://github.com/vuetifyjs/nuxt-module/releases/tag/v1.0.0-rc.5) (August 22) are dependency updates (Nuxt 4.5.1) and a documented workaround for the `useLayout` auto-import collision.

### Upgrade guide

Two v3 → v4 migration problems from a production migration are now documented ([#22848](https://github.com/vuetifyjs/vuetify/pull/22848)). In Vite dev mode the dependency pre-bundler can create two `useStack` instances, and menus opened inside a dialog end up behind it; the fix is `optimizeDeps.include`. And the `@layer` order statement has to be imported before any Vuetify styles, or the browser takes layer priority from whatever it parses first.

### Snips

[Snips](https://snips.vuetifyjs.com/) prices are cut by half with no end date: category packs $74, all-access $149, team all-access $399.

---

## What's Next { .mt-4 }

[v4.2.0](/getting-started/release-notes/?version=v4.2.0) went stable on September 2 and [v4.2.1](/getting-started/release-notes/?version=v4.2.1) followed on September 9. If you set Sass variables, read [Before you upgrade](#before-you-upgrade) first. Three of the PRs that missed 4.2 are on the v4.3.0 milestone, and more of v0 will move into the framework through 4.x minors.

* [Vuetify 4.2](/getting-started/release-notes/?version=v4.2.0) is stable, and it installs `@vuetify/v0` with it
* [Vuetify0 1.2](https://0.vuetifyjs.com/releases/?version=v1.2.0) adds headless DataTable, DataGrid and Alert
* The hosted MCP works without an account at `https://mcp.vuetifyjs.com/mcp`

::: warning

**Vuetify needs your support.** Open Collective funds are running low, the team has scaled down, and contributors are barely compensated for their work. If your team relies on Vuetify, point your organization at [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider).

:::

Thanks to everyone who sent a PR in August: [lazerg](https://github.com/lazerg), [BatLeDev](https://github.com/BatLeDev), [waterWang](https://github.com/waterWang), [vianmangal](https://github.com/vianmangal), [userquin](https://github.com/userquin), [mahsarajabpour](https://github.com/mahsarajabpour), [klivak](https://github.com/klivak), [jcollins1983](https://github.com/jcollins1983) and [jaketig](https://github.com/jaketig) in the framework, and [sridhar-3009](https://github.com/sridhar-3009), [MuslumYilmaz](https://github.com/MuslumYilmaz) and [Haviles04](https://github.com/Haviles04) in Vuetify0 and the MCP.

See you in September!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements.*
