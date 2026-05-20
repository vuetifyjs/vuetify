---
layout: blog
meta:
  title: April 2026 Update
  description: April delivered the Vuetify0 v1.0.0 public alpha — 46 components and 63 composables of headless Vue primitives. The framework shipped 3 patch releases, MCP hit v0.7.0 with playground and link tools, and ESLint config landed 4 releases including ESLint 10 support.
  keywords: Vuetify April 2026, Vuetify0 v1.0.0 alpha, VTooltip cursor, VVideo controls, VNumberInput grouping, MCP playground tools, useTheme reactive
---

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const mcplogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vmcp-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const vuetifylogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vuetify-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const eslintconfiglogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/veslconfig-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const onelogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const devkeylogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/devkey-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const snipslogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vsnips-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const releasesimg = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/april-2026-update/releases-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const v0img = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/april-2026-update/v0-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# April 2026 Update

**Vuetify0 went public this month.** On April 7, v0 published its first 1.0 alpha alongside a [public announcement](/blog/announcing-vuetify0-alpha/) — 46 components, 63 composables, and a complete picture of where v0 fits in the next-generation stack. Two more alphas followed in the same month, the framework shipped three patches, and the MCP server gained playground and link tools.

![Hero image for April update](https://cdn.vuetifyjs.com/docs/images/blog/april-2026-update/april-hero.png "April hero image"){ height=112 }

🖊️ John Leider • 📅 May 4th, 2026

<PromotedEntry />

---

## Going public

April was the alpha launch. **847 commits** across 14 active repositories, **52 merged PRs**, and **14 releases**, with [Vuetify0 v1.0.0-alpha.0](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.0) (April 7) at the center of it all. v0 alone shipped **756 commits** across four releases — v0.2.1, v1.0.0-alpha.0, v1.0.0-alpha.1, and v1.0.0-alpha.2 — culminating with reactive-by-default theming and locale, and with new headless Carousel, Image, NumberField, and Progress components. On the framework side, [J-Sek](https://github.com/J-Sek) drove most of April's 13 merged PRs alongside contributions from [userquin](https://github.com/userquin), [joatansampaio](https://github.com/joatansampaio), [12rambau](https://github.com/12rambau), [mueller-jens](https://github.com/mueller-jens), and [AriPerkkio](https://github.com/AriPerkkio). And the [Vuetify → Vuetify0 migration](https://vuetifyjs.com/blog/march-2026-update/) crossed its first finish line, with `display` now delegating to v0's `createBreakpoints`.

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Spotlight: Vuetify0 Alpha](#vuetify0-alpha)
* [Framework Updates](#framework-updates)
  * [New Features](#new-features)
  * [Bug Fixes](#bug-fixes)
  * [In Development](#in-development)
* [Vuetify MCP v0.7.0](#vuetify-mcp)
* [Tooling Updates](#tooling-updates)
* [Snips v2.0.0](#snips-v2)
* [Vuetify0 Progress Update](#vuetify0-progress)
* [Product Updates](#product-updates)
* [April 2026 Changelog](#april-2026-changelog)
* [What's Next](#whats-next)

---

## Releases

April shipped **14 releases across 6 repositories**. The framework patched twice (v4.0.5, v4.0.6) on the v4 line and once (v3.12.5) on the v3 line. v0 published four — including its first **v1.0.0-alpha.0** on April 7. The MCP server hit **v0.7.0**, ESLint Config landed four (**v4.5.0** through **v4.6.2**) including ESLint 10 support, the UnoCSS preset shipped **v0.3.0**, and the codemods CLI shipped **v1.0.6**.

<AppFigure :src="releasesimg" alt="April Releases Banner" title="April Releases Banner" />

### Key Improvements

* **[Vuetify0 v1.0.0-alpha.0](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.0)** — public alpha with 46 components and 63 composables ([announcement](/blog/announcing-vuetify0-alpha/))
* **[VTooltip](/components/tooltips/)** — `target="cursor"` now works for hoverable tooltips (pending v4.0.7)
* **[VVideo](/components/videos/)** — Standalone `VVideoControls` component and progress bar shown by default (v4.0.6 Labs)
* **[VPagination](/components/paginations/) / [VDataTableFooter](/components/data-tables/basics/)** — Ability to hide the last page (pending v4.0.7)
* **[VNumberInput](/components/number-inputs/)** — `grouping` prop for thousands separator (pending v4.0.7)
* **[VExpansionPanels](/components/expansion-panels/)** — Additional customization props (pending v4.0.7)
* **display** — Migrated to v0's `createBreakpoints` (pending v4.0.7)
* **[Vuetify MCP v0.7.0](https://github.com/vuetifyjs/mcp/releases/tag/v0.7.0)** — Playground and link CRUD tools

View the complete list of changes in the [Full Changelog](#april-2026-changelog).

**Details:**

* [v4.0.6](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.6)
* [v4.0.5](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.5)
* [v3.12.5](https://vuetifyjs.com/getting-started/release-notes/?version=v3.12.5)
* [Vuetify0 v1.0.0-alpha.2](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.2)
* [Vuetify0 v1.0.0-alpha.1](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.1)
* [Vuetify0 v1.0.0-alpha.0](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.0)

---

## Spotlight: Vuetify0 Alpha { #vuetify0-alpha }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

After almost two years of building, **Vuetify0 published its first 1.0 alpha on April 7**. The release ships **46 components** and **63 composables** of headless Vue primitives — 100% TypeScript, zero styles, and built from the ground up to power custom UI libraries, design systems, and the Vuetify ecosystem itself.

The alpha was [announced in a dedicated post](/blog/announcing-vuetify0-alpha/) the same day, covering what v0 is, who it's for, what it ships with, and how it fits into the stack underneath the upcoming **Vuetify 5**, design systems built on Paper, and the existing **Vuetify 4** framework.

**Maturity at alpha:**

| Maturity | Components | Composables | What it means              |
|----------|------------|-------------|----------------------------|
| Stable   | 0          | 6           | API locked, production-ready |
| Preview  | 34         | 54          | Implemented, API may change |
| Draft    | 13         | 3           | Planned or in early development |

**What followed:** Two more alpha releases shipped in the same month. **v1.0.0-alpha.1** (April 21) added the headless **Carousel** and **Image** components plus security-audit fixes across foundational composables. **v1.0.0-alpha.2** (April 28) made `useTheme`, `useLocale`, and `useFeatures` reactive-by-default, widened `SplitterPanel` size props, and codified the [reactive-default convention](https://0.vuetifyjs.com/guide/fundamentals/reactivity/) for plugins.

**Details:**

* [Announcing the Vuetify0 Alpha](/blog/announcing-vuetify0-alpha/)
* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [v1.0.0-alpha.2 Release](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.2)
* [v1.0.0-alpha.1 Release](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.1)
* [v1.0.0-alpha.0 Release](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.0)

---

## Framework Updates

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

April merged **13 PRs** across the framework, with most landing after v4.0.6 and pending the next release. The headline pattern: feature work picked back up after March's stabilization sprint, with new props on existing components and a first cross-cut from v0 into Vuetify 4 mainline.

### New Features

**[VTooltip](/components/tooltips/)** — `target="cursor"` now works for hoverable tooltips, anchoring the tooltip to the pointer position while still allowing the user to mouse onto the tooltip itself ([#22728](https://github.com/vuetifyjs/vuetify/pull/22728)).

**[VExpansionPanels](/components/expansion-panels/)** — Additional customization props for finer control over the panel surface and transitions ([#22723](https://github.com/vuetifyjs/vuetify/pull/22723)).

**[VPagination](/components/paginations/) and [VDataTableFooter](/components/data-tables/basics/)** — Ability to hide the last page in pagination controls, contributed by [userquin](https://github.com/userquin) ([#22788](https://github.com/vuetifyjs/vuetify/pull/22788)).

**[VNumberInput](/components/number-inputs/)** — New `grouping` prop adds locale-aware thousands separators to numeric input ([#22134](https://github.com/vuetifyjs/vuetify/pull/22134)).

**[VVideo](/components/videos/)** — Three Labs improvements landed in v4.0.6: `VVideoControls` is now usable as a standalone component, the progress bar is shown by default, and a fix prevents the volume tooltip from obstructing the slider.

**display → v0** — The first internal Vuetify composable migrated to its v0 equivalent. The `display` plugin now delegates breakpoint management to v0's `createBreakpoints` ([#22710](https://github.com/vuetifyjs/vuetify/pull/22710)). This is the first cross-cut from v0 into Vuetify 4 mainline — the bridge between today's framework and tomorrow's headless layer.

**Details:**

* [VTooltip cursor target PR#22728](https://github.com/vuetifyjs/vuetify/pull/22728)
* [VExpansionPanels customization PR#22723](https://github.com/vuetifyjs/vuetify/pull/22723)
* [VPagination/VDataTableFooter hide-last-page PR#22788](https://github.com/vuetifyjs/vuetify/pull/22788)
* [VNumberInput grouping PR#22134](https://github.com/vuetifyjs/vuetify/pull/22134)
* [display → v0 createBreakpoints PR#22710](https://github.com/vuetifyjs/vuetify/pull/22710)

### Bug Fixes

| Component | Fix | Version | PR |
|-----------|-----|---------|----|
| **useActivator** | Avoid closing a hovered menu when its tooltip hides | v3.12.5 / v4.0.5 | — |
| **SSR** | Avoid errors when rendering with the latest Vue | v4.0.5 | [#22764](https://github.com/vuetifyjs/vuetify/pull/22764) |
| **types** | Support `noUncheckedSideEffectImports` | v4.0.5 | [#22766](https://github.com/vuetifyjs/vuetify/issues/22766) |
| **VSnackbar** | Avoid blocking navigation | v4.0.5 | — |
| **VPie** | Shrink hovered slices back on `mouseleave` | v4.0.5 Labs | — |
| **VBadge** | Do not accept clicks within disabled elements | v4.0.6 | — |
| **VField** | Pass color to `icon-color` when `glow` prop is true | v4.0.6 | [#21547](https://github.com/vuetifyjs/vuetify/pull/21547) |
| **VOtpInput** | Remove stray semicolon from sass file | v4.0.6 | — |
| **VSelectionControl** | `readonly` should not suppress `focus-visible` | v4.0.6 | [#22527](https://github.com/vuetifyjs/vuetify/pull/22527) |
| **VVideo** | Avoid tooltip obstructing volume slider | v4.0.6 Labs | — |
| **VSnackbarQueue** | Avoid stale z-index | v4.0.7 | [#22796](https://github.com/vuetifyjs/vuetify/pull/22796) |
| **VField** | Correct baseline alignment | v4.0.7 | [#22812](https://github.com/vuetifyjs/vuetify/pull/22812) |
| **VCheckbox** | Align indeterminate opacity and color with MD3 | v4.0.7 | [#22804](https://github.com/vuetifyjs/vuetify/pull/22804) |
| **VProgressLinear** | Correct calculation for filled chunks | v4.0.7 | — |
| **VBtnToggle** | Correct background when active | v4.0.7 | — |
| **VList** | Invisibly focus first element after open | v4.0.7 | — |
| **VSelects** | Merge `menuProps.contentClass` correctly | v4.0.7 | — |

**Details:**

* [VSelectionControl focus-visible PR#22527](https://github.com/vuetifyjs/vuetify/pull/22527)
* [VField glow color PR#21547](https://github.com/vuetifyjs/vuetify/pull/21547)
* [VSnackbarQueue z-index PR#22796](https://github.com/vuetifyjs/vuetify/pull/22796)
* [VField baseline PR#22812](https://github.com/vuetifyjs/vuetify/pull/22812)
* [VCheckbox MD3 alignment PR#22804](https://github.com/vuetifyjs/vuetify/pull/22804)

### In Development

A handful of significant features moved forward in April but remain open as the month closed:

#### VHighlight

[J-Sek](https://github.com/J-Sek) opened [#22817](https://github.com/vuetifyjs/vuetify/pull/22817) for **VHighlight**, a new component for highlighting matches in text — useful for search results, filtering, and command palettes. A complementary `toHighlight` utility is also being added in v0 ([#222](https://github.com/vuetifyjs/0/pull/222)).

#### VSparkline Markers and Tooltips

[#22748](https://github.com/vuetifyjs/vuetify/pull/22748) — Interactive markers and hover tooltips for the data visualization component, carrying over from March.

#### VSlider Pill Variant

[#22699](https://github.com/vuetifyjs/vuetify/pull/22699) — A `pill` variant for VSlider aligned with Material Design 3's rounded slider track design.

#### Solar Iconset

[#22706](https://github.com/vuetifyjs/vuetify/pull/22706) — Adding the Solar iconset via UnoCSS, expanding the icon options shipped through the iconify ecosystem.

#### VOverlay GPU Compositing

[#22800](https://github.com/vuetifyjs/vuetify/pull/22800) — Promote `VOverlay` to a GPU compositing layer to prevent flicker on WebKit, contributed by [e1berd](https://github.com/e1berd).

#### Continued v0 Migration

The Vuetify → Vuetify0 refactor continues with the remaining core systems open for review:

* **Theme** — Migrate the entire theme system to v0 ([#22765](https://github.com/vuetifyjs/vuetify/pull/22765))
* **Locale/RTL** — Delegate locale and RTL management to v0 ([#22753](https://github.com/vuetifyjs/vuetify/pull/22753))
* **Date** — Delegate to v0's `createDate` runtime ([#22768](https://github.com/vuetifyjs/vuetify/pull/22768))

The display migration ([#22710](https://github.com/vuetifyjs/vuetify/pull/22710)) merged in April and is the first of these to land.

**Details:**

* [VHighlight PR#22817](https://github.com/vuetifyjs/vuetify/pull/22817)
* [VSparkline markers PR#22748](https://github.com/vuetifyjs/vuetify/pull/22748)
* [VSlider pill PR#22699](https://github.com/vuetifyjs/vuetify/pull/22699)
* [Solar iconset PR#22706](https://github.com/vuetifyjs/vuetify/pull/22706)
* [VOverlay GPU compositing PR#22800](https://github.com/vuetifyjs/vuetify/pull/22800)
* [Theme migration PR#22765](https://github.com/vuetifyjs/vuetify/pull/22765)
* [Locale/RTL migration PR#22753](https://github.com/vuetifyjs/vuetify/pull/22753)
* [Date migration PR#22768](https://github.com/vuetifyjs/vuetify/pull/22768)

---

## Vuetify MCP v0.7.0 { #vuetify-mcp }

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

<br>

The MCP server released **v0.7.0** on April 28, shipping the [playground CRUD tools](/blog/march-2026-update/#mcp-playground-crud) that merged in late March alongside a new set of link tools.

### What's New { #mcp-whats-new }

**Playground CRUD** — Tools to create, read, update, and list Vuetify Play playgrounds directly from your AI assistant. Build and iterate on component demos without leaving your editor ([PR#19](https://github.com/vuetifyjs/mcp/pull/19)).

**Link Tools** — A new set of tools for managing short links via [vtfy.link](https://vtfy.link). Generate, list, and update branded short URLs from inside the editor — useful for sharing playground demos, doc references, and AI-generated examples in support threads ([PR#20](https://github.com/vuetifyjs/mcp/pull/20)).

**v0 Alpha Sync** — Composables, components, and exports synced for `v1.0.0-alpha.0`, so any AI assistant using the MCP server now generates accurate code against the latest v0 alpha API surface.

### Setup

Install with the Vuetify CLI:

::: tabs

```bash [pnpm]
pnpm dlx @vuetify/cli add mcp
```

```bash [npm]
npx @vuetify/cli add mcp
```

```bash [yarn]
yarn dlx @vuetify/cli add mcp
```

```bash [bun]
bunx @vuetify/cli add mcp
```

:::

Or configure manually:

```json
{
  "mcpServers": {
    "vuetify": {
      "url": "https://mcp.vuetifyjs.com/mcp"
    }
  }
}
```

**Details:**

* [Vuetify MCP GitHub Repository](https://github.com/vuetifyjs/mcp)
* [v0.7.0 Release](https://github.com/vuetifyjs/mcp/releases/tag/v0.7.0)
* [Link Tools PR#20](https://github.com/vuetifyjs/mcp/pull/20)
* [Playground CRUD PR#19](https://github.com/vuetifyjs/mcp/pull/19)

---

## Tooling Updates { #tooling-updates }

### ESLint Config

<AppFigure :src="eslintconfiglogo" alt="Vuetify ESLint Config logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify ESLint Config Logo" />

<br>

The shared ESLint config — used internally across the ecosystem and by teams that want Vuetify's house style out of the box — shipped **four releases** in April.

**v4.5.0** — Added support for **ESLint 10**, matching the ecosystem-wide bump that began in March's eslint-plugin-vuetify v2.7.0 release.

**v4.6.0** — Introduces a new Vue rule that **enforces blank lines between multiline sibling tags**, surfacing inconsistent template formatting that the autoformatter would otherwise leave alone.

**v4.6.1, v4.6.2** — Refinement releases. v4.6.1 switched the new rule to use the `:multi-line` pseudo-class so single-line siblings aren't required to have separators, and v4.6.2 bumped dependencies.

**Details:**

* [ESLint Config GitHub Repository](https://github.com/vuetifyjs/eslint-config-vuetify)
* [v4.6.2](https://github.com/vuetifyjs/eslint-config-vuetify/releases/tag/v4.6.2)
* [v4.6.0](https://github.com/vuetifyjs/eslint-config-vuetify/releases/tag/v4.6.0)
* [v4.5.0](https://github.com/vuetifyjs/eslint-config-vuetify/releases/tag/v4.5.0)

### UnoCSS Preset

The UnoCSS preset shipped **v0.3.0** on April 23, addressing two issues from teams adopting the v4 + UnoCSS stack:

* **Drop grid styles** — The grid utility variants no longer ship from the preset, since v4's CSS layers and UnoCSS Wind4 cover the same ground without conflicts ([#14](https://github.com/vuetifyjs/unocss-preset-vuetify/pull/14)).
* **Breakpoint variant scoping** — Breakpoint variants now apply only to the rules owned by the preset, preventing accidental side effects on user rules ([#17](https://github.com/vuetifyjs/unocss-preset-vuetify/pull/17)).

Both fixes were authored by [J-Sek](https://github.com/J-Sek), and the preset is now the recommended companion for [Vuetify 4 + UnoCSS](https://vuetifyjs.com/blog/building-with-nuxt-and-unocss/) projects.

**Details:**

* [UnoCSS Preset GitHub Repository](https://github.com/vuetifyjs/unocss-preset-vuetify)
* [v0.3.0 Release](https://github.com/vuetifyjs/unocss-preset-vuetify/releases/tag/v0.3.0)

### Vuetify Codemods

The migration codemod CLI shipped **v1.0.6** on April 28 with a single but impactful fix: typography migrations now **preserve original font sizes** rather than mapping every legacy class to MD3 defaults. This addresses a regression in the v3-to-v4 migration tooling that surfaced as teams ran the codemod against larger codebases.

**Details:**

* [Vuetify Codemods GitHub Repository](https://github.com/vuetifyjs/vuetify-codemods)
* [v1.0.6](https://github.com/vuetifyjs/vuetify-codemods/releases/tag/v1.0.6)

---

## Snips v2.0.0 { #snips-v2 }

<AppFigure :src="snipslogo" alt="Vuetify Snips logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Snips Logo" />

<br>

**[Vuetify Snips](https://snips.vuetifyjs.com/)** shipped **v2.0.0** on April 23, completing its **Vuetify 3 → 4 migration**. Snips is now running on the v4 stack alongside the rest of the property line.

::: success

**Save 40% on Snips v4** — use code `SNIPS40` at checkout to celebrate the v4 release.

:::

**Details:**

* [Vuetify Snips](https://snips.vuetifyjs.com/)

---

## Vuetify0 Progress Update { #vuetify0-progress }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

April was Vuetify0's most productive month yet — **756 commits**, **25 merged PRs**, and **4 releases** culminating in the public alpha. Beyond the alpha launch itself, the headline shifts were a wave of new components, a foundational change in plugin reactivity, and a security-audit pass across the core composables.

<AppFigure :src="v0img" alt="Vuetify0 Progress" title="Vuetify0 April Progress" />

### New Components

Six new headless components were merged into v0 during April, each with a composable layer and compound component pattern:

* **[Carousel](https://0.vuetifyjs.com/components/semantic/carousel/)** — Swipeable slide container with horizontal and vertical orientations, shift+wheel discrete navigation, and auto-mirrored scroll padding ([#190](https://github.com/vuetifyjs/0/pull/190), in v1.0.0-alpha.1)
* **[Image](https://0.vuetifyjs.com/components/semantic/image/)** — Headless image component with lazy-loading and a dedicated `useImage` composable ([#191](https://github.com/vuetifyjs/0/pull/191), in v1.0.0-alpha.1)
* **[NumberField](https://0.vuetifyjs.com/components/forms/number-field/)** — Numeric input with stepper, min/max, and locale-aware grouping ([#183](https://github.com/vuetifyjs/0/pull/183), in v0.2.1)
* **[Progress](https://0.vuetifyjs.com/components/semantic/progress/)** — Progress indicator with indeterminate, determinate, and buffer states ([#180](https://github.com/vuetifyjs/0/pull/180), in v0.2.1)
* **[Toggle](https://0.vuetifyjs.com/components/actions/toggle/)** — Dual-mode toggle button with group support (in v0.2.1)
* **[Overflow](https://0.vuetifyjs.com/components/semantic/overflow/)** — Container that detects overflow and exposes scroll state to children ([#220](https://github.com/vuetifyjs/0/pull/220), pending v1.0.0-alpha.3)

Plus **[AlertDialog](https://0.vuetifyjs.com/components/disclosure/alert-dialog/)**, **[Collapsible](https://0.vuetifyjs.com/components/disclosure/collapsible/)**, **[Portal](https://0.vuetifyjs.com/components/primitives/portal/)**, and **[Presence](https://0.vuetifyjs.com/components/primitives/presence/)** all landed alongside the alpha in v0.2.1.

### New Composables

* **[createNumeric](https://0.vuetifyjs.com/composables/forms/create-numeric/) / [createInput](https://0.vuetifyjs.com/composables/forms/create-input/)** — Foundational input composables that NumberField, Slider, and other form primitives now build on ([#181](https://github.com/vuetifyjs/0/pull/181))
* **[useImage](https://0.vuetifyjs.com/composables/system/use-image/)** — Image loading state, srcset, and intersection-based lazy loading ([#191](https://github.com/vuetifyjs/0/pull/191))
* **[createRating](https://0.vuetifyjs.com/composables/forms/create-rating/)** — Rating composable with compound component pattern
* **[usePresence](https://0.vuetifyjs.com/composables/system/use-presence/)** — Mount/unmount lifecycle helper for transitions

### Reactive-Default Plugins

The biggest architectural change of the month: **`useTheme`, `useLocale`, and `useFeatures` now use a reactive registry by default** ([#210](https://github.com/vuetifyjs/0/pull/210), [#211](https://github.com/vuetifyjs/0/pull/211)). This eliminates the workarounds previously needed to keep theme colors and feature flags reactive after switching, and the convention is now [codified in the docs](https://0.vuetifyjs.com/guide/fundamentals/reactivity/) for all plugin authors ([#213](https://github.com/vuetifyjs/0/pull/213)).

A companion fix in `createRegistry` skips the `values`/`keys`/`entries` cache when the registry is reactive, so consumers get fresh reads every access ([#209](https://github.com/vuetifyjs/0/pull/209)).

### Security and Performance

* **Security audit** — Foundational composables received a sweep of security-audit fixes ([30cc5e1](https://github.com/vuetifyjs/0/commit/30cc5e1118187c412d416d1ef2c6c7c2d73349f2)), including `useTheme` sanitizing theme names and color values in CSS generation.
* **Tree-shaking** — Module-level allocations annotated with `/* @__PURE__ */` and exports marked with `/* #__NO_SIDE_EFFECTS__ */` so bundlers can eliminate unused composables more aggressively.
* **Test infrastructure** — Test coverage raised to **97.2%**, vitest pool switched to vmThreads, and tsdown + web-types generation now run in parallel.

```html { resource="src/components/Gallery.vue" }
<script setup lang="ts">
  import { Carousel, Image } from '@vuetify/v0'

  const slides = [
    { src: 'https://cdn.vuetifyjs.com/docs/images/cards/concert.jpg', alt: 'Concert' },
    { src: 'https://cdn.vuetifyjs.com/docs/images/cards/cosmos.jpg', alt: 'Cosmos' },
    { src: 'https://cdn.vuetifyjs.com/docs/images/cards/forest.jpg', alt: 'Forest' },
  ]
</script>

<template>
  <div class="pa-24">
    <Carousel.Root>
      <Carousel.Viewport class="rounded-lg overflow-hidden gap-4 cursor-grab data-[dragging]:cursor-grabbing">
        <Carousel.Item
          v-for="slide in slides"
          :key="slide.src"
          class="w-full shrink-0 h-64"
        >
          <Image.Root :src="slide.src" class="w-full h-full">
            <Image.Img
              :alt="slide.alt"
              class="w-full h-full object-cover select-none"
              draggable="false"
            />
          </Image.Root>
        </Carousel.Item>
      </Carousel.Viewport>
    </Carousel.Root>
  </div>
</template>
```

::: success

**Adopting Vuetify0 for your business?** Teams building production design systems, internal tooling, or product UI on top of v0 can [reach out](mailto:john@vuetifyjs.com) to talk through adoption, partnership, and roadmap input.

:::

### Coming Next in v0

* **[useDragDrop](https://github.com/vuetifyjs/0/pull/225)** — Headless drag-and-drop primitive
* **[Tooltip](https://github.com/vuetifyjs/0/pull/226)** — Headless tooltip with region coordination
* **[Tour](https://github.com/vuetifyjs/0/pull/178)** — Tour component and `useTour` composable for product walkthroughs
* **[createDataGrid](https://github.com/vuetifyjs/0/pull/174)** — Data grid composable for advanced table layouts
* **[Emerald Paper Design System](https://github.com/vuetifyjs/0/pull/167)** — Phase 0 of the first commercial design system built on Paper

**Details:**

* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [v1.0.0-alpha.2 Release](https://0.vuetifyjs.com/releases/?version=v1.0.0-alpha.2)
* [Carousel PR#190](https://github.com/vuetifyjs/0/pull/190)
* [Image PR#191](https://github.com/vuetifyjs/0/pull/191)
* [Overflow PR#220](https://github.com/vuetifyjs/0/pull/220)
* [NumberField PR#183](https://github.com/vuetifyjs/0/pull/183)
* [Reactive-default useTheme PR#210](https://github.com/vuetifyjs/0/pull/210)
* [Reactive-default useLocale/useFeatures PR#211](https://github.com/vuetifyjs/0/pull/211)

---

## Product Updates { #product-updates }

### DevKey

<AppFigure :src="devkeylogo" alt="DevKey logo" width="200" height="auto" class="mx-auto mt-4" title="DevKey Logo" />

<br>

**[DevKey](https://github.com/vuetifyjs/devkey)** is a small Vuetify0 demo project — the same reference app used as the [implementation walkthrough in the alpha announcement](/blog/announcing-vuetify0-alpha/). It's not a real product; the public repo exists so anyone learning v0 can read along and see how the headless primitives compose into a credible-looking app shell.

April brought a brand pass to make the demo presentable: a Coolify deploy workflow, a Geist-based wordmark, a `DkLogo` component, an asset-generation script for favicons and og images, and branded landing, login, and dashboard pages.

![DevKey demo](https://cdn.vuetifyjs.com/docs/images/blog/april-2026-update/devkey.png "DevKey — Vuetify0 demo project")

**Details:**

* [DevKey GitHub Repository](https://github.com/vuetifyjs/devkey)
* [Implementation walkthrough (in the alpha announcement)](/blog/announcing-vuetify0-alpha/)

### Vuetify One

<AppFigure :src="onelogo" alt="Vuetify One logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify One Logo" />

<br>

**[Vuetify One](https://one.vuetifyjs.com/)** received a **v4.0.6 update** alongside two CSS layer ordering fixes that resolved a class of issues where utility classes were being overridden by the framework reset. The same fix pattern was applied across **issues** (the issue triage app) earlier in the month, completing the v4 migration cleanup that began in February.

---

## April 2026 Changelog { #april-2026-changelog }

The following section provides an overview of the changes made in April 2026, including new features, bug fixes, and enhancements across the Vuetify framework.

**Key Improvements:**

* v3.12.5 / v4.0.5: SSR compatibility with the latest Vue, useActivator menu/tooltip fix, VSnackbar navigation fix, VPie hover Labs fix
* v4.0.6: VBadge clicks within disabled, VField glow icon-color, VSelectionControl focus-visible, VVideo standalone controls and progress-bar default
* Pending v4.0.7: VTooltip cursor target, VExpansionPanels customization, VPagination/VDataTableFooter hide-last-page, VNumberInput grouping, VField baseline, VCheckbox MD3 alignment, display → v0 migration

**Expand** this section to see the detailed changelog for April 2026:

<details>
<summary>April 2026 Full Changelog</summary>

### v3.12.5 (2026-04-02)

**:wrench: Bug Fixes**

* **useActivator:** avoid closing hovered menu when tooltip hides ([71d657b](https://github.com/vuetifyjs/vuetify/commit/71d657b))

---

### v4.0.5 (2026-04-02)

**:wrench: Bug Fixes**

* **SSR:** avoid errors when rendering with latest Vue ([#22764](https://github.com/vuetifyjs/vuetify/issues/22764)) ([ecbe030](https://github.com/vuetifyjs/vuetify/commit/ecbe030)), closes [#22762](https://github.com/vuetifyjs/vuetify/issues/22762)
* **types:** support noUncheckedSideEffectImports ([2098fb1](https://github.com/vuetifyjs/vuetify/commit/2098fb1)), closes [#22766](https://github.com/vuetifyjs/vuetify/issues/22766)
* **useActivator:** avoid closing hovered menu when tooltip hides ([131e659](https://github.com/vuetifyjs/vuetify/commit/131e659)), closes [#22759](https://github.com/vuetifyjs/vuetify/issues/22759)
* **VSnackbar:** avoid blocking navigation ([143ceaa](https://github.com/vuetifyjs/vuetify/commit/143ceaa)), closes [#18283](https://github.com/vuetifyjs/vuetify/issues/18283)

**:test_tube: Labs**

* **VPie:** shrink back hovered slices on mouseleave ([1893748](https://github.com/vuetifyjs/vuetify/commit/1893748))

---

### v4.0.6 (2026-04-22)

**:wrench: Bug Fixes**

* **VBadge:** do not accept clicks within disabled elements ([996cd6e](https://github.com/vuetifyjs/vuetify/commit/996cd6e)), closes [#22172](https://github.com/vuetifyjs/vuetify/issues/22172)
* **VField:** pass color to icon-color if glow prop is true ([#21547](https://github.com/vuetifyjs/vuetify/issues/21547)) ([10125b7](https://github.com/vuetifyjs/vuetify/commit/10125b7)), closes [#21388](https://github.com/vuetifyjs/vuetify/issues/21388)
* **VOtpInput:** remove semicolon from sass file ([bf53f9e](https://github.com/vuetifyjs/vuetify/commit/bf53f9e)), closes [#22798](https://github.com/vuetifyjs/vuetify/issues/22798)
* **VSelectionControl:** readonly should not suppress focus-visible ([#22527](https://github.com/vuetifyjs/vuetify/issues/22527)) ([ce234a8](https://github.com/vuetifyjs/vuetify/commit/ce234a8)), closes [#22513](https://github.com/vuetifyjs/vuetify/issues/22513)

**:test_tube: Labs**

* **VVideo:** avoid tooltip obstructing volume slider ([add2a7e](https://github.com/vuetifyjs/vuetify/commit/add2a7e))
* **VVideo:** support VVideoControls as standalone component ([aaf9cf5](https://github.com/vuetifyjs/vuetify/commit/aaf9cf5)), closes [#22529](https://github.com/vuetifyjs/vuetify/issues/22529)
* **VVideo:** show progress bar by default ([1be0091](https://github.com/vuetifyjs/vuetify/commit/1be0091))

</details>

---

## What's Next { #whats-next .mt-4 }

May continues on three fronts. **Vuetify4** has a queue of merged PRs awaiting v4.0.7 — VTooltip cursor target, VExpansionPanels customization, VPagination/VDataTableFooter hide-last-page, VNumberInput grouping, the display → v0 migration, and a stack of fixes from J-Sek. **Vuetify0** has v1.0.0-alpha.3 work in flight, including useDragDrop, the headless Tooltip, the Tour component, createDataGrid, and the first phase of the **Emerald Paper Design System**. And the **theme**, **locale**, and **date** v0 migrations all have open PRs in vuetify ready to follow display through to merge.

* The [Vuetify0 alpha](/blog/announcing-vuetify0-alpha/) is live — try it in a new project or via [v0play](https://v0play.vuetifyjs.com)
* The [Vuetify MCP server](https://github.com/vuetifyjs/mcp) now ships playground and link tools for [Vuetify One](/one/) subscribers — manage demos and short links from your editor

::: error

**Vuetify needs your support.** OpenCollective funds are exhausted and we're currently unable to compensate contributors for ongoing work on the framework and ecosystem tools. If your team relies on Vuetify, please consider sponsoring us via [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider). Every contribution keeps Vuetify shipping.

:::

Vuetify is and always will be free and open source. If your team builds on the framework, the v0 alpha, the MCP, the CLI, the Nuxt module, the ESLint plugin, or any of the design systems coming behind them, your support directly funds continued development. [Vuetify One](https://one.vuetifyjs.com/) and [GitHub Sponsors](https://github.com/sponsors/johnleider) are the most direct ways to help.

Thank you for being part of the Vuetify community. See you in May!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/vuetify), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
