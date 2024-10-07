---
meta:
  title: テーマの設定
  description: アプリケーションのテーマと補助色をあっという間にセットアップします。
  keywords: テーマ
related:
  - /styles/colors/
  - /styles/transitions/
  - /getting-started/wireframes/
nav: テーマ
---

# テーマの設定

アプリケーションの色をプログラムで簡単に変更できます。 デフォルトのスタイルシートを再構築し、特定のニーズに合わせてフレームワークのさまざまな面をカスタマイズします。

<promoted-ad slug="vuemastery-themes" />

## テーマジェネレータ

**テーマジェネレータ** ツールを使用し、 [Vuetify](https://theme-generator.vuetifyjs.com) アプリケーションの新しいカラーテーマを発見・生成しましょう。

## テーマ対応

VuetifyはMaterial Design specの **Light** と **Dark** の両方のバリエーションをサポートしています。 この指定は、ルートアプリケーションコンポーネントである`v-app`から始まり、ほとんどのコンポーネントでサポートされています。 デフォルトでは、アプリケーションは**light**テーマを使用しますが、テーマサービスに**dark**オプションを追加することで簡単に上書きできます。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { dark: true },
})
```

コンポーネントを light または dark に指定すると、コンポーネントの子要素はすべて、特に指定されていない限り継承され、適用されます。 `this.$vuetify.theme.dark`を**true**または**false**に変更することで、手動で**dark**のオン/オフを切り替えることができます。

## カスタマイズ

デフォルトでは、Vuetify はすべてのコンポーネントに適用される標準テーマを持っています。

```js
{
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
}
```

これは簡単に変更できます。 **テーマ** プロパティを Vuetify コンストラクタに渡すだけです。 デフォルトから継承されるテーマプロパティを使用して、すべてまたは一部のみを変更することができます。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
})
```

定義済みのマテリアルカラーを使用することもできます。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
})
```

デフォルトでは、テーマサービスはアプリケーションのメインカラーを **anchor** タグに使用します。 テーマにanchorプロパティを追加することでオーバーライドできます:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        anchor: '#8c9eff',
      },
    },
  },
})
```

Vuetify はこれらの値に基づいて css クラスを生成し、DOM でアクセスできるようにします。 これらのクラスは、他のヘルパークラス、例えばテキストなどの`primary` または`secondary--text`クラスと同じマークアップに従います。 カラーオブジェクト全体を指定した場合 (上記の `colors.purple` のように)、明暗lighten/darkenのバリエーションは生成されるのではなく、直接使用されます。

これらの値は、**theme** プロパティの下のインスタンス **$vuetify** オブジェクトでも利用可能になります。 これにより、テーマを _動的_ 変更することができます。 舞台裏では、Vuetifyはテーマクラスを再生成して更新し、アプリケーションをシームレスに更新します。

```js
// Light theme
this.$vuetify.theme.themes.light.primary = '#4caf50'

// Dark theme
this.$vuetify.theme.themes.dark.primary = '#4caf50'
```

### カスタムテーマのバリエーション

Vuetifyはテーマの色を _lighten_ 、 _darken_ バリエーションを自動的に生成しますが、自分で制御したい場合があります。 変更したいバリエーションを含むテーマオブジェクトを渡すだけです。 指定されていないものは、あなたのために生成されます。

```js
// src/plugins/vuetify/theme.js

import colors from 'vuetify/lib/util/colors'

export default {
  primary: {
    base: colors.purple.base,
    darken1: colors.purple.darken2,
  },
  secondary: colors.indigo,
  // すべてのキーでテーマスタイルが生成されます。
  // ここでは、カスタムの `tertiary` カラーを追加します。
  tertiary: colors.pink.base,
}
```

これで、カスタムテーマオブジェクトをインポートしてVuetifyに適用できます。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import light from './theme'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: { light },
  },
})
```

以下は、themeオブジェクトの上書き可能なキーの完全なリストです:

```ts
interface ParsedThemeItem {
  base: string
  lighten5: string
  lighten4: string
  lighten3: string
  lighten2: string
  lighten1: string
  darken1: string
  darken2: string
  darken3: string
  darken4: string

