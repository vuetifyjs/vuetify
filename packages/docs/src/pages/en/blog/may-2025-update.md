---
layout: blog
meta:
  title: May 2025 Update
  description: May delivered significant progress on MCP, VDateInput enhancements, VNumberInput improvements, and ecosystem-wide improvements across Vuetify.
  keywords: Vuetify May 2025, Model Context Protocol, VDateInput, VNumberInput, Vuetify ecosystem
---

<script setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const mcpLogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/logos/vmcp-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# May 2025 Update

This month brings exciting advancements across the Vuetify ecosystem, with major strides in AI integration, component refinements, and developer experience.

---

🖊️ John Leider • 📅 June 6th, 2025

<PromotedEntry />

---

## Expanding Horizons

May 2025 has been a month of significant progress for Vuetify, with key developments that enhance the framework's capabilities and developer experience. From the official release of [Vuetify MCP](https://github.com/vuetifyjs/mcp) (Model Context Protocol) to substantial improvements in core components like [VDateInput](https://vuetifyjs.com/components/date-inputs/); this month has set the stage for exciting future innovations.

::: success

Cool example of the month: [VTreeview File structure](https://play.vuetifyjs.com/playgrounds/AbH9-w) by [Jacek](https://github.com/J-Sek)

:::

---

## Table of Contents

- [Releases](#releases)
- [Official @vuetify/mcp Release](#official-vuetifymcp-release)
  - [MCP Vuetify API Keys](#mcp-vuetify-api-keys)
- [Framework](#framework)
  - [VDateInput Enhancements](#vdateinput-enhancements)
  - [VNumberInput](#vnumberinput)
  - [New Labs Component: VColorInput](#new-labs-component-vcolorinput)
- [Ecosystem updates](#ecosystem-updates)
  <!-- - [Vuetify Documentation](#vuetify-documentation) -->
  - [Vuetify Bin](#vuetify-bin)
  - [Vuetify Issues Next in Testing](#vuetify-issues-next-in-testing)
  - [Vuetify Play Enhancements](#vuetify-play-enhancements)
  - [Vuetify ESLint Config](#vuetify-eslint-config)
- [May 2025 Changelog](#may-2025-changelog)
- [What's Next](#whats-next)

---

## Releases

May continued our steady release cadence with several patch updates addressing bugs and introducing minor enhancements. These releases focused on stability and performance improvements, ensuring that Vuetify remains a reliable foundation for your applications.

![Hero image for latest release notes](https://vuetifyjs.b-cdn.net/docs/images/blog/may-2025-update/may-2025-release-note.png "Latest release notes hero image")

**Details:**

- [v3.8.4](https://vuetifyjs.com/getting-started/release-notes/?version=v3.8.4)
- [v3.8.5](https://vuetifyjs.com/getting-started/release-notes/?version=v3.8.5)
- [v3.8.6](https://vuetifyjs.com/getting-started/release-notes/?version=v3.8.6)
- [v3.8.7](https://vuetifyjs.com/getting-started/release-notes/?version=v3.8.7)

## Official @vuetify/mcp Release

After months of development and anticipation, we're excited to announce that **@vuetify/mcp** is officially publicly available!

<AppFigure :src="mcpLogo" alt="MCP logo" width="300" height="auto" class="mx-auto" title="Vuetify MCP Logo" />

This implementation of the [Model Context Protocol](https://modelcontextprotocol.io/introduction) represents a fundamental shift in how developers can interact with Vuetify through AI-powered tools. Now you can provide up-to-date context for features, components, and best practices directly to AI applications, enhancing the accuracy and relevance of AI-generated code.

The Model Context Protocol (MCP) standardizes how applications provide context to LLMs, functioning like a "USB-C port for AI applications."

Setting up MCP is as simple as running the following in your terminal:

```bash
npx -y @vuetify/mcp config
```

This single command configures MCP for your development environment, giving AI tools instant access to up-to-date Vuetify context.

Our implementation ensures that AI tools have access to the most up-to-date Vuetify documentation, components, and best practices, eliminating the frustration of outdated or incorrect AI-generated code.

Recent additions to @vuetify/mcp include:

- Improved installation process (one command installation) using `npx -y @vuetify/mcp config`
- New tools for accessing release notes, directives, frequently asked questions, and more
- Up next: Application upgrade between major versions

<video width="100%" height="auto" autoplay loop controls>
  <source src="https://vuetifyjs.b-cdn.net/docs/images/blog/may-2025-update/may-2025-%40vuetify-mcp.mp4" type="video/mp4"></source>
</video>

This release marks just the beginning of our MCP journey. We're actively working on expanding its capabilities and integrations, with a focus on making Vuetify development more intuitive and efficient than ever before.

### MCP Vuetify API Keys

Later in June, we'll be introducing a new API key system for MCP managed through Vuetify One. We will be rolling out special **primer** prompts that super charge how agents interact with Vuetify MCP for our Vuetify One subscribers.

**Details:**

- [@vuetify/mcp GitHub repository](https://github.com/vuetifyjs/mcp)
- [Model Context Protocol documentation](https://modelcontextprotocol.io/introduction)

## Framework

We continue to make improvements to the core framework, focusing on resolving bugs, iterating on Labs components, and preparing for the next minor release, v3.9.0, which is scheduled for June 2025. Here are a few highlights:

### VDateInput Enhancements

May brought substantial improvements to several core components, with VDateInput receiving particular attention. The component now features enhanced parsing capabilities, improved validation, and more flexible configuration options. The spotlight for this month is on the [VDateInput](https://vuetifyjs.com/components/date-inputs/).

<video width="100%" height="auto" autoplay loop controls>
  <source src="https://vuetifyjs.b-cdn.net/docs/images/blog/may-2025-update/may-2025-date-input.mp4" type="video/mp4"></source>
</video>

For details on other changes, please check the [May 2025 Changelog](#may-2025-changelog).

**Details:**

- [VDateInput input-format PR #21221](https://github.com/vuetifyjs/vuetify/pull/21221)
- [VDateInput menu v-model PR #21298](https://github.com/vuetifyjs/vuetify/pull/21298)
- [VDateInput validationValue PR #21408](https://github.com/vuetifyjs/vuetify/pull/21408)
- [VDateInput common parser PR #21450](https://github.com/vuetifyjs/vuetify/pull/21450)
- [VDateInput disable months/years PR #21466](https://github.com/vuetifyjs/vuetify/pull/21466)

### VNumberInput

This month also saw multiple updates to the [VNumberInput](https://vuetifyjs.com/components/number-inputs/) component, including:

- Improved append inner icon alignment
- Enhanced touch pointer capture on controls
- Better extraction of numbers from pasted text

<video width="100%" height="auto" autoplay loop controls>
  <source src="https://vuetifyjs.b-cdn.net/docs/images/blog/may-2025-update/may-2025-number-input.mp4" type="video/mp4"></source>
</video>

**Details:**

- [VNumberInput inner spacing PR #21389](https://github.com/vuetifyjs/vuetify/pull/21389)
- [VNumberInput touch pointer capture PR #21436](https://github.com/vuetifyjs/vuetify/pull/21436)
- [VNumberInput paste text extraction PR #21263](https://github.com/vuetifyjs/vuetify/pull/21263)

### New Labs Component: VColorInput

This month also saw the introduction of a new [VColorInput](https://vuetifyjs.com/components/color-inputs/) component in the Labs section. This component provides an intuitive interface for color selection and input, featuring integration with color pickers and text-based hex input. As a Labs component, VColorInput is available for testing and feedback as we refine its API and functionality.

Basic usage is simple:

```html
<template>
  <v-color-input v-model="color" label="Pick a color" />
</template>

<script setup>
  import { shallowRef } from 'vue'

  const color = shallowRef('#1976D2')
</script>
```

<video width="100%" height="auto" autoplay loop controls>
  <source src="https://vuetifyjs.b-cdn.net/docs/images/blog/may-2025-update/may-2025-color-input.mp4" type="video/mp4"></source>
</video>

The component supports both picker and text input modes, making it flexible for different use cases.

**Details:**

- [VColorInput introduction PR #20623](https://github.com/vuetifyjs/vuetify/pull/20623)

## Ecosystem updates

The broader Vuetify ecosystem saw significant advancements in May, with improvements in developer tooling and infrastructure. These updates collectively enhance the developer experience and set the stage for future innovations.

<!--
### Vuetify Documentation

You can now save your favorite search results in the Vuetify documentation. Just press `ctrl+k` or `cmd+k` to open the search bar, type your query, and click the star icon next to the search result you want to save. This feature allows you to quickly access frequently used documentation pages, improving your workflow and efficiency.

![Vuetify documentation search favorites](https://cdn.vuetifyjs.com/docs/images/blog/may-2025-update/docs-search-favorites.png "Vuetify documentation search favorites"){ height=300 }
-->

### Vuetify Bin

You can now choose a language for your code snippets in Vuetify Bin, improving syntax highlighting and code organization. This enhancement makes it easier to share and collaborate on code examples with proper language-specific formatting.

<video width="100%" height="auto" autoplay loop controls>
  <source src="https://vuetifyjs.b-cdn.net/docs/images/blog/may-2025-update/may-2025-vbin.mp4" type="video/mp4"></source>
</video>

### Vuetify Play Enhancements

Vuetify Play continues to evolve with new features and improvements that make it an even more powerful tool for exploring and experimenting with Vuetify components.

<video width="100%" height="auto" autoplay loop controls>
  <source src="https://vuetifyjs.b-cdn.net/docs/images/blog/may-2025-update/may-2025-vplay.mp4" type="video/mp4"></source>
</video>

Key enhancements to Vuetify Play include:

- Added New File Explorer
- Added Export-to-Vite functionality

These improvements make Vuetify Play more versatile and user-friendly, enabling developers to more effectively explore, test, and share Vuetify components and configurations.

**Details:** [Vuetify Play](https://play.vuetifyjs.com/)

### Vuetify Issues Next in Testing

We've published the new issue generator for testing, providing a new interface for creating and managing GitHub issues. Please drop us a line in [Discord](https://community.vuetifyjs.com/) if you have any feedback or suggestions.

**Details:** [Issues-next deployment](https://issues-next.vuetifyjs.com/)

### Vuetify ESLint Config

v4.0.0 of the Vuetify ESLint config is now available, providing updated linting rules and configurations that align with the latest Vuetify standards and best practices. This major version includes improved TypeScript support and enhanced component-specific rules. The config is automatically included when [Creating a new project](https://vuetify.new/) and is recommended for all Vuetify projects.

**Key improvements:**

- Enhanced TypeScript integration
- Updated component-specific linting rules
- Better compatibility with modern JavaScript standards
- Improved accessibility checks

## May 2025 Changelog

Expand this section to see the detailed changelog for May 2025, including bug fixes and enhancements.

<details open>

### 🛠️ Bug Fixes

- **VAutocomplete:** Re-evaluate dirty on external change [#21344](https://github.com/vuetifyjs/vuetify/issues/21344)
- **VBottomNavigation:** Set inline margin to auto [#21357](https://github.com/vuetifyjs/vuetify/issues/21357)
- **VDataTable:** Shift-click toggles only selectable rows [#21334](https://github.com/vuetifyjs/vuetify/issues/21334)
- **VDataTableServer/Virtual:** Add generic headers type [#21327](https://github.com/vuetifyjs/vuetify/issues/21327)
- **VDialog:** Focus on open only with scrim or retainFocus [#21343](https://github.com/vuetifyjs/vuetify/issues/21343)
- **VField:** Prevent tab focus on clear icon [#19528](https://github.com/vuetifyjs/vuetify/issues/19528)
- **VFileInput/VFileUpload:** Fix drop not calling change function [#21182](https://github.com/vuetifyjs/vuetify/issues/21182)
- **VMenu:** Position relative to `visualViewport` when not zoomed [#21462](https://github.com/vuetifyjs/vuetify/issues/21462)
- **VNumberInput:** Adjust inner spacing [#21389](https://github.com/vuetifyjs/vuetify/issues/21389)
- **VNumberInput:** Capture touch pointer on controls [#21436](https://github.com/vuetifyjs/vuetify/issues/21436)
- **VNumberInput:** Extract number from pasted text [#21263](https://github.com/vuetifyjs/vuetify/issues/21263)
- **VOverlay:** Validate target positioning [#21350](https://github.com/vuetifyjs/vuetify/issues/21350)
- **VPagination:** Adapt button width for large values [#21139](https://github.com/vuetifyjs/vuetify/issues/21139)
- **VSelect:** Keyboard match multiple items with same prefix [#21419](https://github.com/vuetifyjs/vuetify/issues/21419)
- **VSelect:** Prevent selection on lookup in multiple mode [#21418](https://github.com/vuetifyjs/vuetify/issues/21418)
- **VSnackbarQueue:** Prevent infinite recursion in message type [#21410](https://github.com/vuetifyjs/vuetify/issues/21410)
- **VTable:** Remove border radius with top/bottom [#21320](https://github.com/vuetifyjs/vuetify/issues/21320) [#21321](https://github.com/vuetifyjs/vuetify/issues/21321)
- **VTextField:** Reset field on clear [#21310](https://github.com/vuetifyjs/vuetify/issues/21310)
- **VTooltip:** Disable transition when set to false [#21268](https://github.com/vuetifyjs/vuetify/issues/21268)

### 🧪 Labs

- **validation:** Resolve global rules [#21267](https://github.com/vuetifyjs/vuetify/issues/21267)
- **VColorInput:** Introduced new component [#20623](https://github.com/vuetifyjs/vuetify/issues/20623)
- **VDateInput:** Accept value on hidden picker [#21273](https://github.com/vuetifyjs/vuetify/issues/21273)
- **VDateInput:** Add `input-format` prop [#21221](https://github.com/vuetifyjs/vuetify/issues/21221)
- **VDateInput:** Add `update-on` prop [#21249](https://github.com/vuetifyjs/vuetify/issues/21249)
- **VDateInput:** Expose menu as `v-model` [#21298](https://github.com/vuetifyjs/vuetify/issues/21298)
- **VDateInput:** Reset model to \[] when multiple [#21299](https://github.com/vuetifyjs/vuetify/issues/21299)
- **VDateInput:** Sync placeholder and locale [#21409](https://github.com/vuetifyjs/vuetify/issues/21409)
- **VDateInput:** Validation sync with `modelValue` [#21408](https://github.com/vuetifyjs/vuetify/issues/21408)
- **VTimePicker:** Fix SSR hydration mismatch [#21355](https://github.com/vuetifyjs/vuetify/issues/21355)

### 🔄 Reverts

- Revert fix for **VAutocomplete** dirty state change [#21392](https://github.com/vuetifyjs/vuetify/issues/21392)

### 🧩 Code Refactoring

- Resolve directives directly [#21413](https://github.com/vuetifyjs/vuetify/issues/21413)
- Use `clamp()` utility function [commit](https://github.com/vuetifyjs/vuetify/commit/6784ba7aae029c3e25dd92197c5b5d19feb43430)

</details>

---

## What's Next

June is all about shipping. MCP gets API keys and primer prompts, v3.9.0 lands with the features we've been building, and we'll start showing off more of the new theming work in the release blog post coming next week. VDateInput will likely graduate from Labs soon, and we've got some performance improvements in the pipeline that I'm excited about.

Until next month!
