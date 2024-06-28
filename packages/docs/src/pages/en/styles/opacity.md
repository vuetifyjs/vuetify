---
emphasized: true
meta:
  title: Opacity
  description: Use opacity utilities to quickly style the opacity of any element.
  keywords: opacity classes, opacity utilities, vuetify opacity helper classes
related:
  - /styles/opacity-radius/
  - /styles/display/
  - /styles/content/
features:
  report: true
---

# Opacity

Utilities for controlling the opacity of elements in your application.

<PageFeatures />

::: success

This feature was introduced in [v3.6.0 (Nebula)](/getting-started/release-notes/?version=v3.6.0)

:::

| Class | Properties |
| - | - |
| **opacity-0** | opacity: 0; |
| **opacity-10** | opacity: .1; |
| **opacity-20** | opacity: .2; |
| **opacity-30** | opacity: .3; |
| **opacity-40** | opacity: .4; |
| **opacity-50** | opacity: .5; |
| **opacity-60** | opacity: .6; |
| **opacity-70** | opacity: .7; |
| **opacity-80** | opacity: .8; |
| **opacity-90** | opacity: .9; |
| **opacity-100** | opacity: 1; |
| **opacity-hover** | opacity: var(--v-hover-opacity); |
| **opacity-focus** | opacity: var(--v-focus-opacity); |
| **opacity-selected** | opacity: var(--v-selected-opacity); |
| **opacity-activated** | opacity: var(--v-activated-opacity); |
| **opacity-pressed** | opacity: var(--v-pressed-opacity); |
| **opacity-dragged** | opacity: var(--v-dragged-opacity); { style="max-height: 420px;" fixed-header } |

<PromotedEntry />

## Usage

The `opacity` utilities allow you to quickly change the opacity of any element.

<ExamplesExample file="opacity/misc-opacity" />

### Hover

Using the [v-hover](/components/hover/) component, conditionally apply an opacity class when the element is hovered over.

<ExamplesExample file="opacity/misc-hover" />

## SASS variables

You can also use the following SASS variables to customize the opacity color and width:

```sass { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $opacities: (
    hover: var(--v-hover-opacity),
    focus: var(--v-focus-opacity),
    selected: var(--v-selected-opacity),
    activated: var(--v-activated-opacity),
    pressed: var(--v-pressed-opacity),
    dragged: var(--v-dragged-opacity),
    0: 0,
    10: .1,
    20: .2,
    30: .3,
    40: .4,
    50: .5,
    60: .6,
    70: .7,
    80: .8,
    90: .9,
    100: 1
  )
);
```

Disable opacity class generation by setting the $opacities variable to **false**.

```sass { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $opacities: false
);
```
