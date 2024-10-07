---
meta:
  title: Tree Shaking (不要コードの削除)
  description: Vuetifyはvuetify-loaderを通じて自動的にツリーシェーキングを提供します。 必要な機能のみ使用され、パッケージバンドルサイズが大幅に削減されます。
  keywords: a la carte, a-la-carte, vuetify single import, vuetify import, component importing, reduce vuetify size, treeshaking, tree shaking
related:
  - /getting-started/unit-testing/
  - /features/presets/
  - /introduction/why-vuetify/
---

# Tree Shaking (不要コードの削除)

Vuetifyはコンポーネントのフレームワークであるため、アプリケーションの成長は常に水平方向になります。 プロジェクトによっては、小さい **パッケージ サイズ** が必要になる場合があります。 A la carteシステムを使用すると、インポートするコンポーネントを選択して、ビルドサイズを大幅に_下げます_。 [Vue CLI プラグイン](/getting-started/quick-start#vue-cli-install) で作成された新しいプロジェクトは、デフォルトで有効になっています。

<entry-ad />

<alert type="error">

  Treeshakingは、**production mode**のWebpack 4でのみ動作します。 Vue CLIを使用しているときには、自動的に使用されます。

</alert>

## Vuetify-loader

使用しているすべてのコンポーネントを追跡するのは大変な作業です。 [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) は、利用するすべてのVuetifyコンポーネントを使用する場所に自動的にインポートすることで、この辛みを軽減します。 また、webpackはそのチャンクに必要なコンポーネントのみをロードするため、コード分割がより効果的になります。

### libからインポート

Treeshaking を使用するには、 **vuetify/lib** から Vuetify をインポートする必要があります。

```js
// Vuetify自体を登録する必要があります
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

<alert type="info">

  **Vue.use** に 2 番目の引数として渡す options オブジェクトには、コンポーネント、ディレクティブ、およびトランジションプロパティを含めることもできます。

</alert>

### Vue configでのインストール

推奨されませんが、 Vue CLI プラグインの使用をオプトアウトし、代わりに、Vue CLI の [configure webpack](https://cli.vuejs.org/config/#configurewebpack) オプションでローダーを手動で設定することができます。

```js
// vue.config.js

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin()
    ],
  },
}
```

### Webpackでのインストール

Webpackベースのプロジェクトにローダーを明示的にインストールすることもできます。 vue.config.jsセットアップと同様に、プロジェクトのwebpackプラグインにローダーを追加するだけです。

```js
// webpack.config.js

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  plugins: [
    new VuetifyLoaderPlugin()
  ],
}
```

<discovery-ad />

## Required styles

When you import from `vuetify/lib`, the baseline framework styles are pulled in as well. Each component is individually responsible for its styles and will be compiled just the same. If you are using Vue CLI and the `vue-cli-plugin-vuetify` plugin, this is done for you automatically, and you can **skip** this section. If you are working on a project where you do not have access to the cli, you can manually include the required packages:

```bash
yarn add sass-loader deepmerge -D
```

または

```bash
npm install sass sass-loader deepmerge -D
```

<alert type="info">

  SASSを処理するためのアプリケーションのセットアップ方法については、[テーマページ](/features/theme) をご覧ください。

</alert>

After the installation, you will still need to configure your webpack.config.js to parse .sass files. For more information on how to do this, checkout the [official documentation](https://webpack.js.org/loaders/sass-loader/).

## Custom dynamic imports

` vuetify-loader `を使用すると、独自のカスタム関数を記述して、プロジェクトで利用しているコンポーネントをインポートすることもできます。 これは、VueCLIプロジェクトとwebpackプロジェクトの両方で使用可能です。

```js
// vue.config.js

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin({
        /**
         * この関数は、各 vue コンポーネントで使用されるすべてのタグに対して呼び出されます。
         * 最初の要素はコンポーネントの配列に挿入され、2番目の要素は対応するインポートになります。
         *
         * originalTag - テンプレート内で元々使用されていたタグ
         * kebabTag - ケバブケースに正規化されたタグ
         * camelTag - PascalCaseに正規化されたタグ．
         * path - 現在の.vueファイルへの相対パス．
         * component - 現在のコンポーネントをパースした表現．
         *
         */
        match (originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith('core-')) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`
            ]
          }
        }
      })
    ],
  },
}
```

```js
// webpack.config.js

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

exports.plugins.push(
  new VuetifyLoaderPlugin({
    match (originalTag, { kebabTag, camelTag, path, component }) {
      if (kebabTag.startsWith('core-')) {
        return [
          camelTag,
          `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`
        ]
      }
    }
  })
)
```

## 制限事項

`vuetify-loader`を使用する場合、コンポーネントの手動インポートが必要なシナリオがいくつかあります。

### 動的コンポーネント

`v-data-iterator` は、content-tag prop 経由で任意のコンポーネントを使用できます。 このコンポーネントは[グローバル ](#markup-js-a-la-carte-manual)に登録する必要があります:

```html
<!-- Vue Component -->

<template>
  <v-data-iterator content-tag="v-layout">
    ...
  </v-data-iterator>
</template>
```

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify, { VLayout } from 'vuetify/lib'

Vue.use(Vuetify, {
  components: { VLayout },
})

const opts = {}

export default new Vuetify(opts)
```

`<component :is="my-component">`  で使用される動的コンポーネントは[ローカル](#markup-js-a-la-carte-destructuring)に登録できます:

```html
<!-- Vue Component -->

<template>
  <component :is="button ? 'v-btn' : 'v-chip'" />
</template>

<script>
  import { VBtn, VChip } from 'vuetify/lib'

  export default {
    components: { VBtn, VChip },
    data: () => ({ button: false }),
  }
</script>
```

### 関数型コンポーネント

関数型コンポーネントは実行時にvueごとにインライン展開され、オプションに **components** プロパティを持つことはできません。 カスタム関数型コンポーネントで使用される Vuetify コンポーネントは、グローバルに登録するか(推奨)、ローカルでカスタムコンポーネントが使用される場所に登録する必要があります。

## 手動インポート

Vuetifyローダーを使用しない場合は、コンポーネントを手動でインポートできます。 You will also want to do this when using dynamic components and the **vuetify-loader** as it only parses explicit usage. これは一般的に、Vue `<component>` で組み込まれている場合に発生します。 動的コンポーネントの詳細については、公式の Vue [ドキュメント](https://jp.vuejs.org/v2/guide/components.html#Dynamic-Components) を参照してください。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify, {
  VCard,
  VRating,
  VToolbar,
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VCard,
    VRating,
    VToolbar,
  },
  directives: {
    Ripple,
  },
})

const opts = {}

export default new Vuetify(opts)
```

以下に示すように、.vue ファイルのコンポーネントをインポートすることもできます。

```html
<!-- Vue Component -->

<template>
  <v-card>
    <v-card-title>...</v-card-title>
    <v-card-text>...</v-card-text>
  </v-card>
</template>

<script>
  import { VCard, VCardText, VCardTitle } from 'vuetify/lib'

  export default {
    components: {
      VCard,
      VCardText,
      VCardTitle,
    }
  }
</script>
```

<backmatter />
