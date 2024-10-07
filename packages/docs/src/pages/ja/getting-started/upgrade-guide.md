---
meta:
  title: アップグレードガイド
  description: 最新のバグ修正、機能、機能を使用して Vuetify を最新の状態に保ちます。
  keywords: migration, upgrade guide, upgrading vuetify
related:
  - /introduction/long-term-support/
  - /getting-started/contributoring/
  - /introduction/roadmap/
---

# アップグレードガイド

## v1.5.x から v2.0.x へのアップグレード

バージョン2には、後方互換のない破壊的変更が含まれています。 これには以前に廃止予定となっていたv1.x.xの機能が含まれています。 これらの変更点は、対応するコンポーネントのコンソールに記載されています。

既存のグリッドはまだ動作しており、移行に役立つ [eslint プラグイン](https://github.com/vuetifyjs/eslint-plugin-vuetify) があります。 This plugin can also be used to help upgrade to the [**new grid**](/components/grids).

### Bootstrap

Vuetifyをインスタンス化し、初期Vueインスタンスに渡す必要があります。 これは、 **vue-router** と **vuex** がブートストラップされる方法に似ています。

#### Vue-CLI 3 Vuetifyプラグインのインストール

```js
// v1.5
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
})

// src/main.js
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

```js
// v2.0
// src/plugins/vuetify.js

import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});

// src/main.js
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
```

<promoted-ad slug="vuetify-open-collective" />

#### フルインストール

```js
// v1.5

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/main.styl'

const opts = { ... }
Vue.use(Vuetify, opts)

new Vue(...).$mount('#app')
```

```js
// v2.0

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

const opts = { ... }
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(opts)
}).$mount('#app')
```

#### A-La-Carteのインストール - vuetify-loader

```js
// v1.5

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/main.styl'

const opts = { ... }
Vue.use(Vuetify, opts)

new Vue(...).$mount('#app')
```

```js
// v2.0

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const opts = { ... }
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(opts)
}).$mount('#app')
```

### フレームワーク

以下のコンポーネントがデフォルトで **lazy** になりました。 つまり、コンポーネントが明示的にアクティブになるまでコンテンツをレンダリングしないことを意味します。 これはパフォーマンスを劇的に向上させますが、アプリケーションのニーズによっては必要ないかもしれません_(例： SEO目的)_. 以前の動作に戻すには、 **eager** propを使用してください。

- `v-badge`
- `v-menu`
- `v-tooltip`
- `v-dialog`
- `v-bottom-sheet`

`vuetify/lib` は現在 **es6** でコンパイルされています。 つまり、IE をサポートするには [`transpileDependencies`](https://cli.vuejs.org/config/#transpiledependencies) または同様のものを使用する必要があり、 `@babel/polyfill` と一緒に使用する必要があります。 トランスパイル依存関係は、vue-cli-3 を使用する場合に自動的に追加されます。 古いバージョンをお持ちの場合は、 'vuetify' をリストに追加するだけでOKです。

### テーマ

ダーク/ライトのテーマバリエーションをサポートするようになりました。 _dark_ プロパティがテーマプロパティに移動されました。 **$vuetify.theme.dark** に切り替えると動的に変更されます。 1つのバリエーションのみを使用する場合は、そのバリエーションの色を定義するだけです。

```js
// v1.5

const opts = {
  dark: true,
  theme: {
    primary: '...',
    ...
  }
}
```

```js
// v2.0

const opts = {
  theme: {
    dark: true,
    themes: {
      light: {
        primary: '...',
        ...
      },
      dark: {
        primary: '...',
        ...
      }
    }
  }
}
```

テーマのスタイルシートの生成を無効にするには、テーマオブジェクトの **disable** プロパティを使用する必要があります。

```js
// v1.5

const opts = {
  theme: false
}
```

```js
// v2.0
const opts = {
  theme: { disable: true }
}
```

### Icons

アイコンとアイコンフォントの宣言が **icons** プロパティでスコープ化されました。

```js
// v1.5

const opts = {
  iconfont: 'fa4',
  icons: { ... }
}
```

```js
// v2.0

