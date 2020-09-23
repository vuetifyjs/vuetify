---
meta:
  title: CSS Elevation helpers
  description: Elevation helper classes allow you to control relative depth, or distance, between two surfaces along the z-axis.
  keywords: elevation helper classes, elevation classes, vuetify elevation
related:
  - /components/cards/
  - /components/sheets/
  - /components/bottom-sheets/
---

# Elevation

The elevation helpers allow you to control relative depth, or distance, between two surfaces along the **z-axis**. There is a total of 25 elevation levels. You can set an element's elevation by using the class `elevation-{n}`, where `n` is a integer between 0-24 corresponding to the desired elevation.

<entry-ad />

## Usage

The `elevation` helper classes allow you to assign a custom **z-depth** to any element.

<example file="elevation/usage" />

## Examples

### Props

#### Dynamic elevation

Numerous components utilize the **elevatable** mixin and are given an **elevation** prop. For components that are not supported, you can dynamically change the class

<example file="elevation/prop-dynamic" />

<backmatter />
