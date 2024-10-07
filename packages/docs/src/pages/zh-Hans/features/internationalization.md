---
meta:
  title: 国际化 (i18n)
  description: Vuetify 支持不同地域的语言国际化 (i18n)，并且轻松集成 vue-i18n。
  keywords: i18n, 语言国际化
related:
  - /features/accessibility/
  - /features/bidirectionality/
  - /introduction/why-vuetify/
---

# 国际化多语言 (i18n)

Vuetify支持其组件的语言国际化（i18n）。 当引导应用程序时，您可以使用<strong x-id=“1”>current</strong>选项指定可用的区域和当前活动的区域。 **语言** 服务也支持与 [vue-i18n](#vue-i18n) 简单的结合。

<vuetify-ad slug="vs-video-i18n" />

## 快速入门

要设置可用的本地化语言或当前本地化语言，请在安装 Vuetify 时提供 `lang` 选项。 提供的 `locales` 属性将被合并到已存在的locales。 您可以在运行过程中通过 Vue 实例中的 `$vuetify` 对象更改区域设置。

目前，Vuetify 提供以下语言的翻译：

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

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

// Translation provided by Vuetify (javascript)
import zhHans from 'vuetify/lib/locale/zh-Hans'

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

<inline-api page="features/internationalization" />

## 注意

<alert type="info">

  Vuetify 只提供一个基本的翻译函数`t`。 对于更高级的国际化功能，建议整合使用Vuetify与[vue-i18n]（#vue-i18n）

</alert>

## 创建翻译

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

## 自定义组件

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

If you are using the vue-i18n package, you can very easily integrate it with Vuetify. 这允许您将您的所有翻译保存在一个地方。 只需要在您的messages中为 $vuetify 创建一个入口并添加相应的语言更改。 Then hook up vue-i18n to Vuetify by supplying a custom translation function (as seen in the example below). For a complete list of all available keys, [navigate here](#creating-a-translation).

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

// 使用选项创建 VueI18n 实例
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
