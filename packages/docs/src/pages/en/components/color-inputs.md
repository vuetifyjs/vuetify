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
  github: /components/VColorInput/
  label: 'C: VColorInput'
  report: true
---

# Color inputs

The `v-color-input` component combines a text field with a color picker..

<PageFeatures />

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

#### Pip icon

You can move the pip icon within the input or entirely by utilizing the **prepend-icon** and **prepend-inner-icon** properties.

<ExamplesExample file="v-color-input/prop-prepend-icon" />

#### Color Pip

The `color-pip` is a boolean that determines whether the pip icon color matches the selected color.

<ExamplesExample file="v-color-input/prop-color-pip" />
