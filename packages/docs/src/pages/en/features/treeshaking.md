---
meta:
  title: Treeshaking
  description: Vuetify provides automatic treeshaking via the vuetify-loader. Use only the features that you need and drastically reduce your package bundle size.
  keywords: a la carte, a-la-carte, vuetify single import, vuetify import, component importing, reduce vuetify size, treeshaking, tree shaking
related:
  - /getting-started/unit-testing/
  - /features/presets/
  - /introduction/why-vuetify/
---

# Treeshaking

Being a component framework, Vuetify will always grow horizontally. Depending on your project, a small bundle size may be a requirement. Treeshaking enables you to drastically lower your build size by only including the components you actually use in the final bundle.

<entry />

## vuetify-loader

Keeping track of all the components you're using can be a real chore. The [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) alleviates this pain by automatically importing all the Vuetify components you use, where you use them. This will also make code-splitting more effective, as webpack will only load the components required for that chunk to be displayed.

New projects created with our **Vue CLI** plugin have this enabled by default, regardless if you used [Vite](/getting-started/installation#vite) or [Vue CLI](/getting-started/installation#vue-cli) to create your project.

### Importing from lib

In order to use treeshaking, you must import `createVuetify` from **vuetify/lib**.

```js { resource="src/plugins/vuetify.js" }
import { createVuetify } from 'vuetify/lib'

export const vuetify = createVuetify()
```

```js { resource="src/main.js" }
import { createApp } from 'vue'
import { vuetify } from './plugins/vuetify'
import App from './App.vue'

createApp(App).use(vuetify).mount('#app')
```

### Manual configuration

It is also possible to use the **vuetify-loader** without our Vue CLI plugin.

#### Vue CLI project

To manually configure the vuetify-loader in a Vue CLI project, use the [configureWebpack](https://cli.vuejs.org/config/#configurewebpack) option.

```js { resource="vue.config.js" }
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyPlugin()
    ],
  },
}
```

#### Webpack project

You can also explicitly install the loader for webpack-based projects. Similar to the vue.config.js setup, you simply add the loader to your project's webpack plugins.

```js { resource="webpack.config.js" }
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = {
  plugins: [
    new VuetifyPlugin()
  ],
}
```

<alert type="warning">

  Treeshaking will only work with Webpack in **production mode**.

</alert>

#### Vite project

In Vite projects as with Webpack, add the plugin to the **plugins** section. But make sure you are using the **vite-plugin-vuetify** package instead.

```js { resource="vite.config.js" }
const { VuetifyPlugin } = require('vite-plugin-vuetify')

module.exports = {
  plugins: [
    new VuetifyPlugin()
  ],
}
```

<discovery />

<!--
## Required styles

When you import from `vuetify/lib`, the baseline framework styles are pulled in as well. Each component is individually responsible for its styles and will be compiled just the same. If you are using Vue CLI and the `vue-cli-plugin-vuetify` plugin, this is done for you automatically, and you can **skip** this section. If you are working on a project where you do not have access to the cli, you can manually include the required packages:

```bash
yarn add sass sass-loader deepmerge -D
```

OR

```bash
npm install sass sass-loader deepmerge -D
```

<alert type="info">

  For a more detailed explanation on how to setup your application to handle SASS, please navigate to the [theme page](/features/theme).

</alert>

After the installation, you will still need to configure your webpack.config.js to parse .sass files. For more information on how to do this, checkout the [official documentation](https://webpack.js.org/loaders/sass-loader/).

## Custom dynamic imports

The `vuetify-loader` also allows you to write your own custom match functions to import your own project's components as well. This can be done in both Vue CLI and webpack projects.

```js
// vue.config.js

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin({
        /**
         * This function will be called for every tag used in each vue component
         * It should return an array, the first element will be inserted into the
         * components array, the second should be a corresponding import
         *
         * originalTag - the tag as it was originally used in the template
         * kebabTag    - the tag normalized to kebab-case
         * camelTag    - the tag normalized to PascalCase
         * path        - a relative path to the current .vue file
         * component   - a parsed representation of the current component
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
-->

### Limitations

When using the **vuetify-loader**, there are a few scenarios which will require manually importing components.

#### Dynamic components

When using dynamic components the **vuetify-loader** is unable to parse which vuetify components are being rendered. This commonly occurs when using the built in Vue `<component>`. More information about dynamic components can be found in the official Vue [documentation](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).

<!--
`v-data-iterator` can use any component via the content-tag prop. This component must be registered [globally](#markup-js-a-la-carte-manual):

```html
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
-->

Dynamic components using `<component>` can be registered locally:

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

## Manual imports

Components can be manually imported when not using the **vuetify-loader**.

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import {
  createApp,
  VCard,
  VRating,
  VToolbar,
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

const vuetify = createVuetify({
  components: {
    VCard,
    VRating,
    VToolbar,
  },
  directives: {
    Ripple,
  },
})

export default vuetify
```

You can also import components locally in .vue files, as seen below.

```html
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
