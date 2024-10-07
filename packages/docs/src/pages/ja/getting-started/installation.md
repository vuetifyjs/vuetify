---
meta:
  title: Vuetifyを始めましょう
  description: VueとVuetifyを今すぐ始めましょう。 Support for Vue CLI, Webpack, Nuxt and more.
  keywords: quick start, vuetify templates, get started
related:
  - /introduction/why-vuetify/
  - /getting-started/frequently-asked-questions/
  - /getting-started/browser-support/
---

<alert type="error">

  You are viewing documentation for **Vuetify 2**. For instructions on installing **Vuetify 3**, navigate to the [Version 3 Installation Guide](https://vuetifyjs.com/getting-started/installation/)

</alert>

# インストール

世界で最も人気のあるVue.jsフレームワーク、Vuetifyを始めましょう。豊富な機能を備えた非常に高速なアプリケーションを構築できます。

<entry-ad />

## Vue CLI によるインストール

<alert type="warning">

  For information on how to use Vue CLI, visit the [official documentation](https://cli.vuejs.org/).

</alert>

まだ新しいVue.jsプロジェクトを作成したことがない場合は、**Vue CLI**を使って次のように入力することで、新規作成できます:

```bash
vue create my-app
# 新しいプロジェクトディレクトリに移動します。
cd my-app
```

これでプロジェクトが作成されました。次に、コマンドラインを使ってVuetifyの[Vue CLI パッケージ](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify-cli)を追加しましょう。

```bash
vue add vuetify
```

<alert type="warning">

  This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.

</alert>

### Vue UIによるインストール

Vuetifyは、Vue CLIの新しいビジュアル アプリケーションである**Vue UI**を使用してインストールすることもできます。 Vue CLI の最新バージョンがインストールされていることを確認し、次のように入力します:

```bash
# Vue CLI が >= 3.0 であることを確認します。
vue --version

# 確認したら、UIを起動します。
vue ui
```

これにより、Vueのユーザー インターフェイスが起動し、ブラウザで新しいウィンドウが開きます。 画面の左側に表示される**Plugins**をクリックします。 画面が切り替わったら、入力フィールドでVuetifyを検索し、プラグインをインストールします。

![Vuetify プラグインのインストール](https://cdn.vuetifyjs.com/images/quick-start/vue_ui.png "Vue UI Vuetifyプラグイン")

## Nuxt でのインストール

<vuetify-ad slug="vs-video-nuxt" />

Nuxtでは、Nuxt VuetifyモジュールをインストールすることでVuetifyを追加できます。

```bash
yarn add @nuxtjs/vuetify -D
# または
npm install @nuxtjs/vuetify -D
```

インストールが完了したら、nuxt.config.jsファイルを更新して、Vuetifyモジュールをビルドに含めます。

```js
// nuxt.config.js
{
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',

    // With options
    ['@nuxtjs/vuetify', { /* module options */ }]
  ]
}
```

<alert type="info">

  [Find more information for the Nuxt Community module on GitHub](https://github.com/nuxt-community/vuetify-module)

</alert>

## Webpack でのインストール

VuetifyをWebpackプロジェクトにインストールするには、いくつかの依存関係を追加する必要があります。

```bash
yarn add vuetify@v2-stable
# OR
npm install vuetify@v2-stable
```

```bash
yarn add sass@~1.32 sass-loader deepmerge -D
# または
npm install sass@~1.32 sass-loader deepmerge -D
```

インストールしたら、`webpack.config.js`ファイルを探して、以下のスニペットをrules配列にコピーしてください。 既存の Sass ルールが設定されている場合は、以下の変更を適用する必要があります。 Tree Shakingのためにvuetify-loaderを利用したい場合は、Webpackがバージョン4以降であることを確認してください。 You can find more information on setting it up with webpack on the [Treeshaking](/features/treeshaking/) page.

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              indentedSyntax: true // optional
            },
            // Requires >= sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },
    ],
  }
}
```

Vuetify用のプラグインファイル`src/plugins/vuetify.js`を以下の内容で作成します:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

Vuetify-loader を使用する場合は、以下の内容を使用します:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

Vueインスタンスの初期化を行うアプリケーションのmainエントリー ポイントを開き、Vuetifyオブジェクトをオプションとして渡します。

```js
// src/main.js

import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

new Vue({
  vuetify,
}).$mount('#app')
```

### フォントのインストール

VuetifyはGoogleのRobotoフォントとMaterial Designアイコンを使用します。 これらをインストールする最も簡単な方法は、CDNをメインの `index.html` ファイルに含めることです。

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
```

## CDN での使用

