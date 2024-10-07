---
meta:
  title: マテリアルカラーパレット
  description: マテリアルデザインの色について説明します。 javascriptカラーパックを直接アプリケーションで使用します。
  keywords: colors, material design colors, vuetify color pack, material color classes
related:
  - /features/theme/
  - /resources/themes/
  - /getting-started/wireframes/
---

# Colors

[Material Design](https://material.io/design/color/the-color-system.html) のすべての色を、**Sass** と **Javascript** を利用して簡単に扱えます。 これらの値は、スタイルシート、コンポーネントファイル、および**color class**システムを介した実際のコンポーネントで使用できます。

<entry-ad />

## クラス

MD仕様の各色は、**background**と**text**バリアントのバリアントに変換され、アプリケーション内でのスタイリングのために、例えば `<div class="red">` や `<span class="red--text">` のようにクラスを介して使用されます。 These class colors are defined [here](https://github.com/vuetifyjs/vuetify/blob/v2-stable/packages/vuetify/src/styles/settings/_colors.scss).

<example file="color/classes" />

テキストの色は、**darken** と **lighten** のバリアントを `text--{lighten|darken}-{n}` でサポートしています。

<example file="color/text-classes" />

## Javascriptカラーパック

Vuetifyには、アプリケーション内でインポートおよび使用できるオプションのjavascriptカラーパックがあります。 アプリケーションのテーマを定義するのに役立ちます。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})
```

## Sass カラーパック

カラーパックは便利ですが、エクスポートされたCSSのサイズを30kbほど増やします。 プロジェクトによっては、Vuetify bootstrap 実行時に作成されるデフォルトのクラスしか必要でない場合があります。 この機能を無効にするには、メインの **sass** ファイルを _手動で_ import し、ビルドする必要があります。 これには [Sass loader](https://github.com/webpack-contrib/sass-loader) および `.sass`/`.scss` ファイルエントリが必要になります。

```sass
// src/sass/main.scss

$color-pack: false;

@import '~vuetify/src/styles/main.sass';
```

作成した `main.sass` ファイルは、プロジェクトに含める必要があります。

```js
// src/index.js

import './src/sass/main.scss'
// OR
require('./src/sass/main.scss')
```

<alert type="error">

  **必ず**`sass`を使うようにwebpackの設定を変更する必要があります。 [テンプレート](/getting-started/quick-start#vue-cli-install) に従っていた場合は、この設定はすでに完了しています。

</alert>

これはメインの **App.vue** ファイル内でも設定できます。 プロジェクトの設定によっては、エントリファイルが更新されるたびにSassファイルが再生成されるため、ビルド時間が_長くなる_ことに注意してください。

```html
<style lang="sass">
  $color-pack: false;

  @import '~vuetify/src/styles/main.sass';
</style>
```

## マテリアルカラー

以下は、原色ごとにグループ化されたマテリアルデザインのカラーパレットの一覧です。

<color-palette />

<backmatter />
