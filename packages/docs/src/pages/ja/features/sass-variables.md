---
meta:
  title: SASS変数
  description: SASS変数を変更してVuetifyの内部スタイルをカスタマイズします。
  keywords: sass variables, scss variables, modifying Vuetify styles
related:
  - /styles/colors/
  - /features/theme/
  - /features/presets/
---

# SASS変数

Vuetifyはフレームワーク全体のスタイルと外観に、**SASS/SCSS** を使用しています。 `vue.config.js`ファイルの_sass/scss データ オプション_を利用し、カスタム変数を渡すことで、グローバル デフォルトを上書きすることができます。 利用可能な変数のリストは、各コンポーネントの API セクションと、このページの [Variable API](#variable-api) 内にあります。 この機能は [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify) によって自動的に処理されます。

<entry-ad />

<alert type="warning">

  Note: SASS/SCSS variables are only supported when using [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader). [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify) プラグインを使用するときに自動的に行われます。

</alert>

## Vue CLI によるインストール

Vuetifyをインストールしていない場合は、 [クイックスタートガイド](/getting-started/quick-start#vue-cli-3-install)をご覧ください。 インストールが完了したら、`sass`, `scss` あるいは`styles`という名前のフォルダーをsrcディレクトリに作成し、`variables.scss`または`variables.sass`という名前のファイルを作成します。 Vuetify-loaderは、フレームワークのデフォルト設定を上書きして、Vue CLIのコンパイルプロセスにあなたの変数を自動的に紐付けします。

yarn serveを実行すると、vuetify-cli-pluginが自動的にグローバルなVuetify変数をすべてのsass/scssファイルにホイストします。 個々のコンポーネント変数を変更する場合でも、変数ファイルを手動で含める必要があります。  [カスタム変数](#example-variable-file) ファイルのページでは、いくつか例を参照することができます。

## Nuxt でのインストール

このセクションでは、 [クイックスタート](/getting-started/installation/#nuxt-install) ページのNuxtガイドに従っていることを前提としています。 Nuxt Vuetifyモジュールは、`vuetify` プロパティを公開し、そこでモジュールの設定が可能です。 まず初めに、`treeShake`オプションが有効になっていることを確認し、有効になっていない場合は有効にしてください。 このオプションは [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) を使用して、 [treeshaking](/features/treeshaking) を自動的に有効にします。 カスタムSASS変数を利用するにはこの設定が必要です。 次に、 `customVariables` オプションにカスタムSASS/SCSS変数のファイルパスを指定します。

```js
// nuxt.config.js

export default {
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true
  },
}
```

```scss
// assets/variables.scss

// Variables you want to modify
$btn-border-radius: 0px;

// Modifying a SASS map variable
$material-light: ( cards: blue );
```

## Webpack でのインストール

このセクションでは、 [クイックスタート](/getting-started/quick-start#webpack-install) ページのWebpackガイドに従っていることを前提としています。 このオプションは使用している [sass-loader](https://github.com/webpack-contrib/sass-loader) のバージョンによって異なります。 SASS/SCSS データオプションで異なる行末があるため、適切な構文を使用することを確認してください。 [additionalData](https://github.com/webpack-contrib/sass-loader#additionaldata) や [prependData](https://github.com/webpack-contrib/sass-loader/tree/v8.0.0#prependdata) については、sass-loaderのGitHubページで詳細を確認できます。

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      //  SASS は SCSS とは行末の扱いが異なります。
      // マークアップでセミコロンを使用できません。
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              // This is the path to your variables
              data: "@import '@/styles/variables.scss'"
            },
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss'"
            },
            // Requires >= sass-loader@^9.0.0
            options: {
              // This is the path to your variables
              additionalData: "@import '@/styles/variables.scss'"
            },
          },
        ],
      },
      //  SCSS は SASS とは行末の扱いが異なります。
      // インポート後にセミコロンが必要です。
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              // This is the path to your variables
              data: "@import '@/styles/variables.scss';"
            },
            // Requires sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss';"
            },
            // Requires sass-loader@^9.0.0
            options: {
              // This is the path to your variables
              additionalData: "@import '@/styles/variables.scss';"
            },
          },
        ],
      },
    ],
  },
}
```

## 変数 API

Vuetifyフレームワーク全体でカスタマイズできるSASS/SCSS変数がたくさんあります。 以下のツールを使用して、すべての変数を参照できます:

<alert type="info">

  コンポーネントの色に関連するいくつかの変数は、グローバルマテリアルテーマ変数（ `$material-light` / `$material-dark`）で定義されています。

</alert>

<sass-api />

## 変数定義ファイルの例

以下は、カスタム変数ファイルがどのように見えるかの例です:

```scss
// src/sass/variables.scss

