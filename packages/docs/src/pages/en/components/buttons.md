---
nav: Buttons
meta:
  title: Button component
  description: The button component communicates actions that a user can take and are typically placed in dialogs, forms, cards and toolbars.
  keywords: buttons, vuetify button component, vue button component
related:
  - /components/button-groups/
  - /components/icons/
  - /components/cards/
---

# Buttons

The `v-btn` component replaces the standard html button with a material design theme and a multitude of options. Any color helper class can be used to alter the background or text color. <inline slug="scrimba-buttons" />

![Button Entry](https://cdn.vuetifyjs.com/docs/images/components-temp/v-btn/v-btn-entry.png)

---

## Usage

Buttons in their simplest form contain uppercase text, a slight elevation, hover effect, and a ripple effect on click.

<usage name="v-btn" />

<entry />

## Anatomy

The recommended placement of elements inside of `v-btn` is:

* Place text in the center
* Place visual content around container text

![Button Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-btn/v-btn-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | In addition to text, the Button container typically holds a [v-icon](/components/icons/) component |
| 2. Icon (optional) | Leading media content intended to improve visual context |
| 3. Text | A content area for displaying text and other inline elements |

## API

| Component | Description |
| - | - |
| [v-btn](/api/v-btn) | Primary Component |

<api-inline hide-links />

## Examples

### Props

#### Variant

The **variant** prop gives you easy access to several different button styles. Available variants are: **elevated**(default), **flat**, **tonal**, **outlined**, **text**, and **plain**.

<alert type="warning">

  When a `v-btn` is used inside of `v-toolbar` and `v-app-bar` the default variant **text** is applied instead of **elevated**.

</alert>

<example file="v-btn/prop-variant" />

#### Block

**block** buttons extend the full available width.

<example file="v-btn/prop-block" />

#### Flat

**flat** buttons still maintain their background color, but have no box shadow.

<example file="v-btn/prop-flat" />

#### Icon

Icons can be used for the primary content of a button. Use the **icon** prop to either supply an icon in the default slot, or to directly use an icon.

<example file="v-btn/prop-icon" />

#### Loaders

Using the loading prop, you can notify a user that there is processing taking place. The default behavior is to use a `v-progress-circular` component but this can be customized with the **loader** slot.

<example file="v-btn/prop-loaders" />

<random />

#### Outlined

**outlined** buttons inherit their borders from the current color applied.

<example file="v-btn/prop-outlined" />

#### Plain

**plain** buttons have a lower baseline opacity that reacts to **hover** and **focus**.

<example file="v-btn/prop-plain" />

#### Rounded

Use the **rounded** prop to control the border radius of buttons.

<example file="v-btn/prop-rounded" />

#### Sizing

Buttons can be given different sizing options to fit a multitude of scenarios.

<example file="v-btn/prop-sizing" />
