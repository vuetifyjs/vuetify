---
meta:
  nav: Combobox
  title: Combobox component
  description: The combobox component provides type-ahead autocomplete functionality and allows users to provide a custom values beyond the provided list of options.
  keywords: combobox, vuetify combobox component, vue combobox component
related:
  - /components/autocompletes/
  - /components/forms/
  - /components/selects/
features:
  figma: true
  label: 'C: VCombobox'
  report: true
  github: /components/VCombobox/
  spec: https://m2.material.io/components/text-fields
---

# Combobox

The `v-combobox` component is a [v-text-field](/components/text-fields) that allows the user to select values from a provided **items** array, or to enter their own value. Created items will be returned as strings.

<PageFeatures />

## Usage

With Combobox, you can allow a user to create new values that may not be present in a provided items list.

<ExamplesUsage name="v-combobox" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-combobox](/api/v-combobox/) | Primary component |
| [v-autocomplete](/api/v-autocomplete/) | A select component that allows for advanced filtering |
| [v-select](/api/v-select/) | A replacement for the HTML <select></select> |

<ApiInline hide-links />

## Caveats

::: error
  As the Combobox allows user input, it **always** returns the full value provided to it (for example a list of Objects will always return an Object when selected). This is because there's no way to tell if a value is supposed to be user input or an object lookup [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)

  This also means that a typed string will not select an item the same way clicking on it would, you may want to set `auto-select-first="exact"` when using object items.
:::

## Examples

### Props

#### Density

You can use `density` prop to adjust vertical spacing within the component.

<ExamplesExample file="v-combobox/prop-density" />

#### Multiple combobox

Previously known as **tags** - user is allowed to enter more than one value.

<ExamplesExample file="v-combobox/prop-multiple" />

### Slots

#### No data with chips

In this example we utilize a custom **no-data** slot to provide context to the user when searching / creating items.

<ExamplesExample file="v-combobox/slot-no-data" />
