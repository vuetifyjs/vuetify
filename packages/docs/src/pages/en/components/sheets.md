---
meta:
  nav: Sheets
  title: Sheet component
  description: The sheet component is the baseline for many Material Design implementations used in Vuetify.
  keywords: sheets, vuetify sheet component, vue sheet component, paper, material design paper, material design sheets
related:
  - /components/cards
  - /components/grids
  - /styles/elevation
features:
  github: /components/VSheet/
  label: 'C: VSheet'
  report: true
  spec: https://m2.material.io/design/environment/elevation.html
---

# Sheets

The `v-sheet` component is a transformable piece of _paper_ that provides a basic foundation for Vuetify features.

<PageFeatures />

## Usage

The sheet component has support for elevation, rounded corners, color, and more. It can be used as a container for other components or as a standalone.

<ExamplesUsage name="v-sheet" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-sheet](/api/v-sheet/) | Primary Component |

<ApiInline hide-links />

## Anatomy

The `v-sheet` component contains only a default slot.

![Sheet Anatomy](https://cdn.vuetifyjs.com/docs/images/components/v-sheet/v-sheet-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The main content area |

## Guide

Often when building out a user interface, you will need to create a container for content and other custom components. The `v-sheet` component is a great way to do this. It provides a baseline for elevation, rounded corners, and color.

### Props

Some of the standard props that can be applied to the `v-sheet` component are listed below.

#### Elevation

The `v-sheet` component accepts a custom elevation between **0** and **24** (0 is default). The _elevation_ property modifies the `box-shadow` property.

<ExamplesExample file="v-sheet/prop-elevation" />

#### Rounded

The **rounded** prop adds a default `border-radius` of _4px_. By default, the `v-sheet` component has no border-radius. Customize the radius's size and location by providing a custom rounded value; e.g. a rounded value of _tr-xl l-pill_ equates to _rounded-tr-xl rounded-l-pill_. Additional information is on the [Border Radius](/styles/border-radius/) page.

<ExamplesExample file="v-sheet/prop-rounded" />

#### Color

Sheets and components based on them can have different sizes and colors.

The `v-sheet` component accepts custom [Material Design Color](/styles/colors/) values such as `warning`, `amber darken-3`, and `deep-purple accent` — as well as _rgb_, _rgba_, and _hexadecimal_ values.

<ExamplesExample file="v-sheet/prop-color" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-sheet` component.

### Congratulations

This example uses a sheet component to create a banner congratulating users for signing up for the Vuetify community.

<ExamplesExample file="v-sheet/misc-congratulations" />

### Reconcile Notification

The following example uses a sheet component to create a banner that notifies users that the account balance has been reconciled.

<ExamplesExample file="v-sheet/misc-reconcile" />

### Privacy Policy

Creating a Privacy Policy notification is a great use case for the `v-sheet` component.

<ExamplesExample file="v-sheet/misc-privacy-policy" />

### Referral program

Even for simple use-cases, the `v-sheet` component is versatile makes it easy to contain content and other components.

<ExamplesExample file="v-sheet/misc-referral-program" />
