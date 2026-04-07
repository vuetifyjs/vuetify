---
emphasized: true
meta:
  nav: Upgrade guide
  title: Upgrade guide
  description: Detailed instructions on how to upgrade Vuetify from v4 to v5
  keywords: migration, upgrade, releases, upgrading vuetify, v5
related:
  - /introduction/roadmap/
  - /introduction/long-term-support/
  - /introduction/enterprise-support/
---

# Upgrade Guide

This page contains a detailed list of breaking changes and the steps required to upgrade your application from Vuetify 4 to Vuetify 5.

<PageFeatures />

## Theme

The theme system now uses `@vuetify/v0` under the hood. The consumer API (`useTheme`, `VThemeProvider`) is unchanged for most users.

### ThemeInstance

Several properties have been removed from the `ThemeInstance` type:

- `styles` — CSS injection is now handled internally by the theme adapter
- `isDisabled` — themes are always enabled
- `isSystem` — check `name.value === 'system'` directly

### Runtime theme changes

Assigning new themes directly to `themes.value` is replaced by `register()`:

```diff
- theme.themes.value.custom = { dark: true, colors: { primary: '#ff5722' } }
+ theme.register({ id: 'custom', dark: true, colors: { primary: '#ff5722' } })
```

Mutating existing theme colors continues to work:

```ts
theme.themes.value.light.colors.primary = '#ff0000'
```
