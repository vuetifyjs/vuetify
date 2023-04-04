---
nav: Sheets
meta:
  title: Sheet component
  description: The sheet component is the baseline for many Material Design implementations used in Vuetify.
  keywords: sheets, vuetify sheet component, vue sheet component, paper, material design paper, material design sheets
related:
  - /components/cards
  - /components/grids
  - /styles/elevation
---

# Sheets

The `v-sheet` component is a transformable piece of _paper_ that provides a basic foundation for Vuetify features.

----

## Usage

The sheet component has support for elevation, rounded corners, color, and more. It can be used as a container for other components or as a standalone.

<usage name="v-sheet" />

<entry />

## API

| Component | Description |
| - | - |
| [v-sheet](/api/v-sheet/) | Primary Component |

<api-inline hide-links />

## Guide

Often when building out a user interface, you will need to create a container for content and other custom components. The `v-sheet` component is a great way to do this. It provides a baseline for elevation, rounded corners, and color.

### Props

Some of the standard props that can be applied to the `v-sheet` component are listed below.

#### Elevation

The `v-sheet` component accepts a custom elevation between **0** and **24** (0 is default). The _elevation_ property modifies the `box-shadow` property. More information is located in the MD [Elevation Design Specification](https://material.io/design/environment/elevation.html).

<example file="v-sheet/prop-elevation" />

#### Rounded

The **rounded** prop adds a default `border-radius` of _4px_. By default, the `v-sheet` component has no border-radius. Customize the radius's size and location by providing a custom rounded value; e.g. a rounded value of _tr-xl l-pill_ equates to _rounded-tr-xl rounded-l-pill_. Additional information is on the [Border Radius](/styles/border-radius/) page.

<example file="v-sheet/prop-rounded" />

#### Color

Sheets and components based on them can have different sizes and colors.

The `v-sheet` component accepts custom [Material Design Color](/styles/colors/) values such as `warning`, `amber darken-3`, and `deep-purple accent` — as well as _rgb_, _rgba_, and _hexadecimal_ values.

<example file="v-sheet/prop-color" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-sheet` component.

### Congratulations

This example uses a sheet component to create a banner congratulating users for signing up for the Vuetify community.

<example file="v-sheet/misc-congratulations" />

### Reconcile Notification

The following example uses a sheet component to create a banner that notifies users that the account balance has been reconciled.

<example file="v-sheet/misc-reconcile" />

### Privacy Policy

Creating a Privacy Policy notification is a great use case for the `v-sheet` component.

<example file="v-sheet/misc-privacy-policy" />

### Referral program

Even for simple use-cases, the `v-sheet` component is versatile makes it easy to contain content and other components.

<example file="v-sheet/misc-referral-program" />
