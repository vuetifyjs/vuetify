---
meta:
  nav: Locale providers
  title: Locale provider component
  description: The locale provider allows you to modify the application's current language scoped within a template
  keywords: locale provider, vuetify locale provider component, vue locale provider component
related:
  - /features/internationalization/
  - /features/global-configuration/
  - /getting-started/browser-support/
features:
  github: /components/VLocaleProvider/
  label: 'C: VLocaleProvider'
  report: true
---

# Locale providers

The `v-locale-provider` component changes the language and text direction for a section of your application.

<PageFeatures />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-locale-provider](/api/v-locale-provider/) | Primary Component |

<ApiInline hide-links />

## Guide

**locale** takes a locale code such as `de`, `ja` or `ar`. Dates and numbers format for it right away. Component text needs messages for that locale, registered in `createVuetify` or passed through **messages**, which replaces the registered messages inside the provider.

Text direction follows the locale unless **rtl** is set. Media controls are a typical piece you'd rather keep consitent for every user:

```html
<v-locale-provider :rtl="false">
  <!-- force LTR for all locales the app supports -->
  <v-toolbar density="compact">
    <v-btn icon="mdi-skip-previous"></v-btn>
    <v-btn icon="mdi-play"></v-btn>
    <v-btn icon="mdi-skip-next"></v-btn>
    <v-slider v-model="progress" hide-details></v-slider>
  </v-toolbar>
</v-locale-provider>
```

See [Internationalization](/features/internationalization/#scoped-languages) for more.
