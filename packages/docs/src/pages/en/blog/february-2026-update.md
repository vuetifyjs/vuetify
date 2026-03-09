---
layout: blog
meta:
  title: February 2026 Update
  description: February marks Vuetify's most significant milestone—the stable release of Vuetify 4.0.0 with CSS layers, MD3 design system, and unstyled component foundations. The CLI hits v1.0.0, VAvatarGroup ships, and Vuetify0 gains createDataTable and Breadcrumbs composables.
  keywords: Vuetify February 2026, Vuetify 4.0.0 Revisionist, v4 stable, VAvatarGroup, CLI v1.0.0, Vuetify0, createDataTable
---

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const clilogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vcli-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const mcplogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vmcp-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const vuetifylogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vuetify-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# February 2026 Update

**Vuetify 4 is here.** After four beta releases and months of community testing, **v4.0.0 (Revisionist)** shipped on February 23rd—bringing CSS layers, MD3 typography and elevation, and the architectural foundation for unstyled components. The **Vuetify CLI** also reached its **v1.0.0** milestone, and Vuetify0 continues building its headless composable layer with createDataTable, createNested, and Breadcrumbs.

![Hero image for February update](https://cdn.vuetifyjs.com/docs/images/blog/february-2026-update/february-hero.png "February hero image"){ height=112 }

🖊️ John Leider • 📅 March 9th, 2026

<PromotedEntry />

---

## The big one

This is the release we've been building toward since the [2024 State of the Union](https://vuetifyjs.com/blog/state-of-the-union-2024/). **390 commits** across 15 active repositories, **68 merged PRs**, and 21 releases across the ecosystem—all driven by a month laser-focused on getting v4 stable. [J-Sek](https://github.com/J-Sek) delivered another prolific month with 20+ merged framework PRs including VAvatarGroup and new transitions, while [Andrei Elkin](https://github.com/AndreyYolkin) drove the [CLI](https://github.com/vuetifyjs/cli) to its first stable release with the Tailwind preset and project scaffolding presets.

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Vuetify 4.0.0 Stable](#vuetify-400-stable)
* [Framework Updates](#framework-updates)
  * [New Features](#new-features)
  * [Bug Fixes](#bug-fixes)
  * [In Development](#in-development)
* [Ecosystem Spotlight: Vuetify CLI v1.0.0](#ecosystem-spotlight-vuetify-cli-v100)
* [Vuetify MCP: V4 Migration & Developer Tools](#vuetify-mcp-v4-migration--developer-tools)
* [Product Updates](#product-updates)
* [Vuetify0: Progress Update](#vuetify0-progress-update)
* [February 2026 Changelog](#february-2026-changelog)
* [What's Next](#whats-next)

---

## Releases

February was Vuetify's biggest release month ever. Four v4 betas culminated in the **stable v4.0.0 (Revisionist) release**, while v3.11.9, v3.12.0, and v3.12.1 maintained the v3 line. The CLI shipped nine releases reaching v1.0.0, Vuetify0 released v0.1.3, and the UnoCSS preset hit v0.2.0.

![February Releases Banner](https://cdn.vuetifyjs.com/docs/images/blog/february-2026-update/releases.png "February Releases Banner")

### Key Improvements

* **[Vuetify 4.0.0](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.0)** stable release with CSS layers, MD3 design system, and unstyled foundations
* **[VAvatarGroup](https://vuetifyjs.com/components/avatar-groups/)** new component for stacked avatar displays
* **[VSelect/VAutocomplete/VCombobox](https://vuetifyjs.com/components/selects/)** `menu-header` and `menu-footer` slots
* **[VSnackbarQueue](https://vuetifyjs.com/components/snackbar-queue/)** show multiple snackbars simultaneously
* **[v-expand-both-transition](https://vuetifyjs.com/styles/transitions/)** new bidirectional expand transition
* **[mdi-unocss](https://vuetifyjs.com/features/icon-fonts/)** icon set for UnoCSS integration

View the complete list of changes in the [Full Changelog](#february-2026-changelog).

**Details:**

* [v4.0.0](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.0)
* [v3.12.0](https://vuetifyjs.com/getting-started/release-notes/?version=v3.12.0)
* [v3.12.1](https://vuetifyjs.com/getting-started/release-notes/?version=v3.12.1)
* [v3.11.9](https://vuetifyjs.com/getting-started/release-notes/?version=v3.11.9)

---

## Vuetify 4.0.0 Stable

The stable release of **Vuetify 4.0.0 (Revisionist)** landed on February 23rd after four beta releases (beta.0 through beta.3). This is a pivotal release for the Vuetify ecosystem—not just for the features it ships, but for the architecture it establishes.

<!-- MEDIA TODO: v4-launch.png
  Ideas:
  - Full-width announcement banner — "Vuetify 4" in large type with the key pillars underneath: CSS Layers / MD3 / Unstyled
  - Side-by-side code comparison: v3 styles being overridden with !important vs v4 clean @layer override — the "why it matters" shot
  - Browser DevTools screenshot showing the clean @layer stack (vuetify-base, vuetify-components, utilities) — proves the CSS layers story is real
  - Stylized diagram showing Vuetify 4 architecture: layers cake with MD3 at the base, components in the middle, user overrides on top
-->
![Vuetify 4 Launch](https://cdn.vuetifyjs.com/docs/images/blog/february-2026-update/v4-launch.png "Vuetify 4.0.0 Stable Release")

### What's in v4

* **CSS Layers** — Vuetify's styles are now organized in CSS `@layer` blocks, making it trivial to override styles and coexist with utility frameworks like TailwindCSS and UnoCSS
* **MD3 Typography & Elevation** — Full Material Design 3 type scale and shadow system
* **Grid System Overhaul** — Modernized responsive grid with improved flexbox, RTL support, and cleaner CSS output
* **Unstyled Foundations** — The internal architecture that makes true unstyled components possible in future releases

### Migration

The upgrade path from v3 to v4 is intentionally minimal. The [upgrade guide](https://vuetifyjs.com/getting-started/upgrade-guide/) covers the handful of breaking changes, and the [Vuetify MCP server](#vuetify-mcp-v4-migration--developer-tools) provides AI-assisted migration tooling.

Every breaking change in v4 can be reverted with a drop-in snippet — upgrade now, migrate visuals at your own pace:

* **[Grid System](https://vuetifyjs.com/getting-started/grid-legacy-mode/)** — CSS snippet restores v3 negative-margin grid behavior using `@layer vuetify-overrides`
* **[Typography](https://vuetifyjs.com/getting-started/typography-migration/)** — Sass config restores full MD2 type scale with component-specific variable mappings
* **[Elevation](https://vuetifyjs.com/getting-started/elevation-migration/)** — CSS file restores all 25 MD2 elevation levels (v4 ships MD3's 6-level system)
* **[CSS Reset](https://vuetifyjs.com/getting-started/upgrade-guide/)** — Minimal or full reset snippets using `@layer vuetify-core.reset`
* **[Breakpoints](https://vuetifyjs.com/getting-started/upgrade-guide/)** — JS or Sass config to restore v3 thresholds (960/1280/1920/2560)
* **[Button text-transform](https://vuetifyjs.com/getting-started/upgrade-guide/)** — Sass variable, global default, or utility class to restore uppercase

The [vuetify-codemods](https://www.npmjs.com/package/vuetify-codemods) package automates class and attribute renames.

::: tip

Use the Vuetify MCP server to analyze your project: *"Scan my project for Vuetify 3 patterns that need updating for v4."*

:::

Across the ecosystem, v4 adoption started immediately—[Vuetify One](https://one.vuetifyjs.com/) upgraded to v4 the same week, and the CLI updated all project templates.

**Details:**

* [v4.0.0 Release Notes](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.0)
* [Upgrade Guide](https://vuetifyjs.com/getting-started/upgrade-guide/)
* [Vuetify 3 Documentation](https://v3.vuetifyjs.com/)
* [Building with Vite and TailwindCSS](https://vuetifyjs.com/blog/building-with-vite-and-tailwindcss/)

---

## Framework Updates

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

February's 39 merged PRs delivered new components, significant feature additions, and targeted bug fixes across both the v3 and v4 branches.

### New Features

**[VAvatarGroup](https://vuetifyjs.com/components/avatar-groups/)**

A new component for displaying stacked avatar collections with overlap, max count, and a "+N" indicator for overflow. Pairs with the new `badge` prop on VAvatar for status indicators.

<!-- MEDIA TODO: avatar-group.png
  Ideas:
  - Live screenshot from the docs playground showing 5-6 avatars overlapping with the "+3" overflow chip
  - Show two variants side-by-side: one with photo avatars, one with icon/initial avatars — demonstrates flexibility
  - Include the VAvatar badge prop in the shot — a couple avatars with green "online" dots to show both features at once
  - Dark and light theme split if possible — the component looks good on both
-->
![VAvatarGroup](https://cdn.vuetifyjs.com/docs/images/blog/february-2026-update/avatar-group.png "VAvatarGroup Component")

**[VSnackbarQueue](https://vuetifyjs.com/components/snackbar-queue/)** — Show multiple snackbars simultaneously instead of replacing one at a time ([#22605](https://github.com/vuetifyjs/vuetify/pull/22605))

**[VToolbar](https://vuetifyjs.com/components/toolbars/)** — New `location` prop for bottom-positioned toolbars ([#22608](https://github.com/vuetifyjs/vuetify/pull/22608))

**[VImg](https://vuetifyjs.com/components/images/)** — `image-class` prop for styling the inner `<img>` element, plus `width="fit-content"` support ([#22622](https://github.com/vuetifyjs/vuetify/pull/22622), [#21414](https://github.com/vuetifyjs/vuetify/pull/21414))

**[VDataTable](https://vuetifyjs.com/components/data-tables/)** — `page-by` prop for page size control ([#22580](https://github.com/vuetifyjs/vuetify/pull/22580))

**[VSelect/VAutocomplete/VCombobox](https://vuetifyjs.com/components/selects/)** — `menu-header` and `menu-footer` slots for custom dropdown content ([#22414](https://github.com/vuetifyjs/vuetify/pull/22414))

**[VSlider](https://vuetifyjs.com/components/sliders/)** — Show thumb value on hover ([#22412](https://github.com/vuetifyjs/vuetify/pull/22412))

**[VOtpInput](https://vuetifyjs.com/components/otp-input/)** — `masked` prop to hide or show entered text ([#20950](https://github.com/vuetifyjs/vuetify/pull/20950))

**[VProgressCircular](https://vuetifyjs.com/components/progress-circular/)** — `reveal` prop for animated entry ([#22502](https://github.com/vuetifyjs/vuetify/pull/22502))

**[VRow](https://vuetifyjs.com/api/v-row/)** — Smaller density steps for finer layout control ([#22574](https://github.com/vuetifyjs/vuetify/pull/22574))

**v-expand-both-transition** — New transition that expands in both width and height ([#22570](https://github.com/vuetifyjs/vuetify/pull/22570))

**color utilities** — Strip `text-*` and `bg-*` prefixes for dynamic utility class support ([#17569](https://github.com/vuetifyjs/vuetify/pull/17569))

**mdi-unocss icon set** — Native UnoCSS icon support ([#22117](https://github.com/vuetifyjs/vuetify/pull/22117))

**Details:**

* [VAvatarGroup PR#22495](https://github.com/vuetifyjs/vuetify/pull/22495)
* [VAvatar badge PR#22496](https://github.com/vuetifyjs/vuetify/pull/22496)
* [VSnackbarQueue PR#22605](https://github.com/vuetifyjs/vuetify/pull/22605)
* [VToolbar location PR#22608](https://github.com/vuetifyjs/vuetify/pull/22608)
* [VImg image-class PR#22622](https://github.com/vuetifyjs/vuetify/pull/22622)

### Bug Fixes

**VSnackbar** — Opaque background for transparent variants ([#22646](https://github.com/vuetifyjs/vuetify/pull/22646))

**VTab** — Correct text colors with `inset` without `slider-color` ([#22614](https://github.com/vuetifyjs/vuetify/pull/22614))

**VDateInput** — Prevent page scroll when opening years view ([#22613](https://github.com/vuetifyjs/vuetify/pull/22613))

**VTimePicker** — Enforce allowed values and range in inputs ([#22578](https://github.com/vuetifyjs/vuetify/pull/22578))

**VColorPicker** — Avoid undefined alpha in RGB/HSL output ([#22582](https://github.com/vuetifyjs/vuetify/pull/22582))

**VSelect** — Fix screenreader navigation to select options ([#22602](https://github.com/vuetifyjs/vuetify/pull/22602))

**VTreeview** — Indent lines with `prepend-gap`, correct ARIA roles and attributes ([#22589](https://github.com/vuetifyjs/vuetify/pull/22589), [#22577](https://github.com/vuetifyjs/vuetify/pull/22577))

**VCard** — Accept height when used within a dialog ([#22594](https://github.com/vuetifyjs/vuetify/pull/22594))

**VDataTable** — Sort icon persists after removing sort ([#22595](https://github.com/vuetifyjs/vuetify/pull/22595))

**router** — Ensure reactivity for `to` attribute in useLink ([#20994](https://github.com/vuetifyjs/vuetify/pull/20994))

**styles** — Utilities override responsive typography correctly ([#22573](https://github.com/vuetifyjs/vuetify/pull/22573))

**Details:**

* [VSelect a11y PR#22602](https://github.com/vuetifyjs/vuetify/pull/22602)
* [VTreeview ARIA PR#22577](https://github.com/vuetifyjs/vuetify/pull/22577)
* [VTreeview indent PR#22589](https://github.com/vuetifyjs/vuetify/pull/22589)

### In Development

Several features opened in February are expected in upcoming releases:

#### VMorphingIcon

A new component for animated icon transitions—morphing between two icons using SVG path animation for polished state changes.

#### Theme Page Transitions

Optional built-in page transitions that leverage the View Transitions API, bringing smooth animated route changes without custom code.

#### Hover Elevation

A new `hover-elevation` prop and CSS utilities for elevation changes on hover—a common Material Design pattern now built in.

**Details:**

* [VMorphingIcon PR#22639](https://github.com/vuetifyjs/vuetify/pull/22639)
* [Theme transitions PR#22623](https://github.com/vuetifyjs/vuetify/pull/22623)
* [Hover elevation PR#22621](https://github.com/vuetifyjs/vuetify/pull/22621)

---

## Ecosystem Spotlight: Vuetify CLI v1.0.0

<AppFigure :src="clilogo" alt="Vuetify CLI Logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify CLI Logo" />

<br>

The Vuetify CLI reached its **first stable release** on February 23rd—shipping alongside Vuetify 4. With **42 commits** and 9 releases (v0.0.14 through v1.0.3), [Andrei Elkin](https://github.com/AndreyYolkin) transformed the CLI from an early beta into a production-ready tool.

### What's New in v1.0.0

**Project Presets** — Create projects with predefined configurations. The first preset is **TailwindCSS**—scaffolding a complete Vuetify 4 + Tailwind project with CSS layers configured correctly out of the box.

**Vuetify 4 Templates** — All project templates updated for v4, with version selection removed now that v4 is stable.

**i18n Support** — CLI prompts now support fallback locales for internationalized project scaffolding.

### Getting Started

::: tabs

```bash [pnpm]
pnpm add -g @vuetify/cli
```

```bash [npm]
npm install -g @vuetify/cli
```

```bash [yarn]
yarn global add @vuetify/cli
```

```bash [bun]
bun add -g @vuetify/cli
```

:::

**Details:**

* [Vuetify CLI GitHub Repository](https://github.com/vuetifyjs/cli)
* [v1.0.0 Release](https://github.com/vuetifyjs/cli/releases/tag/v1.0.0)

---

## Vuetify MCP: V4 Migration & Developer Tools

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

<br>

The MCP server received 9 commits in February, adding new developer tooling and improving v0 integration.

### What's New

**V4 Migration Tools** — Two tools launched alongside the v4 beta cycle provide AI-assisted upgrade guidance:

* **`get_upgrade_guide`** — Fetches the full v3 → v4 upgrade guide with step-by-step migration instructions and revert snippets
* **`get_v4_breaking_changes`** — Returns detailed migration guidance for all 13 categories of breaking changes (styles, grid, typography, elevation, theme, display, v-btn, v-snackbar, v-select, v-date-picker, v-form, v-img, nested), with optional category filtering

**`create_bug_report` Tool** — Generate a pre-filled link to the Vuetify issue tracker with the correct repository and label pre-selected.

**`get_vuetify0_skill` Tool** — Provides AI assistants with v0 composable documentation and usage patterns, enabling better code generation for headless components.

**v0 Fixes** — Corrected composable names and missing exports in the v0 documentation, and fixed GitHub URL branch references.

**CLI Integration** — [Andrei Elkin](https://github.com/AndreyYolkin) opened a PR for detecting running IDE instances and supporting multi-selection during MCP setup.

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
* [create_bug_report commit](https://github.com/vuetifyjs/mcp/commit/47d4dafc4fc6fb13dad705d32f802beec92ffefd)
* [get_vuetify0_skill commit](https://github.com/vuetifyjs/mcp/commit/d58a7abbcdb73a087e982ce8a8d3d27331064e52)

---

## Product Updates

### Vuetify One

Vuetify One completed a **monorepo conversion**, extracting `@vuetify/auth` as a standalone package with 7 iterative releases (v0.1.1 through v0.1.8). The app upgraded to **Vuetify 4** on release day, and a new [v3.vuetifyjs.com](https://v3.vuetifyjs.com/) site identifier was added for versioned documentation hosting.

**Details:**

* [Vuetify One](https://one.vuetifyjs.com/)
* [v3.0.2 Release](https://github.com/vuetifyjs/one/releases/tag/v3.0.2)
* [@vuetify/auth@0.1.8](https://github.com/vuetifyjs/one/releases/tag/%40vuetify/auth%400.1.8)

### Vuetify Bin

[Henry Aviles](https://github.com/Haviles04) shipped the **team dashboard** feature across 5 merged PRs—enabling team bin management, role-based permissions, and team switching.

### Vuetify Snips

[Kael](https://github.com/KaelWD) set up **visual regression testing** for Snips, and [J-Sek](https://github.com/J-Sek) fixed import and TypeScript issues for Vuetify Play compatibility.

### UnoCSS Preset

The [unocss-preset-vuetify](https://github.com/vuetifyjs/unocss-preset-vuetify) reached **v0.2.0** with theme variants, built-in MD2/MD3 elevation presets, and separated base typography layers.

---

## Vuetify0: Progress Update

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

February was Vuetify0's highest-commit month with **152 commits** and **10 merged PRs**, releasing **v0.1.3**. The focus shifted toward data-heavy composables and overlay management, building the foundation for reconstructing Vuetify's internals on v0's headless layer.

<!-- MEDIA TODO: v0.png
  Ideas:
  - Screenshot of the v0 docs site showing the new createDataTable composable page — TypeScript types visible in the API reference
  - IDE screenshot showing createDataTable usage with full autocompletion — sorting, filtering, pagination props all typed
  - Diagram of the v0 composable tree: createDataTable composed from createGroup + createFilter + createPagination + createSort — shows the composable-composition story
  - The Breadcrumbs compound component tree (Root > List > Item > Link > Divider > Ellipsis) rendered in the docs with ARIA attributes visible in DevTools
  - Before/after: Vuetify VDataTable source vs v0 createDataTable — shows the refactor direction
-->
![Vuetify0 Progress](https://cdn.vuetifyjs.com/docs/images/blog/february-2026-update/v0.png "Vuetify0 February Progress")

### New Composables & Components

* **[createDataTable](https://0.vuetifyjs.com/composables/data/create-data-table/)** — Headless data table composable with sorting, filtering, pagination, and selection built in. The foundation for Vuetify's VDataTable refactor.

* **[createNested](https://0.vuetifyjs.com/composables/selection/create-nested/)** — Gained active state management for hierarchical tree structures, enabling treeview, file browser, and nested navigation patterns with `activate()`, `deactivate()`, and `activeIds` tracking.

* **[createStack](https://0.vuetifyjs.com/composables/system/create-stack/)** — Overlay z-index management composable for coordinating dialogs, menus, and drawers. Ensures correct stacking order without manual z-index management.

* **[Breadcrumbs](https://0.vuetifyjs.com/components/navigation/breadcrumbs/)** — Composable and component for accessible breadcrumb navigation with automatic ARIA attributes.

### useDate Fixes

[J-Sek](https://github.com/J-Sek) landed two important fixes—symmetrical date diffs and a corrected `getWeek` implementation ported from Vuetify core.

### Coming Next

Development is accelerating with several new components and composables in active PRs:

* **[Treeview](https://github.com/vuetifyjs/0/pull/144)** — Full tree component built on createNested
* **[Slider](https://github.com/vuetifyjs/0/pull/143)** — New component and composable
* **[Splitter](https://github.com/vuetifyjs/0/pull/145)** — Root, Panel, and Handle components for resizable pane layouts
* **[useNotifications](https://github.com/vuetifyjs/0/pull/146)** — Notification lifecycle management with adapters
* **[createModel](https://github.com/vuetifyjs/0/pull/148)** — Selection state layer between registry and selection
* **[createRegistry](https://github.com/vuetifyjs/0/pull/149)** — `move()` method for reordering registered items
* **[useRules](https://github.com/vuetifyjs/0/pull/140)** — Validation composable with Zod and Yup adapters

The [interactive playground](https://0.vuetifyjs.com/playground) is now live for experimenting with v0 composables.

::: info

With v4 stable, the Vuetify → Vuetify0 refactor has begun. Core Vuetify components are being rebuilt on top of v0's headless composable layer—the path to Vuetify 5.

:::

**Details:**

* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [createDataTable PR#138](https://github.com/vuetifyjs/0/pull/138)
* [createNested PR#137](https://github.com/vuetifyjs/0/pull/137)
* [Breadcrumbs PR#136](https://github.com/vuetifyjs/0/pull/136)
* [createStack PR#129](https://github.com/vuetifyjs/0/pull/129)
* [v0.1.3 Release Notes](https://github.com/vuetifyjs/0/releases/tag/v0.1.3)

---

## February 2026 Changelog

The following section provides an overview of the changes made in February 2026, including new features, bug fixes, and enhancements across the Vuetify framework.

**Key Improvements:**

* New components: VAvatarGroup, v-expand-both-transition
* Select components: menu-header/footer slots, screenreader fixes
* VDataTable: page-by prop, sort icon persistence fix
* VTreeview: ARIA roles, indent line improvements
* Multiple VTimePicker, VDateInput, and VColorPicker fixes
* Dynamic color utility class support

**Expand** this section to see the detailed changelog for February 2026:

<details>
<summary>February 2026 Full Changelog</summary>

### v3.11.9

**:wrench: Bug Fixes**

* **VSnackbar:** opaque background for transparent variants ([#22646](https://github.com/vuetifyjs/vuetify/issues/22646)) ([Timur000101](https://github.com/Timur000101))
* **VTab:** correct text colors when using inset without slider-color ([#22614](https://github.com/vuetifyjs/vuetify/issues/22614)) ([J-Sek](https://github.com/J-Sek))
* **VDateInput:** don't scroll the page when opening years view ([#22613](https://github.com/vuetifyjs/vuetify/issues/22613)) ([Tzahile](https://github.com/Tzahile))
* **VTimePicker:** enforce allowed values and range in inputs ([#22578](https://github.com/vuetifyjs/vuetify/issues/22578)) ([J-Sek](https://github.com/J-Sek))
* **VColorPicker:** avoid undefined alpha in rgb/hsl output ([#22582](https://github.com/vuetifyjs/vuetify/issues/22582)) ([TheSanjBot](https://github.com/TheSanjBot))
* **VTable:** apply $table-header-font-size to th elements ([#22598](https://github.com/vuetifyjs/vuetify/issues/22598)) ([nemanjamalesija](https://github.com/nemanjamalesija))
* **VDataTable:** sort icon persists after removing sort via click ([#22595](https://github.com/vuetifyjs/vuetify/issues/22595)) ([nemanjamalesija](https://github.com/nemanjamalesija))
* **VCard:** accept height when used within a dialog ([#22594](https://github.com/vuetifyjs/vuetify/issues/22594)) ([J-Sek](https://github.com/J-Sek))
* **VSelect:** pass listProps density to VCheckboxBtn in multiple ([#22512](https://github.com/vuetifyjs/vuetify/issues/22512)) ([johnleider](https://github.com/johnleider))
* **VField:** fixed incorrect type define ([#22618](https://github.com/vuetifyjs/vuetify/issues/22618)) ([ZacharyBear](https://github.com/ZacharyBear))
* **styles:** utilities should override responsive typography ([#22573](https://github.com/vuetifyjs/vuetify/issues/22573)) ([J-Sek](https://github.com/J-Sek))
* **router:** ensure reactivity for 'to' attribute in useLink ([#20994](https://github.com/vuetifyjs/vuetify/issues/20994)) ([rbgmulmb](https://github.com/rbgmulmb))

---

### v3.12.0

**:rocket: Features**

* **VAvatarGroup:** add new component ([#22495](https://github.com/vuetifyjs/vuetify/issues/22495)) ([J-Sek](https://github.com/J-Sek))
* **VAvatar:** add badge prop + dot-size for VBadge ([#22496](https://github.com/vuetifyjs/vuetify/issues/22496)) ([J-Sek](https://github.com/J-Sek))
* **VSnackbarQueue:** show multiple snackbars ([#22605](https://github.com/vuetifyjs/vuetify/issues/22605)) ([J-Sek](https://github.com/J-Sek))
* **VToolbar:** add location prop ([#22608](https://github.com/vuetifyjs/vuetify/issues/22608)) ([J-Sek](https://github.com/J-Sek))
* **VImg:** add image-class prop ([#22622](https://github.com/vuetifyjs/vuetify/issues/22622)) ([J-Sek](https://github.com/J-Sek))
* **VImg:** support width="fit-content" ([#21414](https://github.com/vuetifyjs/vuetify/issues/21414)) ([eesayas](https://github.com/eesayas))
* **VDataTable:** add page-by prop ([#22580](https://github.com/vuetifyjs/vuetify/issues/22580)) ([J-Sek](https://github.com/J-Sek))
* **VSelect/VAutocomplete/VCombobox:** add menu-header and menu-footer slots ([#22414](https://github.com/vuetifyjs/vuetify/issues/22414)) ([Haviles04](https://github.com/Haviles04))
* **VSlider:** show thumb slider value on hover ([#22412](https://github.com/vuetifyjs/vuetify/issues/22412)) ([brandonpham13](https://github.com/brandonpham13))
* **VOtpInput:** add masked prop ([#20950](https://github.com/vuetifyjs/vuetify/issues/20950)) ([ankusharoraa](https://github.com/ankusharoraa))
* **VProgressCircular:** add reveal prop ([#22502](https://github.com/vuetifyjs/vuetify/issues/22502)) ([J-Sek](https://github.com/J-Sek))
* **VRow:** smaller density steps ([#22574](https://github.com/vuetifyjs/vuetify/issues/22574)) ([J-Sek](https://github.com/J-Sek))
* **VCol:** syntax for overriding row size ([#22572](https://github.com/vuetifyjs/vuetify/issues/22572)) ([J-Sek](https://github.com/J-Sek))
* **transitions:** add v-expand-both-transition ([#22570](https://github.com/vuetifyjs/vuetify/issues/22570)) ([J-Sek](https://github.com/J-Sek))
* **color:** strip text-*/bg-* for dynamic utility classes ([#17569](https://github.com/vuetifyjs/vuetify/issues/17569)) ([cgodo](https://github.com/cgodo))
* **icon-set:** add mdi-unocss icon set ([#22117](https://github.com/vuetifyjs/vuetify/issues/22117)) ([userquin](https://github.com/userquin))
* **VProgressLinear:** split buffer and indeterminate ([#22663](https://github.com/vuetifyjs/vuetify/issues/22663)) ([J-Sek](https://github.com/J-Sek))

**:wrench: Bug Fixes**

* **VSelect:** fix screenreader navigation to select options ([#22602](https://github.com/vuetifyjs/vuetify/issues/22602)) ([ikushum](https://github.com/ikushum))
* **VTreeview:** indent lines with prepend-gap ([#22589](https://github.com/vuetifyjs/vuetify/issues/22589)) ([J-Sek](https://github.com/J-Sek))
* **VTreeview:** add correct roles and aria attributes ([#22577](https://github.com/vuetifyjs/vuetify/issues/22577)) ([mjung2605](https://github.com/mjung2605))

---

### v3.12.1

**:wrench: Bug Fixes**

* **docs:** add overflow-hidden to FAQ expansion panels ([#22660](https://github.com/vuetifyjs/vuetify/issues/22660)) ([Haviles04](https://github.com/Haviles04))

---

### v4.0.0

**:rocket: Features**

* All features from v3.12.0 included in the v4 stable release
* **CSS Layers:** styles organized in `@layer` blocks for clean utility framework coexistence
* **MD3 Typography:** Material Design 3 type scale from v4.0.0-beta.0
* **MD3 Elevation:** updated elevation levels matching MD3 specifications from v4.0.0-beta.0
* **Grid System Overhaul:** modernized responsive grid from v4.0.0-beta.0

</details>

---

## What's Next{ .mt-4 }

With v4 stable, the focus shifts to two fronts. First, **v4.1** will land the features currently in development—VMorphingIcon, theme page transitions, and hover elevation. VFileUpload's VInput integration and VCommandPalette's `closeOnSelect` and `before-select` events have already landed, along with Nuxt and UnoCSS presets for the CLI.

Second, the **Vuetify → Vuetify0 refactor** is now [underway](https://github.com/vuetifyjs/vuetify/pull/22672). Core Vuetify components are being rebuilt on v0's headless composable layer—starting with data table, tree, and form primitives. This is the path to **Vuetify 5**, where the full component library and the headless meta-framework share one unified architecture.

Vuetify is and always will be free and open source. If your team relies on the framework, consider supporting continued development through [Vuetify One](https://one.vuetifyjs.com/) or [GitHub Sponsors](https://github.com/sponsors/johnleider). Every contribution helps us ship features like v4, the CLI, and Vuetify0 faster.

Thank you for being part of the Vuetify community. See you in March!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/vuetify), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
