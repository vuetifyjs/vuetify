---
emphasized: true
meta:
  nav: Upgrade to v5
  title: Upgrade to v5
  description: Detailed instructions on how to upgrade Vuetify from v4 to v5
  keywords: migration, upgrade, releases, upgrading vuetify, v5
related:
  - /introduction/roadmap/
  - /introduction/long-term-support/
  - /getting-started/upgrade-guide/
---

# Upgrade Guide (v5)

This page contains a detailed list of breaking changes and the steps required to upgrade your application from Vuetify 4 to Vuetify 5.

<PageFeatures />

----

## Locale

Vuetify's locale system is now powered by `@vuetify/v0` under the hood. The consumer-facing API (`useLocale`, `useRtl`, `VLocaleProvider`) is unchanged, but some internal types and methods have been removed.

### Removed: `LocaleInstance.provide()`

The `provide()` method on `LocaleInstance` has been removed. Scoped locale contexts are created via `VLocaleProvider` or the `provideLocale()` composable.

```diff
- const locale = useLocale()
- const scoped = locale.provide({ locale: 'fr' })
+ // Use VLocaleProvider in templates or provideLocale() in setup
```

### Removed: `LocaleInstance.name`

The `name` field (`'vuetify'` or `'vue-i18n'`) has been removed. Adapter identity is now a `@vuetify/v0` concern.

### Removed: `LocaleInstance.messages`

The `messages` ref is no longer exposed on the public type. Messages are managed internally by `@vuetify/v0`'s token system. Register messages at creation time via `createVuetify({ locale: { messages } })`.

### Removed: `LocaleInstance.fallback`

The `fallback` ref is no longer exposed on the public type. Configure the fallback locale at creation time via `createVuetify({ locale: { fallback: 'en' } })`.

### vue-i18n adapter

The vue-i18n adapter continues to work with the same import path and configuration:

```ts
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'

const vuetify = createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
})
```

No changes are required for vue-i18n users.