const opts = {
  icons: {
    iconfont: 'fa4',
    values: { ... }
  }
}
```

- デフォルトでは [mdi](https://materialdesignicons.com/) アイコンを使用します。 For information on how to install please navigate [here](/features/icon-fonts#install-material-design-icons)
- Vuetifyオプションの **icons**プロパティ下に配置されるようになりました

カスタムアイコンフォントを使用したい場合は、Vuetifyオプションで設定する必要があります。

```js
// v1.5

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  iconfont: 'fa4'
})
```

```js
// v2.0

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify, {
  icons: {
    iconfont: 'fa4'
  }
})
```

### Goto - scrolling helper

インポート場所が変更されました。 **vue-router** のscroll-behaviorで使用するには、明示的に Vuetify インスタンスでブートストラップする必要があります。 Example of how to do this [here](https://github.com/vuetifyjs/vuetify/blob/v2-stable/packages/docs/src/router/scroll-behavior.js). Reference documentation for scroll-behavior usage [here](/features/scrolling/#use-with-router).

```js
// v1.5

import goTo from 'vuetify/es5/components/Vuetify/goTo'
```

```js
// v2.0

import goTo from 'vuetify/lib/services/goto'
```

<promoted-ad type="theme" />

### Lang

_translator_ 関数 **t** は lang プロパティの下にネストされるようになりました。

```js
// v1.5

this.$vuetify.t(...)
```

```js
// v2.0

