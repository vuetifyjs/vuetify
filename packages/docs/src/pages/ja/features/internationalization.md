---
meta:
  title: 国際化 (i18n)
  description: Vuetifyは、幅広いロケールの国際化(i18n)をサポートし、vue-i18nを簡単に統合できます。
  keywords: i18n, language, internationalization
related:
  - /features/accessibility/
  - /features/bidirectionality/
  - /introduction/why-vuetify/
---

# 国際化 (i18n)

Vuetifyはコンポーネントの言語国際化(i18n)をサポートしています。 アプリケーションの起動時には、 **current** オプションで利用可能なロケールと現在アクティブなロケールを指定できます。 **lang**  サービスは、  [vue-i18n](#vue-i18n) との簡単な統合もサポートしています。

<vuetify-ad slug="vs-video-i18n" />

## はじめましょう

利用可能なロケールまたは現在のロケールを設定するには、Vuetifyをインストールするときに `lang` オプションを指定します。 指定された `locales` プロパティは既存のロケールとマージされます。 Vue インスタンスの `$vuetify` オブジェクトを実行時にロケールを変更できます。

現在Vuetifyは、以下の言語の翻訳を提供しています:

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
- **sl** - Slovene (slovenski jezik
- **srCyrl** - Serbian (српски језик)
- **srLatn** - Serbian (srpski jezik)
- **sv** - Swedish (svenska)
- **th** - Thai (ไทย)
- **tr** - Turkish (Türkçe)
- **uk** - Ukrainian (Українська)
- **vi** - Vietnamese (Tiếng Việt)
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

## 注意事項

<alert type="info">

  Vuetifyは基本的な翻訳関数 `t` のみを提供します。 より高度な国際化機能には、Vuetify の [vue-i18n](#vue-i18n) との統合を利用することをお勧めします。

</alert>

## 翻訳の作成

独自の翻訳を作成するには、以下のコードを使用してください。 Vuetifyの翻訳を引き継ぎますが、独自の翻訳を追加することもできます。 あるいは、`vuetify/src/locale/en.ts`の内容をコピー＆ペーストすることもできますが、アップデート時に手動でファイルを同期させる必要があります。

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

## カスタムコンポーネント

国際化エンジンにフックする必要があるカスタム Vuetify コンポーネントを構築する場合は、`$vuetify.lang` API の一部である `t` 関数を使用できます。

```html
<!-- Vue Component -->

<template>
  <div class="my-component">
    {{ $vuetify.lang.t('$vuetify.my-component.text') }}
  </div>
</template>
```

## Vue i18n

vue-i18nパッケージを使用している場合は、Vuetifyと簡単に統合できます。 これにより、すべての翻訳を一箇所に保存できます。 メッセージ内に $vuetify のエントリを作成し、対応する言語の変更を追加するだけです。 Then hook up vue-i18n to Vuetify by supplying a custom translation function (as seen in the example below). For a complete list of all available keys, [navigate here](#creating-a-translation).

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
