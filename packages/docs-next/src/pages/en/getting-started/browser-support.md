---
meta:
  title: Supported browsers
  description: Vuetify is a progressive framework that supports all evergreen browsers and IE11 / Safari with polyfill.
  keywords: vuetify browser support
---

# Browser support

Vuetify is a progressive framework that attempts to push web development to the next level. In order to best accomplish this task, some sacrifices had to be made in terms of support for older versions of Internet Explorer. This is not an exhaustive list of compatible browsers, but the main targeted ones.

<entry-ad />

## IE11 & Safari 9 support
Vuetify utilizes features of ES2015/2017 that require the need to use polyfills for **Internet Explorer 11** and **Safari 9/10**. If you are using Vue CLI, this is done automatically for you. Otherwise, in your project directory, you can install `babel-polyfill`:

```bash
yarn add babel-polyfill
# OR
npm install babel-polyfill --save
```

It is important to include the plugin as early as possible within your main **index.js file. If using a Vuetify SSR package, this will apply to the **client-entry.js** file

```js
// src/main.js

import 'babel-polyfill'
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'

new Vue({
  vuetify,
}).$mount('#app')
```

It is recommended that you use `babel-preset-env` with the corresponding polyfill to ensure only the necessary polyfills are added to your application. For more information on `babel-preset-env`, [visit the documentation](https://babeljs.io/docs/en/next/babel-preset-env.html).

```bash
yarn add @babel/preset-env -D
# OR
npm install @babel/preset-env -D
```

Once installed, add the preset to your `.babelrc` or `babel.config.js`

```json
// .babelrc

{
  "presets": ["@babel/preset-env"]
}
```

```js
// babel.config.js

module.exports = {
  presets: ['@babel/preset-env']
}
```

<alert type="info">Unfortunately Vue CLI doesn't automatically bring IE11 compatibility in which you may encounter various errors (such as Symbol is not defined). To assist in resolving these errors you may need to manually add `transpileDependencies` parameter in `vue.config.js`.</alert>

Due to Internet Explorer's limited support for `<template>` tags, you must send fully compiled dom elements to the browser. This can be done by either building your Vue code in advance or by creating helper components to replace the dom elements. For instance, if sent directly to IE, this will fail:

```html
<!-- Vue Component -->

<template v-slot:items="props">
  <td>{‌{ props.item.name }‌}</td>
</template>
```

<up-next />

---

<vuetify-ad />
