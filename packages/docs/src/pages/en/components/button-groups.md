---
nav: Button toggles
meta:
  title: Button toggle component
  description: The button toggle component allows you to combine a series of selectable buttons together in a single element.
  keywords: button groups, vuetify button group component, vue button group component
related:
  - /components/buttons/
  - /components/icons/
  - /components/toolbars/
---

# Button toggles

The `v-btn-toggle` component is a simple wrapper for `v-item-group` built specifically to work with `v-btn`.

<!-- ![btn-groups Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-btn-groups/v-btn-groups-entry.png) -->

---

## Usage

Toggle buttons allow you to create a styled group of buttons that can be selected or toggled under a single **v-model**.

<example file="v-btn-toggle/usage" />

<entry />

## API

| Component | Description |
| - | - |
| [v-btn-toggle](/api/v-btn-toggle/) | Primary component |
| [v-btn](/api/v-btn/) | Sub-component used for modifying the `v-btn-toggle` state |
| [v-btn-group](/api/v-btn/) | A stateless version of `v-btn-toggle` |

<api-inline hide-links />

## Examples

### Props

#### Divided

You can add a visual divider between buttons with the **divided** prop.

<example file="v-btn-toggle/prop-divided" />

#### Variant

You can switch the button variant by using **variant** prop on `v-btn-toggle`.

<example file="v-btn-toggle/prop-variant" />

#### Mandatory

A `v-btn-toggle` with the **mandatory** prop will always have a value.

<example file="v-btn-toggle/prop-mandatory" />

#### Multiple

A `v-btn-toggle` with the **multiple** prop will allow a user to select multiple return values as an array.

<example file="v-btn-toggle/prop-multiple" />

#### Rounded

You can control the border radius with the **rounded** prop.

<example file="v-btn-toggle/prop-rounded" />

### Misc

<!-- #### Toolbar

Easily integrate customized button solutions with a `v-toolbar`

<example file="v-btn-toggle/misc-toolbar" /> -->

#### WYSIWYG

Group similar actions and design your own WYSIWYG component.

<example file="v-btn-toggle/misc-wysiwyg" />
