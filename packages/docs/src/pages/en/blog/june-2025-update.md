---
layout: blog
meta:
  title: June 2025 Update
  description: June delivered substantial progress on VHotkey component, VCommandPalette development, component stability improvements, and developer experience enhancements across the Vuetify ecosystem.
  keywords: Vuetify June 2025, VHotkey, VCommandPalette, Vuetify 0, component stability, developer experience
---

<script setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/logos/v0-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# June 2025 Update

This month is packed full of exciting updates and progress across the Vuetify ecosystem.

---

🖊️ John Leider • 📅 July 7th, 2025

<PromotedEntry />

---

## Powering Forward

June delivered substantial progress on developer experience enhancements, component stability improvements, and platform ecosystem expansion. Our team focused on shipping major new composables, refining core components, and strengthening the development workflow with significant updates to hotkey management, command palette functionality, and comprehensive bug fixes across the framework.

We also hosted an engaging Q&A session with [me](https://github.com/johnleider/), where our community shared their questions and valuable insights. We were thrilled to connect directly with our users and gather feedback that will help shape the future direction of the framework. Don't worry if you missed this session, we have exciting webinars planned for the coming months as well!

::: success

Cool example of the month: [VBites](https://play.vuetifyjs.com/playgrounds/7Ksitg) by [Jacek](https://github.com/J-Sek)

:::

---

## Table of Contents

* [Releases](#releases)
* [Spotlight: Vuetify Studio](#spotlight-vuetify-studio)
* [Framework](#framework)
  * [VHotkey Component and useHotkey Composable](#vhotkey-component-and-usehotkey-composable)
  * [New Component Development](#new-component-development)
* [Ecosystem Updates](#ecosystem-updates)
  * [Vuetify Documentation](#vuetify-documentation)
  * [Vuetify One](#vuetify-one)
  * [Vuetify Bin](#vuetify-bin)
* [Q&A and Upcoming Webinars](#qa-and-upcoming-webinars)
* [Sneak Peek: Vuetify 0](#sneak-peek-vuetify-0)
* [June 2025 Changelog](#june-2025-changelog)
* [What's Next](#whats-next)

---

## Releases

June continued our steady release cadence with several updates addressing bugs and introducing enhancements. These releases focused on component stability and developer experience improvements. View the complete list of changes in the [Full Changelog](#june-2025-changelog).

![Hero image for June release notes](https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/june-2025-hero-asdfasdf.png "June release notes hero image"){ height=200 }

**Details:**

* [v3.8.8](https://vuetifyjs.com/en/getting-started/release-notes/?version=3.8.8)
* [v3.8.9](https://vuetifyjs.com/en/getting-started/release-notes/?version=3.8.9)
* [v3.8.10](https://vuetifyjs.com/en/getting-started/release-notes/?version=3.8.10)
* [v3.8.11](https://vuetifyjs.com/en/getting-started/release-notes/?version=3.8.11)
* [v3.9.0-beta.0](https://vuetifyjs.com/en/getting-started/release-notes/?version=3.9.0-beta.0)
* [v3.9.0-beta.1](https://vuetifyjs.com/en/getting-started/release-notes/?version=3.9.0-beta.1)

---

## Spotlight: Vuetify Studio

**Did you know?** [Vuetify Studio](https://studio.vuetifyjs.com/) is our comprehensive development platform that often goes unnoticed by the broader community. Studio provides a complete ecosystem for Vuetify development, including:

* **Interactive Component Playground**: Test and experiment with components in real-time
* **Code Generation Tools**: Quickly prototype layouts and component configurations
* **Collaborative Development**: Share and iterate on designs with team members
* **Integration Testing**: Validate component behavior across different scenarios

<video width="100%" height="auto" autoplay loop controls>
  <source src="https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/vstudio-june-2025.mp4" type="video/mp4"></source>
</video>

We're continuously expanding Studio's capabilities to support modern development workflows, and we encourage the community to explore how Studio can accelerate your Vuetify development process.

**Details:**

* [Vuetify Studio](https://studio.vuetifyjs.com/)

## Framework

There are multiple new components in development with some of that functionality reaching Labs this month. Below are some of the highlights.

### VHotkey Component and useHotkey Composable

This month marked a significant milestone with the completion and pre-release of our [VHotkey component](https://dev.vuetifyjs.com/en/components/hotkeys/) and `useHotkey` composable system. After extensive development and iteration, these tools are now available in Labs for testing and feedback as we work toward their stable release.

**VHotkey Component Features:**

* **Inline Mode**: Use the component inline with text and it automatically inherits font size and baseline styling
* **New Variants**: Introduction of the Combined Variant that displays hotkeys in a Chip with Label format
* **Consolidated Parser**: VHotkey and useHotkey now share the same parsing logic and key alias mapping for consistent behavior
* **Platform Awareness**: New `platform` prop allows forcing the component to display Mac vs PC hotkey conventions
* **Enhanced Customization**: Added `prefix` and `postfix` props for better integration flexibility

![Hero image for VHotkey component](https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/hotkeys.png "VHotkey component hero image"){ height=220 }

**useHotkey Composable Features:**

* **Dynamic Options**: Options accept `maybeRefs`, enabling dynamic hotkey configuration changes
* **Shared Logic**: Unified codebase with VHotkey component ensures consistency
* **Comprehensive Documentation**: Detailed examples and usage patterns available

This functionality serves as a critical building block for the upcoming VCommandPalette component, providing developers with robust keyboard shortcut management that works seamlessly across different platforms and use cases. While currently in Labs, we encourage the community to test these components and provide feedback as we work toward their stable release.

**Details:**

* [VHotkey Component Documentation](https://dev.vuetifyjs.com/en/components/hotkeys/)
* [useHotkey Composable Documentation](https://dev.vuetifyjs.com/en/features/hotkey/)

### New Component Development

We have several new components in development that we are confident will enhance the Vuetify ecosystem and provide additional functionality for developers.

**VMaskInput**: After vanishing in v2, masking is back in the library with enhanced input capabilities and new features.

![Hero gif for VMaskInput component](https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/vmaskinput.gif "VMaskInput component hero gif"){ height=280 }

**VEditor**: Early development phase for a new editor component, expanding Vuetify's content creation capabilities.

![Hero image for VEditor component](https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/veditor.png "VEditor component hero image"){ height=220 }

**VVideo**: Documentation improvements, Sass variable extraction, and volume component refinement.

<video width="100%" height="auto" autoplay loop controls>
  <source src="https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/vvideo.mp4" type="video/mp4"></source>
</video>

**VCommandPalette**: Ongoing development for a powerful command palette component, designed to enhance user interaction and streamline application workflows.{ height=150 }

![Hero image for VCommandPalette component](https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/vcommandpalette.png "VCommandPalette component hero image"){ height=370 }

**Details:**

* [VMaskInput P.R.](https://github.com/vuetifyjs/vuetify/pull/21519)
* [VEditor P.R.](https://dev.vuetifyjs.com/en/components/editor/)
* [VVideo P.R.](https://github.com/vuetifyjs/vuetify/pull/21460)

## Ecosystem Updates

Multiple advancements were made across the Vuetify ecosystem to improve developer experience and platform capabilities.

### Vuetify Documentation

[Vuetify One subscribers](https://vuetifyjs.com/en/?one=subscribe) can now copy documentation pages as Markdown. This feature allows you to easily extract and reuse documentation content in your projects, enhancing collaboration and knowledge sharing within teams.

![Vuetify documentation copy page as markdown](https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/copy-page-as-markdown.png "Vuetify documentation copy page as markdown"){ height=220 }

All users can now save favorite search results in the Vuetify documentation. Just press `ctrl+k` or `cmd+k` to open the search bar, type your query, and click the star icon next to the search result you want to save. This feature allows you to quickly access frequently used documentation pages, improving your workflow and efficiency.

![Vuetify documentation search favorites](https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/docs-favorites.png "Vuetify documentation search favorites"){ height=300 }

**Details:**

* [Copy as Markdown Commit](https://github.com/vuetifyjs/vuetify/commit/dfd8eea1ebd28e6fde702c19b15a33af3620daa4)
* [Save Search Favorites Commit](https://github.com/vuetifyjs/vuetify/commit/14d5e63f2760db84257f324cfa298a8ce9905903)

### Vuetify One

Updated default interface to include links to various Vuetify ecosystem sites, making it easier for users to navigate and access resources.

![Vuetify One Platform interface](https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/one-quicklinks.png "Vuetify One Platform interface"){ height=300 }

### Vuetify Bin

Bins now support **locking**. This new functionality prevents unwanted changes to shared code examples, ensuring that your collaborative work remains intact and consistent.

![Vuetify Bin locking functionality](https://vuetifyjs.b-cdn.net/docs/images/blog/june-2025-update/lock-bin.png "Vuetify Bin locking functionality"){ height=250 }

This feature will soon propagate to the [Vuetify Playground](https://play.vuetifyjs.com/) as well as [Vuetify Studio](https://studio.vuetifyjs.com/).

It's also now possible to access Bins saved while having an active Vuetify One subscription.

**Details:**

* [Vuetify Bin](https://bin.vuetifyjs.com/)

## Q&A and Upcoming Webinars

June featured successful community Q&A sessions that provided direct interaction between our core team and the developer community. The feedback and engagement we received were invaluable in shaping our development priorities and understanding real-world usage patterns.

**Missed the Q&A Sessions?** Don't worry! We're planning a comprehensive webinar series launching in July. If you have valuable feedback, suggestions, or questions you'd like to see addressed, keep an eye out for our upcoming webinar announcements. These sessions will provide deep dives into Vuetify best practices, new feature demonstrations, and direct access to core team expertise.

We encourage community members to [share their input](https://community.vuetifyjs.com/) and help us make these educational sessions as valuable as possible for everyone.

## Sneak Peek: Vuetify 0

<AppFigure :src="zerologo" alt="Vuetify 0 logo" width="300" height="auto" class="mx-auto pa-4" title="Vuetify 0 Logo" />

We're excited to share an early glimpse into **Vuetify 0** (internally known as v0), our upcoming entry into the unstyled component and composable ecosystem. Building on our experience with Vuetify's component library, we're developing a new approach that delivers the same functionality and developer experience without built-in styling.

**What This Means**: While unstyled components are certainly part of this initiative, Vuetify 0 represents something much more significant - we're publicly releasing our internal composables and framework building tooling. This includes the foundational utilities, patterns, and architectural components that power Vuetify itself, giving developers access to the same building blocks we use internally to create robust UI frameworks:

```ts
import { useGroup } from '@vuetify/0'
import type { GroupItem, GroupTicket, GroupContext, GroupOptions } from '@vuetify/0'

interface StepItem extends GroupItem {
  title: string
  description?: string
}

interface StepTicket extends GroupTicket {
  step: number
}

interface StepOptions extends Omit<GroupOptions, 'multiple'> {}

interface StepContext extends GroupContext {
  first: () => void
  last: () => void
  next: () => void
  prev: () => void
  step: (count: number) => void
}

const options: StepOptions = {
  itemKey: 'step',
  itemValue: 'value',
}

export function useStep<T extends StepContext> (
  namespace: string,
  options?: StepOptions,
) {
  const [
    useGroupContext,
    provideGroupContext,
    group,
  ] = useGroup<T>(namespace, options)

  function first () { ... }
  function last () { ... }
  function next () { ... }
  function prev () { ... }
  function step (count: number) { ... }

  const context = {
    ...group,
    first,
    last,
    next
    prev,
    step,
  } as T

  return [
    useGroupContext,
    provideGroupContext,
    context,
  ]
}
```

This project is in early development as we explore the best path forward for providing developers with powerful, accessible, and feature-complete building blocks for custom implementations. We're taking time to ensure we deliver genuine value while maintaining the quality standards you expect from Vuetify.

We'll share more details as development progresses and look forward to community feedback on this new direction.

## June 2025 Changelog

Expand this section to see the detailed changelog for June 2025, including bug fixes and enhancements.

<details open>

### :rocket: Features

* **VDatePicker:** Disable months and years if not allowed ([#21466](https://github.com/vuetifyjs/vuetify/issues/21466))

### :wrench: Bug Fixes

* **date:** Keep `createDateRange` internal ([#21531](https://github.com/vuetifyjs/vuetify/issues/21531))
* **date:** Week number for DST ([#21378](https://github.com/vuetifyjs/vuetify/issues/21378))
* **icons:** Add missing aliases in presets ([#21521](https://github.com/vuetifyjs/vuetify/issues/21521))
* **VBtn:** Allow text values for letter-spacing Sass variable ([#21602](https://github.com/vuetifyjs/vuetify/issues/21602))
* **VBtn:** Correct letter-spacing compensation for RTL ([#21574](https://github.com/vuetifyjs/vuetify/issues/21574))
* **VBtnToggle:** Buttons should be accessible despite overflow ([#21577](https://github.com/vuetifyjs/vuetify/issues/21577))
* **VCarousel:** Avoid missing progress bar ([#21586](https://github.com/vuetifyjs/vuetify/issues/21586))
* **VChip:** Disable close button of disabled chip ([#21512](https://github.com/vuetifyjs/vuetify/issues/21512))
* **VDataTable:** Add missing ARIA label on footer text ([#21508](https://github.com/vuetifyjs/vuetify/issues/21508))
* **VDataTable:** Columns are not keyboard-accessible ([#20939](https://github.com/vuetifyjs/vuetify/issues/20939))
* **VDataTableColumn:** On tab focus also show sortable icon ([#21540](https://github.com/vuetifyjs/vuetify/issues/21540))
* **VDatePicker:** Completely hide days not in weekdays array ([#21624](https://github.com/vuetifyjs/vuetify/issues/21624))
* **VDatePicker:** Fix autoscroll ([#21556](https://github.com/vuetifyjs/vuetify/issues/21556))
* **VDatePicker:** Reactive month and year ([#21563](https://github.com/vuetifyjs/vuetify/issues/21563))
* **VFileInput, VFileUpload:** Handle folders drop ([#21495](https://github.com/vuetifyjs/vuetify/issues/21495))
* **VList:** Set item value to item if primitive ([#21596](https://github.com/vuetifyjs/vuetify/issues/21596))
* **VListGroup:** Use item value in ID with return-object ([#20595](https://github.com/vuetifyjs/vuetify/issues/20595))
* **VNumberInput:** Fix endless increment ([#21610](https://github.com/vuetifyjs/vuetify/issues/21610))
* **VNumberInput:** Focus after click handler executed ([#21217](https://github.com/vuetifyjs/vuetify/issues/21217))
* **VOtpInput:** Autofocus on intersect ([#21582](https://github.com/vuetifyjs/vuetify/issues/21582))
* **VOtpInput:** Trim clipboard text and update focus on finish ([#21342](https://github.com/vuetifyjs/vuetify/issues/21342))
* **VSelect, VAutocomplete, VCombobox:** Open menu on icon click ([#21617](https://github.com/vuetifyjs/vuetify/issues/21617))
* **VSelect:** Camelize props only for custom use ([#21544](https://github.com/vuetifyjs/vuetify/issues/21544))
* **VSelect:** Convert all `itemProps` keys to camelCase ([#21518](https://github.com/vuetifyjs/vuetify/issues/21518))
* **VSelect:** Reuse compact chip label style ([#21517](https://github.com/vuetifyjs/vuetify/issues/21517))
* **VSlider:** Apply color to slider label ([#21538](https://github.com/vuetifyjs/vuetify/issues/21538))
* **VSlider:** Correct step rounding for max value ([#21434](https://github.com/vuetifyjs/vuetify/issues/21434))
* **VSpeedDial:** Avoid position glitch when reopening menu ([#21451](https://github.com/vuetifyjs/vuetify/issues/21451))
* **VTabs:** Deselect tab when route is no longer active ([#21569](https://github.com/vuetifyjs/vuetify/issues/21569))
* **VTextField:** Change order of events for checking input focus state ([#21136](https://github.com/vuetifyjs/vuetify/issues/21136))
* **VWindow, VTabs:** Don't override cursor in VWindowItem ([#21138](https://github.com/vuetifyjs/vuetify/issues/21138))

### :microscope: Code Refactoring

* **VNumberInput:** Replace touch-action with pointercancel ([#21436](https://github.com/vuetifyjs/vuetify/issues/21436))

### :test_tube: Labs

* **VDateInput:** Use common date range parser ([#21450](https://github.com/vuetifyjs/vuetify/issues/21450))
* **VFileUpload:** File name not passed correctly ([#21541](https://github.com/vuetifyjs/vuetify/issues/21541))
* **VTimePicker:** Value not changing on wheel ([#21549](https://github.com/vuetifyjs/vuetify/issues/21549))
* **VTreeview:** Avoid inaccessible items when overflow ([#21443](https://github.com/vuetifyjs/vuetify/issues/21443))
* **VTreeview:** Stop click bubbling up on expand icon ([#21083](https://github.com/vuetifyjs/vuetify/issues/21083))

</details>

---

## What's Next

July will focus on finalizing the `VCommandPalette` Labs release, expanding `VMaskInput` and `VEditor` component development, and continuing our documentation excellence initiative. We're also actively working on enhanced MCP integration features that allow you to create and access existing Vuetify Bin, Playground, Studio files; in addition to new Studio platform capabilities.

The team remains committed to delivering stable, performant components while expanding Vuetify's ecosystem to support modern development patterns. Our focus on developer experience, community feedback integration, and systematic improvement processes continues to drive meaningful progress each month.

We appreciate the community's continued engagement, feedback, and contributions that make these improvements possible. Keep building amazing applications with Vuetify, and don't forget to explore [Vuetify Studio](https://studio.vuetifyjs.com/) for an enhanced development experience.

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://discord.gg/eXubxyJ), and upcoming webinar series announcements.*
