---
meta:
  nav: Material 3 button sizes
  title: Material Design 3 button sizes
  description: Replace the default button size scale with Material Design 3 Expressive sizes using SASS variables.
  keywords: material design 3, md3, expressive, button sizes, icon button sizes, sass variables
related:
  - /components/buttons/
  - /components/icon-buttons/
  - /components/split-buttons/
features:
  report: true
---

# Material Design 3 button sizes

`v-btn` and `v-icon-btn` ship with Vuetify's own size scale. Both accept a SASS map that replaces it with the [Material Design 3 Expressive](https://m3.material.io/components/buttons/specs) sizes: 32, 40, 56, 96 and 136px for **x-small** through **x-large**.

<PageFeatures />

::: warning

This feature requires [v4.3.0](/getting-started/release-notes/?version=v4.3.0)

:::

::: info

This page requires a SASS setup, see [SASS variables](/features/sass-variables/).

:::

## Buttons

Setting `$button-named-sizes` replaces the default size scale entirely, so every size from **x-small** to **x-large** has to be defined.

| Key                     | Required |                                                                                                      |
|-------------------------|----------|------------------------------------------------------------------------------------------------------|
| `height`                | yes      | Height at default density                                                                            |
| `typography`            | yes      | Key of `$typography`, or a map with `size`, `weight`, `line-height`, `letter-spacing`, `font-family` |
| `padding-inline`        | yes      | Horizontal padding                                                                                   |
| `icon-size`             | yes      | Prepend, append and icon-only icon size                                                              |
| `border-radius`         | yes      | Resting radius                                                                                       |
| `border-radius-pressed` | yes      | Radius while pressed                                                                                 |
| `min-width`             |          | Defaults to `0`                                                                                      |
| `icon-gap`              |          | Space between icon and label                                                                         |

Icon buttons get the same height as text buttons, `$button-icon-density` is ignored. Date picker days and pagination buttons keep their size through `$date-picker-month-day-btn-size` and `$pagination-btn-sizes`.

<details>
<summary>Material Design 3 Expressive</summary>

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  // preserve sizes in VPagination
  $pagination-btn-sizes: (
    'x-small': 32px,
    'small': 40px,
    'default': 48px,
    'large': 56px,
    'x-large': 64px,
  ),
  // apply MD3 sizes, spacing and typography
  $button-named-sizes: (
    'x-small': (
      'height': 32px,
      'typography': 'label-large',
      'padding-inline': 12px,
      'icon-gap': 4px,
      'icon-size': 20px,
      'border-radius': 16px,
      'border-radius-pressed': 8px,
    ),
    'small': (
      'height': 40px,
      'typography': 'label-large',
      'padding-inline': 16px,
      'icon-gap': 8px,
      'icon-size': 20px,
      'border-radius': 20px,
      'border-radius-pressed': 8px,
    ),
    'default': (
      'height': 56px,
      'typography': 'title-medium',
      'padding-inline': 24px,
      'icon-gap': 8px,
      'icon-size': 24px,
      'border-radius': 28px,
      'border-radius-pressed': 12px,
    ),
    'large': (
      'height': 96px,
      'typography': 'headline-small',
      'padding-inline': 48px,
      'icon-gap': 12px,
      'icon-size': 32px,
      'border-radius': 48px,
      'border-radius-pressed': 16px,
    ),
    'x-large': (
      'height': 136px,
      'typography': 'headline-large',
      'padding-inline': 64px,
      'icon-gap': 16px,
      'icon-size': 40px,
      'border-radius': 68px,
      'border-radius-pressed': 16px,
    ),
  ),
);
```

</details>

<!-- TODO: screenshot -->

## Icon buttons

`$icon-btn-named-sizes` sets the size of each `v-icon-btn` size. Keys become `--v-icon-btn-*` CSS variables. Its `icon-size` also applies to `v-btn` with the **icon** prop.

| Key                     |                                     |
|-------------------------|-------------------------------------|
| `height`                | Button height                       |
| `width`                 | Button width                        |
| `narrow-width`          | Width with `width-variant="narrow"` |
| `wide-width`            | Width with `width-variant="wide"`   |
| `icon-size`             | Icon size                           |
| `border-radius`         | Resting radius                      |
| `border-radius-pressed` | Radius while pressed                |

<details>
<summary>Material Design 3 Expressive</summary>

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $icon-btn-named-sizes: (
    'x-small': (
      'height': 32px,
      'width': 32px,
      'narrow-width': 28px,
      'wide-width': 40px,
      'border-radius': 16px,
      'border-radius-pressed': 8px,
      'icon-size': 20px,
    ),
    'small': (
      'height': 40px,
      'width': 40px,
      'narrow-width': 32px,
      'wide-width': 52px,
      'border-radius': 20px,
      'border-radius-pressed': 8px,
      'icon-size': 24px,
    ),
    'default': (
      'height': 56px,
      'width': 56px,
      'narrow-width': 48px,
      'wide-width': 72px,
      'border-radius': 28px,
      'border-radius-pressed': 12px,
      'icon-size': 24px,
    ),
    'large': (
      'height': 96px,
      'width': 96px,
      'narrow-width': 64px,
      'wide-width': 128px,
      'border-radius': 48px,
      'border-radius-pressed': 16px,
      'icon-size': 32px,
    ),
    'x-large': (
      'height': 136px,
      'width': 136px,
      'narrow-width': 104px,
      'wide-width': 184px,
      'border-radius': 68px,
      'border-radius-pressed': 16px,
      'icon-size': 40px,
    ),
  ),
);
```

