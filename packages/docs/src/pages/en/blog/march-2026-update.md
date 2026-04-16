---
layout: blog
meta:
  title: March 2026 Update
  description: March delivered 7 Vuetify patch releases stabilizing v4, while Vuetify0 exploded with 427 commits reaching v0.2.0 with 7 new headless components. The Nuxt Module hit beta, the CLI shipped 10 releases, and ESLint gained v4 migration rules.
  keywords: Vuetify March 2026, Vuetify0 v0.2.0, VCommandPalette, VProgress, Nuxt Module beta, Vuetify CLI, ESLint v4 migration
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
  const clilogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vcli-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const eslintpluginlogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/veslplugin-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const eslintconfiglogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/veslconfig-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const onelogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const binlogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vbin-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const playlogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vplay-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# March 2026 Update

**Vuetify0 came alive this month.** 427 commits, 11 releases, and 7 new headless components pushed v0 to its **v0.2.0** milestone. Meanwhile, the core framework shipped 7 releases across v3 and v4, the **Nuxt Module** reached **v1.0.0-beta**, the **CLI** hit 10 releases, and the **ESLint plugin** gained automated v4 migration rules.

![Hero image for March update](https://cdn.vuetifyjs.com/docs/images/blog/march-2026-update/march-hero.png "March hero image"){ height=112 }

🖊️ John Leider • 📅 April 16th, 2026

<PromotedEntry />

---

## Acceleration

**720 commits** across 17 active repositories and **69 merged PRs** made March our most productive month since the v4 launch. With v4 stable, the team's focus shifted to two fronts: polishing the v4 experience through rapid patch releases, and building out Vuetify0's headless composable layer at unprecedented speed. [J-Sek](https://github.com/J-Sek) delivered 12 merged PRs across the framework and ESLint plugin, including new iconsets, CSS font variables, and v4 migration rules across 4 plugin releases. [Andrei Elkin](https://github.com/AndreyYolkin) completely overhauled the Nuxt module and pushed the CLI through 10 releases. And the Vuetify → Vuetify0 refactor that [began last month](https://vuetifyjs.com/blog/february-2026-update/) is now actively migrating core composables—observer, display, theme, and locale.

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Ecosystem Spotlight: Nuxt Module v1.0.0 Beta](#ecosystem-spotlight-nuxt-module-v100-beta)
* [Framework Updates](#framework-updates)
  * [New Features](#new-features)
  * [Bug Fixes](#bug-fixes)
  * [In Development](#in-development)
* [Tooling & Migration](#tooling--migration)
* [Vuetify MCP: v0.6.0 & Playground Tools](#vuetify-mcp-v060--playground-tools)
* [Product Updates](#product-updates)
* [Vuetify0: Progress Update](#vuetify0-progress-update)
* [March 2026 Changelog](#march-2026-changelog)
* [What's Next](#whats-next)

---

## Releases

March was a stabilization sprint for v4 and an acceleration sprint for everything else. Four v4 patches (v4.0.1–v4.0.4) and three v3 backports (v3.12.2–v3.12.4) landed alongside 11 Vuetify0 releases, 10 CLI releases, 7 Nuxt Module releases, and 4 ESLint plugin releases.

![March Releases Banner](https://cdn.vuetifyjs.com/docs/images/blog/march-2026-update/releases.png "March Releases Banner")

### Key Improvements

* **[CSS font variables](/styles/text-and-typography/)** — CSS custom properties for font customization (v4.0.1)
* **[Icon sets](/features/icon-fonts/)** — More UnoCSS-based iconsets + Material Symbols iconset (v4.0.1, v4.0.2)
* **[VDataTable](/components/data-tables/)** — Expose `prevPage`, `nextPage`, `setPage` in bottom slot (v4.0.2)
* **[VCommandPalette](/components/command-palettes/)** — `closeOnSelect` prop and `before-select` event (v4.0.2 Labs)
* **[VProgress](/components/progress/)** — New progress component (v4.0.3 Labs)
* **[VVideo](/components/videos/)** — `src-object` prop for WebRTC and `hide-progress-bar` prop (v4.0.3 Labs)
* **[VFileUpload](/components/file-uploads/)** — Integrated with VInput and split internal logic (v3.12.2/v4.0.1 Labs)
* **[VMaskInput](/components/masked-inputs/)** — Accept escaped characters in mask patterns (v4.0.3 Labs)

View the complete list of changes in the [Full Changelog](#march-2026-changelog).

**Details:**

* [v4.0.4](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.4)
* [v4.0.3](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.3)
* [v4.0.2](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.2)
* [v4.0.1](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.1)
* [v3.12.4](https://vuetifyjs.com/getting-started/release-notes/?version=v3.12.4)
* [v3.12.3](https://vuetifyjs.com/getting-started/release-notes/?version=v3.12.3)
* [v3.12.2](https://vuetifyjs.com/getting-started/release-notes/?version=v3.12.2)

---

## Ecosystem Spotlight: Nuxt Module v1.0.0 Beta

The Vuetify Nuxt Module received a **complete overhaul** in March—**86 commits** and 7 releases (v1.0.0-alpha.2 through v1.0.0-beta.2) driven primarily by [Andrei Elkin](https://github.com/AndreyYolkin). This is the module's biggest change since its initial release.

### What's New

**Monorepo Conversion** — The module was restructured as a monorepo, with cleaner package boundaries and improved maintainability.

**Vuetify 4 Support** — Full compatibility with v4's CSS layers and SASS integration. The `disableVuetifyStyles` option was removed in favor of `styles: 'none'`.

**Experimental SASS Caching** — In-memory caching for SASS compilation reduces cold-start times in development.

**Revamped Documentation** — Documentation was completely overhauled alongside the structural changes.

**Beta Stability** — With alpha.2 through beta.2 all landing in March, the module is on track for a stable v1.0.0 release.

[userquin](https://github.com/userquin) contributed configuration and documentation improvements.

**Details:**

* [Nuxt Module GitHub Repository](https://github.com/vuetifyjs/nuxt-module)
* [Major overhaul PR#353](https://github.com/vuetifyjs/nuxt-module/pull/353)
* [v1.0.0-beta.2](https://github.com/vuetifyjs/nuxt-module/releases/tag/v1.0.0-beta.2)

---

## Framework Updates

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

March's 31 merged PRs focused on new features for the v4 branch, targeted bug fixes, and the beginning of the Vuetify → v0 migration.

### New Features

**[CSS font variables](/styles/text-and-typography/)** — CSS custom properties for font-family, font-size, and font-weight, enabling runtime font customization without SASS (v4.0.1, [#22666](https://github.com/vuetifyjs/vuetify/pull/22666))

![CSS font variables](https://cdn.vuetifyjs.com/docs/images/blog/march-2026-update/css-font-variables.png "CSS custom properties for runtime font customization")

**[Icon sets](/features/icon-fonts/)** — Additional UnoCSS-based iconsets shipped in v4.0.1 ([#22668](https://github.com/vuetifyjs/vuetify/pull/22668)), followed by Material Symbols via UnoCSS in v4.0.2 ([#22680](https://github.com/vuetifyjs/vuetify/pull/22680))

**[VDataTable](/components/data-tables/)** — `prevPage`, `nextPage`, and `setPage` exposed in the bottom slot for custom pagination controls (v4.0.2, [#22681](https://github.com/vuetifyjs/vuetify/pull/22681))

**[VCommandPalette](/components/command-palettes/)** — `closeOnSelect` prop and `before-select` event for fine-grained selection control, plus a name fix for the inner component (v4.0.2 Labs, [#22634](https://github.com/vuetifyjs/vuetify/pull/22634))

![VCommandPalette](https://cdn.vuetifyjs.com/docs/images/blog/march-2026-update/command-palette.png "VCommandPalette with search and command list")

**[VFileUpload](/components/file-uploads/)** — Integrated with VInput and split internal logic for better composability and form integration (v3.12.2/v4.0.1 Labs, [#22637](https://github.com/vuetifyjs/vuetify/pull/22637))

**[VProgress](/components/progress/)** — New progress component added to Labs (v4.0.3, [#22682](https://github.com/vuetifyjs/vuetify/pull/22682))

**[VVideo](/components/videos/)** — `src-object` prop for MediaStream/WebRTC playback and `hide-progress-bar` prop for cleaner embeds (v4.0.3 Labs, [#22670](https://github.com/vuetifyjs/vuetify/pull/22670), [#22636](https://github.com/vuetifyjs/vuetify/pull/22636))

**Details:**

* [CSS font variables PR#22666](https://github.com/vuetifyjs/vuetify/pull/22666)
* [VCommandPalette closeOnSelect PR#22634](https://github.com/vuetifyjs/vuetify/pull/22634)
* [VDataTable pagination slot PR#22681](https://github.com/vuetifyjs/vuetify/pull/22681)
* [VProgress PR#22682](https://github.com/vuetifyjs/vuetify/pull/22682)
* [VVideo src-object PR#22670](https://github.com/vuetifyjs/vuetify/pull/22670)

### Bug Fixes

| Component | Fix | Version | PR |
|-----------|-----|---------|----|
| **VSelect** | Fix screenreader navigation to select options | v3.12.2 / v4.0.1 | [#22602](https://github.com/vuetifyjs/vuetify/pull/22602) |
| **VOtpInput** | Handle deletion via `onBeforeinput` for mobile compatibility | v4.0.1 | [#22657](https://github.com/vuetifyjs/vuetify/pull/22657) |
| **VSnackbar** | Opaque background for transparent variants | v4.0.1 | [#22646](https://github.com/vuetifyjs/vuetify/pull/22646) |
| **hotkey** | Delimiter alias fixes without ambiguity | v3.12.3 / v4.0.2 | [#22635](https://github.com/vuetifyjs/vuetify/pull/22635) |
| **VNumberInput** | Prevent input changes when readonly | v3.12.3 / v4.0.2 | [#22692](https://github.com/vuetifyjs/vuetify/pull/22692) |
| **VDataTable** | Respect `disableSort` prop for sortable headers | v4.0.2 | [#22684](https://github.com/vuetifyjs/vuetify/pull/22684) |
| **rounded** | Add missing `md` size | v4.0.2 | [#22679](https://github.com/vuetifyjs/vuetify/pull/22679) |
| **router** | Replace deprecated `next()` for Vue Router v5 compatibility | v3.12.3 / v4.0.2 | [#22643](https://github.com/vuetifyjs/vuetify/pull/22643) |
| **VTimePicker** | Keep hour value when changing AM/PM | v3.12.3 / v4.0.2 | — |
| **hotkey** | Resilient sequence parsing | v4.0.3 | [#22704](https://github.com/vuetifyjs/vuetify/pull/22704) |
| **VExpansionPanels** | Apply `rounded` only to first and last panel when closed | v4.0.3 | — |
| **VTooltip** | Correct selector for non-interactive tooltips | v4.0.3 | — |
| **VMaskInput** | Accept escaped characters in mask patterns | v4.0.3 Labs | [#22727](https://github.com/vuetifyjs/vuetify/pull/22727) |
| **VFileUpload** | Fix adding/replacing files with dropzone click | v3.12.4 / v4.0.4 Labs | [#22741](https://github.com/vuetifyjs/vuetify/pull/22741) |
| **rules** | Fix type resolution for custom validation rules | v4.0.4 Labs | [#22701](https://github.com/vuetifyjs/vuetify/pull/22701) |
| **VSelect** | Prevent brief error state when clicking a menu item | v4.0.4 | — |
| **VField** | Label transition on pages with CSS zoom | v3.12.4 / v4.0.4 | — |

**Details:**

* [VSelect a11y PR#22602](https://github.com/vuetifyjs/vuetify/pull/22602)
* [hotkey aliases PR#22635](https://github.com/vuetifyjs/vuetify/pull/22635)
* [hotkey resilient PR#22704](https://github.com/vuetifyjs/vuetify/pull/22704)
* [VMaskInput PR#22727](https://github.com/vuetifyjs/vuetify/pull/22727)

### In Development

Several PRs merged in March are pending their first release, alongside features still in active development:

#### Merged, Pending Release

* **rounded: arbitrary values** — Accept any valid CSS border-radius value beyond predefined presets ([#22721](https://github.com/vuetifyjs/vuetify/pull/22721))
* **VProgressLinear split variant** — MD3-aligned split variant for buffer/indeterminate states ([#22662](https://github.com/vuetifyjs/vuetify/pull/22662))
* **VOverlay** — `location` and `origin` props reworked to be actually useful ([#22720](https://github.com/vuetifyjs/vuetify/pull/22720))
* **VCommandPalette viewport strategy** — Full-viewport location strategy for command palettes ([#22698](https://github.com/vuetifyjs/vuetify/pull/22698))
* **SSR** — Avoid errors when rendering with latest Vue ([#22764](https://github.com/vuetifyjs/vuetify/pull/22764))
* **CSS zoom** — Coordinate mismatch fix for VColorPicker, ripple, and VCalendar ([#22774](https://github.com/vuetifyjs/vuetify/pull/22774))

#### VSparkline Markers & Tooltips

Interactive markers and hover tooltips for data visualization.

#### VSlider Pill Variant

A new `pill` variant for VSlider aligned with Material Design 3's rounded slider track design.

#### VMorphingIcon

Animated icon transitions using SVG path morphing—carrying over from February, now nearing completion.

#### V0 Migration: Core Composables

The Vuetify → Vuetify0 refactor is now migrating core systems. Open PRs cover:

* **Theme** — Migrate the entire theme system to v0 ([#22765](https://github.com/vuetifyjs/vuetify/pull/22765))
* **Locale/RTL** — Delegate locale and RTL management to v0 ([#22753](https://github.com/vuetifyjs/vuetify/pull/22753))
* **Display** — Migrate breakpoints to v0's `createBreakpoints` ([#22710](https://github.com/vuetifyjs/vuetify/pull/22710))
* **Date** — Delegate to v0's `createDate` runtime ([#22768](https://github.com/vuetifyjs/vuetify/pull/22768))

Observer composables were already [migrated in March](https://github.com/vuetifyjs/vuetify/pull/22672).

**Details:**

* [rounded arbitrary PR#22721](https://github.com/vuetifyjs/vuetify/pull/22721)
* [VProgressLinear split PR#22662](https://github.com/vuetifyjs/vuetify/pull/22662)
* [VSparkline PR#22748](https://github.com/vuetifyjs/vuetify/pull/22748)
* [VSlider pill PR#22699](https://github.com/vuetifyjs/vuetify/pull/22699)
* [VMorphingIcon PR#22639](https://github.com/vuetifyjs/vuetify/pull/22639)
* [Theme migration PR#22765](https://github.com/vuetifyjs/vuetify/pull/22765)
* [Locale/RTL migration PR#22753](https://github.com/vuetifyjs/vuetify/pull/22753)

---

## Tooling & Migration

### Vuetify CLI

<AppFigure :src="clilogo" alt="Vuetify CLI logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify CLI Logo" />

<br>

The CLI continued its rapid iteration with **38 commits** and **10 releases** (v1.1.0 through v1.2.0-beta.1), driven primarily by [Andrei Elkin](https://github.com/AndreyYolkin) with template contributions from [J-Sek](https://github.com/J-Sek).

**Vite 8 Support** — Templates updated for Vite 8 compatibility.

**Vue Router 5 Migration** — Templates migrated from unplugin-vue-router to Vue Router 5.

**MCP CLI Integration** — A standalone MCP CLI command for setting up the Vuetify MCP server directly from the CLI.

**Preset System** — Enhanced user presets with improved UX, plus new Nuxt and UnoCSS presets alongside the existing TailwindCSS preset.

**TypeScript 6.0** — Template fixes to avoid typechecking errors with TS 6.0.

**Dynamic Project Docs** — `create` now generates project-specific documentation.

**Details:**

* [Vuetify CLI GitHub Repository](https://github.com/vuetifyjs/cli)
* [v1.2.0-beta.1](https://github.com/vuetifyjs/cli/releases/tag/v1.2.0-beta.1)
* [TS 6.0 fix PR#11](https://github.com/vuetifyjs/cli/pull/11)
* [Nuxt/UnoCSS presets PR#7](https://github.com/vuetifyjs/cli/pull/7)

### ESLint Plugin for Vuetify

<AppFigure :src="eslintpluginlogo" alt="Vuetify ESLint Plugin logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify ESLint Plugin Logo" />

<br>

[J-Sek](https://github.com/J-Sek) shipped **4 releases** (v2.6.0 through v2.7.2) with 20 commits, turning the plugin into a full migration companion for teams moving onto Vuetify 4—or moving Vuetify utilities off onto TailwindCSS and UnoCSS.

**Vuetify v4 Rules** — A new `recommended-v4` preset that detects deprecated v3 patterns and surfaces their v4 replacements. The rules cover deprecated components, props, events, classes, theme color syntax, and import paths, plus a new `icon-button-variant` rule that ensures icon-only buttons declare a `variant` to match v4's stricter defaults ([#125](https://github.com/vuetifyjs/eslint-plugin-vuetify/pull/125)).

**TailwindCSS & UnoCSS Migration Rules** — Four new rules for projects adopting utility-first styling. `no-elevation-prop`, `no-rounded-prop`, and `no-border-prop` catch cases where Vuetify presentational props should be dropped in favor of UnoCSS classes (useful when `$utilities` are disabled), while `no-legacy-utilities` helps migrate Vuetify's legacy class names to pure TailwindCSS or UnoCSS Wind4 preset equivalents ([#126](https://github.com/vuetifyjs/eslint-plugin-vuetify/pull/126)). Follow-up fixes in v2.7.1 added prefixed-class support to `no-legacy-utilities`, and v2.7.2 taught `no-deprecated-typography` to handle responsive variants.

**Component Standardization** — A family of optional `custom-deprecated-*` rules (components, props, events, slots) lets teams ban specific API shapes from their templates—with auto-fixable string replacements for components (e.g., rewriting `<VRow>` to `<div class="grid grid-cols-12">`), replacement props, or custom messages ([#127](https://github.com/vuetifyjs/eslint-plugin-vuetify/pull/127)). Useful for enforcing house style in large codebases and for reining in AI-generated anti-patterns. Previously this required patching the plugin's internals.

**ESLint 10 Support** — Compatibility with the latest ESLint major version, contributed by [jssuttles](https://github.com/jssuttles) ([#124](https://github.com/vuetifyjs/eslint-plugin-vuetify/pull/124)). v2.7.0 also generates proper `.d.ts` files for TypeScript-based flat configs, and removes `VPicker` from the deprecated-components list now that it ships in v4 ([#119](https://github.com/vuetifyjs/eslint-plugin-vuetify/pull/119)).

**Details:**

* [ESLint Plugin GitHub Repository](https://github.com/vuetifyjs/eslint-plugin-vuetify)
* [v2.7.2](https://github.com/vuetifyjs/eslint-plugin-vuetify/releases/tag/v2.7.2)
* [v2.7.0](https://github.com/vuetifyjs/eslint-plugin-vuetify/releases/tag/v2.7.0)
* [v2.6.0](https://github.com/vuetifyjs/eslint-plugin-vuetify/releases/tag/v2.6.0)

### ESLint Config

<AppFigure :src="eslintconfiglogo" alt="Vuetify ESLint Config logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify ESLint Config Logo" />

<br>

The shared ESLint config—used internally across the ecosystem and by teams that want Vuetify's house style out of the box—shipped **v4.3.5** and **v4.4.0** in March.

**`tsconfigRootDir` option** — The TypeScript config now accepts a `tsconfigRootDir` option so monorepos and custom project layouts can pin type resolution to the right directory without wrestling with ESLint's project-service defaults ([v4.3.5](https://github.com/vuetifyjs/eslint-config-vuetify/releases/tag/v4.3.5)).

**Logo fix** — Matching the ESLint Plugin update, v4.3.5 also corrected the config's logo filename so the new Vuetify-branded logo renders correctly on npm and GitHub.

**Details:**

* [ESLint Config GitHub Repository](https://github.com/vuetifyjs/eslint-config-vuetify)
* [v4.4.0](https://github.com/vuetifyjs/eslint-config-vuetify/releases/tag/v4.4.0)
* [v4.3.5](https://github.com/vuetifyjs/eslint-config-vuetify/releases/tag/v4.3.5)

---

## Vuetify MCP: v0.6.0 & Playground Tools

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

<br>

The MCP server released **v0.6.0** on March 27th, keeping AI code generation current with the latest v0 APIs. March also saw a significant new feature land in the repository—playground management—pending the next release.

### v0.6.0

**v0 Sync** — Composables, components, and exports synced with v0.1.13. Any AI assistant using the MCP server now generates accurate code against the latest v0 API surface, including the new Switch, Slider, Treeview, Splitter, Input, and Button components. (Combobox shipped in v0.2.0 after this sync and will land in the next MCP release.)

**Bug Fixes** — Corrected composable names and missing exports in v0 documentation; fixed GitHub URL branch references from `main` to `master`.

### Playground CRUD (Pending Release)

[PR#19](https://github.com/vuetifyjs/mcp/pull/19) merged March 30th adds tools to create, read, update, and list Vuetify Play playgrounds directly from your AI assistant—build and iterate on component demos without leaving your editor. This will ship in the next MCP release.

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
* [v0.6.0 Release](https://github.com/vuetifyjs/mcp/releases/tag/v0.6.0)
* [Playground CRUD PR#19](https://github.com/vuetifyjs/mcp/pull/19)

---

## Product Updates

### Vuetify One

<AppFigure :src="onelogo" alt="Vuetify One logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify One Logo" />

<br>

[Henry Aviles](https://github.com/Haviles04) shipped a **new dashboard** for Vuetify One, releasing v0.1.0, v3.1.0, and v3.1.1 in March.

![Vuetify One](https://cdn.vuetifyjs.com/docs/images/blog/march-2026-update/vuetify-one.png "Vuetify One — Power the Future of Vuetify")

**Details:**

* [Vuetify One](/one/)
* [Vuetify One Dashboard](https://one.vuetifyjs.com/)
* [New dashboard PR#49](https://github.com/vuetifyjs/one/pull/49)

### Vuetify Bin

<AppFigure :src="binlogo" alt="Vuetify Bin logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Bin Logo" />

<br>

[Henry Aviles](https://github.com/Haviles04) added **markdown preview** support—bins can now render markdown content alongside code. The update also includes cursor tracking.

![Vuetify Bin Markdown Preview](https://cdn.vuetifyjs.com/docs/images/blog/march-2026-update/bin-markdown-preview.png "Vuetify Bin rendering markdown content")

**Details:**

* [Vuetify Bin](https://bin.vuetifyjs.com/)
* [Markdown preview PR#142](https://github.com/vuetifyjs/bin/pull/142)
* [Cursor tracking PR#140](https://github.com/vuetifyjs/bin/pull/140)

### Vuetify Play

<AppFigure :src="playlogo" alt="Vuetify Play logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Play Logo" />

<br>

[J-Sek](https://github.com/J-Sek) fixed a cursor positioning bug that caused edits to jump while typing ([#51](https://github.com/vuetifyjs/play/pull/51)), and [Henry Aviles](https://github.com/Haviles04) updated the default visibility behavior.

![Vuetify Play](https://cdn.vuetifyjs.com/docs/images/blog/march-2026-update/vuetify-play.png "Vuetify Play — online playground with live preview")

---

## Vuetify0: Progress Update

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

March was Vuetify0's breakout month—**427 commits**, **17 merged PRs**, and **11 releases** (v0.1.4 through v0.2.0). The project shipped 7 new headless components, 4 new composables, and significant improvements to the playground and documentation. The v0.2.0 release marks v0's transition from foundational primitives to a comprehensive component library.

![Vuetify0 Progress](https://cdn.vuetifyjs.com/docs/images/blog/march-2026-update/v0.png "Vuetify0 March Progress")

### New Components

Seven headless components shipped in March, each with a composable layer and compound component pattern:

* **[Switch](https://0.vuetifyjs.com/components/forms/switch/)** — Toggle switch with Root, Track, and Thumb compound components ([#142](https://github.com/vuetifyjs/0/pull/142))
* **[Slider](https://0.vuetifyjs.com/components/forms/slider/)** — Range slider with Track, Range, and Thumb parts, backed by a dedicated composable ([#143](https://github.com/vuetifyjs/0/pull/143))
* **[Treeview](https://0.vuetifyjs.com/components/disclosure/treeview/)** — Hierarchical tree built on createNested with expand, select, and activate ([#144](https://github.com/vuetifyjs/0/pull/144))
* **[Splitter](https://0.vuetifyjs.com/components/semantic/splitter/)** — Resizable pane layouts with Root, Panel, and Handle components ([#145](https://github.com/vuetifyjs/0/pull/145))
* **[Input](https://0.vuetifyjs.com/components/forms/input/)** — Headless form input with validation integration ([#162](https://github.com/vuetifyjs/0/pull/162))
* **[Button](https://0.vuetifyjs.com/components/actions/button/)** — Headless button with disabled, loading, readonly, and passive states, plus Button.Group for toggle selection ([#166](https://github.com/vuetifyjs/0/pull/166))
* **[Combobox](https://0.vuetifyjs.com/components/forms/combobox/)** — Autocomplete-style input with createCombobox composable for filtering and selection ([#172](https://github.com/vuetifyjs/0/pull/172))

### New Composables

* **[useNotifications](https://0.vuetifyjs.com/composables/plugins/use-notifications/)** — Full notification lifecycle management with registry/queue architecture, read/archive/snooze states, and Novu/Knock adapters ([#146](https://github.com/vuetifyjs/0/pull/146))
* **[useRules](https://0.vuetifyjs.com/composables/plugins/use-rules/)** — Validation composable with alias-based rules and adapters for Zod and Yup ([#140](https://github.com/vuetifyjs/0/pull/140))
* **[useRaf](https://0.vuetifyjs.com/composables/system/use-raf/)** — Scope-safe `requestAnimationFrame` composable with automatic cleanup ([#165](https://github.com/vuetifyjs/0/pull/165))
* **[createModel](https://0.vuetifyjs.com/composables/selection/create-model/)** — Shared selection state foundation bridging createRegistry, createSelection, and createSlider ([#148](https://github.com/vuetifyjs/0/pull/148))

### Other Improvements

* **createRegistry** — `move()` method for reordering registered items ([#149](https://github.com/vuetifyjs/0/pull/149))
* **useHotkey** — Symbol aliases and AST-based hotkey string parser for more reliable parsing ([#150](https://github.com/vuetifyjs/0/pull/150), [#155](https://github.com/vuetifyjs/0/pull/155))
* **MaybeRef** — Accept getters alongside refs for more flexible API signatures ([#141](https://github.com/vuetifyjs/0/pull/141))
* **toReactive** — Performance refactor for proxy creation ([#170](https://github.com/vuetifyjs/0/pull/170))
* **Playground** — Version selector and settings modal for easier experimentation ([#163](https://github.com/vuetifyjs/0/pull/163))

### Coming Next

* **[createDataGrid](https://github.com/vuetifyjs/0/pull/174)** — Data grid composable for advanced table layouts
* **[Paper Design System](https://github.com/vuetifyjs/0/pull/167)** — The Emerald design system foundation for v0's visual layer
* **[v0play](https://v0play.vuetifyjs.com)** — Expanding the editor and tutorial system with more examples and guided lessons

::: info

The pace of v0 development has accelerated dramatically. With 7 new components in a single month, v0 is on track to cover the full Vuetify component surface. Core Vuetify composables (theme, locale, display, date) are now being migrated to v0 in parallel—the bridge between today's Vuetify 4 and tomorrow's Vuetify 5.

:::

**Details:**

* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [v0.2.0 Release Notes](https://github.com/vuetifyjs/0/releases/tag/v0.2.0)
* [Combobox PR#172](https://github.com/vuetifyjs/0/pull/172)
* [Button PR#166](https://github.com/vuetifyjs/0/pull/166)
* [Input PR#162](https://github.com/vuetifyjs/0/pull/162)

---

## March 2026 Changelog

The following section provides an overview of the changes made in March 2026, including new features, bug fixes, and enhancements across the Vuetify framework.

**Key Improvements:**

* v4.0.1: CSS font variables, additional UnoCSS iconsets, VSnackbar and VSelect a11y fixes
* v4.0.2: Material Symbols iconset, VDataTable pagination slot, VCommandPalette Labs improvements
* v4.0.3: VProgress and VVideo Labs components, VMaskInput escaped characters, hotkey and VExpansionPanels fixes
* v4.0.4: VFileUpload dropzone fix, rules type resolution, VSelect brief error state fix
* v3.x: bugfix-only releases mirroring the v4 fixes above

**Expand** this section to see the detailed changelog for March 2026:

<details>
<summary>March 2026 Full Changelog</summary>

### v3.12.2 (2026-03-04)

**:wrench: Bug Fixes**

* **VDataTable:** improvements for sorting in mobile mode ([c3b3278](https://github.com/vuetifyjs/vuetify/commit/c3b3278))
* **VDataTable:** keep fixed cells opaque when loading ([35e1e2c](https://github.com/vuetifyjs/vuetify/commit/35e1e2c))
* **VSelect:** fix screenreader navigation to select options ([#22602](https://github.com/vuetifyjs/vuetify/issues/22602)) ([f906336](https://github.com/vuetifyjs/vuetify/commit/f906336))
* **VTimeline:** keep dot border when using numeric dot size ([9511bc3](https://github.com/vuetifyjs/vuetify/commit/9511bc3))

**:test_tube: Labs**

* **VFileUpload:** `hide-browse` should hide divider as well
* **VFileUpload:** expose `controlRef` for internal `<input />`
* **VFileUpload:** append instead of replacing files when `multiple`
* **VFileUpload:** integrate VInput & split internal logic ([#22637](https://github.com/vuetifyjs/vuetify/issues/22637)) ([251adb0](https://github.com/vuetifyjs/vuetify/commit/251adb0))

---

### v4.0.1 (2026-03-04)

**:rocket: Features**

* **icons:** add more iconsets based on UnoCSS ([#22668](https://github.com/vuetifyjs/vuetify/issues/22668)) ([6c8bea5](https://github.com/vuetifyjs/vuetify/commit/6c8bea5))
* **styles:** CSS variables for fonts ([#22666](https://github.com/vuetifyjs/vuetify/issues/22666)) ([84495a3](https://github.com/vuetifyjs/vuetify/commit/84495a3))

**:wrench: Bug Fixes**

* **theme:** put theme stylesheet in body when loaded with unhead ([2475a28](https://github.com/vuetifyjs/vuetify/commit/2475a28))
* **VBadge:** correct props.dotSize fallback ([a71f396](https://github.com/vuetifyjs/vuetify/commit/a71f396))
* **VColorPicker:** align sliders with controls ([0d1ce90](https://github.com/vuetifyjs/vuetify/commit/0d1ce90))
* **VDataTable:** improvements for sorting in mobile mode ([54affe1](https://github.com/vuetifyjs/vuetify/commit/54affe1))
* **VDataTable:** keep fixed cells opaque when loading ([ddca6ca](https://github.com/vuetifyjs/vuetify/commit/ddca6ca))
* **VGrid:** correct mapping for grid gap x/y ([65b4278](https://github.com/vuetifyjs/vuetify/commit/65b4278))
* **VOtpInput:** handle deletion via onBeforeinput for mobile compatibility ([#22657](https://github.com/vuetifyjs/vuetify/issues/22657)) ([2f8a4f9](https://github.com/vuetifyjs/vuetify/commit/2f8a4f9))
* **VPagination:** suppress browser spacing ([a6b7b93](https://github.com/vuetifyjs/vuetify/commit/a6b7b93))
* **VSelect:** fix screenreader navigation to select options ([#22602](https://github.com/vuetifyjs/vuetify/issues/22602)) ([6c962b7](https://github.com/vuetifyjs/vuetify/commit/6c962b7))
* **VSlideGroup:** don't read dom attributes in computed() ([a51b313](https://github.com/vuetifyjs/vuetify/commit/a51b313))
* **VSlider:** reduce affix margins ([18af2d2](https://github.com/vuetifyjs/vuetify/commit/18af2d2))
* **VSnackbar:** opaque background for transparent variants ([#22646](https://github.com/vuetifyjs/vuetify/issues/22646)) ([e83fa88](https://github.com/vuetifyjs/vuetify/commit/e83fa88))
* **VTimeline:** keep dot border when using numeric dot size ([6764c95](https://github.com/vuetifyjs/vuetify/commit/6764c95))

**:test_tube: Labs**

* **VFileUpload:** `hide-browse` should hide divider as well
* **VFileUpload:** expose `controlRef` for internal `<input />`
* **VFileUpload:** append instead of replacing files when `multiple`
* **VFileUpload:** integrate VInput & split internal logic ([#22637](https://github.com/vuetifyjs/vuetify/issues/22637)) ([027ab86](https://github.com/vuetifyjs/vuetify/commit/027ab86))

---

### v3.12.3 (2026-03-12)

**:wrench: Bug Fixes**

* **hotkey:** add delimiter aliases without delimiter ambiguity ([#22635](https://github.com/vuetifyjs/vuetify/issues/22635)) ([0e6a9c6](https://github.com/vuetifyjs/vuetify/commit/0e6a9c6))
* **router:** replace `next()` deprecated in Vue Router v5 ([#22643](https://github.com/vuetifyjs/vuetify/issues/22643)) ([4e93846](https://github.com/vuetifyjs/vuetify/commit/4e93846))
* **VNavigationDrawer:** fully clip list item text in rail mode ([ab42b13](https://github.com/vuetifyjs/vuetify/commit/ab42b13))
* **VNumberInput:** prevent input changes when readonly ([#22692](https://github.com/vuetifyjs/vuetify/issues/22692)) ([995989c](https://github.com/vuetifyjs/vuetify/commit/995989c))
* **VSelect/VAutocomplete/VCombobox:** let focus leave to other fields ([3d33e2f](https://github.com/vuetifyjs/vuetify/commit/3d33e2f))
* **VTimePicker:** keep hour value when changing AM/PM ([2c9cb0a](https://github.com/vuetifyjs/vuetify/commit/2c9cb0a))

**:test_tube: Labs**

* **VAvatarGroup:** ❗ change the `limit` behavior to cover overflow item ([5aefdac](https://github.com/vuetifyjs/vuetify/commit/5aefdac))

---

### v4.0.2 (2026-03-12)

**:rocket: Features**

* **icons:** add Material Symbols iconset via UnoCSS ([#22680](https://github.com/vuetifyjs/vuetify/issues/22680)) ([6c463c1](https://github.com/vuetifyjs/vuetify/commit/6c463c1))
* **VDataTable:** expose prevPage, nextPage, setPage in bottom slot ([#22681](https://github.com/vuetifyjs/vuetify/issues/22681)) ([4d1aa79](https://github.com/vuetifyjs/vuetify/commit/4d1aa79))

**:wrench: Bug Fixes**

* **hotkey:** add delimiter aliases without delimiter ambiguity ([#22635](https://github.com/vuetifyjs/vuetify/issues/22635)) ([a639698](https://github.com/vuetifyjs/vuetify/commit/a639698))
* **rounded:** add missing "md" size ([#22679](https://github.com/vuetifyjs/vuetify/issues/22679)) ([47cffdd](https://github.com/vuetifyjs/vuetify/commit/47cffdd))
* **router:** replace `next()` deprecated in Vue Router v5 ([#22643](https://github.com/vuetifyjs/vuetify/issues/22643)) ([87c4129](https://github.com/vuetifyjs/vuetify/commit/87c4129))
* **VDataTable:** respect disableSort prop for sortable header ([#22684](https://github.com/vuetifyjs/vuetify/issues/22684)) ([767b0e8](https://github.com/vuetifyjs/vuetify/commit/767b0e8))
* **VFileInput:** correct VField ref type ([41a6063](https://github.com/vuetifyjs/vuetify/commit/41a6063))
* **VGrid:** avoid warning about no-gutters being deprecated ([5d8ec63](https://github.com/vuetifyjs/vuetify/commit/5d8ec63))
* **VNavigationDrawer:** fully clip list item text in rail mode ([6b448cd](https://github.com/vuetifyjs/vuetify/commit/6b448cd))
* **VNumberInput:** prevent input changes when readonly ([#22692](https://github.com/vuetifyjs/vuetify/issues/22692)) ([2b1ed0d](https://github.com/vuetifyjs/vuetify/commit/2b1ed0d))
* **VSelect/VAutocomplete/VCombobox:** let focus leave to other fields ([51196cf](https://github.com/vuetifyjs/vuetify/commit/51196cf))
* **VTextarea:** correct VField ref type ([0d689aa](https://github.com/vuetifyjs/vuetify/commit/0d689aa))
* **VTimePicker:** keep hour value when changing AM/PM ([b030df8](https://github.com/vuetifyjs/vuetify/commit/b030df8))

**:test_tube: Labs**

* **VAvatarGroup:** change the `limit` behavior to cover overflow item ([e580ebc](https://github.com/vuetifyjs/vuetify/commit/e580ebc))
* **VCommandPalette:** add closeOnSelect prop and before-select event ([#22634](https://github.com/vuetifyjs/vuetify/issues/22634)) ([d534f79](https://github.com/vuetifyjs/vuetify/commit/d534f79))
* **VCommandPalette:** correct name of the inner component ([bfed30c](https://github.com/vuetifyjs/vuetify/commit/bfed30c))

---

### v4.0.3 (2026-03-19)

**:wrench: Bug Fixes**

* **hotkey:** resilient sequence parsing ([#22704](https://github.com/vuetifyjs/vuetify/issues/22704)) ([cae1cea](https://github.com/vuetifyjs/vuetify/commit/cae1cea))
* **md2:** restore correct global rounding ([6d1ef04](https://github.com/vuetifyjs/vuetify/commit/6d1ef04))
* **VDataTable:** reactive items from `expanded` with `return-object` ([5d7af2c](https://github.com/vuetifyjs/vuetify/commit/5d7af2c))
* **VExpansionPanels:** apply `rounded` only to the first and last panel when closed ([dbc7421](https://github.com/vuetifyjs/vuetify/commit/dbc7421))
* **VGrid:** restore `no-gutters` instead of mapping to "compact" ([947d7d5](https://github.com/vuetifyjs/vuetify/commit/947d7d5))
* **VSkeletonLoader:** less jitter when scrolling on slow device ([468ba314](https://github.com/vuetifyjs/vuetify/commit/468ba314))
* **VTooltip:** correct selector for non-interactive tooltips ([15b3cbd](https://github.com/vuetifyjs/vuetify/commit/15b3cbd))

**:test_tube: Labs**

* **VMaskInput:** accept escaped characters in mask ([#22727](https://github.com/vuetifyjs/vuetify/issues/22727)) ([a5d1116](https://github.com/vuetifyjs/vuetify/commit/a5d1116))
* **VProgress:** create new component ([#22682](https://github.com/vuetifyjs/vuetify/issues/22682)) ([122cdeb](https://github.com/vuetifyjs/vuetify/commit/122cdeb))
* **VVideo:** add `hide-progress-bar` prop ([#22636](https://github.com/vuetifyjs/vuetify/issues/22636)) ([0e5a2cb](https://github.com/vuetifyjs/vuetify/commit/0e5a2cb))
* **VVideo:** add `src-object` prop for MediaStream/WebRTC ([#22670](https://github.com/vuetifyjs/vuetify/issues/22670)) ([575e7c5](https://github.com/vuetifyjs/vuetify/commit/575e7c5))

---

### v3.12.4 (2026-03-25)

**:wrench: Bug Fixes**

* **VField:** label transition on page with zoom ([6246a96](https://github.com/vuetifyjs/vuetify/commit/6246a96))
* **VTimePicker:** avoid loading all CSS utilities ([884e5dc](https://github.com/vuetifyjs/vuetify/commit/884e5dc))

**:test_tube: Labs**

* **VFileUpload:** adding/replacing files with dropzone click ([#22741](https://github.com/vuetifyjs/vuetify/issues/22741)) ([86f3568](https://github.com/vuetifyjs/vuetify/commit/86f3568))

---

### v4.0.4 (2026-03-25)

**:wrench: Bug Fixes**

* **VCol:** correct types for `offset-*` props ([1cdd9c4](https://github.com/vuetifyjs/vuetify/commit/1cdd9c4))
* **VField:** label transition on page with zoom ([1fcad6b](https://github.com/vuetifyjs/vuetify/commit/1fcad6b))
* **VSelect:** prevent brief error state when clicking a menu item ([7fec2d4](https://github.com/vuetifyjs/vuetify/commit/7fec2d4))
* **VTimePicker:** avoid loading all CSS utilities ([015da52](https://github.com/vuetifyjs/vuetify/commit/015da52))

**:test_tube: Labs**

* **rules:** type resolution for custom rules ([#22701](https://github.com/vuetifyjs/vuetify/issues/22701)) ([053b605](https://github.com/vuetifyjs/vuetify/commit/053b605))
* **VFileUpload:** adding/replacing files with dropzone click ([#22741](https://github.com/vuetifyjs/vuetify/issues/22741)) ([eb95c9e](https://github.com/vuetifyjs/vuetify/commit/eb95c9e))

</details>

---

## What's Next{ .mt-4 }

April will push forward on both fronts. On the framework side, VSparkline markers and tooltips, VSlider pill variant, and VMorphingIcon are nearing completion. The v0 migration of theme, locale, display, and date composables will continue landing, progressively shifting Vuetify's internals onto v0's headless layer.

On the v0 side, createDataGrid is in active development, and the Paper design system (Emerald) will begin providing v0's first opinionated visual layer. The Nuxt Module is on track for a stable v1.0.0 release, and the ESLint plugin will continue expanding its v4 migration rule coverage.

* The [Vuetify MCP server](https://github.com/vuetifyjs/mcp) now supports playground management—try creating a playground from your editor
* [J-Sek's TailwindCSS guide](https://vuetifyjs.com/blog/building-with-vite-and-tailwindcss/) covers the recommended v4 + Tailwind setup

Vuetify is and always will be free and open source. If your team relies on the framework, consider supporting continued development through [Vuetify One](https://one.vuetifyjs.com/) or [GitHub Sponsors](https://github.com/sponsors/johnleider). Every contribution helps us ship features like v0, the Nuxt Module, and migration tooling faster.

Thank you for being part of the Vuetify community. See you in April!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/vuetify), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
