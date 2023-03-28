---
nav: Selects
meta:
  title: Select component
  description: The select component provides a list of options that a user can make selections from.
  keywords: selects, vuetify select component, vue select component
related:
  - /components/autocompletes/
  - /components/combobox/
  - /components/forms/
---

# Selects

Select fields components are used for collecting user provided information from a list of options.

## Usage

<usage name="v-select" />

<entry />

## API

| Component | Description |
| - | - |
| [v-select](/api/v-select/) | The select component. |

<api-inline hide-links />

## Caveats

<alert type="info">

  Browser autocomplete is set to off by default, may vary by browser and may be ignored. [MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion)

</alert>

<alert type="warning">

  The **auto** property of **menu-props** is only supported for the default input style.

</alert>

<alert type="error">

  When using objects for the **items** prop, you must associate **item-title** and **item-value** with existing properties on your objects. These values are defaulted to **title** and **value** and can be changed.

</alert>

## Examples

### Props

#### Custom title and value

You can specify the specific properties within your items array that correspond to the title and value fields. By default, this is **title** and **value**. In this example we also use the **return-object** prop which will return the entire object of the selected item on selection.

<example file="v-select/prop-custom-title-and-value" />

#### Density

You can use **density** prop to reduce the field height and lower max height of list items.

<example file="v-select/prop-dense" />

#### Disabled

Applying the **disabled** prop to a `v-select` will prevent a user from interacting with the component.

<example file="v-select/prop-disabled" />

#### Icons

Use a custom prepended or appended icon.

<example file="v-select/prop-icons" />

<!-- #### Menu props

Custom props can be passed directly to `v-menu` using **menuProps** prop. In this example menu is force directed to top and shifted to top.

<example file="v-select/prop-menu-props" /> -->

#### Multiple

The **multiple** prop allows for multiple selections.

<example file="v-select/prop-multiple" />

#### Chips

Display selected items as chips with the **chips** prop.

<example file="v-select/prop-chips" />

<!-- #### Readonly

You can use the **readonly** prop on `v-select` which will prevent a user from changing its value.

<example file="v-select/prop-readonly" /> -->

### Slots

#### Append and prepend item

The `v-select` components can be optionally expanded with prepended and appended items. This is perfect for customized **select-all** functionality.

<example file="v-select/slot-append-and-prepend-item" />

#### Selection

The **selection** slot can be used to customize the way selected values are shown in the input. This is great when you don't want the selection to occupy multiple lines.

<example file="v-select/slot-selection" />