// Globals
$body-font-family: 'Work Sans', serif;
$border-radius-root: 6px;
$font-size-root: 14px;

// Variables must come before the import
$btn-letter-spacing: 0;
$btn-font-weight: 400;
$list-item-title-font-size: 0.929rem;
$list-item-dense-title-font-size: 0.929rem;
$list-item-dense-title-font-weight: initial;
$fab-icon-sizes: (
  'small': 20
);
$btn-sizes: (
  'default': 41,
  'large': 54
);

$headings: (
  'h1': (
    'size': 3.3125rem,
    'line-height': 1.15em
  ),
  'h2': (
    'size': 2.25rem,
    'line-height': 1.5em
  )
);
```

## Usage in templates

You can access [global](/api/vuetify/) and **per** component variables in Vue templates by importing from the Vuetify package.

<alert type="info">

  Importing variable files works the same in **SASS** and **SCSS** style templates

</alert>

### グローバル変数

グローバルSASS変数にアクセスするには、メインの `styles.sass` ファイルをインポートします。

```html
<style lang="sass">
  @import '~vuetify/src/styles/styles.sass'

  @media #{map-get($display-breakpoints, 'md-and-down')}
    .custom-class
      display: none
</style>
```

グローバル変数の完全なリストは、 [$vuetify](/api/vuetify/) API ページにあります。

### コンポーネント変数

コンポーネントごとにアクセスするには、Vuetifyパッケージからスタイルファイルをインポートする必要があります。

```html
<style lang="scss">
  @import '~vuetify/src/components/VStepper/_variables.scss';

  .custom-class {
    padding: $stepper-step-padding;
  }
</style>
```

変数についての詳細情報は各コンポーネントの API ページにあります。例: [v-alert](/api/v-alert/#sass-variables)。

<alert type="warning">

  Vuetifyスタイルをインポートする場合は、インポートにチルダ**~**が追加されていることを確認してください。例: `~vuetify/src/.../_variables.scss`

</alert>

## 注意事項

Sass 変数を使用する場合、注意すべき考慮事項がいくつかあります。

### Duplicated CSS

Importing a regular stylesheet into a `variables` file will cause massive style duplication. In the following snippet, we have an `overrides.sass` file to modify the **text-transform** CSS property of [v-btn](/components/buttons/).

```sass
// src/styles/overrides.sass

.v-btn
  text-transform: capitalize
```

The following snippet is an example of what **NOT** to do.

```scss
// src/styles/variables.scss

// The following import will cause style duplication
@import './overrides.sass';

$card-border-radius: 6px;
$headings: (
  'h1': (
    'font-size': 2rem
  )
);
```

### Compilation time

When using variables, the initial compilation of your application will increase. This is due to the fact that styles are updated in real time whenever you make a modification to a hoisted variable file. This is only experienced with the initial compilation step and can be improved by changing where you import Vuetify from. Keep in mind this _will not_ work if your application is affected by any of the [Vuetify loader limitations](/features/treeshaking/#limitations); your application will still work, but not receive the performance increase.

```js
// src/plugins/vuetify.js

// CORRECT
import Vuetify from 'vuetify/lib/framework'

// INCORRECT
import Vuetify, { VRow } from 'vuetify/lib/framework'

export default new Vuetify()
```

<backmatter />
