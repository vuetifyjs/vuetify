---
meta:
  nav: Typography migration
  title: Typography migration
  description: Guide for migrating from legacy SCSS typography to MD3 typography system
  keywords: typography, migration, md3, scss, upgrade
related:
  - /getting-started/upgrade-guide/
  - /styles/text-and-typography/
---

# Typography Migration Guide

This page describes changes introduced in **v4.0.0** and maps the legacy typography variants to the new Material Design 3 (MD3) variants.

## Quick Reference

<DocTypographyPreview />

## Conservative Migration Mapping

If you want to keep text sizes as close as possible to the previous MD2 sizes, use this mapping table:

| Legacy MD2 Class  | MD2 Size | Recommended MD3 Class | MD3 Size | Notes                                     |
|-------------------|----------|-----------------------|----------|-------------------------------------------|
| `text-h1`         | 96px     | n/a                   | n/a      | ⚠️ needs custom variant                   |
| `text-h2`         | 60px     | `text-display-large`  | 57px     | Close match                               |
| `text-h3`         | 48px     | `text-display-medium` | 45px     | Close match                               |
| `text-h4`         | 34px     | `text-headline-large` | 32px     | Close match                               |
| `text-h5`         | 24px     | `text-headline-small` | 24px     | ✓ Exact match                             |
| `text-h6`         | 20px     | `text-title-large`    | 22px     | Close match                               |
| `text-subtitle-1` | 16px     | `text-body-large`     | 16px     | ✓ Exact match                             |
| `text-subtitle-2` | 14px     | `text-title-small`    | 14px     | ✓ Exact match (500 weight)                |
| `text-body-1`     | 16px     | `text-body-large`     | 16px     | ✓ Exact match                             |
| `text-body-2`     | 14px     | `text-body-medium`    | 14px     | ✓ Exact match                             |
| `text-button`     | 14px     | `text-label-large`    | 14px     | ✓ Exact match (no uppercase)              |
| `text-caption`    | 12px     | `text-body-small`     | 12px     | ✓ Exact match                             |
| `text-overline`   | 12px     | `text-label-medium`   | 12px     | ⚠️ No uppercase, different letter spacing |

::: warning Important Notes

