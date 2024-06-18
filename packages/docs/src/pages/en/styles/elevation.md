---
meta:
  title: Elevation
  description: Elevation helper classes allow you to control relative depth, or distance, between two surfaces along the z-axis.
  keywords: elevation helper classes, elevation classes, vuetify elevation
related:
  - /components/cards/
  - /components/sheets/
  - /components/bottom-navigation/
---

# Elevation

The elevation helpers allow you to control relative depth, or distance, between two surfaces along the **z-axis**. There is a total of 25 elevation levels. You can set an element's elevation by using the class `elevation-{n}`, where `n` is a integer between 0-24 corresponding to the desired elevation.

<PageFeatures />

| Class | Properties |
| - | - |
| **elevation-0** | elevation: 0px; |
| **elevation-1** | elevation: 1px; |
| **elevation-2** | elevation: 2px; |
| **elevation-3** | elevation: 3px; |
| **elevation-4** | elevation: 4px; |
| **elevation-5** | elevation: 5px; |
| **elevation-6** | elevation: 6px; |
| **elevation-7** | elevation: 7px; |
| **elevation-8** | elevation: 8px; |
| **elevation-9** | elevation: 9px; |
| **elevation-10** | elevation: 10px; |
| **elevation-11** | elevation: 11px; |
| **elevation-12** | elevation: 12px; |
| **elevation-13** | elevation: 13px; |
| **elevation-14** | elevation: 14px; |
| **elevation-15** | elevation: 15px; |
| **elevation-16** | elevation: 16px; |
| **elevation-17** | elevation: 17px; |
| **elevation-18** | elevation: 18px; |
| **elevation-19** | elevation: 19px; |
| **elevation-20** | elevation: 20px; |
| **elevation-21** | elevation: 21px; |
| **elevation-22** | elevation: 22px; |
| **elevation-23** | elevation: 23px; |
| **elevation-24** | elevation: 24px; { style="max-height: 420px;" fixed-header }|

<PromotedEntry />

## Usage

The `elevation` helper classes allow you to assign a custom **z-depth** to any element.

<ExamplesExample file="elevation/usage" />

## Examples

### Props

#### Dynamic elevation

Numerous components utilize the **elevatable** mixin and are given an **elevation** prop. For components that are not supported, you can dynamically change the class

<ExamplesExample file="elevation/prop-dynamic" />
