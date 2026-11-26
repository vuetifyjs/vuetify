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
  github: /components/VColorInput/
---

# Color inputs

The `v-color-input` component combines a text field with a color picker.

<PageFeatures />

## Usage

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

### Props

The `v-color-input` component extends [v-text-field](/components/text-fields/) and [v-color-picker](/components/color-pickers/), and supports their props. Props that would conflict, such as **disabled**, go to the picker through **picker-props**.

#### Pip location

The pip is the color icon in the field. **pip-location** moves it to another side of the field, and **hide-pip** hides it entirely.

<ExamplesExample file="v-color-input/prop-pip-location" />

#### Color Pip

**color-pip** paints the pip with the selected color.

<ExamplesExample file="v-color-input/prop-color-pip" />

#### Pip variant

**pip-variant** gives the pip a background, using the same variants as [v-avatar](/components/avatars/).

<ExamplesExample file="v-color-input/prop-pip-variant" />
