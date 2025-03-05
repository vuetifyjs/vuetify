---
meta:
  nav: Slide groups
  title: Slide group component
  description: The slide group component is similar to item groups in that you can make selectable content out of elements but does so in a single line fashion.
  keywords: slide groups, slideable groups, vuetify slide group component, vue slide group component
related:
  - /components/icons/
  - /components/carousels/
  - /components/tabs/
features:
  github: /components/VSlideGroup/
  label: 'C: VSlideGroup'
  report: true
---

# Slide groups

The `v-slide-group` component is used to display pseudo paginated information. It uses [v-item-group](/components/item-groups) at its core and provides a baseline for components such as [v-tabs](/components/tabs) and [v-chip-group](/components/chip-groups).

<PageFeatures />

## Usage

Similar to the [v-window](/components/windows) component, `v-slide-group` lets items to take up as much space as needed, allowing the user to move horizontally through the provided information.

<ExamplesExample file="v-slide-group/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-slide-group](/api/v-slide-group/) | Primary Component |
| [v-slide-group-item](/api/v-slide-group-item/) | Sub-component used for modifying the `v-slide-group` state |

<ApiInline hide-links />

## Examples

### Props

#### Selected class

**selected-class** prop allows you to pass a class to customize the active items.

<ExamplesExample file="v-slide-group/prop-active-class" />

#### Center active

Using the **center-active** prop will make the active item always centered.

<ExamplesExample file="v-slide-group/prop-center-active" />

#### Custom icons

You can add your custom pagination icons instead of arrows using the **next-icon** and **prev-icon** props.

<ExamplesExample file="v-slide-group/prop-custom-icons" />

### Mandatory

the **mandatory** prop will make the slide group require at least 1 item must be selected.

<ExamplesExample file="v-slide-group/prop-mandatory" />

#### Multiple

You can select multiple items by setting the **multiple** prop.

<ExamplesExample file="v-slide-group/prop-multiple" />

### Misc

#### Pseudo Carousel

Customize the slide group to creatively display information on sheets. Using the selection, we can display auxiliary information easily for the user.

<ExamplesExample file="v-slide-group/misc-pseudo-carousel" />
