---
nav: Autocompletes
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

## Usage

The autocomplete component extends `v-select` and adds the ability to filter items.

<usage name="v-autocomplete" />

<entry />

## API

| Component | Description |
| - | - |
| [v-autocomplete](/api/v-autocomplete/) | Primary Component |

<api-inline hide-links />

## Caveats

<alert type="error">

  When using objects for the **items** prop, you must associate **item-title** and **item-value** with existing properties on your objects. These values are defaulted to **title** and **value** and can be changed.

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

#### Density

You can use `density` prop to adjusts vertical spacing within the component.

<example file="v-autocomplete/prop-density" />

#### Filter

The `filter` prop can be used to filter each individual item with custom logic. In this example we filter items by name.

<example file="v-autocomplete/prop-filter" />

### Slots

#### Item and selection

With the power of slots, you can customize the visual output of the select. In this example we add a profile picture for both the chips and list items.

<example file="v-autocomplete/slot-item-and-selection" />

### Misc

#### Asynchronous items

Sometimes you need to load data externally based upon a search query. Use the `search-input` prop with the **.sync** modifier when using the `autocomplete` prop. We also make use of the new `cache-items` prop. This will keep a unique list of all items that have been passed to the `items` prop and is **REQUIRED** when using asynchronous items and the **multiple** prop.

<example file="v-autocomplete/misc-asynchronous-items" />

#### State selector

Using a combination of `v-autocomplete` slots and transitions, you can create a stylish toggleable autocomplete field such as this state selector.

<example file="v-autocomplete/misc-state-selector" />

#### New tab

<alert type="success">

This feature was introduced in [v3.3.0 (Icarus)](/getting-started/release-notes/?version=v3.3.0)

</alert>

The **auto-select-first** property highlights the first result when searching, allowing you to press <v-kbd>tab</v-kbd> or <v-kbd>enter</v-kbd> to quickly select it.

<example file="v-autocomplete/misc-new-tab" />
