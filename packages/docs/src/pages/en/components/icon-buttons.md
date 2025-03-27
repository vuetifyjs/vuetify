---
emphasized: true
meta:
  nav: Icon buttons
  title: Icon button component
  description: The icon component is compatible with multiple common icon fonts such as Material Design Icons, Font Awesome and more.
  keywords: icons, vuetify icon component, vue icon component
related:
  - /features/icon-fonts/
  - /components/buttons/
  - /components/floating-action-buttons/
features:
  github: /components/VIconBtn/
  label: 'C: VIconBtn'
  report: true
  spec: https://m3.material.io/components/icon-buttons/
---

# Icon Buttons

The `v-icon-btn` component is a lightweight button component for iconography.

<PageFeatures />

::: warning

This feature requires [v3.8.0](/getting-started/release-notes/?version=v3.8.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VIconBtn } from 'vuetify/labs/VIconBtn'

export default createVuetify({
  components: {
    VIconBtn,
  },
})
```

## Usage

<ExamplesUsage name="v-icon-btn" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-icon-btn](/api/v-icon-btn/) | Primary Component |

<ApiInline hide-links />

## Anatomy

The recommended placement of elements inside of `v-icon-btn` is:

* Place icon or text in the center

| Element / Area | Description |
| - | - |
| 1. Container | The container element that holds the icon and text |

## Guide

The `v-icon-btn` component is a lightweight reusable button that displays icons and text in various states.

### Using with vue-router

The `v-icon-btn` component does not have built in support for vue-router. The following example demonstrates how to use the `v-icon-btn` component with the `router-link` component:

```html
<template>
  <RouterLink v-slot="{ navigate, isActive }" to="/page1" custom>
    <v-icon-btn
      :active="isActive"
      color="primary"
      icon="$vuetify"
      tag="a"
      @click="navigate"
    />
  </RouterLink>
</template>
```

### Props

The `v-icon-btn` supports various stylistic props to customize the appearance of the button and its icon.

#### Active

The **active** prop is used to control the active state of the button and should be used in conjunction with the **active-color** prop.

<ExamplesExample file="v-icon-btn/prop-active" />

#### Opacity

The **opacity** prop is used to control the opacity of the internal icon.

<ExamplesExample file="v-icon-btn/prop-opacity" />

#### Rotate

The **rotate** prop is used to control the rotation of the internal icon. This is useful when creating dropdowns or other components that need to toggle visibility.

<ExamplesExample file="v-icon-btn/prop-rotate" />

### Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-icon-btn` component.

#### Dialog

The `v-icon-btn` component is perfect for closing dialogs or other components.

<ExamplesExample file="v-icon-btn/misc-dialog" />

#### Video controls

The following example demonstrates how flexible the `v-icon-btn` component is by replicating the Google Meet video controls.

<ExamplesExample file="v-icon-btn/misc-video-controls" />

#### Markdown editor

The following example is a simple markdown editor that demonstrates how to use the `v-icon-btn` component to create a toolbar.

<ExamplesExample file="v-icon-btn/misc-markdown-editor" />

#### Datatable actions

The `v-icon-btn` component is perfect for datatable actions.

<ExamplesExample file="v-icon-btn/misc-table-actions" />
