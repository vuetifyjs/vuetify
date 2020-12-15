---
meta:
  title: Browser support
  description: Vuetify is a progressive framework that supports all evergreen browsers and IE11 / Safari with polyfill.
  keywords: vuetify browser support
related:
  - /getting-started/installation/
  - /getting-started/frequently-asked-questions/
  - /features/sass-variables/
---

# Browser support

Vuetify is a progressive framework that attempts to push web development to the next level. In order to best accomplish this task, some sacrifices had to be made in terms of support for older versions of Internet Explorer. This is not an exhaustive list of compatible browsers, but the main targeted ones.

<entry-ad />

## Browsers

| Browser | Status |
| ------- | ------ |
| Chromium (Chrome, Edge Insider) | Supported |
| Edge | Supported |
| Firefox | Supported |
| Safari 10+ | Supported |
| IE11/Safari 9 | Supported with polyfill |
| IE9 / IE10 | Not supported |

## IE11 and Safari 9 support

Vuetify utilizes features of ES2015/2017 that require the need to use polyfills for **Internet Explorer 11** and **Safari 9/10**.

## Vue CLI

Unfortunately Vue CLI doesn't automatically bring IE11 compatibility in which you may encounter various errors (such as Symbol is not defined). To assist in resolving these errors you need to manually add `transpileDependencies` parameter in `vue.config.js`:

```js
// vue.config.js

module.exports = {
  transpileDependencies: ['vuetify']
}
```

## Webpack

If you are using a custom Webpack setup, you will need to install the [core-js](https://github.com/zloirock/core-js) and [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime) packages. In your terminal, run the following command:

```bash
yarn add core-js regenerator-runtime
# OR
npm install core-js regenerator-runtime --save
```

Include the plugin as _early_ as possible within your **main.js** file—or whatever the main entry point of your application is.

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

Instead of manually installing and importing the polyfills that you need, we _recommend_ that you install [@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env). This package ensures only the **necessary** polyfills are added to your application based upon your designated settings.

```bash
yarn add @babel/preset-env -D
# OR
npm install @babel/preset-env -D
```

Once installed, add the preset to your `babel.config.js` file:

```js
// babel.config.js

module.exports = {
  presets: ['@babel/preset-env']
}
```

or if using a `.babelrc` file:

```json
// .babelrc

{
  "presets": ["@babel/preset-env"]
}
```

## Template caveat

Due to Internet Explorer's limited support for `<template>` tags, you must send fully compiled dom elements to the browser. This can be done by either building your Vue code in advance or by creating helper components to replace the dom elements. For instance, if sent directly to IE, this will fail:

```html
<!-- Vue Component -->

<template v-slot:items="props">
  <td>{‌{ props.item.name }‌}</td>
</template>
```

<backmatter />
