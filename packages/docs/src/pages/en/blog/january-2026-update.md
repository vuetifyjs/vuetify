---
layout: blog
meta:
  title: January 2026 Update
  description: January delivered Vuetify 4.0.0-beta.0, MD3 typography and elevation levels, VCommandPalette labs release, grid system overhaul, and Vuetify0 hitting v0.1.0 with 21 merged PRs including Tabs, Radio, and Checkbox components.
  keywords: Vuetify January 2026, v4.0.0-beta.0, VCommandPalette, MD3 typography, grid system, Vuetify0, CLI
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
  const snipslogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vsnips-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# January 2026 Update

Welcome to the January 2026 Vuetify update! The new year kicks off with **Vuetify 4.0.0-beta.0**—the first beta of our next major version featuring MD3 typography, elevation levels, and a complete grid system overhaul. **VCommandPalette** lands in labs, and **Vuetify0** hits the v0.1.0 milestone with new Tabs, Radio, and Checkbox components.

![Hero image for January update](https://cdn.vuetifyjs.com/docs/images/blog/january-2026-update/january-hero.png "January hero image"){ height=112 }

🖊️ John Leider • 📅 February 11th, 2026

<PromotedEntry />

---

## A Strong Start to 2026

January delivered steady progress across all Vuetify projects. With **661 commits** across 12 active repositories and **49 merged PRs**, the team maintained momentum from December's productive close. The release of v4.0.0-beta.0 brings MD3 typography and elevation system migrations, preparing Vuetify 4 for stable release. [J-Sek](https://github.com/J-Sek) continued his exceptional contribution streak with 5 merged PRs to the main framework plus 11 to Snips, while [Andrei Elkin](https://github.com/AndreyYolkin) drove the grid system overhaul and led CLI development with 75 commits.

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Vuetify 4 Beta](#vuetify-4-beta)
* [Framework Updates](#framework-updates)
  * [New Features](#new-features)
  * [Bug Fixes](#bug-fixes)
  * [In Development](#in-development)
* [Ecosystem Spotlight: Vuetify Snips](#ecosystem-spotlight-vuetify-snips)
* [Vuetify CLI: Rapid Development](#vuetify-cli-rapid-development)
* [Vuetify MCP: V4 Migration Tools](#vuetify-mcp-v4-migration-tools)
* [Product Updates](#product-updates)
* [Vuetify0: Progress Update](#vuetify0-progress-update)
* [January 2026 Changelog](#january-2026-changelog)
* [What's Next](#whats-next)

---

## Releases

January delivered three Vuetify releases—two v3.11.x patches maintaining stability and the landmark **v4.0.0-beta.0** advancing the next major version. The MCP server shipped five releases (v0.4.4 through v0.5.0) with v4 migration tooling, and Vuetify One saw eight releases with Open Collective integration.

![January Releases Banner](https://cdn.vuetifyjs.com/docs/images/blog/january-2026-update/releases.png "January Releases Banner")

### Key Improvements

* **[VCommandPalette](https://next.vuetifyjs.com/components/command-palettes/)** new labs component for command-driven navigation
* **[VDataTable](/components/data-tables/)** `sort-icon` prop for custom sort indicators
* **MD3 Typography** migration to Material Design 3 type system
* **MD3 Elevation** updated elevation levels matching MD3 specifications
* **Grid System Overhaul** modernized responsive grid implementation
* **[v-intersect](/directives/intersect/)** re-mount on prop updates for dynamic behavior

View the complete list of changes in the [Full Changelog](#january-2026-changelog)

**Details:**

* [v3.11.7](https://vuetifyjs.com/getting-started/release-notes/?version=v3.11.7)
* [v3.11.8](https://vuetifyjs.com/getting-started/release-notes/?version=v3.11.8)
* [v4.0.0-beta.0](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.0-beta.0)

---

## Vuetify 4 Beta

The first beta of **Vuetify 4.0** landed on January 30th, building on December's alpha with significant style system migrations. This release brings Material Design 3 alignment for typography and elevation, plus a modernized grid system.

![Vuetify 4 Beta](https://cdn.vuetifyjs.com/docs/images/blog/january-2026-update/releases-beta.png "Vuetify 4 Beta")

### What's New in v4.0.0-beta.0

* **MD3 Typography** — Migrates to Material Design 3's type scale while preserving Sass customization. Updated font sizes and line heights for better hierarchy and readability.
* **MD3 Elevation** — Elevation levels now match MD3 specifications with smoother shadow progressions and better depth perception across light and dark themes.
* **Grid System Overhaul** — The responsive grid has been completely modernized with improved flexbox implementation, better RTL support, and cleaner CSS output. [VCol](/api/v-col/) gains syntax for overriding row size.

**Component Updates**:

* **[VDataTable](/components/data-tables/)**: New `sort-icon` prop allows custom sort indicators
* **[v-intersect](/directives/intersect/)**: Now re-mounts when props update for dynamic threshold changes
* **nested**: Mark individual nodes as detached for independent selection behavior

::: info

v4.0.0-beta.0 is for testing and feedback only. Production applications should continue using v3.11.x until v4 reaches stable release.

:::

**Details:**

* [v4.0.0-beta.0 Release Notes](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.0-beta.0)
* [Migration Guide](https://next.vuetifyjs.com/getting-started/upgrade-guide/)
* [Remaining Issues](https://github.com/vuetifyjs/vuetify/milestone/62)

---

## Framework Updates

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

January's framework work balanced v4 development with v3 maintenance. The team merged 14 PRs addressing new features, accessibility, and bug fixes.

### New Features

**[VCommandPalette](/labs/command-palette/)**

The highly anticipated command palette component lands in labs! VCommandPalette provides a keyboard-driven interface for searching commands, navigation, and actions. It's built on the same patterns used by VS Code, Figma, and other modern applications.

<video width="100%" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/january-2026-update/command-palette.mp4" type="video/mp4"></source>
</video>

**[VDataTable](/components/data-tables/) Sort Icon**

A new `sort-icon` prop allows customizing the sort indicator in table headers, enabling consistent iconography with your design system.

**[VField](/api/v-field/) Label Improvements**

VField now ensures only one label element renders at a time, fixing edge cases with floating labels and improving screen reader compatibility.

**Details:**

* [VCommandPalette PR#22403](https://github.com/vuetifyjs/vuetify/pull/22403)
* [VDataTable sort-icon PR#22521](https://github.com/vuetifyjs/vuetify/pull/22521)
* [VField label PR#22542](https://github.com/vuetifyjs/vuetify/pull/22542)

### Bug Fixes

**[VAutocomplete](/components/autocompletes/)** Avoid no-items being selectable

**[VInput](/api/v-input/)** Use direction prop only where needed

**[VNumberInput](/components/number-inputs/)** Prevent stepper hover overflow when rounded

**Details:**

* [VAutocomplete PR#22509](https://github.com/vuetifyjs/vuetify/pull/22509)
* [VInput direction PR#22519](https://github.com/vuetifyjs/vuetify/pull/22519)
* [VNumberInput PR#22492](https://github.com/vuetifyjs/vuetify/pull/22492)

### In Development

Several exciting features are in active development and expected in upcoming releases:

#### VHeatmap

A new visualization component for displaying data density and patterns. Ideal for activity calendars, contribution graphs, and heat distribution displays.

![VHeatmap Preview](https://cdn.vuetifyjs.com/docs/images/blog/january-2026-update/heatmap-preview.png "VHeatmap Preview")

#### VMonthPicker

A dedicated month selection component complementing VDatePicker for use cases requiring only month/year selection.

#### VMaskInput Multiple Masks

Enhanced mask input supporting multiple and dynamic mask resolution for complex input patterns like phone numbers with variable country codes.

**Details:**

* [VHeatmap PR#22535](https://github.com/vuetifyjs/vuetify/pull/22535)
* [VMonthPicker PR#22534](https://github.com/vuetifyjs/vuetify/pull/22534)
* [VMaskInput PR#22501](https://github.com/vuetifyjs/vuetify/pull/22501)

---

## Ecosystem Spotlight: Vuetify Snips

<AppFigure :src="snipslogo" alt="Vuetify Snips logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Snips Logo" />

<br>

[Vuetify Snips](https://snips.vuetifyjs.com/) had an exceptional January with **11 merged PRs**—all from [J-Sek](https://github.com/J-Sek)—adding new snippet categories and improving existing templates.

### New Snippets

![Vuetify Snips Pickers](https://cdn.vuetifyjs.com/docs/images/blog/january-2026-update/snips-pickers.png "Vuetify Snips Pickers")

**Pickers**: 6 new picker snippets covering date ranges, time selection, and combined datetime patterns

**Pagination**: New pagination templates demonstrating various layouts and styles

**Buttons**: Additional button variations and loading state patterns

**Charts**: New visualization snippets using Vuetify's chart components

### Improvements

* Improved accessibility for radio group snippets
* Fixed TypeScript compatibility for Chat snippets in Vuetify Play
* Updated Vuetify version across all snippets

**Details:**

* [Vuetify Snips](https://snips.vuetifyjs.com/)
* [Pickers PR#70](https://github.com/vuetifyjs/snips/pull/70)
* [Pagination PR#83](https://github.com/vuetifyjs/snips/pull/83)
* [Charts PR#63](https://github.com/vuetifyjs/snips/pull/63)

---

## Vuetify CLI: Rapid Development

<AppFigure :src="clilogo" alt="Vuetify CLI Logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify CLI Logo" />

<br>

The Vuetify CLI saw intensive development in January with **97 commits** and 31 releases (v0.0.8 through v0.0.13-beta.9), bringing major new capabilities for project management and development workflows. [Andrei Elkin](https://github.com/AndreyYolkin) drove the majority of CLI development with 75 commits.

### New Features{ #new-cli-features }

**Analyze Command**: `vuetify analyze` detects Vuetify usage patterns in your project, helping identify optimization opportunities and migration paths.

<video width="100%" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/january-2026-update/cli-analyze.mp4" type="video/mp4"></source>
</video>

**MCP Integration**: Built-in MCP server configuration with `vuetify add mcp` now supports ruler configuration for AI-assisted development.

**Tab Completion**: Shell tab completion for commands and project arguments, powered by @bomb.sh/tab.

**Localization**: Internationalized prompts for version selection during project scaffolding.

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
* [v0.0.13 Release](https://github.com/vuetifyjs/cli/releases/tag/v0.0.13)

---

## Vuetify MCP: V4 Migration Tools

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

<br>

The Vuetify MCP server shipped four releases in January (v0.4.4 through v0.5.0), with the headline feature being **V4 migration tooling**.

### What's New

![Vuetify MCP Migration](https://cdn.vuetifyjs.com/docs/images/blog/january-2026-update/mcp-migration.png "Vuetify MCP Migration Workflow")

**V3 to V4 Upgrade Guide**: New tool providing comprehensive migration guidance for upgrading from Vuetify 3 to Vuetify 4.

**Breaking Changes Reference**: Detailed documentation of all v4 breaking changes with migration examples.

**Vuetify0 Sync**: Updated composable and component documentation synchronized with the v0 repository.

::: tip AI Migration Prompt

Try asking your AI assistant: *"Use the Vuetify MCP server to analyze my project and generate a migration plan from Vuetify 3 to Vuetify 4."*

:::

### Getting Started{ #getting-started-cli }

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
* [v0.5.0 Release Notes](https://github.com/vuetifyjs/mcp/releases/tag/v0.5.0)
* [Model Context Protocol Documentation](https://modelcontextprotocol.io/)

---

## Product Updates

### Vuetify One

Vuetify One shipped **8 releases** in January (v2.11.0 through v2.13.2), with the highlight being **Open Collective integration**—backers on OpenCollective now receive Vuetify One benefits automatically. Other improvements include banner priority sorting, store function additions, and ecosystem link fixes.

**Details:**

* [Vuetify One](https://one.vuetifyjs.com/)

### Other Products

**Vuetify Play** received 6 commits with quality-of-life improvements. **Vuetify Bin** and **Vuetify Link** each saw minor updates, and **Vuetify Issues Reporter** gained 5 commits improving triage workflows.

---

## Vuetify0: Progress Update

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

January marked a significant milestone for Vuetify0 with the **v0.1.0 release**—the first minor version signaling API stability. With **464 commits**, **21 merged PRs**, and 7 releases (v0.0.22 through v0.1.2), the headless meta-framework gained three new components and substantial internal improvements.

![Vuetify0 Progress](https://cdn.vuetifyjs.com/docs/images/blog/january-2026-update/v0.png "Vuetify0 Progress")

### New Components

**[Tabs](https://0.vuetifyjs.com/components/disclosure/tabs/)** — A fully accessible tab interface with keyboard navigation, ARIA attributes, and flexible styling. Supports both horizontal and vertical orientations with lazy rendering options.

```html
<script lang="ts" setup>
  import { Tabs } from '@vuetify/v0'

  const selected = ref('profile')
</script>

<template>
  <Tabs.Root v-model="selected">
    <Tabs.List label="Account settings">
      <Tabs.Item value="profile">Profile</Tabs.Item>
      <Tabs.Item value="password">Password</Tabs.Item>
      <Tabs.Item value="billing" disabled>Billing</Tabs.Item>
    </Tabs.List>

    <Tabs.Panel value="profile">Profile content</Tabs.Panel>
    <Tabs.Panel value="password">Password content</Tabs.Panel>
    <Tabs.Panel value="billing">Billing content</Tabs.Panel>
  </Tabs.Root>
</template>
```

**[Radio](https://0.vuetifyjs.com/components/forms/radio/)** — Accessible radio button groups with proper fieldset/legend semantics, keyboard navigation, and focus management.

```html
<script lang="ts" setup>
  import { Radio } from '@vuetify/v0'

  const selected = ref<string>()
</script>

<template>
  <Radio.Group v-model="selected">
    <label>
      <Radio.Root value="a">
        <Radio.Indicator>●</Radio.Indicator>
      </Radio.Root>
      Option A
    </label>
    <label>
      <Radio.Root value="b">
        <Radio.Indicator>●</Radio.Indicator>
      </Radio.Root>
      Option B
    </label>
  </Radio.Group>
</template>
```

**[Checkbox](https://0.vuetifyjs.com/components/forms/checkbox/)** — Standalone checkbox with indeterminate state support, proper labeling, and native form integration.

```html
<script lang="ts" setup>
  import { Checkbox } from '@vuetify/v0'

  const agreed = ref(false)
</script>

<template>
  <label>
    <Checkbox.Root v-model="agreed">
      <Checkbox.Indicator>✓</Checkbox.Indicator>
    </Checkbox.Root>
    I agree to the terms
  </label>
</template>
```

### New Composables

**[useLazy](https://0.vuetifyjs.com/composables/system/use-lazy/)** — Deferred rendering based on visibility. Content renders only when its container enters the viewport, ideal for performance optimization in long pages.

**[useDate](https://0.vuetifyjs.com/composables/plugins/use-date/)** — Date manipulation utilities with locale support, formatting, and comparison functions.

**[useHotkey](https://0.vuetifyjs.com/composables/system/use-hotkey/)** — Keyboard shortcut management ported from Vuetify 3, enabling consistent hotkey handling across applications.

**[createNested](https://0.vuetifyjs.com/composables/selection/create-nested/)** — Hierarchical tree management for building treeview, file browser, and nested list components.

### Internal Improvements

**useFeatures Adapters**: New adapter system allows customizing feature behavior without modifying core composables.

**Theme Style Injection**: Migrated to adoptedStyleSheets for better performance and Shadow DOM support.

**Web Types Generation**: Automatic generation of web-types for IDE support with prop documentation and type hints.

::: info

Vuetify0 v0.1.x signals API stability for existing composables. Breaking changes will follow semver conventions going forward.

:::

**Details:**

* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [Vuetify0 Roadmap](https://0.vuetifyjs.com/roadmap)
* [Tabs Component](https://0.vuetifyjs.com/components/disclosure/tabs/)
* [Radio Component](https://0.vuetifyjs.com/components/forms/radio/)
* [Checkbox Component](https://0.vuetifyjs.com/components/forms/checkbox/)
* [v0.1.0 Release Notes](https://0.vuetifyjs.com/releases/?version=v0.1.0)

---

## January 2026 Changelog

The following section provides an overview of the changes made in January 2026, including new features, bug fixes, and enhancements across the Vuetify framework.

**Key Improvements:**

* MD3 typography and elevation system migrations
* VCommandPalette labs component
* Grid system modernization
* VDataTable sort-icon customization
* v-intersect dynamic prop updates
* Numerous accessibility and form fixes

**Expand** this section to see the detailed changelog for January 2026:

<details>

### v3.11.7

**:wrench: Bug Fixes**

* **VAutocomplete:** avoid no-items being selectable ([#22509](https://github.com/vuetifyjs/vuetify/issues/22509)) ([36f679c](https://github.com/vuetifyjs/vuetify/commit/36f679ccef))
* **VInput:** Use direction prop only where needed ([#22519](https://github.com/vuetifyjs/vuetify/issues/22519)) ([1eca6f8](https://github.com/vuetifyjs/vuetify/commit/1eca6f8fad))
* **VNumberInput:** prevent inner button overflow when rounded ([#22492](https://github.com/vuetifyjs/vuetify/issues/22492)) ([942ddcc](https://github.com/vuetifyjs/vuetify/commit/942ddcccc8))
* **VBreadcrumbs:** drop redundant `item-props` prop ([901061b](https://github.com/vuetifyjs/vuetify/commit/901061b7fb))
* **VTabs:** correct slider width with inset and vertical ([0201b64](https://github.com/vuetifyjs/vuetify/commit/0201b641c4))

---

### v3.11.8

**:wrench: Bug Fixes**

* **VColorPicker:** prevent glitch hiding canvas on resize ([f4e3172](https://github.com/vuetifyjs/vuetify/commit/f4e31724e3))
* **VListItem:** avoid overlay blinking when deactivating ([d11c6a6](https://github.com/vuetifyjs/vuetify/commit/d11c6a69ec))
* **VField:** Use only one for label at a time ([#22542](https://github.com/vuetifyjs/vuetify/issues/22542)) ([4c0c9fc](https://github.com/vuetifyjs/vuetify/commit/4c0c9fc08a))

---

### v4.0.0-beta.0

**:rocket: Features**

* **typography:** migrate to MD3 typography ([#22557](https://github.com/vuetifyjs/vuetify/issues/22557)) ([311daf4](https://github.com/vuetifyjs/vuetify/commit/311daf433a))
* **elevation:** MD3 elevation levels ([#22461](https://github.com/vuetifyjs/vuetify/issues/22461)) ([dfce695](https://github.com/vuetifyjs/vuetify/commit/dfce695f8e))
* **VCol/VRow:** grid system overhaul ([#21500](https://github.com/vuetifyjs/vuetify/issues/21500)) ([f6d24a9](https://github.com/vuetifyjs/vuetify/commit/f6d24a9234))
* **VDataTable:** add `sort-icon` prop ([#22521](https://github.com/vuetifyjs/vuetify/issues/22521)) ([3bdf0ea](https://github.com/vuetifyjs/vuetify/commit/3bdf0ead33))
* **v-intersect:** re-mount on prop updates ([#22556](https://github.com/vuetifyjs/vuetify/issues/22556)) ([6262290](https://github.com/vuetifyjs/vuetify/commit/6262290d24))

**:test_tube: Labs**

* **VCommandPalette:** add new command palette component ([#22403](https://github.com/vuetifyjs/vuetify/issues/22403)) ([2d4d0df](https://github.com/vuetifyjs/vuetify/commit/2d4d0df64f))

</details>

---

## What's Next{ .mt-4 }

**Vuetify 4.0 launches February 23rd.** The final beta releases are landing now, incorporating community feedback on the new typography, elevation, and grid systems. This is a pivotal Vuetify release—bringing CSS layers, a DX overhaul, and minimal migration effort. The [v3 → v4 MCP migration tools](#vuetify-mcp-v4-migration-tools) make an already straightforward upgrade even easier. Importantly, v4 includes the infrastructure changes that make **unstyled components possible**—the foundation for true styling freedom in future releases.

The tailwind/unocss support landing in v4 is exciting, but it's a stepping stone. The real transformation comes next: **full unstyled capability** where you control every aspect of styling while keeping Vuetify's component logic and accessibility. V4's architecture—combined with the work happening in [Vuetify0](https://0.vuetifyjs.com/roadmap)—sets the stage for this future.

VCommandPalette will receive refinements based on labs feedback, and we're expanding the component's integration patterns for common use cases. VHeatmap and VMonthPicker are on track for labs release.

Starting February 24th, we begin the **Vuetify → Vuetify0 refactor**—rebuilding Vuetify's internals on top of v0's headless composable layer. This is the path to **Vuetify 5**, where the full component library and the headless meta-framework become one unified architecture, unlocking complete styling control without sacrificing the features you rely on.

Thank you for being part of the Vuetify community. See you in February!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/vuetify), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
