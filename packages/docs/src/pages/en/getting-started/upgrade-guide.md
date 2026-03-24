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

## Locale

Vuetify's locale system is now powered by `@vuetify/v0` under the hood. The consumer-facing API (`useLocale`, `useRtl`, `VLocaleProvider`) is unchanged for the majority of users. If you only use `t()`, `n()`, `current`, `isRtl`, `rtlClasses`, or `decimalSeparator`, no changes are needed.

### LocaleInstance

Several properties have been removed from the `LocaleInstance` type:

- `provide()` — use `VLocaleProvider` or the `provideLocale()` composable instead
- `name` — adapter identity is no longer exposed
- `messages` — messages are managed internally; register them via `createVuetify({ locale: { messages } })`
- `fallback` — configure at creation time via `createVuetify({ locale: { fallback: 'en' } })`

```diff
  const locale = useLocale()

- const scoped = locale.provide({ locale: 'fr' })
- console.log(locale.name) // 'vuetify'
- console.log(locale.messages.value)
- console.log(locale.fallback.value)
```

### vue-i18n adapter

The vue-i18n adapter continues to work with the same import path and configuration. No changes required.
