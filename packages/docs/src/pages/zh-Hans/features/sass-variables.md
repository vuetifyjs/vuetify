---
meta:
  title: SASS 变量
  description: 通过修改 SASS 变量来定制 Vuetify 的内部样式。
  keywords: sass 变量，scss 变量，修改 Vuetify 样式
related:
  - /styles/colors/
  - /features/theme/
  - /features/presets/
---

# SASS 变量

Vuetify 使用 **SASS/SCSS** 来设计框架所有方面的样式和外观。 利用 `vue.config.js` 文件中的 _sass/scss 数据选项_，你可以可选择地传入自定义变量来覆盖全局默认值。 可用的变量列表位于每个组件的 API 部分和本页的 [变量 API](#variable-api) 中。 此功能由 [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugin-vuetify) 自动处理。

<entry-ad />

<alert type="warning">

  Note: SASS/SCSS variables are only supported when using [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader). 使用 [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify) 插件时，这个操作会被自动完成。

</alert>

## Vue CLI 安装

如果你还没有安装 Vuetify，请查看 [快速入门](/getting-started/quick-start#vue-cli-3-install)。 安装完成后，在你的 src 目录下创建一个名为 `sass`、`scss` 或 `styles` 的文件夹，文件名为 `variables.scss` 或 `variables.sass`。 **vuetify-loader** 会自动将你的变量引导到 Vue CLI 的编译过程中，覆盖框架默认值。

当你运行 yarn serve 时，vuetify-cli-plugin 会自动将全局的 Vuetify 变量提升到你所有的 sass/scss 文件中。 修改个别组件的变量时，仍然需要手动包含其变量文件。 你可以在下面找到一个 [自定义变量](#example-variable-file) 文件的例子。

## Nuxt 安装

本节假设你已经按照我们 [快速入门](/getting-started/installation/#nuxt-install) 页面的 Nuxt 指南进行了操作。 Nuxt Vuetify 模块公开了一个 `vuetify` 属性，你可以在这里配置。 确保已经启用了 `treeShake` 选项。 这个选项将使用 [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) 来启用自动 [摇树](/features/treeshaking)。 这是自定义 SASS 变量正常工作所必需的。 然后提供 `customVariables` 文件路径选项来定制 SASS 变量。

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

// 你想修改的变量
$btn-border-radius: 0px;

// 修改 SASS 映射的变量
$material-light: ( cards: blue );
```

## Webpack 安装

本节假设你已经按照了我们 [快速入门](/getting-started/quick-start#webpack-install) 页面的 Webpack 指南进行了操作。 这个选项可以根据你使用的 [sass-loader](https://github.com/webpack-contrib/sass-loader) 版本而有所不同。 确保在设置 SASS/SCSS 数据选项时使用了正确的语法，因为它们有不同的行尾要求。 您可以在 sass-loader 的 GitHub Page 上找到更多有关 [额外数据](https://github.com/webpack-contrib/sass-loader#additionaldata) 或 [预定数据](https://github.com/webpack-contrib/sass-loader/tree/v8.0.0#prependdata) 的信息

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      // SASS 和 SCSS 有着不同的行结尾
      // 并且不能在标记中使用分号
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // 需要 sass-loader@^7.0.0
            options: {
              // This is the path to your variables
              data: "@import '@/styles/variables.scss'"
            },
            //  需要 sass-loader@^8.0.0
            options: {
              // This is the path to your variables
              prependData: "@import '@/styles/variables.scss'"
            },
            //  需要 >= sass-loader@^9.0.0
            options: {
              // This is the path to your variables
              additionalData: "@import '@/styles/variables.scss'"
            },
          },
        ],
      },
      // SASS 和 SCSS 有着不同的行结尾
      // 以及需要分号在import以后
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            //  需要 sass-loader@^7.0.0
            options: {
              // 这是你的变量文件的路径
              data: "@import '@/styles/variables.scss';"
            },
            // 需要 sass-loader@^8.0.0
            options: {
              // 这是你的变量文件的路径
              prependData: "@import '@/styles/variables.scss';"
            },
            // 需要 sass-loader@^9.0.0
            options: {
              // 这是你的变量文件的路径
              additionalData: "@import '@/styles/variables.scss';"
            },
          },
        ],
      },
    ],
  },
}
```

## 变量 API

有许多 SASS/SCSS 变量可以在整个 Vuetify 框架中定制。 你可以使用下面的工具浏览所有的变量。

<alert type="info">

  Some color-related variables for components are defined in the global material-theme variables: `$material-light` / `$material-dark`

</alert>

<sass-api />

## 变量文件示例

下面是一个自定义变量文件的示例：

```scss
// src/sass/variables.scss

// 全局变量
$body-font-family: 'Work Sans', serif;
$border-radius-root: 6px;
$font-size-root: 14px;

// 变量必须定义在 import 之前
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

## 模板中的用法

你可以通过从 Vuetify 包导入来访问 Vue 模板中的 [全局](/api/vuetify/) 和 **每个** 组件变量。

<alert type="info">

  在 **SASS** 和 **SCSS** 风格模板中，导入变量文件的工作原理是一样的。

</alert>

### 全局变量

要访问全局的 SASS 变量，请导入主要的 `styles.sass` 文件。

```html
<style lang="sass">
  @import '~vuetify/src/styles/styles.sass'

  @media #{map-get($display-breakpoints, 'md-and-down')}
    .custom-class
      display: none
</style>
```

全局变量的完整列表在 [$vuetify](/api/vuetify/) API 页面。

### 组件变量

要访问每个组件的 SASS 变量，你必须从 Vuetify 包中导入对应的样式文件。

```html
<style lang="scss">
  @import '~vuetify/src/components/VStepper/_variables.scss';

  .custom-class {
    padding: $stepper-step-padding;
  }
</style>
```

详细的变量信息位于每个组件的 API 页面，例如 [v-alert](/api/v-alert/#sass-variables)。

<alert type="warning">

  导入 Vuetify 样式时，请确保导入是以 **~** 为前缀的，例如 `~vuetify/src/.../_variables.scss`。

</alert>

## 注意

使用 sass 变量时，需要注意几个地方。

### 重复的 CSS

将常规样式表导入到 `variables` 文件中会造成大量样式重复。 在下面的片段中，我们有一个 `overrides.sass` 文件修改 [v-btn](/components/buttons/) 的 **text-transform** CSS 属性。

```sass
// src/styles/overrides.sass

.v-btn
  text-transform: capitalize
```

下面的代码片段是一个 **反面** 例子。

```scss
// src/styles/variables.scss

// 下面的导入会导致样式重复
@import './overrides.sass';

$card-border-radius: 6px;
$headings: (
  'h1': (
    'font-size': 2rem
  )
);
```

### 编译时间

使用变量将增加你的应用的初始编译时间。 这是因为每当你对被挂起的变量文件进行修改时，样式就会实时更新。 这只会在初始编译步骤中出现，改变 Vuetify 的导入位置可以改善这一点。 请记住，如果你的应用受到任何 [Vuetify loader 限制](/features/treeshaking/#limitations) 的影响，这 _将不会_ 起作用；你的应用仍能正常工作，但性能没有提升。

```js
// src/plugins/vuetify.js

// 正确
import Vuetify from 'vuetify/lib/framework'

// 错误
import Vuetify, { VRow } from 'vuetify/lib/framework'

export default new Vuetify()
```

<backmatter />
