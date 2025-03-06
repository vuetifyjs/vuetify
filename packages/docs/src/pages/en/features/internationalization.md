---
meta:
  title: Internationalization (i18n)
  description: Vuetify supports language Internationalization (i18n) from a wide range of locales and easily integrates vue-i18n.
  keywords: i18n, language, internationalization
related:
  - /features/accessibility/
  - /components/locale-providers/
  - /getting-started/browser-support/
features:
  github: /composables/locale.ts
  label: 'i18n'
  report: true
---

# Internationalization (i18n)

Vuetify supports language Internationalization (i18n) of its components.

<PageFeatures />

<PromotedEntry />

When bootstrapping your application you can specify available locales and the default locale with the **defaultLocale** option. The **locale** service also supports easy integration with [vue-i18n](https://vue-i18n.intlify.dev/). Using a locale that has an RTL (right-to-left) language also affects the directionality of the Vuetify components.

## Getting started

To set the available locale messages or the default locale, supply the **locale** option when installing Vuetify.

```js { resource="main.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

// Translations provided by Vuetify
import { pl, zhHans } from 'vuetify/locale'

// Your own translation file
import sv from './i18n/vuetify/sv'

const app = createApp()

const vuetify = createVuetify({
  locale: {
    locale: 'zhHans',
    fallback: 'sv',
    messages: { zhHans, pl, sv },
  },
})

app.use(vuetify)

app.mount('#app')
```

You can change the locale during runtime by using the `useLocale` composable.

```html { resource="Composition.vue" }
<script setup>
  import { useLocale } from 'vuetify'

  const { current } = useLocale()

  function changeLocale (locale) {
    current.value = locale
  }
</script>
```

If you are still using the Options API, you can access the locale settings on `this.$vuetify.locale`.

```html { resource="Options.vue" }
<script>
  export default {
    methods: {
      changeLocale (locale) {
        this.$vuetify.locale.current = locale
      },
    },
  }
</script>
```

## API

| Feature | Description |
| - | - |
| [useLocale](/api/use-locale/) | The locale composable is used |
| [v-locale-provider](/api/v-locale-provider/) | The locale provider component is used to scope a portion of your application to a different locale than the default one |

<ApiInline hide-links />

## Scoped languages

Using the `v-locale-provider` component it is possible to scope a portion of your application to a different locale than the default one.

```html { resource="src/App.vue" }
<template>
  <v-app>
    <v-select></v-select> <!-- Will use default locale -->

    <v-locale-provider locale="ja">
      <v-select></v-select> <!-- Will use ja locale -->
    </v-locale-provider>
  </v-app>
</template>
```

## RTL

RTL (Right To Left) support is built in for all localizations that ship with Vuetify. If a [supported language](#supported-languages) is flagged as RTL, all content directions are automatically switched. See the [next section](#creating-a-custom-locale) for information on how to add RTL support to a custom locale.

The following example demonstrates how to force RTL for a specific section of your content, without switching the current language, by using the `v-locale-provider` component:

```html { resource="src/App.vue" }
<v-app>
  <v-card>...</v-card> <!-- default locale used here -->

  <v-locale-provider rtl>
    <v-card>...<v-card> <!-- default locale used here, but with RTL active -->
  </v-locale-provider>
</v-app>
```

## Creating a custom locale

To create your own locale messages, copy and paste the content of `vuetify/src/locale/en.ts` to a new file, and change the localized strings. You can also specify if they should be displayed RTL or not by using the `rtl` property of the locale options.

```js { resource="src/locales/customLocale.js" }
export default {
  badge: '...',
  close: '...',
  ...
}
```

```js { resource="src/main.js" }
import { createVuetify } from 'vuetify'
import customLocale from './locales/customLocale'

const vuetify = createVuetify({
  locale: {
    locale: 'customLocale',
    messages: { customLocale },
    rtl: {
      customLocale: true,
    },
  },
})
```

## Custom Vuetify components

If you are building custom Vuetify components that need to hook into the locale service, you can use the `t` function from the **useLocale** composable, or the `$vuetify.locale` property when using Options API.

```html { resource="Component.vue" }
<template>
  <div class="my-component">
    {{ text }}
  </div>
</template>

<script setup>
  import { useLocale } from 'vuetify'

  const { t } = useLocale()
  const text = t('$vuetify.my-component.text')
</script>
```

::: warning
  The Vuetify locale service only provides a basic translation function `t`, and should really only be used for internal or custom Vuetify components. It is recommended that you use a proper i18n library such as [vue-i18n](https://vue-i18n.intlify.dev/) in your own application. Vuetify does provide support for integrating with other libraries.
:::

## vue-i18n

If you are using the vue-i18n library, you can very easily integrate it with Vuetify. This allows you to keep all of your translations in one place. Simply create an entry for $vuetify within your messages and add the corresponding language changes. Then hook up vue-i18n to Vuetify by using the provided adapter function (as seen in the example below).

```js { resource="src/main.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { createI18n, useI18n } from 'vue-i18n'
import { en, sv } from 'vuetify/locale'

const messages = {
  en: {
    $vuetify: {
      ...en,
      dataIterator: {
        rowsPerPageText: 'Items per page:',
        pageText: '{0}-{1} of {2}',
      },
    },
  },
  sv: {
    $vuetify: {
      ...sv,
      dataIterator: {
        rowsPerPageText: 'Element per sida:',
        pageText: '{0}-{1} av {2}',
      },
    },
  },
}

const i18n = createI18n({
  legacy: false, // Vuetify does not support the legacy mode of vue-i18n
  locale: 'sv',
  fallbackLocale: 'en',
  messages,
})

const vuetify = createVuetify({
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
})

const app = createApp()

app.use(i18n)
app.use(vuetify)

app.mount('#app')
```

## Supported languages

Currently Vuetify provides translations in the following languages:

- **af** - Afrikaans (Afrikaans)
- **ar** - Arabic (العربية)
- **az** - Azerbaijani (Azərbaycan)
- **bg** - Bulgarian (български)
- **ca** - Catalan (català)
- **ckb** - Central Kurdish (کوردی)
- **cs** - Czech (čeština)
- **da** - Danish (Dansk)
- **de** - German (Deutsch)
- **el** - Greek (Ελληνικά)
- **en** - English
- **es** - Spanish (Español)
- **et** - Estonian (eesti)
- **fa** - Persian (فارسی)
- **fi** - Finnish (suomi)
- **fr** - French (Français)
- **he** - Hebrew (עברית)
- **hr** - Croatian (hrvatski jezik)
- **hu** - Hungarian (magyar)
- **id** - Indonesian (Indonesian)
- **it** - Italian (Italiano)
- **ja** - Japanese (日本語)
- **km** - Khmer (ខ្មែរ)
- **ko** - Korean (한국어)
- **lt** - Lithuanian (lietuvių kalba)
- **lv** - Latvian (latviešu valoda)
- **nl** - Dutch (Nederlands)
- **no** - Norwegian (Norsk)
- **pl** - Polish (język polski)
- **pt** - Portuguese (Português)
- **ro** - Romanian (Română)
- **ru** - Russian (Русский)
- **sk** - Slovak (slovenčina)
- **sl** - Slovene (slovenski jezik)
- **srCyrl** - Serbian (српски језик)
- **srLatn** - Serbian (srpski jezik)
- **sv** - Swedish (svenska)
- **th** - Thai (ไทย)
- **tr** - Turkish (Türkçe)
- **uk** - Ukrainian (Українська)
- **vi** - Vietnamese (Tiếng Việt)
- **zhHans** - Chinese (中文)
- **zhHant** - Chinese (正體中文)
