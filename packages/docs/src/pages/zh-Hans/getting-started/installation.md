---
meta:
  title: 开始使用 Vuetify
  description: 立即开始使用 Vue 和 Vuetify。 支持 Vue CLI, Webpack, Nuxt 等等。
  keywords: 快速启动，vuetify模板，安装vuetify
related:
  - /introduction/why-vuetify/
  - /getting-started/frequently-asked-questions/
  - /getting-started/browser-support/
---

<alert type="error">

  You are viewing documentation for **Vuetify 2**. For instructions on installing **Vuetify 3**, navigate to the [Version 3 Installation Guide](https://vuetifyjs.com/getting-started/installation/)

</alert>

# 安装

让我们从 Vuetify 开始吧，这是世界上最流行的 Vue.js 框架，用于构建功能丰富、快速的应用程序。

<entry-ad />

## Vue CLI 安装

<alert type="warning">

  For information on how to use Vue CLI, visit the [official documentation](https://cli.vuejs.org/).

</alert>

如果你还没有使用**Vue CLI**创建过Vue.js的项目，你可以尝试输入以下内容:

```bash
vue create my-app
# 切换到新项目目录
cd my-app
```

现在你已经实例化了一个项目，你可以使用 [Vue CLI ](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify-cli) 添加Vuetify

```bash
vue add vuetify
```

<alert type="warning">

  This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.

</alert>

### Vue UI 安装

Vuetify 也可以使用 **Vue UI** 安装，这是 Vue CLI 的新可视化应用。 确保你已经安装了最新版本的 Vue CLI，然后从你的终端中键入：

```bash
# 确保 Vue CLI 版本是 >= 3.0
vue --version
//或
vue -V

# 然后启动 UI
vue ui
```

这将启动 Vue 用户界面，并在浏览器中打开一个 新窗口。 在屏幕左侧，单击 **插件**。 在输入框中搜索 Vuetify 并安装插件。

![安装 Vuetify 插件](https://cdn.vuetifyjs.com/images/quick-start/vue_ui.png "Vue UI Vuetify 的插件")

## Nuxt 安装

<vuetify-ad slug="vs-video-nuxt" />

Vuetify可以通过添加Nuxt Vuetify模块进行安装。

```bash
yarn add @nuxtjs/vuetify -D
# 或者
npm install @nuxtjs/vuetify -D
```

完成安装后，找到nuxt.config.js文件并打开编辑以添加Vuetify模块到构建中。

```js
// nuxt.config.js
{
  buildModules: [
    // 简单使用
    '@nuxtjs/vuetify',

    // 和选项一起
    ['@nuxtjs/vuetify', { /* 模块选项 */ }]
  ]
}
```

<alert type="info">

  [Find more information for the Nuxt Community module on GitHub](https://github.com/nuxt-community/vuetify-module)

</alert>

## Webpack 安装

要将Vuetify安装到一个Webpack项目，您需要添加数个依赖文件。

```bash
yarn add vuetify@v2-stable
# OR
npm install vuetify@v2-stable
```

```bash
yarn add sass@~1.32 sass-loader deepmerge -D
# OR
npm install sass@~1.32 sass-loader deepmerge -D
```

安装后，找到 ` webpack.config.js `文件并复制下面的代码到规则数组中。 如果你已经配置了一个现有的 sass 文件规则，您可能需要应用下方的一些甚至全部更改。 如果你正在寻求使用vuetify-loader进行摇树优化，请确保你的Webpack版本为 >=4。 您可以在 [摇树页面 ](/features/treeshaking/) 了解更多有关设置webpack的信息。

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

使用下方代码在`src/plugins/vuetify.js`为Vuetify创建一个插件文件。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

如果使用的是 vuetify-loader，则需和下方代码共同使用：

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

找到您的Vue设置文件或文件位置。在此，您可以实例化您的Vue实例，并将Vuetify对象作为一个选项。

```js
// src/main.js

import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

new Vue({
  vuetify,
}).$mount('#app')
```

### 安装字体

Vuetify使用了Google的Material设计语言中的Roboto字体和Material Design的应用图标。 要从最简单做起的话，就是在开发项目中的`index.html`添加它们的CDN（即内容分发网络）链接。这样你就可以在网页中使用它们了。

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
```

## CDN 的用法

要在不安装Vue CLI命令行的情况下使用Vuetify进行项目测试，复制下方的HTML代码并粘贴于项目中的`index.html`文件。 这将会以CDN的方式导入最新版本的Vue网络框架和Vuetify。成功导入后，您就可以开始探索Vuetify的世界了。 当然，您也可以使用 Codepen 上的[Vuetify Starter](https://template.vuetifyjs.com)模板来实际在Vue的稳定环境中测试使用Vuetify。 While not recommended, if you need to utilize the CDN packages in a production environment, it is recommended that you scope the versions of your assets. For more information on how to do this, navigate to the jsdelivr website.

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

## Electron 的用法

To use Vuetify with Electron, add the electron-builder plugin via Vue CLI.

```bash
# 安装
vue add electron-builder

# 使用
yarn electron:build
yarn electron:serve
```

## PWA 的用法

If you are creating a new app with Vue CLI, you have the option to select Progressive Web App (PWA) Support in the first prompt after initiating vue create my-app. This package can also be installed into existing Vue CLI projects by entering the following command:

```bash
vue add pwa
```

## Cordova 的用法

To use Vuetify with Cordova, add the Cordova plugin via Vue CLI:

```bash
# 如果 cordova 尚未安装
yarn global add cordova

# 安装
vue add cordova

# 使用
yarn cordova-serve-android # Development Android
yarn cordova-build-android # Build Android
yarn cordova-serve-ios # Development IOS
yarn cordova-build-ios # Build IOS
yarn cordova-serve-browser # Development Browser
yarn cordova-build-browser # Build Browser
```

## Capacitor 的用法

To use Vuetify with **Capacitor**, add the [Capacitor](https://github.com/capacitor-community/vue-cli-plugin-capacitor) plugin via Vue CLI:

```bash
# 安装
$ vue add @nklayman/capacitor

# 使用
$ yarn capacitor:serve
```

## Vueprs 的用法

There are 2 ways we can use Vuetify with default **vuepress** theme. Either by  registering vuetify as a plugin in [vuepress](https://vuepress.vuejs.org/) `.vuepress/enhanceApp.js` file (code sample below), or by using vuetify directly from CDN:

```js
// 作为全局插件注册vuetify
// .vuepress/enhanceApp.js
import Vuetify from 'vuetify'

export default ({
  Vue,      // VuePress 应用正在使用的Vue版本
  options,  // 根Vue实例的选项
  router,   // 应用的路由实例
  siteData,  // 站点元数据
}) => {
  Vue.use(Vuetify)
}

// 或者直接从CDN使用vuetify.
// 像下面一样更新 .vuepress/config.js 的头部部分.
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

## Nightly Builds

The three development branches (`master`, `dev`, and `next`) are automatically published to NPM at 1200 UTC under the [`@vuetify/nightly`](https://www.npmjs.com/package/@vuetify/nightly?activeTab=versions) namespace. They may be outdated or buggy and are therefore not officially supported and are only supplied for testing puposes. These builds can be installed with a [package alias](https://docs.npmjs.com/cli/v8/commands/npm-install#:~:text=Install%20a%20package%20under%20a%20custom%20alias).

| 分支名称     | 用途               | package.json entry                         | 变更日志                                                           |
| -------- | ---------------- | ------------------------------------------ | -------------------------------------------------------------- |
| `master` | Bug修复            | `"vuetify": "npm:@vuetify/nightly@latest"` | [变更日志](https://unpkg.com/@vuetify/nightly@latest/CHANGELOG.md) |
| `dev`    | 新功能              | `"vuetify": "npm:@vuetify/nightly@dev"`    | [变更日志](https://unpkg.com/@vuetify/nightly@dev/CHANGELOG.md)    |
| `next`   | Breaking changes | `"vuetify": "npm:@vuetify/nightly@next"`   | [变更日志](https://unpkg.com/@vuetify/nightly@next/CHANGELOG.md)   |

<backmatter />