Vue CLIからテンプレートをインストールせずにVuetifyを使用してテストするには、以下のコードを `index.html` ファイルにコピーしてください。 これにより、VueとVuetifyの最新バージョンがリンク先から呼び出され、コンポーネントの利用を開始できるようになります。 [Vuetifyスターター](https://template.vuetifyjs.com) をCodepenで使用することもできます。 推奨されていませんが、実稼働環境でCDN パッケージを利用する必要がある場合は、アセットのバージョンを対象にすることをお勧めします。 これを行う方法の詳細については、jsdelivr ウェブサイトにアクセスしてください。

<alert type="warning">

  In order for your application to work properly, you must wrap it in a `v-app` component. See the Application component page for more information.

</alert>

```html
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
</head>
<body>
  <div id="app">
    <v-app>
      <v-main>
        <v-container>Hello world</v-container>
      </v-main>
    </v-app>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>
  <script>
    new Vue({
      el: '#app',
      vuetify: new Vuetify(),
    })
  </script>
</body>
</html>
```

## Electronでの利用

ElectronでVuetifyを使用するには、Vue CLI経由でelectron-builderプラグインを追加します。

```bash
# インストール
vue add electron-builder

# 使い方
yarn electron:build
yarn electron:serve
```

## PWAでの利用

Vue CLI で新しいアプリを作成する場合 vue create my-app を開始した後、最初のプロンプトで Progressive Web App (PWA) Support を選択するオプションがあります。 このパッケージは、以下のコマンドを入力することで、既存の Vue CLI プロジェクトにインストールすることもできます:

```bash
vue add pwa
```

## Cordovaでの利用

Cordova で Vuetify を使用するには、Vue CLI を使用して Cordova プラグインを追加します:

```bash
# cordova がインストールされていない場合
yarn global add cordova

# インストール
vue add cordova

# 使い方
yarn cordova-serv-android # Development Android
yarn cordova-build-android # Build Android
yarn cordova-serve-ios # Development IOS
yarn cordova-build-ios # Build IOS
yarn cordova-serve-browser # Development Browser
yarn cordova-build-browser # Build Browser
```

## Capacitorとの使用

**Capacitor**でVuetifyを使用するには、Vue CLI経由で [Capacitor](https://github.com/capacitor-community/vue-cli-plugin-capacitor) プラグインを追加します:

```bash
# インストール
$ vue add @nklayman/capacitor

# 使い方
$ yarn capacitor:serve
```

## Vuepressでの使用

Vuetifyをデフォルトの **vuepress** テーマで使用する方法は2つあります。 [vuepress](https://vuepress.vuejs.org/) `.vuepress/enhanceApp.js` ファイル (以下のコードサンプル) にvuetifyをプラグインとして登録するか、CDNから直接vuetifyを使用してください:

```js
// vuetifyをvuepressでのグローバルプラグインとして登録する
// .vuepress/enhanceApp.js
import Vuetify from 'vuetify'

export default ({
  Vue,      // VuePressアプリで使用されているVueのバージョン
  options,  // ルート Vue インスタンスのオプション
  router,   // アプリのrouterインスタンス
  siteData,  // site metadata
}) => {
  Vue.use(Vuetify)
}

// または、CDNから直接vuetifyを使用することもできます。
// .vuepress/config.jsのheadセクションを以下のように更新します。
module.exports = {
  head: [
    ['link', {
      rel: 'stylesheet',
      href: `https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css`
    }],
    ['script', { src: `https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js` }],
    ['script', { src: `https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js` }],
  ]
}
```

## Nightlyビルド

The three development branches (`master`, `dev`, and `next`) are automatically published to NPM at 1200 UTC under the [`@vuetify/nightly`](https://www.npmjs.com/package/@vuetify/nightly?activeTab=versions) namespace. They may be outdated or buggy and are therefore not officially supported and are only supplied for testing puposes. These builds can be installed with a [package alias](https://docs.npmjs.com/cli/v8/commands/npm-install#:~:text=Install%20a%20package%20under%20a%20custom%20alias).

| ブランチ名    | 目的    | package.json エントリ                          | Changelog                                                           |
| -------- | ----- | ------------------------------------------ | ------------------------------------------------------------------- |
| `master` | バグ修正  | `"vuetify": "npm:@vuetify/nightly@latest"` | [Changelog](https://unpkg.com/@vuetify/nightly@latest/CHANGELOG.md) |
| `dev`    | 新機能   | `"vuetify": "npm:@vuetify/nightly@dev"`    | [Changelog](https://unpkg.com/@vuetify/nightly@dev/CHANGELOG.md)    |
| `next`   | 破壊的変更 | `"vuetify": "npm:@vuetify/nightly@next"`   | [Changelog](https://unpkg.com/@vuetify/nightly@next/CHANGELOG.md)   |

<backmatter />
