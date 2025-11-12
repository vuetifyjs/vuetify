---
layout: blog
meta:
  title: October 2025 Update
  description: October focused on refinement, delivering focus trap improvements, component enhancements, and v0 composables progress for v3.11 and v4.0.
  keywords: Vuetify October 2025, v3.11 LTS, Focus trap, Component enhancements, v0 composables, v4.0
---

<script setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()
  const linklogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vlink-logo-${theme.current.value.dark ? 'dark' : 'light'}.svg`
  })
  const mcplogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vmcp-logo-${theme.current.value.dark ? 'dark' : 'light'}.svg`
  })
  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.svg`
  })
  const vuetifylogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vuetify-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# October 2025 Update

Welcome to the October 2025 Vuetify update! This month, our team focused on refinement and reliability, delivering significant **focus trap improvements** across multiple components and advancing key features in development.

![Hero image for October update](https://cdn.vuetifyjs.com/docs/images/blog/october-2025-update/october-hero.png "October hero image"){ height=112 }

🖊️ John Leider • 📅 November 11th, 2025

<PromotedEntry />

---

## Moving along

October's development cycle focused on polish and developer experience. We delivered critical accessibility improvements with enhanced focus trap functionality, optimized VDataTable performance for large datasets, and refined components across the board. The month also saw the launch of **Vuetify Link**, our new URL shortening service, and significant updates to the **Vuetify MCP server** with HTTP transport support, making it easier than ever to integrate Vuetify's documentation and API intelligence into AI-powered development workflows. We also made substantial progress on our **v0 composables**, laying the groundwork for the upcoming Vuetify 4.0 release.

::: success

Cool example of the month: [VTreeview footer](https://play.vuetifyjs.com/playgrounds/foNl1A) by [J-Sek](https://github.com/J-Sek)

:::

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Ecosystem Spotlight: Vuetify Link](#ecosystem-spotlight-vuetify-link)
* [Framework Updates](#framework-updates)
  * [Focus Trap Enhancements](#focus-trap-enhancements)
  * [Component Refinements](#component-refinements)
  * [In Development](#in-development)
* [Vuetify MCP: HTTP Transport Support](#vuetify-mcp-http-transport-support)
* [Vuetify0: Progress Update](#vuetify0-progress-update)
* [October 2025 Changelog](#october-2025-changelog)
* [What's Next](#whats-next)

---

## Releases

October delivered five releases focused on stability, performance, and accessibility. We merged numerous bug fixes across components, improved focus trap behavior, enhanced form field handling, and optimized performance for large data sets.

![October Releases Banner](https://cdn.vuetifyjs.com/docs/images/blog/october-2025-update/releases.png "October Releases Banner")

### Key Improvements

* Enhanced focus trap functionality across VDialog and VMenu with better invisible/inert element handling
* Performance optimizations for VDataTable with select-all improvements and reduced lag in large datasets
* Multiple VMenu fixes improving keyboard navigation, scroll behavior, and ARIA attributes
* VCombobox and VAutocomplete refinements with consistent transitions and better open/close behavior
* Accessibility improvements with forced-colors mode support for multiple components
* Labs components updates including VCalendar, VDateInput, and VMaskInput enhancements

View the complete list of changes in the [Full Changelog](#october-2025-changelog)

**Details:**

* [v3.10.4](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.4)
* [v3.10.5](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.5)
* [v3.10.6](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.6)
* [v3.10.7](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.7)
* [v3.10.8](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.8)

---

## Ecosystem Spotlight: Vuetify Link

<AppFigure :src="linklogo" alt="Vuetify Link logo" width="200" height="auto" class="mx-auto my-4" title="Vuetify Link Logo" />

Sharing code examples and playground demos is fundamental to how our community learns and collaborates. **Vuetify Link** is now live—a URL shortening service purpose-built for the Vuetify ecosystem. It makes sharing your playgrounds, reporting issues with reproducible examples, and showcasing your latest components effortless.

<video width="100%" height="auto" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/october-2025-update/vuetify-link.mp4" type="video/mp4"></source>
</video>

Creating links is free for everyone. Vuetify One users get additional features such as redirect timer, password protection, and custom slug generation.

**Details:**

* [Vuetify Link](https://link.vuetifyjs.com/)

---

## Framework Updates

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto my-4" title="Vuetify Logo" />

October was all about refinement and reliability. Our team focused on enhancing existing components with new features and improving the overall developer experience across the framework.

### Focus Trap Enhancements

We've made significant improvements to focus trap functionality across components, ensuring better keyboard navigation and accessibility compliance. These enhancements improve the experience for users relying on keyboard navigation and assistive technologies.

**Details:**

* [PR#22105](https://github.com/vuetifyjs/vuetify/pull/22105)
* [PR#22044](https://github.com/vuetifyjs/vuetify/pull/22044)

### Component Refinements

The team has been working diligently to enhance component reliability and functionality:

**Navigation & Selection**

* **VTreeview & VList**: Improved node selection reliability for more predictable behavior in complex tree structures
* **VBreadcrumbs**: Added `item-props` support to enable text truncation for long breadcrumb items
* **VList**: Enhanced semantic HTML with proper accessibility attributes and roles

**Form Components**

* **VAutocomplete & VCombobox**: Refined menu transitions and resolved edge-case issues
* **VMenu**: Various fixes improving stability and user experience

**Data & Display**

* **VTreeview**: New footer slot plus minor bug fixes
* **VDataTable**: Multi-sort enhancements for more powerful data manipulation

**Details:**

* [VTreeview PR#22130](https://github.com/vuetifyjs/vuetify/pull/22130)
* [VBreadcrumbs PR#22213](https://github.com/vuetifyjs/vuetify/pull/22213)
* [VAutocomplete/VCombobox PR#22144](https://github.com/vuetifyjs/vuetify/pull/22144)
* [VMenu PR#22242](https://github.com/vuetifyjs/vuetify/pull/22242)
* [VMenu PR#22240](https://github.com/vuetifyjs/vuetify/pull/22240)
* [VDataTable PR#22133](https://github.com/vuetifyjs/vuetify/pull/22133)

### In Development

We have multiple new features and components in active development that are continuing to make progress:

#### VCommandPalette

**VCommandPalette Development**: Work continues on scoping and developing this highly-requested component. Command-driven interfaces are perfect for power users and keyboard-first workflows, and we're excited to bring this pattern to Vuetify applications.

![VCommandPalette Component](https://cdn.vuetifyjs.com/docs/images/blog/october-2025-update/vcommandpalette.png "VCommandPalette Component")

#### VTabs Enhancements

We're working on a new **inset variant** for `VTabs`. This variant provides a more subtle tab design that works beautifully in dense layouts and secondary navigation contexts.

<video width="100%" height="auto" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/october-2025-update/inset-tabs.mp4" type="video/mp4"></source>
</video>

**Details:**

* [VCommandPalette PR#22217](https://github.com/vuetifyjs/vuetify/pull/22217)
* [VList a11y PR#21444](https://github.com/vuetifyjs/vuetify/pull/21444)
* [VTabs inset variant PR#22221](https://github.com/vuetifyjs/vuetify/pull/22221)

---

## Vuetify MCP: HTTP Transport Support

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto my-4" title="Vuetify MCP Logo" />

October brought significant updates to the **Vuetify MCP (Model Context Protocol) server**, expanding how developers can integrate Vuetify's comprehensive documentation and API intelligence into AI-powered coding assistants like Claude Code, Cline, and other MCP-compatible tools.

### What's New

**HTTP Transport Support**: The Vuetify MCP server now supports HTTP transport in addition to the standard stdio transport. This makes it easier to deploy and connect to the server across different environments and use cases.

**Official Hosted Server**: We've launched an official hosted MCP server at **[https://mcp.vuetifyjs.com](https://mcp.vuetifyjs.com)**, allowing you to access Vuetify's documentation, component APIs, installation guides, and feature documentation without running a local server.

### Getting Started

To use the hosted MCP server with Claude Desktop or other MCP clients, add the following to your MCP configuration:

```json
{
  "mcpServers": {
    "vuetify": {
      "url": "https://mcp.vuetifyjs.com/mcp"
    }
  }
}
```

The Vuetify MCP server provides AI assistants with direct access to:

* **Component APIs**: Detailed prop, slot, and event documentation for all Vuetify components
* **Directive APIs**: Complete directive documentation including v-ripple, v-scroll, and more
* **Installation Guides**: Platform-specific setup instructions for Vite, Nuxt, Laravel, and others
* **Feature Guides**: In-depth documentation on theming, internationalization, accessibility, and more
* **Release Notes**: Version-specific changelogs and migration information
* **FAQ**: Frequently asked questions and common solutions

This integration enables your AI coding assistant to provide accurate, up-to-date Vuetify guidance directly within your development workflow.

**Details:**

* [Vuetify MCP GitHub Repository](https://github.com/vuetifyjs/mcp)
* [HTTP Transport Commit](https://github.com/vuetifyjs/mcp/commit/66a3802951294f7610562d949dbdd51db879d50a)
* [Model Context Protocol Documentation](https://modelcontextprotocol.io/)

---

## Vuetify0: Progress Update

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto my-4" title="Vuetify0 Logo" />

October was all about testing and iteration and we covered a lot of ground. All composables received a tuning pass to improve type safety and Intellisense support:

![TypeScript Intellisense](https://cdn.vuetifyjs.com/docs/images/blog/october-2025-update/v0.png "Vuetify0 TypeScript Intellisense")

All composables now follow consistent naming conventions and patterns and we are now beginning to iterate on the component variations of each composable (where applicable). These components will marry various composables together to provide full-featured UI elements built on the v0 foundation.

We've also started to add interactive examples to the documentation site to showcase usage patterns and best practices. One component that received a lot of work last month was the **ExpansionPanel** which is now available as of the [v0.0.10](https://github.com/vuetifyjs/0/releases/tag/v0.0.10) release.

```html
<script lang="ts" setup>
  import { ExpansionPanel } from '@vuetify/v0'
