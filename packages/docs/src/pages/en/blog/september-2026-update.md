---
layout: blog
meta:
  title: September 2026 Update
  description: This September the team shipped v4.2, followed by 3 patches, while steadily moving to offload more utilities to @vuetify/v0.
  keywords: Vuetify September 2026, Vuetify 4.2, Vuetify 4.3, @vuetify/v0, VInfiniteCarousel, CSS layers, Vuetify MCP
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
</script>

# September 2026 Update

**September was about Vuetify0 moving into Vuetify.** [v4.2.0](/getting-started/release-notes/?version=v4.2.0) went stable on September 2 and three patches followed. Meanwhile the `dev` branch filled up for v4.3: a new labs component, MD3 tabs, a modal rail drawer, and the first Vuetify composables that are now thin wrappers over `@vuetify/v0`.

![Hero image for September update](https://cdn.vuetifyjs.com/docs/images/blog/september-2026-update/september-hero.png "September hero image"){ height=112 }

🖊️ Jacek Czarniecki • 📅 October 7th, 2026

<PromotedEntry />

---

## September in numbers

**24 merged PRs** in the framework repo, **7 features and 21 fixes** (unique commits) and **8 releases** overall. [Vuetify0](https://0.vuetifyjs.com/) merged 34 PRs and shipped three patches. Its npm downloads went from 7.7k in August to 294k in September, because every `vuetify@4.2` install now pulls it in.

---

## Table of Contents

* [Key Improvements](#key-improvements)
* [Spotlight: Vuetify0 inside Vuetify](#vuetify0-inside-vuetify)
* [Framework Updates](#framework-updates)
  * [Bug Fixes](#bug-fixes)
  * [CSS layer order](#css-layer-order)
  * [Coming in 4.3](#coming-in-4-3)
  * [In Development](#in-development)
* [Vuetify0 Progress Update](#vuetify0-progress)
* [Tooling Updates](#ecosystem-tooling)
* [What's Next](#whats-next)

---

## Key Improvements

**On `dev`, coming in v4.3.0:**

* **Vuetify0 adoption** — RTL, locale and the resize/intersection/mutation observers now delegate to `@vuetify/v0` ([#23213](https://github.com/vuetifyjs/vuetify/pull/23213), [#23214](https://github.com/vuetifyjs/vuetify/pull/23214), [#23220](https://github.com/vuetifyjs/vuetify/pull/23220))
* **[VInfiniteCarousel](https://dev.vuetifyjs.com/en/components/infinite-carousels/)** — new labs component for marquees and logo strips ([#23116](https://github.com/vuetifyjs/vuetify/pull/23116))
* **[VTabs](/components/tabs/)** — `slider-variant="primary"` for the MD3 primary tab slider ([#23181](https://github.com/vuetifyjs/vuetify/pull/23181))
* **[VNavigationDrawer](/components/navigation-drawers/)** — `modal` flag and `v-model:expanded` for rail drawers ([#23182](https://github.com/vuetifyjs/vuetify/pull/23182))
* **[VDateInput](/components/date-inputs/)** — localized format hints as the placeholder ([#23173](https://github.com/vuetifyjs/vuetify/pull/23173))

**Patched in 4.2.x:**

* **CSS layers** — docs now recommend linking `layers.css` in `<head>`, since bundlers can land component CSS before the layer order ([#23205](https://github.com/vuetifyjs/vuetify/pull/23205))
* **VSelect / VAutocomplete** — browser autofill improvement that helps ([#20560](https://github.com/vuetifyjs/vuetify/issues/20560))
* **`menu-elevation`** — is now deprecated in favor of `menu-props` ([#23193](https://github.com/vuetifyjs/vuetify/pull/23193))

**Beyond Vuetify core:**

* **[Vuetify0 1.2.3](https://0.vuetifyjs.com/releases/?version=v1.2.3)** — `useBreakpoints` fixes found while moving Vuetify's display onto v0
* **Vuetify MCP 0.12** — `get_upgrade_plan` and `get_upgrade_rules` for multi-hop upgrades like v2 → v4 ([#30](https://github.com/vuetifyjs/mcp/pull/30))

**Details:**

* Vuetify v4.2: [v4.2.3](/getting-started/release-notes/?version=v4.2.3) · [v4.2.2](/getting-started/release-notes/?version=v4.2.2) · [v4.2.1](/getting-started/release-notes/?version=v4.2.1) · [v4.2.0](/getting-started/release-notes/?version=v4.2.0)
* Vuetify v4.1: [v4.1.13](/getting-started/release-notes/?version=v4.1.13)
* Vuetify v3 LTS: [v3.13.5](/getting-started/release-notes/?version=v3.13.5) · [v3.13.4](/getting-started/release-notes/?version=v3.13.4) · [v3.13.3](/getting-started/release-notes/?version=v3.13.3)
* Vuetify0: [v1.2.3](https://0.vuetifyjs.com/releases/?version=v1.2.3) · [v1.2.2](https://0.vuetifyjs.com/releases/?version=v1.2.2) · [v1.2.1](https://0.vuetifyjs.com/releases/?version=v1.2.1)

---

## Spotlight: Vuetify0 inside Vuetify { #vuetify0-inside-vuetify }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

Vuetify 4.2 added `@vuetify/v0` as a dependency but only used its type guards, `range` and `findMatchRanges`. In September we started replacing Vuetify internals with v0 code, one system at a time. Each migration keeps Vuetify's public API and output unchanged. Where v0 behaves differently, the Vuetify side stays as it is, and the difference is either fixed in v0 or left documented in the PR.

| Area                               | Status                         | PR                                                          |
|------------------------------------|--------------------------------|-------------------------------------------------------------|
| Type guards, `range`, highlighting | shipped in 4.2.0               | [#23039](https://github.com/vuetifyjs/vuetify/pull/23039)   |
| RTL                                | merged to `dev`                | [#23213](https://github.com/vuetifyjs/vuetify/pull/23213)   |
| Locale (`t()`)                     | merged to `dev`                | [#23214](https://github.com/vuetifyjs/vuetify/pull/23214)   |
| Resize, intersection and mutation observers | merged to `dev`       | [#23220](https://github.com/vuetifyjs/vuetify/pull/23220)   |
| Display / breakpoints              | open, v4.3.0 milestone         | [#23210](https://github.com/vuetifyjs/vuetify/pull/23210)   |
| Theme selection                    | experiment closed              | [#23218](https://github.com/vuetifyjs/vuetify/pull/23218)   |
| Full theme and date systems        | open, `next` branch            | [#22765](https://github.com/vuetifyjs/vuetify/pull/22765), [#22768](https://github.com/vuetifyjs/vuetify/pull/22768) |

**RTL and locale.** `createRtl` keeps direction in v0, while the locale map still decides it. A sync watch updates `isRtl` in the same tick as the locale change, so nothing reads a stale value. `t('$vuetify.close')` strips the prefix and reads from v0, and v0 fills the `{0}` placeholders. `n()` stays on Vuetify's `Intl.NumberFormat`: v0's `n()` skips `Intl` when there is no `window`, which would change server-rendered pagination numbers. Neither v0 plugin is installed, so v0 does not set `dir` on `<html>`.

**Observers.** `useResizeObserver` and `useIntersectionObserver` are now re-exports from v0, and `v-mutate` uses v0's mutation observer. The PR removes a net 184 lines but keeps some code for precise measurements that layout components rely on.

**Display.** The open PR computes breakpoint flags with v0's `createBreakpoints` and uses `matchMedia` where available, so zoomed pages follow the CSS media query instead of `innerWidth`. Writing it found two bugs in v0, both fixed in [1.2.3](https://0.vuetifyjs.com/releases/?version=v1.2.3): flags didn't follow the matched breakpoint name when a custom threshold map wasn't sorted, and `createBreakpoints` only tracked resize when the plugin was installed ([#1003](https://github.com/vuetifyjs/0/pull/1003), [#1004](https://github.com/vuetifyjs/0/pull/1004)).

**Theme, for now, stays.** v0 could only take over the `prefers-color-scheme` listener. Colors, variations, utility classes constitute the majority of theme logic and would still live in Vuetify codebase. We'll revisit once a v0 adapter owns the CSS variable sheet. The full rewrite might land on `next` branch (for v5.0.0) instead.

### What this means for you

Nothing to change in your app. Vuetify depends on `@vuetify/v0@^1.2.1`, so a fix in a shared v0 composable reaches Vuetify, [Emerald](https://0.vuetifyjs.com/systems/emerald) and [Bulma](https://0.vuetifyjs.com/systems/bulma) through a lockfile update, without waiting for a Vuetify release.

---

## Framework Updates

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

### Bug Fixes

| Component                     | Fix                                                                  | Version  | PR / commit                                                    |
|-------------------------------|----------------------------------------------------------------------|----------|----------------------------------------------------------------|
| **VMenu**                     | Focus the selected item when opening with arrow keys                 | v4.1.13  | [d65e89e](https://github.com/vuetifyjs/vuetify/commit/d65e89e) |
| **VCalendar**                 | Show border for outside days when the calendar has events            | v4.1.13  | [#22617](https://github.com/vuetifyjs/vuetify/pull/22617)      |
| **VOverlay**                  | Correct location with CSS `zoom`, also without `currentCSSZoom`      | v4.2.1   | [e64d00e](https://github.com/vuetifyjs/vuetify/commit/e64d00e), [1167eae](https://github.com/vuetifyjs/vuetify/commit/1167eae) |
| **VProgressLinear**           | `height` accepts CSS length units                                    | v4.2.1   | [#23166](https://github.com/vuetifyjs/vuetify/pull/23166)      |
| **VDateInput**                | `placeholder` works as the format hint                               | v4.2.1   | [3072bc5](https://github.com/vuetifyjs/vuetify/commit/3072bc5) |
| **VSelect / VAutocomplete**   | Match browser autofill against item values                           | v4.2.2   | [b6c9f5c](https://github.com/vuetifyjs/vuetify/commit/b6c9f5c) |
| **VAutocomplete / VCombobox** | Menu icon no longer toggles twice                                    | v4.2.2   | [#23200](https://github.com/vuetifyjs/vuetify/pull/23200)      |
| **VSelect family**            | `menu-elevation` applies to the menu content                         | v4.2.2   | [#23193](https://github.com/vuetifyjs/vuetify/pull/23193)      |
| **VPullToRefresh**            | Styles wrapped in the components cascade layer                       | v4.2.2   | [#23207](https://github.com/vuetifyjs/vuetify/pull/23207)      |
| **VTabs**                     | Slider animation restored; `inset-radius` applies to ripple and focus ring | v4.2.2 | [1c5545c](https://github.com/vuetifyjs/vuetify/commit/1c5545c), [bf6abfc](https://github.com/vuetifyjs/vuetify/commit/bf6abfc) |
| **VSwitch**                   | Rotate the thumb icon in vertical direction                          | v4.2.2   | [6b090a0](https://github.com/vuetifyjs/vuetify/commit/6b090a0) |
| **VHighlight**                | Correct foreground color in forced-colors mode                       | v4.2.2   | [c00064f](https://github.com/vuetifyjs/vuetify/commit/c00064f) |
| **VCommandPalette**           | Render the `list.prepend` slot                                       | v4.2.2   | [#23204](https://github.com/vuetifyjs/vuetify/pull/23204)      |
| **VDataTable / VDataIterator**| Emit `update:options` once per search                                | v4.2.3   | [2933523](https://github.com/vuetifyjs/vuetify/commit/2933523) |
| **VIcon / VBadge / VBottomNavigation** | Respect the `theme` prop                                    | v4.2.3   | [3d26868](https://github.com/vuetifyjs/vuetify/commit/3d26868) |
| **VOtpInput**                 | Caret and active slot stay in sync during IME composition            | v4.2.3   | [61719f9](https://github.com/vuetifyjs/vuetify/commit/61719f9) |
| **VTimeline**                 | Nested timelines no longer inherit parent styles                     | v4.2.3   | [#23228](https://github.com/vuetifyjs/vuetify/pull/23228)      |
| **VExpansionPanels**          | `rounded-0` should not appear when `rounded` is not set              | v4.2.3   | [17c9f8d](https://github.com/vuetifyjs/vuetify/commit/17c9f8d) |
| **VProgressLinear**           | Split buffer bar should render when value is 0                       | v4.2.3   | [af79966](https://github.com/vuetifyjs/vuetify/commit/af79966) |

Notably, the autofill fix will make the VSelect and VAutocomplete accept address autofill (both from native browser functionality as well as browser extensions). For example, the browser inserts a code like `US` (a country or territory code) instead of `United States` when the field has `autocomplete='country'`. If you upgrade to the latest Vuetify version, and the `items` effective values are country codes, your users will get country selection autocompleted. If you immediately think "_VSelect cannot hold all the subregions for all countries, what if after country field change, I load the regions/states lazily?_". Well... we got you covered. As long as the app is able to resolve the regions list within 1 second and the field was not focused, it will re-apply the selection after `items` get updated.

Meanwhile, **v3.13 LTS** got three patches: scroll glitches with expanded rows in VDataTableVirtual ([3.13.3](/getting-started/release-notes/?version=v3.13.3)), the CSS `zoom` overlay fixes ([3.13.4](/getting-started/release-notes/?version=v3.13.4)), and focus resolution in Shadow DOM ([3.13.5](/getting-started/release-notes/?version=v3.13.5)).

### CSS layer order { #css-layer-order }

Vuetify 4 relies on the order of its cascade layers... Actually, any website that makes use of CSS layers needs to make sure the browser gets them first. Unfortunately since Vite v8, the order of imports in `main.ts` does not guarantee the effective order for the browser (in production). The order is declared as part of `vuetify/styles/core`, but each component also imports its own CSS that opens `@layer vuetify-components`. Multiple community members reached out to let us know about different scenarios that led UI to "misbehave" - wrong colors, wrong text size. It took the team multiple weeks and fixes on multiple angles to finally solve it... that is, as long as your project matches any of the supported scaffolding templates from `@vuetify/cli`. Still, if you struggle and troubleshooting drags for hours, our Discord server is open and someone will be there to help you get through different problems that arise during v3 » v4 migration.

Anyways, the [layers guide](/styles/layers/#custom-layer-order) now recommends a static `public/layers.css` linked before any other stylesheet:

```html { resource="index.html" }
<head>
  <link rel="stylesheet" href="/layers.css">
</head>
```

The Nuxt module inlines the layer order on its own ([nuxt-module#382](https://github.com/vuetifyjs/nuxt-module/pull/382), merged after rc.6). And v4.3 adds a `vuetify/styles/layers` entry point that contains only the order declaration ([ed2dbea](https://github.com/vuetifyjs/vuetify/commit/ed2dbea)).

### Coming in 4.3 { #coming-in-4-3 }

Merged to `dev`, targeting [v4.3.0](https://github.com/vuetifyjs/vuetify/milestone/93) (due October 15).

**[VInfiniteCarousel](https://dev.vuetifyjs.com/en/components/infinite-carousels/)** (labs) scrolls its content as one continuous strip, repeating it as many times as needed to fill the container. It animates with the Web Animations API, supports dragging, arrows, reverse direction, gaps, separators and keyboard navigation. It clips with `overflow: clip` so the container does not glitch by unexpectedly moving to a focused item. Ships with touch support and vertical direction from day one. It utilizes WAAPI under the hood for smooth play/pause and dragging with cursor ([#23116](https://github.com/vuetifyjs/vuetify/pull/23116)).

<video width="100%" height="auto" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/september-2026-update/demo-of--v-infinite-carousel.webm" type="video/webm"></source>
</video>

**[VTabs](/components/tabs/)** `slider-variant="primary"` renders the MD3 primary tab slider: thicker, rounded on the leading edge and sized to the tab content. The `md3` blueprint uses it by default ([#23181](https://github.com/vuetifyjs/vuetify/pull/23181), closes [#23168](https://github.com/vuetifyjs/vuetify/issues/23168)).

<video width="100%" height="auto" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/september-2026-update/demo-of--tabs-primary-slider.webm" type="video/webm"></source>
</video>

**[VNavigationDrawer](/components/navigation-drawers/)** rail drawers get `modal`, which shows a scrim while the drawer is expanded, and `v-model:expanded` for opening it from a button instead of hover. Combine with `permanent` to ignore clicks on the scrim ([#23182](https://github.com/vuetifyjs/vuetify/pull/23182), closes [#23017](https://github.com/vuetifyjs/vuetify/issues/23017)).

```html
<v-navigation-drawer v-model:expanded="expanded" modal permanent rail>
  ...
</v-navigation-drawer>
```

**[VDateInput](/components/date-inputs/)** shows a localized format hint as the placeholder, built from `Intl.DisplayNames` and filled in as the user types: `TT.MM.JJJJ` in German, `年/月/日` in Japanese. `placeholder` still overrides it ([#23173](https://github.com/vuetifyjs/vuetify/pull/23173)).

<video width="100%" height="auto" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/september-2026-update/demo-of--v-date-input-localized-hints.webm" type="video/webm"></source>
</video>

**[VSlideGroup](/components/slide-groups/)** takes `padding` and `gap`, which together with `scroll-snap` from 4.2 lets the next item peek in ([#23184](https://github.com/vuetifyjs/vuetify/pull/23184), closes [#11972](https://github.com/vuetifyjs/vuetify/issues/11972) from 2020).

Early October additions on `dev`: wheel navigation for VWindow and VCarousel ([#22906](https://github.com/vuetifyjs/vuetify/pull/22906)), `focus()` and `blur()` exposed on VCheckbox, VRadio, VRadioGroup, VSwitch and VColorInput ([#23148](https://github.com/vuetifyjs/vuetify/pull/23148)), and `data-*` attributes on selected and expanded VDataTable rows.

### In Development

Open PRs on the v4.3.0 milestone:

* **VVideo** ([#23241](https://github.com/vuetifyjs/vuetify/pull/23241)) ships a general overhaul, chapters, buffering, wavy progress bar, easier layout customization.
* **VAudio** ([#23227](https://github.com/vuetifyjs/vuetify/pull/23227)) player for music tracks or podcasts with API aligned to match VVideo enhancements. Offers an optional waveform instead of progress bar.
* **VMenu right-click support** ([#23196](https://github.com/vuetifyjs/vuetify/pull/23196)) for framework-native context menu that requires a single prop in place of hacks and workarounds
* Multiple opt-in improvements to align with MD3

### Behind the scenes

Framework maintainers keep the quality bar high and usually act as gatekeepers, but multiple invisible improvements have been made to make it easier for external contributors to work in the forked repo and create PRs that meet all the quality standards.

* new [`AGENTS.md`](https://github.com/vuetifyjs/vuetify/blob/master/AGENTS.md) landed alongside a handful of files and skills to guide AI tools
* dev/Playground was extended to make it easier to test against different browser locales (if you work with i18n heavy apps, feel free to borrow the trick from [skills/playground](https://github.com/vuetifyjs/vuetify/blob/master/.claude/skills/playground/SKILL.md))
* dependencies are managed with a PNPM catalog which simplifies version lookup and future updates are in 1 file only
* no more legacy Cypress specs and leftovers - codebase is fully migrated to Vitest browser mode and 100% of the 2000+ tests pass green
* ESLint got upgraded to v10, lint checks consume less memory when running locally - though it landed in October, it fits nicely on the list

::: tip

Handy command when quickly changing between branches in case one of them has updated dependencies

```sh
pnpx rimraf -g "node_modules" "**/node_modules" && pnpm i
```

:::

---

## Vuetify0 Progress Update { #vuetify0-progress }

Three patches: [v1.2.1](https://0.vuetifyjs.com/releases/?version=v1.2.1) (September 1), [v1.2.2](https://0.vuetifyjs.com/releases/?version=v1.2.2) (September 10) and [v1.2.3](https://0.vuetifyjs.com/releases/?version=v1.2.3) (September 24). No new features on `master`; those are collecting on `dev` for the next minor.

### Fixes

* **Forms** — `required` on Input and NumberField registers a presence rule, so empty required fields fail `submit()` under the default `novalidate`. Unknown rule aliases now fail validation instead of passing silently ([#954](https://github.com/vuetifyjs/0/pull/954), [#953](https://github.com/vuetifyjs/0/pull/953))
* **createFilter** — `keys` accepts a ref or getter, so changing the searched fields re-runs the filter ([#982](https://github.com/vuetifyjs/0/pull/982))
* **findMatchRanges** — directional `ignoreAccents` matches an already-accented spelling verbatim ([#944](https://github.com/vuetifyjs/0/pull/944)). VHighlight's `ignore-accents` in Vuetify 4.2 is built on it.
* **Toggle** — a disabled Toggle on the default `<button>` sets native `disabled` instead of `aria-disabled` ([#985](https://github.com/vuetifyjs/0/pull/985))
* **useStorage** — falls back to memory when the browser refuses `localStorage` instead of throwing ([#1001](https://github.com/vuetifyjs/0/pull/1001))
* **useBreakpoints** — the two fixes from the [display migration](#vuetify0-inside-vuetify) ([#1003](https://github.com/vuetifyjs/0/pull/1003), [#1004](https://github.com/vuetifyjs/0/pull/1004))

One behavior change to check: `useTheme`'s adapter no longer sets `color: var(--*-on-background)` on `[data-theme]`. It still writes the custom properties and `color-scheme`. If you use v0 without a design system and relied on the inherited text color, set it yourself ([#982](https://github.com/vuetifyjs/0/pull/982)).

### Queued on dev

* **[Otp](https://github.com/vuetifyjs/0/pull/787)** — `Otp.Root`, `Otp.Item` and `Otp.HiddenInput` over `createOtp`, with focus movement, paste and a localized `aria-label`
* **createCombobox** — non-strict mode commits typed text that matches no option. Before, `strict` only changed `aria-autocomplete` and free text was dropped ([#383](https://github.com/vuetifyjs/0/pull/383))

Open: `createCalendar` for month grid geometry and keyboard navigation without selection semantics ([#980](https://github.com/vuetifyjs/0/pull/980)), and `OverlayPanel`, a non-modal overlay that handles stacking, Escape, click-outside and focus return but leaves positioning to you ([#979](https://github.com/vuetifyjs/0/pull/979)).

### Docs

The docs now say "Vuetify0" instead of a bare "v0" to avoid confusion with Vercel's v0.dev ([#977](https://github.com/vuetifyjs/0/pull/977)). Every page has a markdown twin at the same path with `.md` added, for feeding to LLMs ([#976](https://github.com/vuetifyjs/0/pull/976)). The [`vuetify add`](https://0.vuetifyjs.com/guide/tooling/vuetify-cli) CLI command, which copies v0 examples into your project, is documented ([#973](https://github.com/vuetifyjs/0/pull/973)).

::: success

**Adopting Vuetify0 for your business?** Teams building production design systems, internal tooling, or product UI on top of v0 can [reach out](mailto:john@vuetifyjs.com) to talk through adoption, partnership, and roadmap input.

:::

**Details:**

* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [v1.2.3 Release](https://0.vuetifyjs.com/releases/?version=v1.2.3)
* [v0play](https://v0play.vuetifyjs.com)

---

## Tooling Updates { #ecosystem-tooling }

### Vuetify MCP

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

<br>

[v0.12.0](https://github.com/vuetifyjs/mcp/releases/tag/v0.12.0) (September 10) adds a version-upgrade engine ([#30](https://github.com/vuetifyjs/mcp/pull/30)). The hosted server can't read your files, so it returns rules and the agent scans your code:

* `get_upgrade_plan({ from, to })` resolves multi-hop upgrades (`v2.6 → v4` becomes v2 → v3 → v4) and points at the ESLint plugin or codemods for each hop
* `get_upgrade_rules` returns rules with grep patterns, replacements and docs links
* `get_migration_receipt_schema` defines how the agent reports each finding, with `disposition: 'auto'` for safe batch changes and `'review'` for anything a human should look at

[v0.12.1](https://github.com/vuetifyjs/mcp/releases/tag/v0.12.1) fixes the launcher when run through an npm bin symlink.

### Nuxt Module

[v1.0.0-rc.6](https://github.com/vuetifyjs/nuxt-module/releases/tag/v1.0.0-rc.6) (September 13) fixes the rules import path. Two fixes merged after it and wait for the next RC: the [layer order](#css-layer-order) fix ([#382](https://github.com/vuetifyjs/nuxt-module/pull/382)), and the module no longer shadows Nuxt 4.5's built-in `useLayout` ([#388](https://github.com/vuetifyjs/nuxt-module/pull/388)).

### ESLint plugin

[v2.7.3](https://github.com/vuetifyjs/eslint-plugin-vuetify/releases/tag/v2.7.3) adds missing typography classes to `no-legacy-utilities` and stops `no-deprecated-classes` from reporting the same class as `no-deprecated-typography`.

---

## What's Next { .mt-4 }

v4.3.0 is due October 15. [v4.2.4](/getting-started/release-notes/?version=v4.2.4) and [v3.13.6](/getting-started/release-notes/?version=v3.13.6) shipped this week. Display is the next system to move onto v0, and we'll keep porting the rest through 4.x minors.

* Link `layers.css` in `<head>` if your buttons or inputs render at the wrong size
* Try [VInfiniteCarousel](https://dev.vuetifyjs.com/en/components/infinite-carousels/) and MD3 tabs on [dev.vuetifyjs.com](https://dev.vuetifyjs.com)
* Planning a v2 or v3 upgrade? Connect Vuetify MCP to your agent and start with `get_upgrade_plan`

::: warning

**Vuetify needs your support.** Open Collective funds are running low, the team has scaled down, and contributors are barely compensated for their work. If your team relies on Vuetify, point your organization at [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider).

:::

Thanks to everyone who sent a PR in September: [SonTT19](https://github.com/SonTT19), [ajslater](https://github.com/ajslater), [lazerg](https://github.com/lazerg), [modos](https://github.com/modos), [morimorimokenpi](https://github.com/morimorimokenpi) and [pupuking723](https://github.com/pupuking723) in the framework, [sridhar-3009](https://github.com/sridhar-3009) in Vuetify0, and [MBK-fr](https://github.com/MBK-fr) in the Nuxt module.

See you in October!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements.*
