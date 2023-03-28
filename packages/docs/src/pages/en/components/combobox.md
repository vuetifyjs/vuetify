---
nav: Combobox
meta:
  title: Combobox component
  description: The combobox component provides type-ahead autocomplete functionality and allows users to provide a custom values beyond the provided list of options.
  keywords: combobox, vuetify combobox component, vue combobox component
related:
  - /components/autocompletes/
  - /components/forms/
  - /components/selects/
---

# Combobox

The `v-combobox` component is a [v-text-field](/components/text-fields) that allows the user to select values from a provided **items** array, or to enter their own value. Created items will be returned as strings.

## Usage

With Combobox, you can allow a user to create new values that may not be present in a provided items list.

<usage name="v-combobox" />

<entry />

## API

| Component | Description |
| - | - |
| [v-combobox](/api/v-combobox/) | Primary component |

<api-inline hide-links />

## Caveats

<alert type="error">

  As the Combobox allows user input, it **always** returns the full value provided to it (for example a list of Objects will always return an Object when selected). This is because there's no way to tell if a value is supposed to be user input or an object lookup [GitHub Issue](https://github.com/vuetifyjs/vuetify/issues/5479)

</alert>

<alert type="warning">

  The **auto** property of **menu-props** is only supported for the default input style.

</alert>

<alert type="info">

  Browser autocomplete is set to off by default, may vary by browser and may be ignored. [MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

</alert>

## Examples

### Props

#### Density

You can use `density` prop to adjusts vertical spacing within the component.

<example file="v-combobox/prop-density" />

#### Multiple combobox

Previously known as **tags** - user is allowed to enter more than 1 value

<example file="v-combobox/prop-multiple" />

### Slots

#### No data with chips

In this example we utilize a custom **no-data** slot to provide context to the user when searching / creating items.

<example file="v-combobox/slot-no-data" />