</details>

<!-- TODO: screenshot -->

## Button groups

`$btn-group-named-sizes` switches `v-btn-group` and `v-btn-toggle` to Material Design 3 groups. It requires `$button-named-sizes`.

By default buttons are separated by a gap, and the pressed button widens while its neighbors shrink. Use the **connected** prop to join them with a 2px gap and shared inner corners.

::: warning

Groups without the **size** prop fall back to the legacy height. Set a [global default](/features/global-configuration/) so every group gets named size prop:

```js { resource="src/plugins/vuetify.js" }
export default createVuetify({
  defaults: {
    VBtnGroup: { size: 'default' },
    VBtnToggle: { size: 'default' },
  },
})
```

:::

| Key                              |                                          |
|----------------------------------|------------------------------------------|
| `gap`                            | Space between buttons                    |
| `selected-radius`                | Radius of pressed and selected buttons   |
| `connected.inner-radius`         | Inner corners with **connected**         |
| `connected.inner-radius-pressed` | Pressed inner corners with **connected** |

<details>
<summary>Material Design 3 Expressive</summary>

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $btn-group-named-sizes: (
    'x-small': (
      'gap': 18px,
      'selected-radius': 12px,
      'connected': ('inner-radius': 4px, 'inner-radius-pressed': 4px),
    ),
    'small': (
      'gap': 12px,
      'selected-radius': 12px,
      'connected': ('inner-radius': 8px, 'inner-radius-pressed': 4px),
    ),
    'default': (
      'gap': 8px,
      'selected-radius': 16px,
      'connected': ('inner-radius': 8px, 'inner-radius-pressed': 4px),
    ),
    'large': (
      'gap': 8px,
      'selected-radius': 28px,
      'connected': ('inner-radius': 16px, 'inner-radius-pressed': 12px),
    ),
    'x-large': (
      'gap': 8px,
      'selected-radius': 28px,
      'connected': ('inner-radius': 20px, 'inner-radius-pressed': 16px),
    ),
  ),
);
```

</details>

<!-- TODO: screenshot -->

## Split buttons

`$split-btn-named-sizes` sets the paddings and inner corners of [v-split-btn](/components/split-buttons/). It requires `$button-named-sizes` and `$btn-group-named-sizes`. Like groups, split buttons need the **size** prop, add `VSplitBtn: { size: 'default' }` to the global defaults.

| Key                     |                                               |
|-------------------------|-----------------------------------------------|
| `action-padding-end`    | Padding between the label and the menu button |
| `toggle-padding-inline` | Horizontal padding of the menu button         |
| `toggle-icon-size`      | Menu button icon size                         |
| `toggle-icon-offset`    | Icon shift toward the action while closed     |
| `inner-radius`          | Resting inner corners                         |
| `inner-radius-pressed`  | Hovered and pressed inner corners             |

<details>
<summary>Material Design 3 Expressive</summary>

```scss { resource="src/styles/settings.scss" }
@use 'vuetify/settings' with (
  $split-btn-named-sizes: (
    'x-small': (
      'action-padding-end': 10px,
      'toggle-padding-inline': 13px,
      'toggle-icon-size': 22px,
      'toggle-icon-offset': -1px,
      'inner-radius': 4px,
      'inner-radius-pressed': 8px,
    ),
    'small': (
      'action-padding-end': 12px,
      'toggle-padding-inline': 13px,
      'toggle-icon-size': 22px,
      'toggle-icon-offset': -1px,
      'inner-radius': 4px,
      'inner-radius-pressed': 12px,
    ),
    'default': (
      'action-padding-end': 24px,
      'toggle-padding-inline': 15px,
      'toggle-icon-size': 26px,
      'toggle-icon-offset': -2px,
      'inner-radius': 4px,
      'inner-radius-pressed': 12px,
    ),
    'large': (
      'action-padding-end': 48px,
      'toggle-padding-inline': 29px,
      'toggle-icon-size': 38px,
      'toggle-icon-offset': -3px,
      'inner-radius': 8px,
      'inner-radius-pressed': 20px,
    ),
    'x-large': (
      'action-padding-end': 64px,
      'toggle-padding-inline': 43px,
      'toggle-icon-size': 50px,
      'toggle-icon-offset': -6px,
      'inner-radius': 12px,
      'inner-radius-pressed': 20px,
    ),
  ),
);
```

</details>

<!-- TODO: screenshot -->
