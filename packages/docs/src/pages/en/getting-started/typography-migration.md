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

This page describes changes introduced in **v4.0.0** and maps the legacy Vuetify typography variants from `styles/settings/_variables.scss` to the new Material Design 3 (MD3) variants in `composables/typography.ts`.

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

If your app has some customization applied to `$typography`, it needs to be moved to JS configuration.

```scss { resource="src/settings.scss" }
// Before (SCSS)
use 'vuetify/settings' with (
  $typography: ( // <- remove whole group
    'h1': (
      'size': 3rem, // adjusted from 6rem
      'weight': 400, // adjusted from 300
    ),
  ),
)
```

```ts { resource="src/plugins/vuetify.ts" }
// After (JS)
export default createVuetify({
  typography: {
    variants: {
      'display-large' {
        fontSize: 3rem, // adjusted from 57px (3.5625rem)
        // fontWeight: 400, <- can be skipped, same as default
      },
    },
  },
})
```

### 2. Custom Variants

If you had custom typography variants in Sass:

```scss { resource="src/settings.scss" }
// Before (SCSS)
use 'vuetify/settings' with (
  $typography: (
    'custom-heading': (
      'size': 2rem,
      'weight': 600,
      'line-height': 1.2,
      'letter-spacing': 0
    ),
  ),
);
```

Migrate to JS configuration:

```ts { resource="src/plugins/vuetify.ts" }
// After (JS)
export default createVuetify({
  typography: {
    variants: {
      'custom-heading': {
        fontSize: 2rem,
        lineHeight: 1.2,
        fontWeight: 600,
        letterSpacing: '0px',
      },
    },
  },
})
```

### 3. Typography Variables

The new system supports CSS custom property variables:

```ts { resource="src/plugins/vuetify.ts" }
createVuetify({
  typography: {
    variables: {
      'font-title': '"Open Sans", sans-serif', // add new family
      'font-brand': '"Inter", sans-serif', // override existing
    },
    variants: {
      'display-large': {
        fontFamily: 'var:font-title',
        // ... other styles
      }
    }
  }
})
```

### 4. Responsive Typography

The new system includes built-in responsive classes. It works the same as in **v3.x** - breakpoint follows the main `text-` prefix.

```html
<h1 class="text-headline-medium text-md-display-small text-lg-display-large">
  Responsive Title
</h1>
```

The format is `text-{breakpoint}-{variant}`, for example:

- `text-md-display-small` - applies `display-small` variant at `md` breakpoint and up
- `text-lg-display-large` - applies `display-large` variant at `lg` breakpoint and up

## Key Differences

| Feature         | Legacy (SCSS)        | MD3 (JS)                             |
|-----------------|----------------------|--------------------------------------|
| Configuration   | SCSS variables       | JS options                           |
| Units           | rem/em               | px                                   |
| Line height     | Unitless ratio       | px values                            |
| Responsive      | Supported            | Supported                            |
| Runtime changes | Not supported        | Reactive                             |
| SSR             | Requires compilation | CSS injection                        |
| Scoping         | Global               | Optional scoping via `scoped` option |

## Breaking Changes

1. **Class names**: All default typography classes changed to align with Material Design 3
2. **No text-transform by default**: The `overline` → `label-small` is not an equvalent replacement as it looses `uppercase`, letter spacing is 3x smaller, etc.
3. **Different sizing**: MD3 variants follow Material Design 3 specifications which differ from MD2

### Restoring MD2 typography

If you want to avoid visual regression entirely, you can restore MD2 typography using the following configuration snippet:

```ts { resource="src/plugins/vuetify.ts" }
createVuetify({
  typography: {
    merge: false, // <- do not merge variants and variables from MD3
    variables: {
      'font-heading': '"Roboto", sans-serif',
      'font-body': '"Roboto", sans-serif',
    },
    variants: {
      'h1': {
        fontFamily: 'var:font-heading',
        fontSize: '6rem',
        lineHeight: 1,
        fontWeight: 300,
        letterSpacing: '-.015625em'
      },
      'h2': {
        fontFamily: 'var:font-heading',
        fontSize: '3.75rem',
        lineHeight: 1,
        fontWeight: 300,
        letterSpacing: '-.0083333333em'
      },
      'h3': {
        fontFamily: 'var:font-heading',
        fontSize: '3rem',
        lineHeight: 1.05,
        fontWeight: 400,
        letterSpacing: 'normal'
      },
      'h4': {
        fontFamily: 'var:font-heading',
        fontSize: '2.125rem',
        lineHeight: 1.175,
        fontWeight: 400,
        letterSpacing: '.0073529412em'
      },
      'h5': {
        fontFamily: 'var:font-heading',
        fontSize: '1.5rem',
        lineHeight: 1.333,
        fontWeight: 400,
        letterSpacing: 'normal'
      },
      'h6': {
        fontFamily: 'var:font-heading',
        fontSize: '1.25rem',
        lineHeight: 1.6,
        fontWeight: 500,
        letterSpacing: '.0125em'
      },
      'subtitle-1': {
        fontFamily: 'var:font-body',
        fontSize: '1rem',
        lineHeight: 1.75,
        fontWeight: 400,
        letterSpacing: '.009375em'
      },
      'subtitle-2': {
        fontFamily: 'var:font-body',
        fontSize: '.875rem',
        lineHeight: 1.6,
        fontWeight: 500,
        letterSpacing: '.0071428571em'
      },
      'body-1': {
        fontFamily: 'var:font-body',
        fontSize: '1rem',
        lineHeight: 1.5,
        fontWeight: 400,
        letterSpacing: '.03125em'
      },
      'body-2': {
        fontFamily: 'var:font-body',
        fontSize: '.875rem',
        lineHeight: 1.425,
        fontWeight: 400,
        letterSpacing: '.0178571429em'
      },
      'button': {
        fontFamily: 'var:font-body',
        fontSize: '.875rem',
        lineHeight: 2.6,
        fontWeight: 500,
        letterSpacing: '.0892857143em',
        textTransform: 'uppercase'
      },
      'caption': {
        fontFamily: 'var:font-body',
        fontSize: '.75rem',
        lineHeight: 1.667,
        fontWeight: 400,
        letterSpacing: '.0333333333em'
      },
      'overline': {
        fontFamily: 'var:font-body',
        fontSize: '.75rem',
        lineHeight: 2.667,
        fontWeight: 500,
        letterSpacing: '.1666666667em',
        textTransform: 'uppercase'
      },
    }
  }
})
```
