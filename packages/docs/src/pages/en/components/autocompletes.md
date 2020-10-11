---
meta:
  title: Autocomplete component
  description: The autocomplete component provides type-ahead autocomplete functionality and provides a list of available options.
  keywords: autocomplete, vuetify autocomplete component, vue autocomplete component
related:
  - /components/combobox/
  - /components/forms/
  - /components/selects/
---

# Autocompletes

The `v-autocomplete` component offers simple and flexible type-ahead functionality. This is useful when searching large sets of data or even dynamically requesting information from an API.

<entry-ad />

## Usage

The autocomplete component extends `v-select` and adds the ability to filter items.

<usage name="v-autocomplete" />

## API

- [v-autocomplete](/api/v-autocomplete)

## Caveats

<alert type="error">

  When using objects for the **items** prop, you must associate **item-text** and **item-value** with existing properties on your objects. These values are defaulted to **text** and **value** and can be changed.

</alert>

<alert type="warning">

  The **auto** property of **menu-props** is only supported for the default input style.

</alert>

<alert type="info">

  Browser autocomplete is set to off by default, may vary by browser and may be ignored. [MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

</alert>

## Examples

Below is a collection of simple to complex examples.

### Props

#### Dense

You can use `dense` prop to reduce autocomplete height and lower max height of list items.

<example file="v-autocomplete/prop-dense" />

#### Filter

The `filter` prop can be used to filter each individual item with custom logic. In this example we filter items by name.

<example file="v-autocomplete/prop-filter" />

### Slots

#### Item and selection

With the power of slots, you can customize the visual output of the select. In this example we add a profile picture for both the chips and list items.

<example file="v-autocomplete/slot-item-and-selection" />

### Misc

#### API search

Easily hook up dynamic data and create a unique experience. The `v-autocomplete`'s expansive prop list makes it easy to fine tune every aspect of the input.

<example file="v-autocomplete/misc-api-search" />

#### Asynchronous items

Sometimes you need to load data externally based upon a search query. Use the `search-input` prop with the **.sync** modifier when using the `autocomplete` prop. We also make use of the new `cache-items` prop. This will keep a unique list of all items that have been passed to the `items` prop and is **REQUIRED** when using asynchronous items and the **multiple** prop.

<example file="v-autocomplete/misc-asynchronous-items" />

#### Cryptocurrency selector

The `v-autocomplete` component is extremely flexible and can fit in just about any use-case. Create custom displays for **no-data**, **item** and **selection** slots to provide a unique user experience. Using _slots_ enables you to easily customize the desired look for your application.

<example file="v-autocomplete/misc-cryptocurrency-selector" />

#### State selector

Using a combination of `v-autocomplete` slots and transitions, you can create a stylish toggleable autocomplete field such as this state selector.

<example file="v-autocomplete/misc-state-selector" />

<backmatter />
