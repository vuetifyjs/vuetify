---
meta:
  title: Treeshaking
  description: Vuetify provides automatic treeshaking via the vuetify-loader. Use only the features that you need and drastically reduce your package bundle size.
  keywords: a la carte, a-la-carte, vuetify single import, vuetify import, component importing, reduce vuetify size, treeshaking, tree shaking
related:
  - /features/sass-variables/
  - /features/blueprints/
  - /introduction/why-vuetify/
features:
  report: true
---

# Treeshaking

Being a component framework, Vuetify will always grow horizontally. Depending on your project, a small bundle size may be a requirement.

<PageFeatures />

<PromotedEntry />

## Automatic treeshaking

Treeshaking enables you to drastically lower your build size by only including the components you actually use in the final bundle. Vuetify comes with plugins for both [Webpack](https://webpack.js.org/) and [vite](https://vitejs.dev/) that enable automatic treeshaking.

Install [webpack-plugin-vuetify](https://www.npmjs.com/package/webpack-plugin-vuetify) or [vite-plugin-vuetify](https://www.npmjs.com/package/vite-plugin-vuetify) then enable it in your bundler configuration. Make sure the vuetify plugin comes after the vue plugin or it won't work correctly.

::: tabs

```js [Vite] { resource="vite.config.js" }
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
  ],
})
```

```js [Webpack] { resource="webpack.config.js" }
const { VueLoaderPlugin } = require('vue-loader')
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = {
  plugins: [
    new VueLoaderPlugin(),
    new VuetifyPlugin(),
  ],
}
```

```js [Vue CLI] { resource="vue.config.js" }
const { VuetifyPlugin } = require('webpack-plugin-vuetify')

module.exports = {
  plugins: [
    new VuetifyPlugin(),
  ],
}
```

::: tab Nuxt
<p class="ma-4">Nuxt also uses the vite plugin but needs some extra configuration to load it in the correct order:</p>

```js { resource="nuxt.config.js" }
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  modules: [
    async (options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', config => config.plugins.push(
        vuetify()
      ))
    },
  ],
})
```

:::

And that's it! Vuetify components and directives will be automatically imported into your application wherever they are used. If you had any wildcard imports they can now be removed.

```diff { resource="src/main.js" }
  import 'vuetify/styles'
  import { createVuetify } from 'vuetify'
- import * as components from 'vuetify/components'
- import * as directives from 'vuetify/directives'
```

<PromotedPromoted />

## Manual imports

Components can be manually imported when not using the loader plugin.

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import { VCard } from 'vuetify/components/VCard'
import { VRating } from 'vuetify/components/VRating'
import { VToolbar } from 'vuetify/components/VToolbar'
import { Ripple } from 'vuetify/directives'

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

```html { resource="Component.vue" }
<template>
  <v-card>
    <v-card-title>...</v-card-title>
    <v-card-text>...</v-card-text>
  </v-card>
</template>

<script setup>
  import { VCard, VCardText, VCardTitle } from 'vuetify/components/VCard'
</script>
```

## Limitations

When using the loader plugin, there are a few scenarios which will require manually importing components.

### Dynamic components

When using dynamic components the plugin is unable to parse which vuetify components are being rendered. This commonly occurs when using the built-in Vue `<component>`. More information about dynamic components can be found in the official Vue [documentation](https://vuejs.org/guide/essentials/component-basics.html#dynamic-components).

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

```html { resource="Component.vue" }
<template>
  <component :is="button ? 'v-btn' : 'v-chip'" />
</template>

<script setup>
  import { VBtn } from 'vuetify/components/VBtn'
  import { VChip } from 'vuetify/components/VChip'
  import { shallowRef } from 'vue'

  const button = shallowRef(false)
</script>
```

### Import groups

All components are available at both `vuetify/components` and `vuetify/components/<group>`. Use of the latter is preferred however as it only loads files that are needed. Treeshaking will still work in production builds if you use `vuetify/components`, but during development it will cause a performance hit by loading styles even for components you aren't using.