  [name: string]: string
}
```

### テーマを無効にする

**disable** プロパティの値を **true** にすることで、テーマ機能を無効にできます。 これにより、Vuetifyスタイルシートが作成されなくなります。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const vuetify = new Vuetify({
  theme: { disable: true },
})
```

## オプション

Vuetifyは、SPAの場合はランタイムで、SSRアプリケーションの場合はサーバーサイドでテーマスタイルを生成します。 生成されたスタイルは、**vuetify-theme-stylesheet** の**id**を持ち`<style>` タグ内に配置されます。

### Minification

`minifyTheme` オプションを使用すると、カスタムのミニフィケーション実装を提供できます。 これは初期ページサイズを小さくするのに役立ち、[`options.themeCache`と組み合わせることが推奨されています](#caching)。 この例では、 [生成されたテーマスタイル](https://github.com/bentatum/minify-css-string) をミニファイするために *minify-css-string*パッケージを使用します。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import minifyTheme from 'minify-css-string'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: { minifyTheme },
  },
})
```

### キャッシュ

カスタム `themeCache` の実装を渡すオプションがあります。 これにより、テーマオブジェクトの再計算の必要性をスキップできます。 以下は [localStorage](https://developer.mozilla.org/ja/docs/Web/API/Window/localStorage) プロパティを使用した例です。

```js
// src/plugins/vuetify.js

export default new Vuetify({
  theme: {
    options: {
      themeCache: {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
      },
    },
  },
})
```

<alert type="warning">

  提供された `themeCache` オブジェクトは `get` と `set` メソッドを含んでいる **必要** があります。 *生成された css* 文字列を取得し設定するために使用します。

</alert>

キャッシュは [lru-cache](https://github.com/isaacs/node-lru-cache) を介して行うこともできます。 これは、SSR (サーバ・サイド・レンダリング) アプリケーションで特に便利です。

```js
// src/plugins/vuetify.js

const themeCache = new LRU({
  max: 10,
  maxAge: 1000 * 60 * 60, // 1 hour
})

export default new Vuetify({
  theme: {
    options: { themeCache },
  },
})
```

### カスタムプロパティ

`customProperties` を有効にすると、[css 変数](https://developer.mozilla.org/ja/docs/Web/CSS/--*) を各テーマの色ごとに生成します。`<style>`ブロックで使用できます。

<alert type="warning">

  カスタムプロパティは、Internet Explorerではネイティブにサポートされていません。 Internet Explorer 11では、Polyfill で利用できます。**ただし、いくつかの制限があります**:

- [Custom properties polyfill](https://github.com/nuxodin/ie11CustomProperties)
- [CSS var polyfill](https://github.com/jildenbiddle/css-vars-ponyfill)

</alert>

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  theme: {
    options: { customProperties: true },
  },
})
```

```html
<style scoped>
  .something {
    color: var(--v-primary-base);
    background-color: var(--v-accent-lighten2);
  }
</style>
```

### CSP nonce

`script-src` または `style-src` CSP ルールが有効になっているページでは、組み込みスタイルタグに **nonce** を指定する必要があります。

```html
<!-- Use with script-src -->
Content-Security-Policy: script-src 'self' 'nonce-dQw4w9WgXcQ'

<!-- Use with style-src -->
Content-Security-Policy: style-src 'self' 'nonce-dQw4w9WgXcQ'
```

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  theme: {
    options: { cspNonce: 'dQw4w9WgXcQ' },
  },
})
```

### バリエーション

When Vuetify generates your *application's theme*, it creates **9 variants** for each color. For majority of users, these variants are rarely used. This is an **opt in** feature that will be __false by default__ in the next major version.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  theme: {
    options: { variations: false },
  },
})
```

## Theme Provider

Vuetifyのテーマシステムは、 [Vueの機能](https://jp.vuejs.org/v2/api/#provide-inject) により提供しています。 There may be situations in which you need to manually change the provided theme (dark or light).

### API

- [v-theme-provider](/api/v-theme-provider)

<inline-api page="features/theme" />

### 例

Use the `v-theme-provider` to manually overwrite all children component's current theme **(light/dark)**. In the following example, the root `v-card` is explicitly set to `dark` with 2 children lists. The first one inherits from the parent `v-card` while the second is explicitly set to match the **root** Vuetify theme.

<example file="theme/misc-provider" />

<backmatter />