- **Large headings (h1-h3)**: MD3 display variants are significantly smaller than MD2 headings. Consider customizing these sizes if maintaining visual hierarchy is critical.
- **Title variants (new in MD3)**: The `text-title-*` variants provide better semantic alternatives for medium-sized headings and subtitles with appropriate font weights (400-500). Use these instead of body variants when you need emphasized text.
- **text-overline**: The `text-label-small` or `text-label-medium` classes don't include `text-transform: uppercase` by default. Use `text-uppercase` utility class or customize the variant.
- **Font weight differences**: Some MD3 variants have different font weights. Check the [full comparison table](#key-differences) below for details.
:::

## Migration Steps

### 1. Update class names in HTML templates

Replace legacy class names with MD3 equivalents:

```html
<!-- Before -->
<h1 class="text-h1">Title</h1>
<p class="text-body-1">Content</p>
<span class="text-caption">Small text</span>

<!-- After -->
<h1 class="text-display-large">Title</h1>
<p class="text-body-large">Content</p>
<span class="text-body-small">Small text</span>
```

### 2. Sass customization

If your app has some customization applied to `$typography`, it needs to be re-mapped to new variants.

```scss { resource="src/settings.scss" }
// Before
use 'vuetify/settings' with (
  $typography: (
    'h1': (// <- only adds `text-h1` as a new class next to MD3 variants
      'size': 3rem,
      'weight': 400,
    ),
  ),
)
```

```scss { resource="src/settings.scss" }
// After
use 'vuetify/settings' with (
  $typography: (
    'display-large': (// <- migrated to semantic equivalent
      'size': 3rem,
      'weight': 400, // <- can be skipped, same as default
    ),
  ),
)
```

### Detached Sass variables

New typography configuration does not cover `text-transform`. So some of the Sass variables are now detached from typography and default to `none`.

| Sass Variable                | Legacy value                                          |
|------------------------------|-------------------------------------------------------|
| `$button-text-transform`     | `settings.$typography` » `button` » `text-transform`  |
| `$card-text-text-transform`  | `settings.$typography` » `body-2` » `text-transform`  |
| `$system-bar-text-transform` | `settings.$typography` » `caption` » `text-transform` |

In order to restore the customized values, pass them directly to the specific variables:

```scss { resource="src/settings.scss" }
@use 'vuetify/settings' with (
  $button-text-transform: uppercase,
  $card-text-text-transform: none,
  $system-bar-text-transform: none,
);
```

## Breaking Changes

1. **Class names**: All default typography classes changed to align with Material Design 3
2. **No text-transform by default**: The `overline` → `label-small` is not an equivalent replacement as it looses `uppercase`, letter spacing is 3x smaller, etc.
3. **Different sizing**: MD3 variants follow Material Design 3 specifications which differ from MD2

### Restoring MD2 typography

If you want to avoid visual regression entirely, you can restore MD2 typography using configuration snippets bellow.

```scss { resource="src/typography.scss" }
$body-font-family: 'Roboto', sans-serif;
$heading-font-family: $body-font-family;

$typography: (
  (
    'h1': (
      'size': 6rem,
      'weight': 300,
      'line-height': 1,
      'letter-spacing': -.015625em,
      'font-family': $heading-font-family,
      'text-transform': none
    ),
    'h2': (
      'size': 3.75rem,
      'weight': 300,
      'line-height': 1,
      'letter-spacing': -.0083333333em,
      'font-family': $heading-font-family,
      'text-transform': none
    ),
    'h3': (
      'size': 3rem,
      'weight': 400,
      'line-height': 1.05,
      'letter-spacing': normal,
      'font-family': $heading-font-family,
      'text-transform': none
    ),
    'h4': (
      'size': 2.125rem,
      'weight': 400,
      'line-height': 1.175,
      'letter-spacing': .0073529412em,
      'font-family': $heading-font-family,
      'text-transform': none
    ),
    'h5': (
      'size': 1.5rem,
      'weight': 400,
      'line-height': 1.333,
      'letter-spacing': normal,
      'font-family': $heading-font-family,
      'text-transform': none
    ),
    'h6': (
      'size': 1.25rem,
      'weight': 500,
      'line-height': 1.6,
      'letter-spacing': .0125em,
      'font-family': $heading-font-family,
      'text-transform': none
    ),
    'subtitle-1': (
      'size': 1rem,
      'weight': normal,
      'line-height': 1.75,
      'letter-spacing': .009375em,
      'font-family': $body-font-family,
      'text-transform': none
    ),
    'subtitle-2': (
      'size': .875rem,
      'weight': 500,
      'line-height': 1.6,
      'letter-spacing': .0071428571em,
      'font-family': $body-font-family,
      'text-transform': none
    ),
    'body-1': (
      'size': 1rem,
      'weight': 400,
      'line-height': 1.5,
      'letter-spacing': .03125em,
      'font-family': $body-font-family,
      'text-transform': none
    ),
    'body-2': (
      'size': .875rem,
      'weight': 400,
      'line-height': 1.425,
      'letter-spacing': .0178571429em,
      'font-family': $body-font-family,
      'text-transform': none
    ),
    'button': (
      'size': .875rem,
      'weight': 500,
      'line-height': 2.6,
      'letter-spacing': .0892857143em,
      'font-family': $body-font-family,
      'text-transform': uppercase
    ),
    'caption': (
      'size': .75rem,
      'weight': 400,
      'line-height': 1.667,
      'letter-spacing': .0333333333em,
      'font-family': $body-font-family,
      'text-transform': none
    ),
    'overline': (
      'size': .75rem,
      'weight': 500,
      'line-height': 2.667,
      'letter-spacing': .1666666667em,
      'font-family': $body-font-family,
      'text-transform': uppercase
    )
  ),
  $typography
);

$flat-typography: ();
@each $type, $values in $typography {
  $flat-typography: map-deep-merge(
    $flat-typography,
    (#{$type}: (
      map.get($values, 'size'),
      map.get($values, 'weight'),
      map.get($values, 'line-height'),
      map.get($values, 'letter-spacing'),
      map.get($values, 'font-family'),
      map.get($values, 'text-transform'),
    ))
  );
}
```

```scss { resource="src/settings.scss" }
@use './typography' as *;
@use 'vuetify/settings' with (
  $utilities: (
    "typography": (
      property: (
        font-size,
        font-weight,
        line-height,
        letter-spacing,
        font-family,
        text-transform // <-- restoring this line
      ),
      values: $flat-typography, // <-- ensures we only generate MD2 variants
    ),
  ),

  $alert-title-font-size: tools.map-deep-get(.$typography, 'h6', 'size'),
  $alert-title-font-weight: tools.map-deep-get(.$typography, 'h6', 'weight'),
  $alert-title-letter-spacing: tools.map-deep-get(.$typography, 'h6', 'letter-spacing'),
  $banner-font-size: tools.map-deep-get(.$typography, 'body-2', 'size'),
  $banner-line-height: tools.map-deep-get(.$typography, 'subtitle-2', 'line-height'),
  $breadcrumbs-item-icon-font-size: tools.map-deep-get(.$typography, 'body-1', 'size'),
  $breadcrumbs-line-height: tools.map-deep-get(.$typography, 'subtitle-2', 'line-height'),
  $button-font-size: tools.map-deep-get(.$typography, 'button', 'size'),
  $button-font-weight: tools.map-deep-get(.$typography, 'button', 'weight'),
  $button-text-letter-spacing: tools.map-deep-get(.$typography, 'button', 'letter-spacing'),
  $button-text-transform: tools.map-deep-get(.$typography, 'button', 'text-transform'),
  $card-title-font-size: tools.map-deep-get(.$typography, 'h6', 'size'),
  $card-title-font-weight: tools.map-deep-get(.$typography, 'h6', 'weight'),
  $card-title-letter-spacing: tools.map-deep-get(.$typography, 'h6', 'letter-spacing'),
  $card-title-line-height: tools.map-deep-get(.$typography, 'h6', 'line-height'),
  $card-subtitle-font-size: tools.map-deep-get(.$typography, 'body-2', 'size'),
  $card-subtitle-font-weight: tools.map-deep-get(.$typography, 'body-2', 'weight'),
  $card-subtitle-letter-spacing: tools.map-deep-get(.$typography, 'body-2', 'letter-spacing'),
  $card-subtitle-line-height: tools.map-deep-get(.$typography, 'body-2', 'line-height'),
  $card-text-font-size: tools.map-deep-get(.$typography, 'body-2', 'size'),
  $card-text-font-weight: tools.map-deep-get(.$typography, 'body-2', 'weight'),
  $card-text-letter-spacing: tools.map-deep-get(.$typography, 'body-2', 'letter-spacing'),
  $card-text-line-height: tools.map-deep-get(.$typography, 'body-2', 'line-height'),
  $card-text-text-transform: tools.map-deep-get(.$typography, 'body-2', 'text-transform'),
  $chip-font-size: tools.map-deep-get(.$typography, "button", "size"),
  $dialog-card-text-letter-spacing: tools.map-deep-get(.$typography, 'body-1', 'letter-spacing'),
  $empty-state-headline-font-size: functions.map-deep-get(.$typography, 'h2', 'size'),
  $empty-state-headline-font-weight: functions.map-deep-get(.$typography, 'h2', 'weight'),
  $empty-state-headline-line-height: functions.map-deep-get(.$typography, 'h2', 'line-height'),
  $empty-state-headline-mobile-font-size: functions.map-deep-get(.$typography, 'h4', 'size'),
  $empty-state-text-font-size: functions.map-deep-get(.$typography, 'body-2', 'size'),
  $empty-state-text-font-weight: functions.map-deep-get(.$typography, 'body-2', 'weight'),
  $empty-state-text-line-height: functions.map-deep-get(.$typography, 'body-2', 'line-height'),
  $empty-state-title-font-size: functions.map-deep-get(.$typography, 'h6', 'size'),
  $empty-state-title-font-weight: functions.map-deep-get(.$typography, 'h6', 'weight'),
  $empty-state-title-line-height: functions.map-deep-get(.$typography, 'h6', 'line-height'),
  $fab-font-size: tools.map-deep-get(.$typography, 'button', 'size'),
  $fab-font-weight: tools.map-deep-get(.$typography, 'button', 'weight'),
  $input-font-size: tools.map-deep-get(.$typography, 'body-1', 'size'),
  $input-font-weight: tools.map-deep-get(.$typography, 'body-1', 'weight'),
  $list-item-nav-subtitle-font-weight: tools.map-deep-get(.$typography, 'body-2', 'weight'),
  $list-item-nav-subtitle-letter-spacing: tools.map-deep-get(.$typography, 'body-2', 'letter-spacing'),
  $list-item-subtitle-font-size: tools.map-deep-get(.$typography, 'body-2', 'size'),
  $list-item-subtitle-font-weight: tools.map-deep-get(.$typography, 'body-2', 'weight'),
  $list-item-subtitle-letter-spacing: tools.map-deep-get(.$typography, 'body-2', 'letter-spacing'),
  $list-item-title-font-size: tools.map-deep-get(.$typography, 'body-1', 'size'),
  $list-item-title-font-weight: tools.map-deep-get(.$typography, 'body-1', 'weight'),
  $list-item-title-letter-spacing: tools.map-deep-get(.$typography, 'subtitle-1', 'letter-spacing'),
  $list-item-title-line-height: tools.map-deep-get(.$typography, 'body-1', 'line-height'),
  $slider-thumb-label-font-size: tools.map-deep-get(.$typography, 'caption', 'size'),
  $snackbar-font-size: tools.map-deep-get(.$typography, 'body-2', 'size'),
  $snackbar-font-weight: tools.map-deep-get(.$typography, 'body-2', 'weight'),
  $snackbar-letter-spacing: tools.map-deep-get(.$typography, 'body-2', 'letter-spacing'),
  $snackbar-line-height: tools.map-deep-get(.$typography, 'body-2', 'line-height'),
  $system-bar-font-size: tools.map-deep-get(.$typography, 'caption', 'size'),
  $system-bar-font-weight: tools.map-deep-get(.$typography, 'caption', 'weight'),
  $system-bar-letter-spacing: tools.map-deep-get(.$typography, 'caption', 'letter-spacing'),
  $system-bar-line-height: tools.map-deep-get(.$typography, 'caption', 'line-height'),
  $system-bar-text-transform: tools.map-deep-get(.$typography, 'caption', 'text-transform'),
  $table-header-font-size: tools.map-deep-get(.$typography, 'caption', 'size'),
  $table-font-size: tools.map-deep-get(.$typography, 'body-2', 'size'),
  $table-row-font-size: tools.map-deep-get(.$typography, 'subtitle-2', 'size'),
  $icon-btn-font-size: tools.map-deep-get(.$typography, 'button', 'size'),
  $icon-btn-font-weight: tools.map-deep-get(.$typography, 'button', 'weight'),
);
```
