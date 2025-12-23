---
meta:
  title: Elevation
  description: Elevation helper classes allow you to control relative depth, or distance, between two surfaces along the z-axis.
  keywords: elevation helper classes, elevation classes, vuetify elevation
related:
  - /components/cards/
  - /components/sheets/
  - /components/bottom-navigation/
features:
  report: true
---

# Elevation

The elevation helpers control the relative depth between surfaces along the **z-axis**. Following Material Design 3 guidelines, Vuetify uses 6 elevation levels (0-5). Elevation values are measured in **dp** (density-independent pixels), a unit that ensures consistent sizing across different screen densities.

<PageFeatures />

| Class           | Level (dp) | Usage                                 |
|-----------------|------------|---------------------------------------|
| **elevation-0** | 0dp        | No shadow - flat surfaces             |
| **elevation-1** | 1dp        | Cards, buttons (elevated)             |
| **elevation-2** | 3dp        | Menus, rich tooltip, floating app bar |
| **elevation-3** | 6dp        | Dialogs, snackbars, FABs              |
| **elevation-4** | 8dp        | Dragged elements                      |
| **elevation-5** | 12dp       |                                       |

In MD3, elevation changes are commonly used to indicate interactive states. For example, a card at rest might use `elevation-1`, rising to `elevation-2` on hover and `elevation-3` when pressed or dragged.

<PromotedEntry />

## Usage

The `elevation` helper classes allow you to assign a custom **z-depth** to any element.

<ExamplesExample file="elevation/usage" />

## Examples

### Props

#### Dynamic elevation

Numerous components utilize the **elevatable** mixin and are given an **elevation** prop. For components that are not supported, you can dynamically change the class

<ExamplesExample file="elevation/prop-dynamic" />
