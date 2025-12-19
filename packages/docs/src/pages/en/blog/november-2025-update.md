---
layout: blog
meta:
  title: November 2025 Update
  description: November delivered Vuetify v3.11.0 with VCalendar and VHotkey promoted from labs, new VTimePicker input variant, VDatePicker MD3 improvements, and significant CLI progress.
  keywords: Vuetify November 2025, v3.11.0 Harbinger, VCalendar, VHotkey, VTimePicker, VDatePicker MD3
---

<script setup>
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
</script>

# November 2025 Update

Welcome to the November 2025 Vuetify update! This month marks a major milestone with the release of **v3.11.0 (Harbinger)**, promoting VCalendar and VHotkey from labs to core, introducing the new VTimePicker input variant, and aligning VDatePicker with Material Design 3 specifications.

![Hero image for November update](https://cdn.vuetifyjs.com/docs/images/blog/november-2025-update/november-hero.png "November hero image")

🖊️ John Leider • 📅 December 10th, 2025

<PromotedEntry />

---

## The Harbinger Arrives

November was a landmark month for the framework. We shipped **v3.11.0 (Harbinger)** with two components graduating from labs—VCalendar and VHotkey—alongside significant enhancements to date and time pickers that bring them in line with Material Design 3. The **VTimePicker input variant** and **VDatePicker control alignment** represent months of refinement work finally landing in a stable release. Beyond the framework, we made substantial progress on the **Vuetify CLI** with 37 commits laying the groundwork for v0 tooling. J-Sek continued his incredible contribution streak, authoring 14 PRs to the main framework and adding 7+ new templates to Snips. The ecosystem is firing on all cylinders.

::: success

Cool example of the month: [v0 Expansion Panel in VPlay](https://vtfy.link/i5LxmQ) by [johnleider](https://github.com/johnleider)

:::

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Ecosystem Spotlight: Vuetify CLI](#ecosystem-spotlight-vuetify-cli)
* [Framework Updates](#framework-updates)
  * [Date & Time Picker Enhancements](#date-time-picker-enhancements)
  * [Component Refinements](#component-refinements)
  * [In Development](#in-development)
* [Vuetify MCP: Continued Evolution](#vuetify-mcp-continued-evolution)
* [Vuetify0: Progress Update](#vuetify0-progress-update)
* [November 2025 Changelog](#november-2025-changelog)
* [What's Next](#whats-next)

---

## Releases

November delivered seven releases culminating in **v3.11.0 (Harbinger)**, our most feature-rich release since v3.10. Two components graduated from labs to core, and we shipped significant enhancements across date/time pickers, tabs, and overlay components.

![November Releases Banner](https://cdn.vuetifyjs.com/docs/images/blog/november-2025-update/releases.png "November Releases Banner")

### Key Improvements

* **VCalendar** and **VHotkey** promoted from labs to core components
* New **VTimePicker input variant** for inline time entry without the dial interface
* **VDatePicker MD3 alignment** with updated control variants matching Material Design 3 specifications
* **VTabs inset prop** for subtle tab designs in dense layouts
* **VTextarea max-height prop** for controlled textarea growth
* **VSelect auto-select-first** for automatic first-item highlighting
* Theme **layers option** for advanced CSS cascade control

View the complete list of changes in the [Full Changelog](#november-2025-changelog)

**Details:**

* [v3.10.9](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.9)
* [v3.10.10](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.10)
* [v3.10.11](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.11)
* [v3.10.12](https://vuetifyjs.com/getting-started/release-notes/?version=v3.10.12)
* [v3.11.0](https://vuetifyjs.com/getting-started/release-notes/?version=v3.11.0)

---

## Ecosystem Spotlight: Vuetify CLI

November saw intensive development on the **Vuetify CLI**, with 37 commits laying the foundation for v0 tooling and developer workflows. While not yet released, this work represents a significant investment in the developer experience for Vuetify 4.0 and beyond.

The CLI will provide streamlined project scaffolding, component generation, and integration with the broader Vuetify ecosystem including v0 composables and the MCP server. More details coming as we approach the initial release.

**Also this month:**

* **Vuetify Bin** received real-time collaboration features
* **Vuetify Snips** added 7+ new templates across pricing, buttons, feedback cards, and chat components
* **Vuetify Play** and **Studio** improved user preference persistence

**Details:**

* [Vuetify Bin](https://bin.vuetifyjs.com/)
* [Vuetify Snips](https://snips.vuetifyjs.com/)
* [Vuetify Play](https://play.vuetifyjs.com/)

---

## Framework Updates

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto my-4" title="Vuetify Logo" />

November's framework work centered on date/time picker improvements and component polish. J-Sek delivered an outstanding 14 PRs, driving many of the enhancements below.

### Date & Time Picker Enhancements

The date and time picker components received significant attention this month, bringing them closer to Material Design 3 specifications and adding long-requested features.

**VTimePicker Input Variant**

A new input variant allows users to type time values directly without using the dial interface—perfect for power users and keyboard-first workflows.

![VTimePicker Input Variant](https://cdn.vuetifyjs.com/docs/images/blog/november-2025-update/vtimepicker-input.png "VTimePicker Input Variant")

**VDatePicker MD3 Controls**

Control variants have been aligned with Material Design 3, providing a more polished and consistent appearance.

<!-- replace height with auto before releasing -->
<video width="100%" height="300" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/november-2025-update/vdatepicker-md3.mp4" type="video/mp4"></source>
</video>

**Details:**

* [VTimePicker input variant PR#21601](https://github.com/vuetifyjs/vuetify/pull/21601)
* [VDatePicker MD3 alignment PR#21589](https://github.com/vuetifyjs/vuetify/pull/21589)
* [VDatePicker landscape mode PR#22305](https://github.com/vuetifyjs/vuetify/pull/22305)
* [VDateInput min/max fix PR#22295](https://github.com/vuetifyjs/vuetify/pull/22295)

### Component Refinements

**Navigation & Layout**

* **VTabs**: New `inset` prop for subtle tab designs, plus slider transition improvements
* **VOverlay**: Added `viewport-margin` prop for better positioning control
* **VNavigationDrawer**: New `retain-focus` prop to control focus behavior

<!-- replace height with auto before releasing -->
<video width="100%" height="300" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/november-2025-update/vtabs-slider.mp4" type="video/mp4"></source>
</video>

**Form Components**

* **VTextarea**: Added `max-height` prop for controlled growth
* **VSelect**: New `auto-select-first` prop and improved chip itemProps handling
* **VCombobox**: Create new items when pasting with line breaks

**Data & Display**

* **VTreeview**: Significant performance improvements for large trees
* **VList**: New `prepend-gap` and `indent` props for flexible spacing
* **VBreadcrumbs**: Props and width can now be passed to items

**Theming**

* New `layers` option for advanced CSS cascade control

**Details:**

* [VTabs inset PR#22221](https://github.com/vuetifyjs/vuetify/pull/22221)
* [VTabs slider transition PR#19556](https://github.com/vuetifyjs/vuetify/pull/19556)
* [VOverlay viewport-margin PR#22243](https://github.com/vuetifyjs/vuetify/pull/22243)
* [VNavigationDrawer retain-focus PR#22106](https://github.com/vuetifyjs/vuetify/pull/22106)
* [VTextarea max-height PR#22286](https://github.com/vuetifyjs/vuetify/pull/22286)
* [VSelect auto-select-first PR#22312](https://github.com/vuetifyjs/vuetify/pull/22312)
* [VCombobox line breaks PR#22304](https://github.com/vuetifyjs/vuetify/pull/22304)
* [VTreeview performance PR#22255](https://github.com/vuetifyjs/vuetify/pull/22255)
* [VList prepend-gap/indent PR#20616](https://github.com/vuetifyjs/vuetify/pull/20616)
* [VBreadcrumbs props PR#22213](https://github.com/vuetifyjs/vuetify/pull/22213)
* [Theme layers PR#22215](https://github.com/vuetifyjs/vuetify/pull/22215)

---

## Vuetify MCP: Continued Evolution

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto my-4" title="Vuetify MCP Logo" />

November brought four releases to the Vuetify MCP server (v0.2.0 through v0.2.3), continuing to refine the AI-powered development experience.

### What's New

**Stability Improvements**: Multiple releases focused on reliability and edge case handling for the HTTP transport introduced in October.

**Documentation Enhancements**: Improved tool descriptions and response formatting for better AI assistant integration.

### Getting Started

To use the hosted MCP server with Claude Desktop or other MCP clients:

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
* [Model Context Protocol Documentation](https://modelcontextprotocol.io/)

---

## Vuetify0: Progress Update

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto my-4" title="Vuetify0 Logo" />

November was our most active month yet for Vuetify0, with 109 commits and 5 releases (v0.0.10 through v0.0.14). The focus was on performance optimization and type safety improvements.

![Vuetify0 Type Safety](https://cdn.vuetifyjs.com/docs/images/blog/november-2025-update/v0.png "Vuetify0 Type Safety")

**Performance Optimizations**

We implemented deferred reindexing for registry unregister operations, significantly improving performance when components mount and unmount rapidly.

**Type Safety Improvements**

The `RegistryTicket.value` is now generic, providing better type inference and IntelliSense support when working with registered items.

```ts
import { useRegistry } from '@vuetify/v0'
import type { RegistryTicket } from '@vuetify/v0'

interface User {
  name: string
  email: string
}

// Value type flows through the registry
const registry = useRegistry<RegistryTicket<User>>()

const ticket = registry.register({
  id: 'user-1',
  value: { name: 'John', email: 'john@vuetifyjs.com' }
})

// ticket.value is typed as User
console.log(ticket.value.name) // ✓ TypeScript knows this is a string
```

December will focus on expanding the component library and preparing integration paths with the main Vuetify framework.

**Details:**

* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [Performance optimization PR#48](https://github.com/vuetifyjs/0/pull/48)
* [Type safety PR#53](https://github.com/vuetifyjs/0/pull/53)

---

## November 2025 Changelog

The following section provides an overview of the changes made in November 2025, including new features, bug fixes, and enhancements across the Vuetify framework.

**Key Improvements:**

* VCalendar and VHotkey promoted from labs to core
* VTimePicker input variant for direct time entry
* VDatePicker MD3 control alignment
* VTabs inset prop and slider transitions
* VTreeview performance optimizations for large trees
* Theme layers option for CSS cascade control

**Expand** this section to see the detailed changelog for November 2025:

<details>

### :rocket: Features

* **flex:** add justify-items utilities ([#22346](https://github.com/vuetifyjs/vuetify/issues/22346)) ([pgalhardo](https://github.com/pgalhardo))
* **VBreadcrumbs:** pass props and width to items ([#22213](https://github.com/vuetifyjs/vuetify/issues/22213)) ([J-Sek](https://github.com/J-Sek))
* **VCombobox:** create new items when pasting with line breaks ([#22304](https://github.com/vuetifyjs/vuetify/issues/22304)) ([ikushum](https://github.com/ikushum))
* **VDatePicker:** align control variants with MD3 ([#21589](https://github.com/vuetifyjs/vuetify/issues/21589)) ([J-Sek](https://github.com/J-Sek))
* **VList:** add `prepend-gap` and `indent` props ([#20616](https://github.com/vuetifyjs/vuetify/issues/20616)) ([yuwu9145](https://github.com/yuwu9145))
* **VNavigationDrawer, VOverlay:** add `retain-focus` prop ([#22106](https://github.com/vuetifyjs/vuetify/issues/22106)) ([J-Sek](https://github.com/J-Sek))
* **VOverlay:** add `viewport-margin` prop ([#22243](https://github.com/vuetifyjs/vuetify/issues/22243)) ([J-Sek](https://github.com/J-Sek))
* **VSelect:** add `auto-select-first` prop ([#22312](https://github.com/vuetifyjs/vuetify/issues/22312)) ([J-Sek](https://github.com/J-Sek))
* **VSelect:** apply compatible itemProps to chips ([#22339](https://github.com/vuetifyjs/vuetify/issues/22339)) ([KaelWD](https://github.com/KaelWD))
* **VStepper:** add new item-props prop ([#20651](https://github.com/vuetifyjs/vuetify/issues/20651)) ([johnleider](https://github.com/johnleider))
* **VTabs:** add `inset` prop ([#22221](https://github.com/vuetifyjs/vuetify/issues/22221)) ([J-Sek](https://github.com/J-Sek))
* **VTabs:** add new prop, slider transition ([#19556](https://github.com/vuetifyjs/vuetify/issues/19556)) ([johnleider](https://github.com/johnleider))
* **VTextarea:** add `max-height` prop ([#22286](https://github.com/vuetifyjs/vuetify/issues/22286)) ([J-Sek](https://github.com/J-Sek))
* **VTimePicker:** input variant ([#21601](https://github.com/vuetifyjs/vuetify/issues/21601)) ([J-Sek](https://github.com/J-Sek))
* **theme:** add layers option ([#22215](https://github.com/vuetifyjs/vuetify/issues/22215)) ([Niki2k1](https://github.com/Niki2k1))
* **typography:** add font-weight semibold helper class ([#20586](https://github.com/vuetifyjs/vuetify/issues/20586)) ([FraCata00](https://github.com/FraCata00))

### :wrench: Bug Fixes

* **v-tooltip:** prevent showing empty tooltip ([#22347](https://github.com/vuetifyjs/vuetify/issues/22347)) ([Haviles04](https://github.com/Haviles04))
* **VAvatar:** update background variable to use RGB format ([#22310](https://github.com/vuetifyjs/vuetify/issues/22310)) ([juanjcardona13](https://github.com/juanjcardona13))
* **VBtnToggle:** remove semicolon from Sass ([#22293](https://github.com/vuetifyjs/vuetify/issues/22293)) ([methompson](https://github.com/methompson))
* **VBtnToggle:** render selected in forced-colors mode ([#22279](https://github.com/vuetifyjs/vuetify/issues/22279)) ([06b](https://github.com/06b))
* **VCalendar:** calculate week numbers using current locale ([#22341](https://github.com/vuetifyjs/vuetify/issues/22341)) ([J-Sek](https://github.com/J-Sek))
* **VCalendar:** correct interval and event offset with custom firstTime ([#22343](https://github.com/vuetifyjs/vuetify/issues/22343)) ([KaelWD](https://github.com/KaelWD))
* **VCalendar:** day button font size and no active state ([#22336](https://github.com/vuetifyjs/vuetify/issues/22336)) ([J-Sek](https://github.com/J-Sek))
* **VDateInput:** min/max with built-in adapter ([#22295](https://github.com/vuetifyjs/vuetify/issues/22295)) ([J-Sek](https://github.com/J-Sek))
* **VDatePicker:** support landscape mode ([#22305](https://github.com/vuetifyjs/vuetify/issues/22305)) ([ikushum](https://github.com/ikushum))
* **VField:** hide progress border in forced-colors mode ([#22316](https://github.com/vuetifyjs/vuetify/issues/22316)) ([06b](https://github.com/06b))
* **VField:** remove details prop from makeVFieldProps ([#22268](https://github.com/vuetifyjs/vuetify/issues/22268)) ([pgalhardo](https://github.com/pgalhardo))
* **VHotkey:** inline alignment, sizing consistency, slash separator ([#22321](https://github.com/vuetifyjs/vuetify/issues/22321)) ([J-Sek](https://github.com/J-Sek))
* **VInfiniteScroll:** hide side element when empty ([#21749](https://github.com/vuetifyjs/vuetify/issues/21749)) ([J-Sek](https://github.com/J-Sek))
* **VList:** correct styles for spacing with `nav` prop ([#22254](https://github.com/vuetifyjs/vuetify/issues/22254)) ([J-Sek](https://github.com/J-Sek))
* **VMaskInput:** Fixes error when mask input is cleared ([#22176](https://github.com/vuetifyjs/vuetify/issues/22176)) ([ikushum](https://github.com/ikushum))
* **VRating:** correct keyboard controls ([#22314](https://github.com/vuetifyjs/vuetify/issues/22314)) ([J-Sek](https://github.com/J-Sek))
* **VSelect:** Use hidden select for native form submissions ([#22330](https://github.com/vuetifyjs/vuetify/issues/22330)) ([ikushum](https://github.com/ikushum))
* **VTab:** render selected in forced-colors mode ([#22271](https://github.com/vuetifyjs/vuetify/issues/22271)) ([06b](https://github.com/06b))
* **VTreeview:** faster interactions with large trees ([#22255](https://github.com/vuetifyjs/vuetify/issues/22255)) ([J-Sek](https://github.com/J-Sek))

### :test_tube: Labs

* **VCalendar:** promoted to core component
* **VHotkey:** promoted to core component

</details>

## What's Next{ .mt-4 }

December will see continued refinement of v3.11.x as we stabilize the new features and address community feedback. Work on VCommandPalette progresses toward an initial labs release, and we're expanding the v0 library with additional headless primitives.

The Vuetify CLI is approaching its first public release, which will streamline project setup and component generation for both Vuetify 3 and the upcoming v0-based workflows. We're also planning end-of-year webinars covering the v3.11 release highlights and a preview of what's coming in 2026.

Thank you for being part of the Vuetify community. See you in December!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/vuetify), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
