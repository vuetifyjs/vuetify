---
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

The `v-combobox` component is a [v-autocomplete](/components/autocompletes) that allows the user to enter values that do not exist within the provided **items**. Created items will be returned as strings.

<entry-ad />

## Usage

With Combobox, you can allow a user to create new values that may not be present in a provided items list.

<usage name="v-combobox" />

## API

- [v-combobox](/api/v-combobox)

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

#### Dense

You can use `dense` prop to reduce combobox height and lower max height of list items.

<example file="v-combobox/prop-dense" />

#### Multiple combobox

Previously known as **tags** - user is allowed to enter more than 1 value

<example file="v-combobox/prop-multiple" />

### Slots

#### No data with chips

In this example we utilize a custom **no-data** slot to provide context to the user when searching / creating items.

<example file="v-combobox/slot-no-data" />

### Misc

#### Advanced custom options

The `v-combobox` improves upon the added functionality from `v-select` and `v-autocomplete`. This provides you with an expansive interface to create truly customized implementations. This example takes advantage of some more advanced features such as a custom **filter** algorithm, inline list editing and dynamic input items.

<example file="v-combobox/misc-advanced" />

<backmatter />
