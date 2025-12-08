# Typography Migration Guide: MD2 → MD3

This document tracks the migration of Material Design 2 typography variant names to Material Design 3 equivalents in Vuetify's Sass/SCSS files.

## Migration Mappings

| Old Variant (MD2) | New Variant (MD3) | Notes |
|-------------------|-------------------|-------|
| `button` | `label-large` | Same size (0.875rem/14px) and weight (500) |
| `caption` | `label-small` | Similar size (0.75rem → 11px), weight differs (400 → 500) |
| `overline` | `label-small` | Similar size (0.75rem → 11px), weight matches (500) |
| `subtitle-1` | `body-large` | Same size (1rem/16px), weight differs (normal → 400). Note: Example suggested `title-small` but it doesn't exist in MD3 system, so `body-large` is used as the closest match. |
| `subtitle-2` | `label-large` | Same size (0.875rem/14px) and weight (500). Note: Example suggested `title-medium` but it doesn't exist in MD3 system, so `label-large` is used as the exact match. |
| `body-1` | `body-large` | Same size (1rem/16px) and weight (400) |
| `body-2` | `body-medium` | Same size (0.875rem/14px) and weight (400) |
| `h2` | `headline-large` | Size differs (3.75rem/60px → 32px), closest match |
| `h4` | `headline-medium` | Size differs (2.125rem/34px → 28px), closest match |
| `h6` | `headline-small` | Size differs (1.25rem/20px → 24px), closest match |

## Original Values (for reference)

### MD2 Variants
- **button**: size: 0.875rem, weight: 500, line-height: 2.6, letter-spacing: 0.0892857143em
- **caption**: size: 0.75rem, weight: 400, line-height: 1.667, letter-spacing: 0.0333333333em
- **overline**: size: 0.75rem, weight: 500, line-height: 2.667, letter-spacing: 0.1666666667em, text-transform: uppercase
- **subtitle-1**: size: 1rem, weight: normal, line-height: 1.75, letter-spacing: 0.009375em
- **subtitle-2**: size: 0.875rem, weight: 500, line-height: 1.6, letter-spacing: 0.0071428571em
- **body-1**: size: 1rem, weight: 400, line-height: 1.5, letter-spacing: 0.03125em
- **body-2**: size: 0.875rem, weight: 400, line-height: 1.425, letter-spacing: 0.0178571429em
- **h2**: size: 3.75rem, weight: 300, line-height: 1, letter-spacing: -0.0083333333em
- **h4**: size: 2.125rem, weight: 400, line-height: 1.175, letter-spacing: 0.0073529412em
- **h6**: size: 1.25rem, weight: 500, line-height: 1.6, letter-spacing: 0.0125em

### MD3 Variants (for comparison)
- **label-large**: fontSize: 14px, fontWeight: 500, lineHeight: 20px, letterSpacing: 0.1px
- **label-small**: fontSize: 11px, fontWeight: 500, lineHeight: 16px, letterSpacing: 0.5px
- **body-large**: fontSize: 16px, fontWeight: 400, lineHeight: 24px, letterSpacing: 0.5px
- **body-medium**: fontSize: 14px, fontWeight: 400, lineHeight: 20px, letterSpacing: 0.25px
- **headline-large**: fontSize: 32px, fontWeight: 400, lineHeight: 40px, letterSpacing: 0px
- **headline-medium**: fontSize: 28px, fontWeight: 400, lineHeight: 36px, letterSpacing: 0px
- **headline-small**: fontSize: 24px, fontWeight: 400, lineHeight: 32px, letterSpacing: 0px

## Files Affected

The following files contain references to old MD2 typography variants:

1. `packages/vuetify/src/labs/VIconBtn/_variables.scss` - `button` (2 occurrences)
2. `packages/vuetify/src/components/VBtn/_variables.scss` - `button` (4 occurrences)
3. `packages/vuetify/src/components/VChip/_variables.scss` - `button` (1 occurrence)
4. `packages/vuetify/src/components/VFab/_variables.scss` - `button` (2 occurrences)
5. `packages/vuetify/src/components/VSnackbar/_variables.scss` - `body-2` (4 occurrences)
6. `packages/vuetify/src/components/VInput/_variables.scss` - `body-1` (2 occurrences)
7. `packages/vuetify/src/components/VTable/_variables.scss` - `caption`, `body-2`, `subtitle-2` (3 occurrences)
8. `packages/vuetify/src/components/VSystemBar/_variables.scss` - `caption` (5 occurrences)
9. `packages/vuetify/src/components/VSlider/_variables.scss` - `caption` (1 occurrence)
10. `packages/vuetify/src/components/VList/_variables.scss` - `body-1`, `body-2`, `subtitle-1` (7 occurrences)
11. `packages/vuetify/src/components/VEmptyState/_variables.scss` - `h2`, `h4`, `h6`, `body-2` (7 occurrences)
12. `packages/vuetify/src/components/VDialog/_variables.scss` - `body-1` (1 occurrence)
13. `packages/vuetify/src/components/VCard/_variables.scss` - `h6`, `body-2` (10 occurrences)
14. `packages/vuetify/src/components/VBreadcrumbs/_variables.scss` - `body-1`, `subtitle-2` (2 occurrences)
15. `packages/vuetify/src/components/VBanner/_variables.scss` - `body-2`, `subtitle-2` (2 occurrences)
16. `packages/vuetify/src/components/VAlert/_variables.scss` - `h6` (3 occurrences)
17. `packages/vuetify/src/components/VBottomNavigation/_variables.scss` - `caption` (1 occurrence)

## Migration Notes

- All replacements use `tools.map-deep-get(settings.$typography, '<new-name>', '<property>')` format
- The old MD2 variant names are still defined in `packages/vuetify/src/styles/settings/_variables.scss` for backward compatibility
- Visual regression testing recommended after migration
- Some size differences exist (especially for h2, h4, h6), so visual review is important

