---
layout: blog
meta:
  title: Announcing Vuetify v3.9
  description: Vuetify v3.9 "Zealot" is here! Discover the latest features, improvements, and bug fixes in this minor release, including component promotions and revolutionary theme system enhancements.
  keywords: Vuetify v3.9, Zealot, VTreeview, VTimePicker, system theme, useHotkey, VDataTable, VHotkey, VMaskInput
---

# Announcing Vuetify v3.9

---

🖊️ John Leider • 📅 July 8th, 2025

<PromotedEntry />

---

## Introduction

Today we are excited to announce the release of Vuetify v3.9 "Zealot"!

This minor release contains no breaking changes and is packed with new features, improvements, and bug fixes. This blog post will highlight some of the most notable changes—for a full list of changes and new features, please see [the full changelog](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.0).

---

- [Component promotions](#component-promotions)
  - [VTreeview](#vtreeview)
  - [VTimePicker](#vtimepicker)
- [Theme system enhancements](#theme-system-enhancements)
  - [System theme](#system-theme)
  - [Theme control functions](#theme-control-functions)
  - [Unimportant class option](#unimportant-class-option)
- [Developer experience improvements](#developer-experience-improvements)
  - [useHotkey composable](#usehotkey-composable)
  - [Enhanced component APIs](#enhanced-component-apis)
- [Other updates](#other-updates)
  - [VDataTable fixed columns](#vdatatable-fixed-columns)
  - [VSelect enhancements](#vselect-enhancements)
  - [Form input improvements](#form-input-improvements)
- [Labs](#labs)
  - [VHotkey](#vhotkey)
  - [VMaskInput](#vmaskinput)
  - [VCalendar improvements](#vcalendar-improvements)

## Component promotions

The following components have been promoted to the core framework from labs and offer a clean experience and are easy to use.

### VTreeview

The [v-treeview](https://vuetifyjs.com/components/treeview/) component has moved from Labs to the Core framework in v3.9. It's designed for displaying hierarchical data in a tree structure and supports all of the standard Vuetify component variant props.

![VTreeview component](/api/v1/files/blog/v3.9/v-treeview-component.png){ height=400 }

The component now exposes **depth**, **path**, and **index** in slots, giving you more control over item rendering. It also supports the new **item-type** prop for better TypeScript integration and includes an **indent-lines** prop for visual connection lines between parent and child nodes.

**Details:**
- [Documentation](https://vuetifyjs.com/components/treeview/)
- [PR#19833](https://github.com/vuetifyjs/vuetify/pull/19833)

### VTimePicker

The [v-time-picker](https://vuetifyjs.com/components/time-pickers/) component has moved from Labs to the Core framework in v3.9. This component provides an intuitive interface for time selection that works seamlessly across desktop and mobile devices.

![VTimePicker component](/api/v1/files/blog/v3.9/v-time-picker-component.png){ height=300 }

The component has been streamlined by removing the **ampmInTitle** prop and includes auto-width functionality for better responsive design.

**Details:**
- [Documentation](https://vuetifyjs.com/components/time-pickers/)
- [PR#21595](https://github.com/vuetifyjs/vuetify/pull/21595)

## Theme system enhancements

v3.9 introduces revolutionary improvements to the theme system, including automatic system preference detection and enhanced programmatic control.

### System theme

The new **system** theme automatically respects your users' operating system preferences for light or dark mode. This eliminates the need for manual theme switching logic in most applications.

![System theme example](/api/v1/files/blog/v3.9/system-theme-example.png){ height=300 }

When using the system theme, Vuetify automatically detects changes to the user's system preferences and updates the application theme accordingly.

**Details:** [PR#21244](https://github.com/vuetifyjs/vuetify/pull/21244)

### Theme control functions

New **change**, **toggle**, and **cycle** functions provide powerful programmatic theme control. These functions make it easy to implement custom theme switching interfaces and respond to user interactions.

![Theme control functions](/api/v1/files/blog/v3.9/theme-control-functions.png){ height=300 }

**Details:** [PR#21224](https://github.com/vuetifyjs/vuetify/pull/21224)

### Unimportant class option

The new **unimportant** option generates theme classes without `!important` declarations, making it easier to override styles with custom CSS or integrate with other frameworks.

![Unimportant class option](/api/v1/files/blog/v3.9/unimportant-class-option.png){ height=300 }

**Details:** [Commit 3190331](https://github.com/vuetifyjs/vuetify/commit/3190331)

## Developer experience improvements

v3.9 places significant emphasis on improving the developer experience with new composables and enhanced APIs.

### useHotkey composable

The new **useHotkey** composable provides a declarative approach to keyboard event handling with built-in accessibility features and cross-platform compatibility.

```ts
import { useHotkey } from 'vuetify'

export default {
  setup() {
    // Simple hotkey binding
    useHotkey('ctrl+s', () => {
      console.log('Save triggered!')
      // Your save logic here
    })

    // Multiple key combinations
    useHotkey(['ctrl+k', 'cmd+k'], () => {
      // Open command palette
      openCommandPalette()
    })

    // Conditional hotkeys with options
    useHotkey('escape', closeModal, {
      enabled: () => modalOpen.value,
      preventDefault: true
    })

    return {}
  }
}
```

The composable automatically handles event cleanup, cross-platform key mapping, and conflict prevention.

**Details:** [PR#21598](https://github.com/vuetifyjs/vuetify/pull/21598)

### Enhanced component APIs

Multiple components receive API improvements including **VDataTable** fixed column positioning, **VSelect** item-type support, and enhanced **VDatePicker** slot exposure.

![Enhanced component APIs](/api/v1/files/blog/v3.9/enhanced-component-apis.png){ height=300 }

These improvements focus on consistency, flexibility, and developer ergonomics across the component library.

## Other updates

Some other updates in v3.9 involve quality of life improvements to existing components and new functionality for common use cases.

### VSelect enhancements

VSelect, VAutocomplete, and VCombobox now support **divider** and **subheader** in items, along with the new **item-type** prop for improved TypeScript integration.

![VSelect enhancements](/api/v1/files/blog/v3.9/v-select-enhancements.png){ height=300 }

**Details:** [PR#21348](https://github.com/vuetifyjs/vuetify/pull/21348)

### Form input improvements

Multiple form components receive enhancements including **VNumberInput** custom decimal separators, **VBadge** width and height props, and **VTextarea** update:rows event.

![Form input improvements](/api/v1/files/blog/v3.9/form-input-improvements.png){ height=300 }

**Details:** [PR#21489](https://github.com/vuetifyjs/vuetify/pull/21489)

## Labs

The latest version of Vuetify also includes new experimental components in Labs, including VHotkey and VMaskInput. These components are in active development and testing.

### VHotkey

The [v-hotkey](https://vuetifyjs.com/components/hotkeys/) component provides visual representations of keyboard shortcuts throughout your application, enhancing user discoverability and creating more intuitive interfaces.

![VHotkey component](/api/v1/files/blog/v3.9/v-hotkey-component.png){ height=300 }

The component automatically renders platform-appropriate keys and integrates seamlessly with the useHotkey composable.

This component is getting close to being ready for production, keep an eye out for it in the next release!

### VMaskInput

The VMaskInput component brings sophisticated input masking capabilities to Vuetify, enabling precise control over user input formatting for phone numbers, credit cards, dates, and custom formats.

```html
<template>
  <v-mask-input
    v-model="phoneNumber"
    mask="(###) ###-####"
    label="Phone Number"
    placeholder="(555) 123-4567"
  />
</template>

<script setup>
  import { VMaskInput } from 'vuetify/labs/VMaskInput'

  const phoneNumber = ref('')
</script>
```

The component supports flexible mask definitions, real-time validation, and customizable behavior for various input scenarios.

### VCalendar improvements

The [v-calendar](https://vuetifyjs.com/components/calendars/) component received improvements to day element handling and adapter integration, including better performance and reactivity through enhanced key management.

![VCalendar improvements](/api/v1/files/blog/v3.9/v-calendar-improvements.png){ height=300 }

We're also experimenting with improved event handling and slot availability for complex calendar implementations.

```ts
import { VCalendar } from 'vuetify/labs/VCalendar'

export default createVuetify({
  components: {
    VCalendar
  }
})
```

This is still in testing so please give us your feedback by dropping a line on our [Discord](https://community.vuetifyjs.com/)

**Details:** [PR#21689](https://github.com/vuetifyjs/vuetify/pull/21689)

---

For a complete list of all the changes and features in v3.9, please see the [full changelog](https://vuetifyjs.com/getting-started/release-notes/?version=v3.9.0).
