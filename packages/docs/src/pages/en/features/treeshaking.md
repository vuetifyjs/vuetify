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

Being a component framework, Vuetify will always grow horizontally. Depending on your project, a small **package size** may be a requirement. The A la carte system enables you to pick and choose which components to import, drastically _lowering_ your build size. New projects created with the [Vue CLI plugin](/getting-started/quick-start#vue-cli-install) have this enabled by default.

<entry-ad />

<alert type="error">

  Treeshaking will only work with Webpack 4 in **production mode**. This is automatic when using Vue CLI.

</alert>

## Vuetify-loader

Keeping track of all the components you're using can be a real chore. The [vuetify-loader](https://github.com/vuetifyjs/vuetify-loader) alleviates this pain by automatically importing all the Vuetify components you use, where you use them. This will also make code-splitting more effective, as webpack will only load the components required for that chunk to be displayed.

### Importing from lib

In order to use treeshaking, you must import Vuetify from **vuetify/lib**.

```js
// You still need to register Vuetify itself
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

<alert type="info">

  The options object that you pass as the second argument to **Vue.use** can also include a components, directives and a transitions property.

</alert>

### Vue config installation

While it is not recommended, you can opt out of using the Vue CLI plugin and instead manually configure the loader via the [configure webpack](https://cli.vuejs.org/config/#configurewebpack) option from Vue CLI.

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

### Webpack installation

You can also explicitly install the loader for webpack based projects. Similar to the vue.config.js setup, you simply add the loader to your project's webpack plugins.

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

## Required styles

When you import from `vuetify/lib` the baseline framework styles are pulled in as well. Each component is individually responsible for their styles and will be compiled just the same. If you are using Vue CLI and the `vue-cli-plugin-vuetify` plugin, this is done for you automatically and you can **skip** this section. If you are working in a project where you do not have access to the cli, you can manually included the required packages:

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

After installation you will still need to configure your webpack.config.js to parse .sass files. For more information on how to do this, checkout the [official documentation](https://webpack.js.org/loaders/sass-loader/).

## Custom dynamic imports

The vuetify-loader also allows you to write your own custom match functions to import your own project's components as well. This can be done in both Vue CLI and webpack projects.

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

## Limitations

When using the `vuetify-loader`, there are a few scenarios which will require manual importing of components.

### Dynamic components

`v-data-iterator` can use any component via the content-tag prop. This component must be registered [globally](#markup-js-a-la-carte-manual):

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

Dynamic components used with `<component :is="my-component">` can be registered [locally](#markup-js-a-la-carte-destructuring):

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

### Functional components

Functional components are inlined at runtime by vue, and cannot have a **components** property in their options. Any Vuetify components used in a custom functional component must either be registered globally (recommended), or locally, wherever the custom component is used.

## Manually importing

Components can be manually imported when not using the Vuetify loader. You will also want to do this when using dynamic components and the **vuetify-loader** as it only parses explicit usage. This commonly occurs when using the built in Vue `<component>`. More information about dynamic components can be found in the official Vue [documentation](https://vuejs.org/v2/guide/components.html#Dynamic-Components).

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

You can also import components in .vue files, as seen below.

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
