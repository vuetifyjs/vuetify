---
meta:
  nav: Elevation migration
  title: Elevation migration
  description: Guide for migrating from MD2 to MD3 elevation shadows
  keywords: elevation, shadows, md2, md3, material design, migration
related:
  - /getting-started/upgrade-guide/
  - /styles/elevation/
---

# Elevation Migration Guide

Vuetify 4 introduces Material Design 3 (MD3) elevation shadows, which differ significantly from the previous MD2 system. This guide helps you understand the changes and provides options for maintaining MD2 shadows if needed.

## Adapt CSS classes

Update your elevation classes to use the new 0-5 scale.

| MD2 (old)           | MD3 (new)            |
|---------------------|----------------------|
| `elevation-0`       | `elevation-0` (0dp)  |
| `elevation-{1-3}`   | `elevation-1` (1dp)  |
| `elevation-{4-6}`   | `elevation-2` (3dp)  |
| `elevation-{7-11}`  | `elevation-3` (6dp)  |
| `elevation-{12-16}` | `elevation-4` (8dp)  |
| `elevation-{17-24}` | `elevation-5` (12dp) |

\* "dp" (density-independent pixels) is a relative unit from Material Design

The same levels change should be applied to direct uses of Sass `elevation(...)` helper.

```scss
@import 'vuetify/lib/styles/tools/_elevation.sass'

.summary-panel {
  @include elevation(15) // <- migration necessary
}
```

## Migrating customizations

MD2 shadows provided by Vuetify exposed a possibility to customize via :

```scss
/* Legacy variables, no longer used */
$shadow-key-umbra-opacity: var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2));
$shadow-key-penumbra-opacity: var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14));
$shadow-key-ambient-opacity: var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12));

$shadow-key-umbra: (...);
$shadow-key-penumbra: (...);
$shadow-key-ambient: (...);
```

```scss
/* New variables is Sass */
$shadow-key-color: rgba(var(--v-shadow-color), var(--v-shadow-key-opacity, 0.3));
$shadow-ambient-color: rgba(var(--v-shadow-color), var(--v-shadow-ambient-opacity, 0.15));

$shadow-key: (...);
$shadow-ambient: (...);
```

Note that color and opacity controls has been split into separate CSS variables.

## Reverting to legacy MD2 Shadows

If you need to maintain MD2 shadows for compatibility, add the following CSS to your project after Vuetify styles. The `!important` declarations ensure these override the MD3 shadows:

