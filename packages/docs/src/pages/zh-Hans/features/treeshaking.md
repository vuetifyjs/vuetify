---
meta:
  title: Treeshaking
  description: Vuetify 通过 vuetify-loader 提供自动树摇。 只使用您需要的功能并大幅减少您的bundle大小。
  keywords: 点菜系统, a-la-carte, 按需引入, vuetify 导入, 导入组件, 缩小 vuetify 大小, 树摇
related:
  - /getting-started/unit-testing/
  - /features/presets/
  - /introduction/why-vuetify/
---

# 树摇

作为一个组件框架，Vuetify将始终横向增长。 根据您的项目，更小的 **包大小** 可能是一个需求。 “按需导入”系统允许您选择要导入的组件，从而大大 _降低_ 您的构建大小。 使用 [Vue CLI 插件](/getting-started/quick-start#vue-cli-install) 创建的新项目默认已启用此功能。

<entry-ad />

<alert type="error">

  树摇只能在 webpack 4 的 **生产模式下** 工作。 使用 Vue CLI 时自动使用它。

</alert>

## Vuetify-loader

保持跟踪正在使用的所有组件可能是一件很麻烦的事。 [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) 通过自动导入您使用的所有Vuetify 组件来缓解这种麻烦。 这也使得代码拆分更加有效，因为webpack只加载显示该代码块所需的组件。

### 从lib导入

若要使用树摇，您必须从 **vuetify/lib** 导入Vuetify。

```js
// 您仍然需要自己注册 Vuetify 
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

<alert type="info">

  作为第二个参数对象传递给 **Vue.use** 的选项也可以包含组件,指令和过渡属性。

</alert>

### Vue 配置安装

虽然不建议使用，但您可以选择不使用Vue CLI插件，而是通过Vue CLI的 [配置webpack](https://cli.vuejs.org/config/#configurewebpack) 选项手动配置loader。

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

### Webpack 安装

您还可以为基于webpack的项目显式安装loader。 类似于 vue.config.js 设置，您只需将 loader 添加到您的项目的 webpack 插件中。

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

## 所需要的样式

When you import from `vuetify/lib`, the baseline framework styles are pulled in as well. Each component is individually responsible for its styles and will be compiled just the same. If you are using Vue CLI and the `vue-cli-plugin-vuetify` plugin, this is done for you automatically, and you can **skip** this section. If you are working on a project where you do not have access to the cli, you can manually include the required packages:

```bash
yarn add sass sass-loader deepmerge -D
```

或

```bash
npm install sass sass-loader deepmerge -D
```

<alert type="info">

  欲了解如何设置你的应用程序来处理 SASS，请浏览 [主题页面](/customization/theme)。

</alert>

After the installation, you will still need to configure your webpack.config.js to parse .sass files. 要了解更多关于如何做到这一点的信息，请查阅 [官方文档](https://webpack.js.org/loaders/sass-loader/)。

## 自定义动态导入

The `vuetify-loader` also allows you to write your own custom match functions to import your own project's components as well. 这可以在 Vue CLI 和 webpack 项目中进行。

```js
// vue.config.js

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin({
        /**
         * 将为每个vue组件中使用的每个标记调用此函数
         * 它应该返回一个数组，第一个元素将被插入到组件数组中，第二个元素应该是相应的导入
         *
         * originalTag - 最初在模板中使用的标记
         * kebabTag    - 标签序列化为kebab-case
         * camelTag    - 标签序列化为PascalCase
         * path        - 指向到当前 .vue 文件的相对路径
         * component   - 表示解析后的当前组件
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

## 局限性

使用`vuetify loader`时，有一些场景需要手动导入组件。

### 动态组件

`v-data-iterator` 可以通过content-tag prop使用任何组件。 此组件必须 [全局](#markup-js-a-la-carte-manual) 注册:

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

`<component :is="my-component">` 使用的动态组件可以 [在本地](#markup-js-a-la-carte-destructuring) 注册:

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

### 函数组件

函数组件在运行时由vue内联，其选项中不能包含 ** components ** 属性。 在自定义功能组件中使用的任何Vuetify组件都必须全局注册（推荐），或在本地注册（无论在任何地方使用自定义组件）。

## 手动导入

当不使用 Vuetify loader时，组件可以手动导入。 当使用动态组件和 **vuetify-loader** 时，您也会想要这样做，因为它只能解析显式用法。 使用内置Vue`<component>`时通常会发生这种情况。 关于动态组件的更多信息可以在官方的 Vue [文档](https://vuejs.org/v2/guide/components.html#Dynamic-Components) 中找到。

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

您也可以从 .vue 文件中导入组件。

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
