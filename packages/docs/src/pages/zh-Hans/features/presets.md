---
meta:
  title: 预设
  description: 预设是可大幅改变 Vuetify 应用程序外观和体验的 Vue CLI 插件。
  keywords: vuetify 预设，定制化 material design
related:
  - /features/theme/
  - /features/sass-variables/
  - /styles/colors/
---

# 预设

对于Material Design规格的第2版， 谷歌创建了 [ Material研究](https://material.io/design/material-studies/about-our-material-studies.html) ，以便通过虚构的应用程序来探索现实世界中的设计局限性，每个应用程序都有自己独特的属性和用例。 Vuetify预置通过预先配置的框架选项、SASS变量和自定义样式整合了这些研究，这些可以立即改变应用程序的外观和体验。

## 默认预设

默认的Vuetify预设为所有框架服务提供基础值。 每个对象键对应于`$vuetify`对象上的一个服务，可以通过vuetify构造函数中的<strong x-id=“1”>预置</code>或自定义<strong x-id=“1”>用户选项</strong>来覆盖。

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

## Material研究

[Material Design](https://material.io/) 是一种视觉语言，在实现高度定制的设计时可以使用的无法抗拒的视觉语言。 新的研究展示了Material主题化的 _flexibility_ ，并引导您轻松创建不带默认材质外观的 **独特** 应用程序。

<alert type="info">

  Vuetify 预设是一个正在进行中的功能，随着 Vuetify 获得新功能，它将随着时间的推移得到增强。

</alert>

目前共有 **7个 Material 研究** 可供选择，每个研究都有相应的预设插件：

- [Basil](https://material.io/design/material-studies/basil.html)
- [Crane](https://material.io/design/material-studies/crane.html)
- [Fortnightly](https://material.io/design/material-studies/fortnightly.html)
- [Owl](https://material.io/design/material-studies/owl.html)
- [Rally](https://material.io/design/material-studies/rally.html)
- [Reply](https://material.io/design/material-studies/reply.html)
- [Shrine](https://material.io/design/material-studies/shrine.html)

### 安装

在控制台中，运行以下命令<kbd>vue add vuetify-preset-{name}</kbd>-其中`{name}`对应于一个可用的<a href=“\material studies”> Material研究</a>。 一旦插件安装完毕，您的 **vuetify.js** 文件将被更新以包含选定的预设。

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

要开始开发，在命令行输入 <kbd>yarn serve</kbd> 或 <kbd>npm run serve</kbd>。 Vuetify 服务插件将引导到 Vue CLI 并自动应用变量和风格的所有预设变更。 欲了解更多关于生成器和服务插件如何工作的信息，请查阅 [插件开发指南](#plugin-development-guide)。

### 合并策略

Vuetify 选项从上至下合并-_默认值、预设值和用户自定义_。 The [default](https://github.com/vuetifyjs/vuetify/blob/v2-stable/packages/vuetify/src/presets/default/index.ts) preset is first merged with a provided **preset** property in the Vuetify constructor options. 如果适用，用户提供的选项将与全局默认和预设合并。

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
  // The provided global preset is first merged with defaults
  preset,
  // User options are then merged, overwriting defaults and the global preset
  ...options,
})
```

## 局限性

由于 [研究](https://material.io/design/material-studies/about-our-material-studies.html) 比技术更可视，预设是我们的 _猜测的最佳_ 实现。 在许多情况下，由于研究准则中缺乏信息，必须推断出风格和功能。 还有一些情况下，一部分研究 _**无法**_ 或 _**将不再**_支持

- 需要对框架进行修改
- 目前无法使用 CSS
- 我们还没有找到支持它的方法

### Google 字体

当您安装预设时，它将只更新您主 **public/index.html** 文件中需要的字体和粗细。 例如，一项研究可能只需要 `400 500 600` 字体粗细。 这将导致一些辅助类在 Vuetify 中无法工作。例如， `font-weight-thin` 需要 _300_ 字体粗细。 字体粗细可以在以后通过修改`public.html`中的字体链接进行更新。

```html
<！-- 你可以在字号后增加或删除字体粗细。例如： Rubik:100,300,400,500 -->
<!-- 每个字体的可用粗细可以在 https://fonts.google/上找到 -->

<link href="https://fonts.googleapis.com/css?family=Rubik:300,400,500&display=swap" rel="stylesheet">
```

### 编译时间

为了更新 Vuetify 中的 SASS 变量，样式在开发和应用程序构建时会被重新编译。 这<em x-id=“4”>将</em>增加您的初始编译时间，并且<em x-id=“4”>将</em>在您编辑<strong x-id=“1”>变量</strong>文件时触发。 如果您的应用程序没有受到 [Vuetify 加载器限制](/features/treeshaking/#limitations)的影响， 您可以选择从 `vuetify/lib/framework` 导入Vuetify。 这可以减少最多 _50%_ 的编译时间，。

```js
// src/plugins/vuetify.js

// CORRECT
import Vuetify from 'vuetify/lib/framework'

// INCORRECT
import Vuetify, { VRow } from 'vuetify/lib/framework'

export default new Vuetify()
```

## 插件开发指南

A Vuetify preset is a npm package that provides framework wide options and custom styling using Vue CLI. It consists of a SASS variables file, a CSS overrides file and the Vue CLI [Generator](https://cli.vuejs.org/dev-guide/generator-api.html) and [Plugin Service](https://cli.vuejs.org/dev-guide/plugin-api.html). Some of the features offered by presets are:

- 使用<strong x-id=“1”>预先定义</strong>的值配置框架选项-可以使用可用的 [Vuetify选项](#default-preset)的任意组合
- 注入<strong x-id=“1”>自定义SASS变量</strong>以配置现有的Vuetify功能；例如组件。 预设使用<a href=“https://cli.vuejs.org/dev-guide/plugin-api.html-plugin-plugin-api“>Vue CLI插件API</a>在编译期间提升SASS变量
- 为无法通过变量覆盖的样式提供<strong x-id=“1”>全局覆盖</strong>
- _简化方法_ 来修改 Vuetify 应用程序的样式和选项

```bash
# Vuetify 预设插件结构
├── generator.js        # generator (可选)
├── index.js            # service plugin
└── preset
    ├── index.js        # 预设对象
    ├── overrides.sass  # 全局覆盖
    └── variables.scss  # SASS变量
```

<alert type="warning">

  自定义预设 **不能** 本身包含一个 _preset_ 属性。

</alert>

### 特性

#### Generator

This file is a Vue CLI [Generator](https://cli.vuejs.org/dev-guide/generator-api.html) that updates the **vuetify.js** file in your application to include the defined preset.

```js
// Imports
const {
  generatePreset,
  injectGoogleFontLink,
} = require('@vuetify/cli-plugin-utils')

// 使用提供的预设更新Vuetify对象
module.exports = api => generatePreset(api, 'preset-name', () => {
  // 在生成器完成后调用
  // 一个常见的用例是添加字体链接

  // 将自动应用默认字体粗细
  // 100,300,400,500,700,900
  injectGoogleFontLink(api, 'Rubik')

  // 将只使用定义的字体粗细
  injectGoogleFontLink(api, 'Roboto:100,300,700')

  // 与上面的效果相同，但接受多个值
  injectGoogleFontLink(api, [
    'Rubik',
    'Roboto:100,300,700',
  ])
})
```

#### 入口文件

This file is a Vue CLI [Plugin Service](https://cli.vuejs.org/dev-guide/plugin-api.html) that hooks into your application when running `yarn serve` or `npm run serve`. The `injectSassVariables` method injects the target file's variables into all SASS/SCSS files.

```js
// Imports
const { injectSassVariables } = require('@vuetify/cli-plugin-utils')

// 使用目标SASS变量引导Vue CLI
module.exports = api => injectSassVariables(
  api,
  // 变量文件的路径
  'path/to/preset-plugin-variables.scss',
  // 注入变量的模块
  ['vue-modules', 'vue', 'normal-modules', 'normal'], // 默认值
)
```

#### Vuetify 选项

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

module.exports = { preset }
```

#### SASS 变量

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

#### CSS 覆盖

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