```css { resource="src/styles/legacy-elevation.css" }
/* Legacy MD2 Elevation Shadows */
.elevation-0 {
  box-shadow:
    0px 0px 0px 0px rgba(0, 0, 0, 0.2),
    0px 0px 0px 0px rgba(0, 0, 0, 0.14),
    0px 0px 0px 0px rgba(0, 0, 0, 0.12) !important;
}
.elevation-1 {
  box-shadow:
    0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14),
    0px 1px 3px 0px rgba(0, 0, 0, 0.12) !important;
}
.elevation-2 {
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12) !important;
}
.elevation-3 {
  box-shadow:
    0px 3px 3px -2px rgba(0, 0, 0, 0.2),
    0px 3px 4px 0px rgba(0, 0, 0, 0.14),
    0px 1px 8px 0px rgba(0, 0, 0, 0.12) !important;
}
.elevation-4 {
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
}
.elevation-5 {
  box-shadow:
    0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 5px 8px 0px rgba(0, 0, 0, 0.14),
    0px 1px 14px 0px rgba(0, 0, 0, 0.12) !important;
}
.elevation-6 {
  box-shadow:
    0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12) !important;
}
.elevation-7 {
  box-shadow:
    0px 4px 5px -2px rgba(0, 0, 0, 0.2),
    0px 7px 10px 1px rgba(0, 0, 0, 0.14),
    0px 2px 16px 1px rgba(0, 0, 0, 0.12) !important;
}
.elevation-8 {
  box-shadow:
    0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12) !important;
}
.elevation-9 {
  box-shadow:
    0px 5px 6px -3px rgba(0, 0, 0, 0.2),
    0px 9px 12px 1px rgba(0, 0, 0, 0.14),
    0px 3px 16px 2px rgba(0, 0, 0, 0.12) !important;
}
.elevation-10 {
  box-shadow:
    0px 6px 6px -3px rgba(0, 0, 0, 0.2),
    0px 10px 14px 1px rgba(0, 0, 0, 0.14),
    0px 4px 18px 3px rgba(0, 0, 0, 0.12) !important;
}
.elevation-11 {
  box-shadow:
    0px 6px 7px -4px rgba(0, 0, 0, 0.2),
    0px 11px 15px 1px rgba(0, 0, 0, 0.14),
    0px 4px 20px 3px rgba(0, 0, 0, 0.12) !important;
}
.elevation-12 {
  box-shadow:
    0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 12px 17px 2px rgba(0, 0, 0, 0.14),
    0px 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
}
.elevation-13 {
  box-shadow:
    0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 13px 19px 2px rgba(0, 0, 0, 0.14),
    0px 5px 24px 4px rgba(0, 0, 0, 0.12) !important;
}
.elevation-14 {
  box-shadow:
    0px 7px 9px -4px rgba(0, 0, 0, 0.2),
    0px 14px 21px 2px rgba(0, 0, 0, 0.14),
    0px 5px 26px 4px rgba(0, 0, 0, 0.12) !important;
}
.elevation-15 {
  box-shadow:
    0px 8px 9px -5px rgba(0, 0, 0, 0.2),
    0px 15px 22px 2px rgba(0, 0, 0, 0.14),
    0px 6px 28px 5px rgba(0, 0, 0, 0.12) !important;
}
.elevation-16 {
  box-shadow:
    0px 8px 10px -5px rgba(0, 0, 0, 0.2),
    0px 16px 24px 2px rgba(0, 0, 0, 0.14),
    0px 6px 30px 5px rgba(0, 0, 0, 0.12) !important;
}
.elevation-17 {
  box-shadow:
    0px 8px 11px -5px rgba(0, 0, 0, 0.2),
    0px 17px 26px 2px rgba(0, 0, 0, 0.14),
    0px 6px 32px 5px rgba(0, 0, 0, 0.12) !important;
}
.elevation-18 {
  box-shadow:
    0px 9px 11px -5px rgba(0, 0, 0, 0.2),
    0px 18px 28px 2px rgba(0, 0, 0, 0.14),
    0px 7px 34px 6px rgba(0, 0, 0, 0.12) !important;
}
.elevation-19 {
  box-shadow:
    0px 9px 12px -6px rgba(0, 0, 0, 0.2),
    0px 19px 29px 2px rgba(0, 0, 0, 0.14),
    0px 7px 36px 6px rgba(0, 0, 0, 0.12) !important;
}
.elevation-20 {
  box-shadow:
    0px 10px 13px -6px rgba(0, 0, 0, 0.2),
    0px 20px 31px 3px rgba(0, 0, 0, 0.14),
    0px 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
}
.elevation-21 {
  box-shadow:
    0px 10px 13px -6px rgba(0, 0, 0, 0.2),
    0px 21px 33px 3px rgba(0, 0, 0, 0.14),
    0px 8px 40px 7px rgba(0, 0, 0, 0.12) !important;
}
.elevation-22 {
  box-shadow:
    0px 10px 14px -6px rgba(0, 0, 0, 0.2),
    0px 22px 35px 3px rgba(0, 0, 0, 0.14),
    0px 8px 42px 7px rgba(0, 0, 0, 0.12) !important;
}
.elevation-23 {
  box-shadow:
    0px 11px 14px -7px rgba(0, 0, 0, 0.2),
    0px 23px 36px 3px rgba(0, 0, 0, 0.14),
    0px 9px 44px 8px rgba(0, 0, 0, 0.12) !important;
}
.elevation-24 {
  box-shadow:
    0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12) !important;
}
```
