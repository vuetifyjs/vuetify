---
meta:
  title: プリセット
  description: プリセットは、Vuetifyアプリケーションのルックアンドフィールを大幅に変更するVue CLIプラグインです。
  keywords: vuetify presets, custom material design
related:
  - /features/theme/
  - /features/sass-variables/
  - /styles/colors/
---

# プリセット

GoogleはMaterial Design specificationのバージョン2で、それぞれ独自のプロパティとユースケースを持つ架空のアプリを通じて、実際のデザインの制限を調査するために[Material studies](https://material.io/design/material-studies/about-our-material-studies.html)を作成しました。 Vuetifyの「プリセット」は、これらのスタディを統合し、あらかじめ設定されたフレームワークオプション、SASS変数、およびカスタムスタイルを通じて、アプリケーションのルックアンドフィールを即座に変更します。

## Default preset

デフォルトのVuetifyプリセットは、すべてのフレームワークサービスにベースライン値を提供します。 各オブジェクトキーは`$vuetify`オブジェクトのサービスに対応し、Vuetifyコンストラクターの**preset**またはカスタム**user options**を介して上書きできます。

```js
// Styles
import '../../styles/main.sass'

// Locale
import { en } from '../../locale'

// Types
import { VuetifyPreset } from 'vuetify/types/services/presets'

export const preset: VuetifyPreset = {
  breakpoint: {
    scrollBarWidth: 16,
    thresholds: {
      xs: 600,
      sm: 960,
      md: 1280,
      lg: 1920,
    },
  },
  icons: {
    iconfont: 'mdi',
    values: {},
  },
  lang: {
    current: 'en',
    locales: { en },
    t: undefined as any,
  },
  rtl: false,
  theme: {
    dark: false,
    default: 'light',
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: undefined,
      minifyTheme: undefined,
      themeCache: undefined,
    },
    themes: {
      light: {
        primary: '#1976D2',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
      dark: {
        primary: '#2196F3',
        secondary: '#424242',
        accent: '#FF4081',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
      },
    },
  },
}
```

## Material Studies

[Material Design](https://material.io/) は、高度にカスタマイズ可能なデザインを実現する独自のビジュアル言語です。 この新しい研究では、マテリアルのテーマ設定の _柔軟性_ が実証され、デフォルトのマテリアルデザイン外観をもたない **ユニークな** アプリケーションを簡単に作成できるようになります。

<alert type="info">

  Vuetifyプリセットは現在進行形で開発中の機能であり、Vuetifyが新しい機能を獲得するにつれて、今後強化される予定です。

</alert>

現在、**7つのMaterial Studies**から選択でき、それぞれに対応するプリセットプラグインがあります。

- [Basil](https://material.io/design/material-studies/basil.html)
- [Crane](https://material.io/design/material-studies/crane.html)
- [Fortnightly](https://material.io/design/material-studies/fortnightly.html)
- [Owl](https://material.io/design/material-studies/owl.html)
- [Rally](https://material.io/design/material-studies/rally.html)
- [Reply](https://material.io/design/material-studies/reply.html)
- [Shrine](https://material.io/design/material-studies/shrine.html)

### インストール

コンソールでの次のコマンド <kbd>vue add vuetify-preset-{name}</kbd>— `{name}` は [Material Studies](#material-studies) のいずれかに対応します。 プラグインがインストールされると、 **vuetify.js** ファイルが選択したプリセットを含むように更新されます。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { preset } from 'vue-cli-plugin-vuetify-preset-basil/preset'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  rtl: true,
  theme: { dark: true },
})
```

開発を開始するには、コマンドラインで <kbd>yarn serve</kbd> または <kbd>npm run serve</kbd> を実行します。 VuetifyサービスプラグインはVue CLIを起動し、プリセットから変数とスタイルの変更をすべて自動的に適用します。 ジェネレータとサービスプラグインの動作の詳細については、 [プラグイン開発ガイド](#plugin-development-guide) をご覧ください。

### 統合ストラテジー

Vuetifyオプションは　_Defaults, Preset, User_ の順にトップダウンでマージされます。 The [default](https://github.com/vuetifyjs/vuetify/blob/v2-stable/packages/vuetify/src/presets/default/index.ts) preset is first merged with a provided **preset** property in the Vuetify constructor options. 該当する場合、ユーザーが指定したオプションはグローバルデフォルトとプリセットとマージされます。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { preset } from 'vue-cli-plugin-vuetify-preset-shrine/preset'

Vue.use(Vuetify)

const options = {
  breakpoint: { scrollbarWidth: 12 },
  theme: {
    themes: {
      light: { primary: 'blue' },
    },
  },
}

export default new Vuetify({
  // 提供されたグローバルプリセットは、最初にデフォルトプリセットとマージされます。
  // ユーザーオプションがマージされ、デフォルトとグローバルプリセットが上書きされます。
  ...options,
})
```

## 制限事項

[Studies](https://material.io/design/material-studies/about-our-material-studies.html) が技術的なものよりも視覚的であるため、プリセットは私たちの _最良の推測_ による実装です。 多くの場合、ガイドライン内の情報が不足しているため、スタイルや機能性を推測する必要があります。 Studiesの一部が _**できない （can not）**_ または _**サポートされない（will not）**_ 状況があります:

- フレームワークの変更が必要です
- 現在のところCSSではできません
- まだサポートの方法がわかっていません

### Googleフォント

プリセットをインストールすると、メインの **public/index.html** ファイルが更新され、必要なフォントとウェイトだけが更新されます。 例えば、あるStudyで必要なのは `400,500,600` フォントウェイトだけです。 これは、Vuetifyのいくつかのヘルパークラスが動作しない原因となります。例えば、 `font-weight-thin` は _300_ フォントウェイトを必要とします。 ウェイトは、 `public.html` 内のフォントリンクを更新することで、いつでも変更できます。

```html
<!-- You can add or remove font weights after the fact; e.g. Rubik:100,300,400,500 -->
<!-- The available weights for each font can be found on https://
fonts.google.com/ -->

<link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500&display=swap" rel="stylesheet">
```

### コンパイル時間

In order to update SASS variables in Vuetify, styles are recompiled during development and when your application is built for production. This _will_ increase your initial compilation time and _will_ be triggered any time you edit a **variables** file. If your application isn't affected by any of the [Vuetify loader limitations](/features/treeshaking/#limitations), you can opt to import Vuetify from `vuetify/lib/framework`. This can decrease compilation time by up to _50%_.

```js
// src/plugins/vuetify.js

// CORRECT
import Vuetify from 'vuetify/lib/framework'

// INCORRECT
import Vuetify, { VRow } from 'vuetify/lib/framework'

export default new Vuetify()
```

## プラグイン開発ガイド

A Vuetify preset is a npm package that provides framework wide options and custom styling using Vue CLI. It consists of a SASS variables file, a CSS overrides file and the Vue CLI [Generator](https://cli.vuejs.org/dev-guide/generator-api.html) and [Plugin Service](https://cli.vuejs.org/dev-guide/plugin-api.html). Some of the features offered by presets are:

- configures framework options with **pre-defined** values — can use any combination of the available [Vuetify options](#default-preset)
- injects **custom SASS variables** for configuring existing Vuetify functionality; e.g. components. Presets use the [Vue CLI Plugin API](https://cli.vuejs.org/dev-guide/plugin-api.html#plugin-api) to hoist SASS variables during compilation
- provides **global overrides** for styling that is not coverable through variables
- a _streamlined approach_ to modifying a Vuetify application's style and options

```bash
# Vuetify preset plugin structure
.
├── generator.js        # generator (optional)
├── index.js            # service plugin
└── preset
    ├── index.js        # preset object
    ├── overrides.sass  # global overrides
    └── variables.scss  # SASS variables
```

<alert type="warning">

  カスタムプリセットは、それ自体が _preset_ プロパティを含むことは**できません**。

</alert>

### Features

#### Generator

This file is a Vue CLI [Generator](https://cli.vuejs.org/dev-guide/generator-api.html) that updates the **vuetify.js** file in your application to include the defined preset.

```js
// Imports
const {
  generatePreset,
  injectGoogleFontLink,
} = require('@vuetify/cli-plugin-utils')

// Updates the Vuetify object with provided preset
module.exports = api => generatePreset(api, 'preset-name', () => {
  // Invoked after the generator has completed.
  // A common use-case is adding font links

  // Will automatically apply the default font-weights
  // 100,300,400,500,700,900
  injectGoogleFontLink(api, 'Rubik')

  // Will only use the defined font-weights
  injectGoogleFontLink(api, 'Roboto:100,300,700')

  // Works the same as the above, but accepts multiple values
  injectGoogleFontLink(api, [
    'Rubik',
    'Roboto:100,300,700',
  ])
})
```

#### Entry file

This file is a Vue CLI [Plugin Service](https://cli.vuejs.org/dev-guide/plugin-api.html) that hooks into your application when running `yarn serve` or `npm run serve`. The `injectSassVariables` method injects the target file's variables into all SASS/SCSS files.

```js
// Imports
const { injectSassVariables } = require('@vuetify/cli-plugin-utils')

// Bootstraps Vue CLI with the target SASS variables
module.exports = api => injectSassVariables(
  api,
  // Path to the variables file
  'path/to/preset-plugin-variables.scss',
  // Modules to inject variables
  ['vue-modules', 'vue', 'normal-modules', 'normal'], // default
)
```

#### Vuetifyオプション

This contains the framework configuration options that are passed to the Vuetify constructor. These options combine with any user supplied values and the [framework defaults](#default-preset).

```js
// preset/index.js

require('./overrides.sass')

const preset = {
  theme: {
    themes: {
      light: {
        primary: '#5D1049',
        secondary: '#E30425',
        accent: '#720D5D',
        error: '#F57C00',
      },
    },
  },
}

```

#### SASS変数

This is a SASS/SCSS variables file which will overwrite existing framework values. You can find more information about available variables on the [Vuetify SASS Variables](/features/sass-variables/#variable-api) documentation page or within the API section of a component.

```scss
// preset/variables.scss

// Shrine specific variables
$shrine-chip-border-radius: 4px;
$shrine-chip-border: thin solid black;
$shrine-chip-font-weight: 900;
$shrine-chip-padding: 0 8px;

// Preset variables
$body-font-family: 'Work Sans', sans-serif;
$border-radius-root: 6px;
$headings: (
  'h1': (
    'font-family': 'Roboto', sans-serif;
    'letter-spacing': 0
  )
);
$material-light: (
  'cards': #E0E0E0,
  'text': (
    'primary': rgba(0, 0, 0, .76),
    'secondary': grey
  )
);
```

#### CSS の上書き

This is a catch all for style modifications that do not have corresponding variables to target. This is useful when you need to add new CSS properties to existing components.

```sass
// preset/overrides.sass

@import './variables.scss'

.theme--light
  .v-chip
    border-radius: $shrine-chip-border-radius
    border: $shrine-chip-border
    font-weight: $shrine-chip-font-weight
    padding: $shrine-chip-padding
    +elevation(0)
```

<vuetify-ad slug="consulting-support" />

<backmatter />
