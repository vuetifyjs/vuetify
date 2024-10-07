---
meta:
  title: 浏览器支持
  description: Vuetify 是一个渐进式的框架，支持所有常青树浏览器和IE11/Safari (使用 polyfill) 。
  keywords: vuetify 浏览器支持
related:
  - /getting-started/installation/
  - /getting-started/frequently-asked-questions/
  - /features/sass-variables/
---

# 浏览器支持

Vuetify 是一个渐进式的框架，试图将 Web 开发推向新的高度。 为了最好地完成这项任务，必须在支持 Internet Explorer 的旧版本方面做出一些牺牲。 这不是兼容浏览器的详尽列表，而是主要的目标浏览器。

<entry-ad />

## 浏览器

| 浏览器名称                           | 支持状态        |
| ------------------------------- | ----------- |
| Chromium (Chrome, Edge Insider) | 支持          |
| Edge                            | 支持          |
| Firefox                         | 支持          |
| Safari 10+                      | 支持          |
| IE11/Safari 9                   | 需要 polyfill |
| IE9 / IE10                      | 不支持         |

## 支持 IE11 和 Safari 9

Vuetify 使用 ES2015/2017 的功能，这些功能需要使用 polyfills 来兼容 **Internet Explorer 11** 和 **Safari 9/10**。

## Vue CLI

遗憾的是，Vue CLI 并没有自动带来 IE11 的兼容性，在这里你可能会遇到各种错误（如 Symbol 未定义）。 为了解决这些错误，你可能需要在 `vue.config.js`中手动添加 `transpileDependencies`参数。

```js
// vue.config.js

module.exports = {
  transpileDependencies: ['vuetify']
}
```

## Webpack

如果你在使用自定义 Webpack 设置， 你需要安装 [core-js](https://github.com/zloirock/core-js) 和 [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime) 包。 在你的终端中，运行以下命令：

```bash
yarn add core-js regenerator-runtime
# 或者
npm install core-js regenerator-runtime --save
```

_尽早_在你的 **main.js** 文件或应用程序的主要入口处安装插件。

```js
// src/main.js

// Polyfills
import 'core-js/stable'
import 'regenerator-runtime/runtime'

// Imports
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'

new Vue({ vuetify }).$mount('#app')
```

<discovery-ad />

<br>
<br>

### Babel preset-env

我们_建议_您安装 [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)，而不是手动安装和导入所需的 polyfills。 该包确保只根据你指定的设置向应用程序中添加**必要的** pollyfills。

```bash
yarn add @babel/preset-env -D
# 或
npm install @babel/preset-env -D
```

一旦安装完毕，将预设添加到您的 `babel.config.js` 文件：

```js
// babel.config.js

module.exports = {
  presets: ['@babel/preset-env']
}
```

或者如果你在使用 `.babelrc` 文件：

```json
// .babelrc

{
  "presets": ["@babel/preset-env"]
}
```

## Template 警告

由于 Internet Explorer 对 `<template>` 标签的支持有限，您必须向浏览器发送完整编译的 dom 元素。 这可以通过提前构建你的 Vue 代码或者通过创建辅助组件来替换 dom 元素来实现。 例如，如果直接发送至 IE，就会失败：

```html
<!-- Vue Component -->

<template v-slot:items="props">
  <td>{‌{ props.item.name }‌}</td>
</template>
```

<backmatter />