this.$vuetify.lang.t(...)
```

### グリッド

グリッドはBootstrapをモデルに再構築されました。 既存のグリッドは引き続き機能しますが、若干の変更が必要です。 [Kael](https://github.com/KaelWD) が、このプロセスを支援するための eslint プラグインを作成しました。

- [eslint-plugin-vuetify](https://github.com/vuetifyjs/eslint-plugin-vuetify) **これらのほとんどを修正**
- 間隔ヘルパーが0-12 (0-48px) から 4 px の間隔を表示するように変更されました
- 例えば:  px-7 は 7 * 4 = 28px
- 3 → 4
- 4 → 6
- 5 → 12
- ほとんどの「ブレークポイント」と「非ブレークポイント」ヘルパーが正規化されています。例えば:  `.text-xs-center` が `text-center` になりました。上書きしない限り、すべての画面幅に適用されます。
- `.d-flex` の子要素には追加の flex ルールが適用されなくなりました。 これは `.flex-grow-1` で手動で適用できます。
- ヘルパークラスが変更されました:
- `.fluid` → `.container--fluid`
- `.scroll-y` → `.overflow-y-auto`
- `.hide-overflow` → `.overflow-hidden`
- `.show-overflow` → `.overflow-visible`
- `.no-wrap` → `.text-no-wrap`
- `.ellipsis` → `.text-truncate`
- `.left` → `.float-left`
- `.right` → `.float-right`
- `<v-layout row>` は、 `.row`が新しいグリッドの一部になったので、使用すべきではありません (#7956)。

スペースクラスを更新するには、次の正規表現を使用します:

```html
find: ([\s"][mp][axytblr])-5
replace: $1-12

find: ([\s]][mp][axytblr])-4
replace: $1-6

find: ([\s][mp][axytblr])-3
replace: $1-4
```

v2 グリッドと v1.5 を比較する例については、この [github gist](https://gist.github.com/johnleider/207f63c9d30fb77042a0bb0258c5ab32) を参照してください。

### Styles

メインのフレームワークスタイルが自動的にインポートされるようになりました。

```js
// v1.5
// src/plugins/vuetify.js

import 'vuetify/src/styles/main.sass' // 削除可能
```

**sass** パッケージをインストールする必要があります

```bash
yarn add sass -D
// あるいは
npm install sass -D
```

** _node-sass_**をインストールしないでください。正しいライブラリではありません。

### Typography

root font-size（MD2 specificationによる）は_16px_になりました。

- 次のtypographyクラスが置き換えられました:
- subheading → subtitle-1

### イベント名

すべてのイベント名がキャメルケースからケバブケースに変更されました:

- `update:searchInput` → `update:search-input`
- `update:inputValue` → `update:input-value`
- `update:miniVariant` → `update:mini-variant`
- `update:pickerDate` → `update:picker-date`
- `update:selectingYear` → `update:selecting-year`
- `tableDate` → `update:table-date`
- `update:returnValue` → `update:return-value`

### Activator

- アクティベータを持つコンポーネント、`v-tooltip`, `v-menu`, `v-dialog`, `v-list-group`, `v-bottom-sheet` は、新しい [v-slot](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) 構文を使用してバインドする必要があります。
- Vue@2.6が必要です
- これは v1.5 対応よりもかなり冗長であることを理解しています。 新しい **v-slot** をより簡潔にサポートする方法を模索中です。
- 詳細については、公式 Vue ドキュメント [スロットプロパティの分割代入](https://jp.vuejs.org/v2/guide/components-slots.html#%E3%82%B9%E3%83%AD%E3%83%83%E3%83%88%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%AE%E5%88%86%E5%89%B2%E4%BB%A3%E5%85%A5) を参照してください。
- 詳細については、 [v-slot](https://jp.vuejs.org/v2/guide/components-slots.html#%E5%90%8D%E5%89%8D%E4%BB%98%E3%81%8D%E3%82%B9%E3%83%AD%E3%83%83%E3%83%88) の公式Vueドキュメントを参照してください。
- この変更の利点は、ネストされたアクティベーターのサポートで適切なa11yサポートの提供が容易になることです。

#### 通常のアクティベーター

```html
<!-- v1.5 -->

<v-dialog>
  <v-btn slot="activator">...</v-btn>
</v-dialog>
```

```html
<!-- v2.0 -->

<v-dialog>
  <template v-slot:activator="{ on }">
    <v-btn v-on="on">...</v-btn>
  </template>
</v-dialog>
```

#### ネストしたアクティベーター

```html
<!-- v2.0 -->

<v-menu>
  <template v-slot:activator="{ on: menu }">
    <v-tooltip bottom>
      <template v-slot:activator="{ on: tooltip }">
        <v-btn
          color="primary"
          dark
          v-on="{ ...tooltip, ...menu }"
        >
          Dropdown w/ Tooltip
        </v-btn>
      </template>
      <span>Im A ToolTip</span>
    </v-tooltip>
  </template>
</v-menu>
```

### ユニットテスト

Vuetifyでのテストは、 **vue-routor** と **vuex** のテストと似ています。

```js
// setup.js

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

```js
// Component.spec.js

import { createLocalVue, mount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Component from 'path/to/my/component'

const localVue = createLocalVue()

describe('Component.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify(...)
  })

  it('should...', () => {
    const wrapper = mount(Component, {
      localVue,
      vuetify
    })
  })
})
```

### フォーム入力のバリデーション

アプリケーションが **明示的に** _dark_ モードに設定されていない限り、すべてのフォーム入力はデフォルトで **dark** プロパティを使用するときに白になります。

### コンポーネントプロパティを削除しました

以前のバージョンから削除された非推奨プロパティです:

- `<v-text-field textarea>` が `<v-textarea>` をレンダリングしなくなります
- `<v-select autocomplete>` が `<v-autocomplete>` をレンダリングしなくなります
- `<v-select combobox>` が `<v-combobox>` をレンダリングしなくなります
- `<v-select overflow>` が `<v-overflow-btn>` をレンダリングしなくなります
- `<v-select segmented>` が `<v-overflow-btn segmented>` をレンダリングしなくなります
- `<v-select editable>` が `<v-overflow-btn editable>` をレンダリングしなくなります

### 個々のコンポーネント

これらは、既存のコンポーネントに必要な変更です。

#### v-app

- コンポーネントクラスは **v-** が先頭に追加されました。 例 `.application` → `.v-application`
- darkとlightのpropがアプリケーションテーマのバリエーションに影響を与えなくなりました

```html
<!-- v1.5 src/App.vue -->

<template>
  <v-app dark>
    ...
  </v-app>
</template>
```

```js
// v2.0 src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { dark: true }
})
```

#### v-alert

- アラートはデフォルトで表示されます

```html
<!-- v1.5 -->

<template>
  <v-alert :value="true">
    ...
  </v-alert>
</template>
```

```html
<!-- v2.0 -->

<template>
  <v-alert>
    ...
  </v-alert>
</template>
```

#### v-bottom-nav

- `v-bottom-nav` から `v-bottom-navigation` に名前を変更しました

#### v-bottom-navigation

- **color** プロパティは **background-color** になりました
- **color** プロパティがアクティブな `<v-btn>` の色に影響を与えるようになりました

#### v-bottom-sheet-transition

- コンポーネントが削除されました **Developer notes:** _API で明示的にリストされたことはありませんでした_

#### v-btn

- **flat** プロパティが **text** になりました
- **round** プロパティは **rounded**になりました
- 明示的なマージンはなくなりました

#### v-card-media

- コンポーネントが削除されました

#### v-carousel

- **cycle** プロパティはもはや暗黙のものではなく、画面が切り替わるように定義されなければなりません。

#### v-chip

- **value** プロパティが **active**アクティブになりました
- **値** は可視性を制御しなくなりました。 **input** イベントがクリックされたときに発生します
- **selected** プロパティは **input-value** または **v-model** になりました
- **close** イベントが **click :close** になりました

#### v-data-iterator と v-data-table

データテーブル(およびイテレータ) は、使いやすく、より高度なユースケースでより柔軟に書き換えられるようになっています。 これにより、多くの破壊的変更が生じました。 これらのいくつかは両方のコンポーネント間で共有されますが、それぞれに固有のものもあります。

#### 共有内容

- **disable-initial-sort** が削除されました。 どちらのコンポーネントも最初にデータをソートしなくなります。 **sort-by** (または **options**) prop を使用してソートします
- **filter** プロパティが削除されました。 代わりに **custom-filter** を使用します。 これは、カスタムフィルタリングを混乱させないようにするための変更です
- **custom-filter**のシグネチャが、`(items: object[], search: string, filter: Filter): object[]` から、`(value: any, search: string, item: any) => boolean`に変更されました。
- **pagination** プロパティが削除されました。 Instead use the separate props such as **page**, **sort-by**, etc. If you want to provide a single object you can use the new **options** prop instead. **NOTE**: The **options** prop has a different object structure than **pagination**. Check API docs for details
- **total-items** プロパティ が **server-items-length** に名前を変更されました
- **hide-actions** prop が **hide-default-footer** に改名されました。 また、ページあたりの表示アイテムも変更されなくなります
- デフォルトフッターに関連する props が **footer-props** に移動されました。 これらは次のとおりです:
- **prev-icon**
- **next-icon**
- **rows-per-page-items** → **items-per-page-options**
- **rows-per-page-text** → **items-per-page-text**
- **expand** プロパティが削除されました

#### v-data-iterator

- **content-tag**, **content-props**, **content-class** プロパティが削除されました。 代わりに、デフォルトのスコープ付きスロットを使用して、意図したマークアップを実装します。

#### v-data-table

- **items** スロットが **item** に名前を変更されました
- **headers** スロット名を **header** に変更しました
- **item** スロット (および **header**) では、 `<tr>` 要素を定義する必要があるようになりました。 以前はオプションでした
- **expand** スロットを **expanded-item** に変更しました It no longer includes an expansion transition, and the slot is inside the `<tr>` element so that you can define your own `<td>` columns. To get back to a similar look as in 1.5, you will need a `<td>` with *colspan* equal to the number of columns in your header
- **hide-header** が **hide-default-header** に改名されました
- **select-all** が **show-select** に改名されました。 ( **item** や **body** など) 内部行レンダリングを上書きするスロットを定義していない限り、各アイテム行にチェックボックスをレンダリングします。
- デフォルトヘッダに関連する props が **header-props** に移動されました。 これらは次のとおりです:
- **sort-icon**

#### v-expansion-panel et a

- 多くのコンポーネントが名前を変更され、props が移動されました
- `v-expansion-panel` → `v-expansion-panels`
- `v-expansion-panel-content` → `v-expansion-panel`
- 新しいコンポーネント
- `v-expansion-panel-header`
- `v-expansion-panel-content`

```html
<!-- v1.5 -->

<v-expansion-panel>
  <v-expansion-panel-content
    v-for="(item,i) in 5"
    :key="i"
  >
    <template v-slot:header>Item</template>
    <v-card>
      ...
    </v-card>
  </v-expansion-panel-content>
</v-expansion-panel>
```

```html
<!-- v2.0 -->

<v-expansion-panels>
  <v-expansion-panel
    v-for="(item,i) in 5"
    :key="i"
  >
    <v-expansion-panel-header>
      Item
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <v-card>
        ...
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-expansion-panels>
```

#### v-footer

- 他の類似した MD コンポーネントと一致するように明示的なパディングがあるようになりました。 **padless** プロパティまたはヘルパークラスで削除できます。 `class="pa-0"`

#### v-jumbotron

- コンポーネントが削除されました

#### v-list et a

- 多くのコンポーネントが名前を変更されました
- `v-list-tile` → `v-list-item`
- `v-list-tile-action` → `v-list-item-action`
- `v-list-tile-avatar` → `v-list-item-avatar`
- `v-list-tile-content` → `v-list-item-content`
- `v-list-tile-title` → `v-list-item-title`
- `v-list-tile-sub-title` → `v-list-item-subtitle`
- **avatar** プロパティが削除されました

#### v-list-group

- アクティベータースロットで `v-list-item`s を使用できなくなりました
- リスナーはアクティベーターのために内部 `v-list-item` に渡されます
- `v-list-item-content`/`v-list-item-title` などを代わりに使用します

#### v-navigation-drawer

- デフォルトの幅は300pxから256pxに変更されました。 **width** prop を使用して調整できます。

#### v-select - v-autocomplete - v-combobox - v-overflow-btn

- 適切な a11y サポートのために、 **attributes** と **listeners** を **item** スロットに渡します (他の実装に一致するタイルから分割)。

```html
<!-- v1.5 -->

<v-select>
  <template v-slot:item="{ item, tile }">
    <v-list-tile v-bind="tile">
...
    </v-list-tile>
  </template>
</v-select>
```

```html
<!-- v2.0 -->

<v-select>
  <template v-slot:item="{ item, attrs, on }">
    <v-list-item v-bind="attrs" v-on="on">
...
    </v-list-item>
  </template>
</v-select>
```

`{ tile }` のアイテムスコープ付きスロット値が `{ attrs, on }`になりました。 `v-menu` アクティベータースロットに似ています。

#### v-select

- デフォルトの **autocomplete** のonがなくなりました。

#### v-speed-dial

- CSS経由でアクティベーターとのスワップが推定されなくなりました
- アクティベータースロットは将来modelを提供します

```html
<!-- v1.5 -->

<v-speed-dial>
  <template v-slot:activator>
    <v-btn
      dark
      fab
    >
      <v-icon>account_circle</v-icon>
      <v-icon>close</v-icon>
   </v-btn>
  </template>
</v-speed-dial>
```

```html
<!-- v2.0 -->

<v-speed-dial v-model="fab">
  <template v-slot:activator>
    <v-btn
      dark
      fab
    >
      <v-icon v-if="fab">account_circle</v-icon>
      <v-icon v-else>close</v-icon>
    </v-btn>
  </template>
</v-speed-dial>
```

#### v-tabs

- **color** プロパティは **background-color** になりました。 既定のテキストとスライダーの色に影響を与えるようになりました
- 様々なクラス名が変更されています
- **v-tab__div** を削除しました。 **v-tab** を使用します
- **v-tab__item** → **v-tab**
- **v-tabs__slider** → **v-tabs-slider**
- **v-tabs__bar** → **v-tabs-bar**

#### v-tabs-items

- ネストされた場合、暗黙的に `v-tabs`モデルを継承しなくなりました。 **:value**または**v-model**が明示的にバインドされている必要があります。

```html
<!-- v1.5 -->

<v-tabs v-model="tabs">
  ...
  <v-tabs-items>
    ...
  </v-tabs-items>
</v-tabs>
```

```html
<!-- v2.0 -->

<v-tabs v-model="tabs">
  ...
  <v-tabs-items v-model="tabs">
    ...
  </v-tabs-items>
</v-tabs>
```

_開発者の注意事項: tabs-items コンポーネントは提供する必要はなく、カスタム実装にのみ必要です。_

#### v-text-field

- **mask** propと機能は削除されました。 代わりに、 `vue-the-mask` などのサードパーティ製ライブラリを使用できます。
- `prepend-icon-cb`, `prepend-inner-icon-cb`, `append-icon-cb`, および `append-outer-icon-cb` プロパティが削除されました。 代わりに `@click:prepend`,  `@click:prepend-inner`, `@click:append`, および `@click:append-outer` イベントをそれぞれ使用できます。

#### v-text-field - v-select - v-textarea - v-autocomplete - v-combobox

- **box** のプロパティが **filled**になりました

```html
<!-- v1.5 -->

<v-text-field box></v-text-field>
```

```html
<!-- v2.0 -->

<v-text-field filled></v-text-field>
```

#### v-text-field - v-select - v-textarea - v-autocomplete - v-combobox - v-btn - v-alert

- **outline** propが**outlined**になりました。

```html
<!-- v1.5 -->

<v-btn outline></v-text-field>
<v-autocomplete outline></v-autocomplete>
<v-alert outline></v-alert>
```

```html
<!-- v2.0 -->

<v-btn outlined></v-text-field>
<v-autocomplete outlined></v-autocomplete>
<v-alert outlined></v-alert>
```

#### v-toolbar

- 既存のスクロールテクニックと `app` 機能はすべて非推奨となり、 `v-app-bar` に移動しました。
- `v-toolbar-side-icon` → `v-app-bar-nav-icon`

## ヘルプが必要なとき

立ち往生して助けが必要な場合でも、心配しないでください! 私たちは24時間年中無休でサポートを提供できる、非常に大きく献身的なコミュニティを持っています。 Discordの[#release-migration](https://discord.gg/QHWSAbA) チャンネルに来てください。

<vuetify-ad slug="consulting-support" />

<backmatter />