</script>

<template>
  <ExpansionPanel.Root>
    <ExpansionPanel.Item>
      <ExpansionPanel.Activator>
        Click me
      </ExpansionPanel.Activator>

      <ExpansionPanel.Content>
        Hello from the expansion panel content!
      </ExpansionPanel.Content>
    </ExpansionPanel.Item>
  </ExpansionPanel.Root>
</template>
```

November will focus on continuing to build out components based on the v0 composables, along with additional documentation and examples as we prepare for Vuetify integration.

**Details:**

* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [ExpansionPanel](https://0.vuetifyjs.com/components/expansion-panel/)

---

## October 2025 Changelog

The following section provides an overview of the changes made in October 2025, including new features, bug fixes, and enhancements across the Vuetify framework.

**Key Improvements:**

* Focus trap enhancements: Better keyboard navigation, invisible/inert element handling, and aria-owns support
* Performance optimizations: Select-all optimization in VDataTable, reduced lag with large datasets
* Form field reliability: Fixed duplicated emits, improved validation rules, better field control refs
* Component polish: VMenu scroll/focus fixes, VCombobox/VAutocomplete transition improvements, VDatePicker range fixes
* Accessibility: Forced-colors mode support for VBadge, VListItem, VSkeletonLoader, and VIconBtn
* Labs updates: VCalendar scrolling fixes, VMaskInput inheritance, VDateInput min/max support

**Expand** this section to see the detailed changelog for October 2025:

<details>

### :rocket: Features

* **locationStrategies:** support CSS zoom ([#21878](https://github.com/vuetifyjs/vuetify/issues/21878)) ([32242a3](https://github.com/vuetifyjs/vuetify/commit/32242a353b1313b35f18bfc7c0ac7a72ed2196bb)), closes [#20719](https://github.com/vuetifyjs/vuetify/issues/20719)
* **VCombobox:** add `always-filter` prop ([#22093](https://github.com/vuetifyjs/vuetify/issues/22093)) ([8853f4d](https://github.com/vuetifyjs/vuetify/commit/8853f4da7a6600af3587dcc54f18e5b06a2d1ff9)), closes [#22060](https://github.com/vuetifyjs/vuetify/issues/22060)

### :wrench: Bug Fixes

* catch querySelector errors in focusableChildren() ([ae2af38](https://github.com/vuetifyjs/vuetify/commit/ae2af38f982dc83c662bfa84ce7189c4c08ff16b)), closes [#22238](https://github.com/vuetifyjs/vuetify/issues/22238)
* **group:** avoid errors when comparing recursive items ([#22246](https://github.com/vuetifyjs/vuetify/issues/22246)) ([8ac9c67](https://github.com/vuetifyjs/vuetify/commit/8ac9c67a50653147b9d1003546a45cfea206aab3)), closes [#19322](https://github.com/vuetifyjs/vuetify/issues/19322)
* **nested:** avoid console warnings when updating items order ([#21987](https://github.com/vuetifyjs/vuetify/issues/21987)) ([1dac082](https://github.com/vuetifyjs/vuetify/commit/1dac0826eea90668bf760ea8c43a01a092c6f28e)), closes [#20934](https://github.com/vuetifyjs/vuetify/issues/20934)
* **nested:** selection should react to items changes ([#22236](https://github.com/vuetifyjs/vuetify/issues/22236)) ([6bcdbea](https://github.com/vuetifyjs/vuetify/commit/6bcdbea3800c03bdf3ae736969c423bcd7e54672)), closes [#21733](https://github.com/vuetifyjs/vuetify/issues/21733)
* **validation:** 'number' rule should accept 0 and empty string ([#22204](https://github.com/vuetifyjs/vuetify/issues/22204)) ([1b52724](https://github.com/vuetifyjs/vuetify/commit/1b52724dfeb17c6fb6dd6e50002dec33994ecd51)), closes [#22192](https://github.com/vuetifyjs/vuetify/issues/22192)
* **validation:** correct translation template arguments ([#22146](https://github.com/vuetifyjs/vuetify/issues/22146)) ([a8e17c9](https://github.com/vuetifyjs/vuetify/commit/a8e17c9966c6333d30c092b3c931ab6afff2b03a))
* **VBadge:** background highlight in forced-colors mode ([#22148](https://github.com/vuetifyjs/vuetify/issues/22148)) ([65f6bb7](https://github.com/vuetifyjs/vuetify/commit/65f6bb708b6cdc72c4a0e2828ef3d917f2a78559))
* **VBtn:** set group state for non-router links ([4eeb514](https://github.com/vuetifyjs/vuetify/commit/4eeb514c675b2eeef16f994cac7d37fe1a516b65)), closes [#22085](https://github.com/vuetifyjs/vuetify/issues/22085)
* **VChipGroup:** disable auto-scroll to the last selected ([360203a](https://github.com/vuetifyjs/vuetify/commit/360203aa3e97d84d2aea76f46a6a2062b7a7b879)), closes [#22223](https://github.com/vuetifyjs/vuetify/issues/22223)
* **VChipGroup:** support `center-active` ([#22050](https://github.com/vuetifyjs/vuetify/issues/22050)) ([4a95697](https://github.com/vuetifyjs/vuetify/commit/4a95697c58665ed53b7c23ab6864318b59a371e9)), closes [#22046](https://github.com/vuetifyjs/vuetify/issues/22046)
* **VCombobox:** open menu when `chips` and typing after clear ([d200f22](https://github.com/vuetifyjs/vuetify/commit/d200f227a12ba14aeb5b0a0ce0fd77ce95da52dc))
* **VCombobox:** show full list on reopen unless `always-filter` is used ([83d0073](https://github.com/vuetifyjs/vuetify/commit/83d00737566fd1df7d043d97d6c93dde5237162e))
* **VCombobox, VAutocomplete:** avoid glitches when opening with click ([9a1dd83](https://github.com/vuetifyjs/vuetify/commit/9a1dd8363ff59d91257236b126cb5d89c92ebb61)), closes [#22228](https://github.com/vuetifyjs/vuetify/issues/22228)
* **VAutocomplete/VCombobox:** consistent open/close transition ([#22144](https://github.com/vuetifyjs/vuetify/issues/22144)) ([96f6479](https://github.com/vuetifyjs/vuetify/commit/96f6479d2aa82bcf8f75de51c9dce557fba981bd))
* **VConfirmEdit:** deeply unwrap refs before cloning values ([a507171](https://github.com/vuetifyjs/vuetify/commit/a507171d25b0d41a4be0d74095ac69afbc413922)), closes [#22232](https://github.com/vuetifyjs/vuetify/issues/22232)
* **VDataTable:** avoid lag when selecting rows in large tables ([#22163](https://github.com/vuetifyjs/vuetify/issues/22163)) ([92f8a3c](https://github.com/vuetifyjs/vuetify/commit/92f8a3c5c75e84ab79377e9c26a74576f36e6bbc)), closes [#21767](https://github.com/vuetifyjs/vuetify/issues/21767)
* **VDataTable:** optimize select-all performance ([#22252](https://github.com/vuetifyjs/vuetify/issues/22252)) ([2ad1a38](https://github.com/vuetifyjs/vuetify/commit/2ad1a385a06d94405aa3497b079498f08c870e83)), closes [#19447](https://github.com/vuetifyjs/vuetify/issues/19447)
* **VDatePicker:** correct range for `allowed-dates` ([#22167](https://github.com/vuetifyjs/vuetify/issues/22167)) ([e678f0e](https://github.com/vuetifyjs/vuetify/commit/e678f0e0d6c45018c611785d932c51db4068a8ef)), closes [#22160](https://github.com/vuetifyjs/vuetify/issues/22160)
* **VDatePicker:** correct range selection for Luxon adapter ([20b2bf4](https://github.com/vuetifyjs/vuetify/commit/20b2bf425353f6a4d5edf6f1c63d5c35b0ecd165)), closes [#22262](https://github.com/vuetifyjs/vuetify/issues/22262)
* **VDatePicker:** return correct range for DST ([#22187](https://github.com/vuetifyjs/vuetify/issues/22187)) ([a3ddcf1](https://github.com/vuetifyjs/vuetify/commit/a3ddcf16cca785abcfbc1a922c6e44f6e2acc576)), closes [#22186](https://github.com/vuetifyjs/vuetify/issues/22186)
* **VDialog:** fix focus trap when tabbing forward ([#22101](https://github.com/vuetifyjs/vuetify/issues/22101)) ([50a150b](https://github.com/vuetifyjs/vuetify/commit/50a150bf0eb8abf6129958e6b11355a1315bfb5b)), closes [#21945](https://github.com/vuetifyjs/vuetify/issues/21945)
* **VDialog:** focus trap should ignore invisible and inert elements ([#22105](https://github.com/vuetifyjs/vuetify/issues/22105)) ([adf3f91](https://github.com/vuetifyjs/vuetify/commit/adf3f919c6fa1efd6aacde0686a0fb5d5dc0e0bb)), closes [#18400](https://github.com/vuetifyjs/vuetify/issues/18400)
* **VDivider:** inherit color in colored containers ([bb54a7d](https://github.com/vuetifyjs/vuetify/commit/bb54a7ded40156e24b670c83e826caca1740b74a))
* **VField:** missing `controlRef` assignment ([#22171](https://github.com/vuetifyjs/vuetify/issues/22171)) ([b89f568](https://github.com/vuetifyjs/vuetify/commit/b89f56819302649463482ce2776557e371b9ec75)), closes [#22034](https://github.com/vuetifyjs/vuetify/issues/22034)
* **VFileInput, VFileUpload:** avoid invalid `accept` when not defined ([e6c39bc](https://github.com/vuetifyjs/vuetify/commit/e6c39bcbeb750ce4b1a5da91edb4a940dcc4fd38)), closes [#22131](https://github.com/vuetifyjs/vuetify/issues/22131)
* **VKbd:** use `$body-font-family` as default ([3f61102](https://github.com/vuetifyjs/vuetify/commit/3f6110237d3a0fb5e65dae6358dc4d04d11e7338))
* **VListItem:** correct role when item is a link ([#22137](https://github.com/vuetifyjs/vuetify/issues/22137)) ([80e154b](https://github.com/vuetifyjs/vuetify/commit/80e154b8c295458b9ced262b3e20403fe07376c3)), closes [#22086](https://github.com/vuetifyjs/vuetify/issues/22086)
* **VListItem:** respect link & canvas colors in forced-colors mode ([#22032](https://github.com/vuetifyjs/vuetify/issues/22032)) ([84a7bff](https://github.com/vuetifyjs/vuetify/commit/84a7bffc9d721c2bc2deca6b93c6d08e4e77f534))
* **VMenu:** add aria-owns to activator ([#22240](https://github.com/vuetifyjs/vuetify/issues/22240)) ([975a18c](https://github.com/vuetifyjs/vuetify/commit/975a18cc2dd4ef197a6ab6ca49f81788f9b4f638)), closes [#22226](https://github.com/vuetifyjs/vuetify/issues/22226)
* **VMenu:** avoid scrolling to the off-screen menu ([#22044](https://github.com/vuetifyjs/vuetify/issues/22044)) ([d1dafff](https://github.com/vuetifyjs/vuetify/commit/d1dafffd729590f1c873da20fb6b09f6d53c38e4)), closes [#21775](https://github.com/vuetifyjs/vuetify/issues/21775) [#20569](https://github.com/vuetifyjs/vuetify/issues/20569) [#21015](https://github.com/vuetifyjs/vuetify/issues/21015) [#16819](https://github.com/vuetifyjs/vuetify/issues/16819)
* **VMenu:** ignore focus on root element ([fe1214f](https://github.com/vuetifyjs/vuetify/commit/fe1214fb1cbfe021b7db50e88ea091b4ef39e707)), closes [#22263](https://github.com/vuetifyjs/vuetify/issues/22263)
* **VMenu:** keep open with keyboard and open-delay="0" ([#22242](https://github.com/vuetifyjs/vuetify/issues/22242)) ([8e810e5](https://github.com/vuetifyjs/vuetify/commit/8e810e54b12c58a525bf2efb149f0f03a3769448)), closes [#21591](https://github.com/vuetifyjs/vuetify/issues/21591)
* **VNumberInput:** align stacked controls in underlined variant ([#22185](https://github.com/vuetifyjs/vuetify/issues/22185)) ([e10ffea](https://github.com/vuetifyjs/vuetify/commit/e10ffea80e6cedbdfbf14912f7587aaabd221779)), closes [#22184](https://github.com/vuetifyjs/vuetify/issues/22184)
* **VNumberInput:** allow typing negative decimal values with a comma separator ([#22199](https://github.com/vuetifyjs/vuetify/issues/22199)) ([f0fec8f](https://github.com/vuetifyjs/vuetify/commit/f0fec8fb39ec5bbc82bd02c70a17bdc1d1746995)), closes [#22183](https://github.com/vuetifyjs/vuetify/issues/22183)
* **VNumberInput:** emit pasted value without waiting for blur ([6034a73](https://github.com/vuetifyjs/vuetify/commit/6034a73a09c649140af726dbd7dbc13a7871a245)), closes [#22182](https://github.com/vuetifyjs/vuetify/issues/22182)
* **VOverlay:** `stick-to-target` content visible until target overflows ([#22233](https://github.com/vuetifyjs/vuetify/issues/22233)) ([0e1dff0](https://github.com/vuetifyjs/vuetify/commit/0e1dff0be1cbcc05985bd6f50c58e70ccc0ceea8)), closes [#22055](https://github.com/vuetifyjs/vuetify/issues/22055)
* **VProgressCircular:** hide overflow to avoid height changes ([#22245](https://github.com/vuetifyjs/vuetify/issues/22245)) ([d5cfb7b](https://github.com/vuetifyjs/vuetify/commit/d5cfb7bf14cbafe57a4043a6427d21ab21d84a45)), closes [#22244](https://github.com/vuetifyjs/vuetify/issues/22244)
* **VRangeSlider:** inherit readonly/disabled from form ([d071e24](https://github.com/vuetifyjs/vuetify/commit/d071e241c82fca7c65405174623014989f2d3985)), closes [#22054](https://github.com/vuetifyjs/vuetify/issues/22054)
* **VSelect:** item checkbox gets out of sync ([#22181](https://github.com/vuetifyjs/vuetify/issues/22181)) ([f257802](https://github.com/vuetifyjs/vuetify/commit/f2578024e948ff24faea7275b3d0d808e0afa02e))
* **VSkeletonLoader:** accept scoped styles ([#22201](https://github.com/vuetifyjs/vuetify/issues/22201)) ([c20031b](https://github.com/vuetifyjs/vuetify/commit/c20031be5347d17286acadf29d12d5edddc6bcb3)), closes [#22198](https://github.com/vuetifyjs/vuetify/issues/22198)
* **VSkeletonLoader:** render background in forced-colors mode ([#22216](https://github.com/vuetifyjs/vuetify/issues/22216)) ([26e0b6d](https://github.com/vuetifyjs/vuetify/commit/26e0b6d623bcc154cc14db4958c2c3204c0dff0a))
* **VSlider:** prevent thumb movement when disabled mid-interaction ([#22257](https://github.com/vuetifyjs/vuetify/issues/22257)) ([4506459](https://github.com/vuetifyjs/vuetify/commit/45064595260f6644e09fdfc9712547fc321e83e6)), closes [#22248](https://github.com/vuetifyjs/vuetify/issues/22248)
* **VTabs:** correct link state in Nuxt app ([7068ce1](https://github.com/vuetifyjs/vuetify/commit/7068ce141ee11dc70d237960ea78480cf97922c6)), closes [#22188](https://github.com/vuetifyjs/vuetify/issues/22188)
* **VTextarea:** mask should not clip scrollbar ([#22001](https://github.com/vuetifyjs/vuetify/issues/22001)) ([e8e7234](https://github.com/vuetifyjs/vuetify/commit/e8e72349a985d1ede8a4c8500114e237f1cd742d)), closes [#21283](https://github.com/vuetifyjs/vuetify/issues/21283)
* **VTextField:** keep counter in one line ([78e053f](https://github.com/vuetifyjs/vuetify/commit/78e053f58375b07c1a636e70fdb733dda447a99e)), closes [#19620](https://github.com/vuetifyjs/vuetify/issues/19620)
* **VTextField, VCombobox:** avoid duplicated emits on clear ([#22219](https://github.com/vuetifyjs/vuetify/issues/22219)) ([3e92de3](https://github.com/vuetifyjs/vuetify/commit/3e92de31a3d1df808710606c687f114e81df08cc)), closes [#21417](https://github.com/vuetifyjs/vuetify/issues/21417)
* **VTreeview:** pass `indent-lines` to `header` slot ([8e964c7](https://github.com/vuetifyjs/vuetify/commit/8e964c72d00600f29202bee782eb11bb571627ad))
* **VVirtualScroll:** scroll to last element ([#22166](https://github.com/vuetifyjs/vuetify/issues/22166)) ([1cc009f](https://github.com/vuetifyjs/vuetify/commit/1cc009f3f1387c2530d044c9bd3b6a12fdc18f1d)), closes [#20931](https://github.com/vuetifyjs/vuetify/issues/20931)
* **VWindow:** fix exception due to missing scrollable parent in unit test ([7b122b7](https://github.com/vuetifyjs/vuetify/commit/7b122b735428e736808177cb84a39a5bb3f9b7f1))
* **VWindow:** Maintain scroll position on window change ([#22191](https://github.com/vuetifyjs/vuetify/issues/22191)) ([fb7d36b](https://github.com/vuetifyjs/vuetify/commit/fb7d36bf66bfc67adb607c7ac0f222c9181251b8))

### :arrows_counterclockwise: Reverts

* Revert "fix(VOverlay): ignore mouseenter events from touch devices" ([d448e0e](https://github.com/vuetifyjs/vuetify/commit/d448e0eb4f958967cea632e6af2140a8847f860e)), closes [#17640](https://github.com/vuetifyjs/vuetify/issues/17640) [#22237](https://github.com/vuetifyjs/vuetify/issues/22237)

### :test_tube: Labs

* **VCalendar:** avoid selecting day button ([da4f99a](https://github.com/vuetifyjs/vuetify/commit/da4f99a5f35af7e664d7a5e0d100aeb43b07ddac)), closes [#22141](https://github.com/vuetifyjs/vuetify/issues/22141)
* **VCalendar:** import directives ([1c7896d](https://github.com/vuetifyjs/vuetify/commit/1c7896dc96abbf45f58d819663fa87ec00ae7127)), closes [#22122](https://github.com/vuetifyjs/vuetify/issues/22122)
* **VCalendar:** use scrollAreaRef from base ([#22253](https://github.com/vuetifyjs/vuetify/issues/22253)) ([16dc1d2](https://github.com/vuetifyjs/vuetify/commit/16dc1d290f5759bb1d5a6f495aae4641fc60d125)), closes [#22251](https://github.com/vuetifyjs/vuetify/issues/22251)
* **VColorInput:** avoid VField, VInput props leaking to VPicker ([14b74d1](https://github.com/vuetifyjs/vuetify/commit/14b74d15557371baafefa8479a9ad77b00ada6af))
* **VDateInput:** apply min/max to text input ([#22196](https://github.com/vuetifyjs/vuetify/issues/22196)) ([201e6d2](https://github.com/vuetifyjs/vuetify/commit/201e6d27f884ac6077bc8c2cef14eb12a1a28c45)), closes [#22179](https://github.com/vuetifyjs/vuetify/issues/22179)
* **VDateInput:** avoid `color` prop leaking to VPicker ([6bddea1](https://github.com/vuetifyjs/vuetify/commit/6bddea14a7e22e6eea804a6cf8f0fb0dd807b793))
* **VDateInput:** avoid VField, VInput props leaking to VPicker ([253e75e](https://github.com/vuetifyjs/vuetify/commit/253e75e4894fa40e069b4032dfe3bab22aa05d48))
* **VIconBtn:** render interaction highlights in forced-colors mode ([#22211](https://github.com/vuetifyjs/vuetify/issues/22211)) ([37bd57d](https://github.com/vuetifyjs/vuetify/commit/37bd57d7400d716830ddbe0ced85754e2cd334f5))
* **VMaskInput:** handle null value when clearing input ([#22175](https://github.com/vuetifyjs/vuetify/issues/22175)) ([46e3a84](https://github.com/vuetifyjs/vuetify/commit/46e3a84b582aa0c8f7e8aba4e00be3b1a6f7bddd)), closes [#22174](https://github.com/vuetifyjs/vuetify/issues/22174)
* **VMaskInput:** inherit class and style ([#22247](https://github.com/vuetifyjs/vuetify/issues/22247)) ([01f5e6f](https://github.com/vuetifyjs/vuetify/commit/01f5e6f29d83d3e4c477eb1cfe92262b8186150e))
* **VPie:** consistent avatar size in tooltip ([6cefd46](https://github.com/vuetifyjs/vuetify/commit/6cefd4663ba1c6dfee02eea3a35ae76e0793b44e))

</details>

## What's Next{ .mt-4 }

November brings us closer to the Vuetify v3.11 release as we continue stabilizing the framework and polishing components. Work continues on v0 composables with expanded documentation and integration testing, while in-development features like VCommandPalette and the VTabs inset variant move toward completion.

The Vuetify MCP server will continue evolving based on community feedback, and we're exploring additional AI-powered developer tools to streamline the Vuetify development experience. As always, your bug reports, feature requests, and community contributions drive our roadmap forward.

Thank you for being part of the Vuetify community. See you in November!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/vuetify), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
