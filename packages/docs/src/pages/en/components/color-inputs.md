---
meta:
  nav: Color inputs
  title: Color input component
  description: The color input is a specialized input that provides a clean interface for selecting colors.
  keywords: color input, color picker, color field
related:
  - /components/color-pickers/
  - /components/text-fields/
  - /components/menus/
features:
  label: 'C: VColorInput'
  report: true
  github: /labs/VColorInput/
---

# Color inputs

The `v-color-input` component combines a text field with a color picker..

<PageFeatures />

::: warning

This feature requires [v3.6.0](/getting-started/release-notes/?version=v3.6.0)

:::

## Installation

Labs components require a manual import and installation of the component.

```js { resource="src/plugins/vuetify.js" }
import { VColorInput } from 'vuetify/labs/VColorInput'

export default createVuetify({
  components: {
    VColorInput,
  },
})
```

## Usage

At its core, the `v-color-input` component is a basic container that extends [v-text-field](/components/text-fields).

<ExamplesUsage name="v-color-input" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-color-input](/api/v-color-input/) | Primary component |
| [v-color-picker](/api/v-color-picker/) | Color picker component |
| [v-text-field](/api/v-text-field/) | Text field component |

<ApiInline hide-links />

## Guide

The `v-color-input` component provides a clean interface for selecting colors.

### Props

The `v-color-input` component extends the [v-text-field](/components/text-fields/) and [v-color-picker](/components/color-pickers/) component; and supports all of their props.

#### Model

The default model value is a string, but is displayed as formatted text in the input.

<ExamplesExample file="v-color-input/prop-model" />

#### Pip icon

You can move the pip icon within the input or entirely by utilizing the **prepend-icon** and **prepend-inner-icon** properties.

<ExamplesExample file="v-color-input/prop-prepend-icon" />

<!-- ## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-color-input` component. -->
