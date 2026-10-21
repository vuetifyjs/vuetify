---
emphasized: true
meta:
  nav: Checkbox groups
  title: Checkbox group component
  description: The checkbox group component manages multiple checkboxes with a shared model, label, and validation.
  keywords: checkbox group, checkboxes, validation, multiple selection
related:
  - /components/checkboxes/
  - /components/radio-buttons/
  - /components/forms/
features:
  github: /labs/VCheckboxGroup/
  label: 'C: VCheckboxGroup'
  report: true
---

# Checkbox groups

The `v-checkbox-group` component manages the selected values of its child checkboxes and displays a shared label and validation messages.

<PageFeatures />

::: warning

This feature requires [v4.4.0](/getting-started/release-notes/?version=v4.4.0)

:::

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify'
import { VCheckboxGroup } from 'vuetify/labs/VCheckboxGroup'

export default createVuetify({
  components: {
    VCheckboxGroup,
  },
})
```

## Usage

Bind an array to the group's **v-model** and give each child `v-checkbox` a **value**. Checking or unchecking an option updates that array.

<ExamplesUsage name="v-checkbox-group" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-checkbox-group](/api/v-checkbox-group/) | Manages the selection and validation of the group |
| [v-checkbox](/api/v-checkbox/) | An option in the group |

<ApiInline hide-links />

## Guide

Set **color**, **density**, **disabled**, or **readonly** on the group to apply them to its checkboxes. Use **label** to describe the set of options; each checkbox keeps its own label.

### Inline

Use **inline** to display the checkboxes in a row.

<ExamplesExample file="v-checkbox-group/prop-inline" />

### Validation

The group's **rules** receive the selected values array. Use group rules to validate the selection count. Validation messages appear below the group, and the component can be used inside [v-form](/components/forms/).

This example requires 1 to 3 of the 6 topics to be selected. Selecting a fourth topic updates the model and displays a validation error.

<ExamplesExample file="v-checkbox-group/prop-rules" />
