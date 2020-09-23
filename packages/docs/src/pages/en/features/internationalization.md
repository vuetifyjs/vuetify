---
meta:
  title: Internationalization (i18n)
  description: Vuetify supports language Internationalization (i18n) from a wide range of locales and easily integrates vue-i18n.
  keywords: i18n, language, internationalization
related:
  - /features/accessibility/
  - /features/bidirectionality/
  - /introduction/why-vuetify/
---

# Internationalization (i18n)

Vuetify supports language Internationalization (i18n) of its components. When bootstrapping your application you can specify available locales and the currently active locale with the **current** option. The **lang** service also supports easy integration with [vue-i18n](#vue-i18n).

<entry-ad />

## Getting started

To set the available locales or the current locale, supply the `lang` option when installing Vuetify. The provided `locales` property will be merged with the already existing locales. You can change the locale during runtime through the `$vuetify` object on the Vue instance.

Currently Vuetify provides translations in the following languages:

- **af** - Afrikaans (Afrikaans)
- **ar** - Arabic (اللغة العربية)
- **ca** - Catalan (català)
- **cs** - Czech (čeština)
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
- **sv** - Swedish (svenska)
- **th** - Thai (ไทย)
- **tr** - Turkish (Türkçe)
- **uk** - Ukrainian (Українська)
- **zhHans** - Chinese (中文)
- **zhHant** - Chinese (中文)

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

// Translation provided by Vuetify (javascript)
import zhHans from 'vuetify/es5/locale/zh-Hans'

// Translation provided by Vuetify (typescript)
import pl from 'vuetify/src/locale/pl'

// Your own translation file
import sv from './i18n/vuetify/sv'

Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'sv'
    },
  },
})

export default new Vuetify({
  lang: {
    locales: { zhHans, pl, sv },
    current: 'zhHans',
  },
})
```

## API

- [internationalization](/api/internationalization)

## Caveats

<alert type="info">

  Vuetify provides only a basic translation function `t`. It is recommended for more advanced internationalization functions to make use of Vuetify's integration with [vue-i18n](#vue-i18n)

</alert>

## Creating a translation

To create your own translation, use the code below. You will inherit Vuetify's translations, but also can add your own. Alternatively, you can copy and paste the content of `vuetify/src/locale/en.ts`, but it'll require manual file syncing during updates.

```ts
import { en } from 'vuetify/src/locale'

export default {
  ...en,

  key1: "key 1 internationalization",
  key2: "key 2 internationalization",

  namespace: {
    key3: "key 3 internationalization"
  }
}
```

## Custom components

If you are building custom Vuetify components that need to hook into the internationalization engine, you can use the `t` function which is part of the `$vuetify.lang` API.

```html
<!-- Vue Component -->

<template>
  <div class="my-component">
    {{ $vuetify.lang.t('$vuetify.my-component.text') }}
  </div>
</template>
```

## Vue i18n

If you are using the vue-i18n package, you can very easily integrate it with Vuetify. This allows you to keep all of your translations in one place. Simply create an entry for $vuetify within your messages and add the corresponding language changes. Then hook up vue-i18n to Vuetify by supplying a custom translation function (as seen in the example below). For a complete list of all available keys, [navigate here](#creating-a-translation).

An important note when using external localization plugins is that vuetify will not automatically fall back to using english if no localization exists for the current locale. So be sure to supply the plugin with the english localizations as well as your own.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import VueI18n from 'vue-i18n'

Vue.use(Vuetify)
Vue.use(VueI18n)

const messages = {
  en: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: 'Items per page:',
        pageText: '{0}-{1} of {2}',
      },
    },
  },
  sv: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: 'Element per sida:',
        pageText: '{0}-{1} av {2}',
      },
    },
  },
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'sv', // set locale
  messages, // set locale messages
})

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params),
  },
})
```

<backmatter />
