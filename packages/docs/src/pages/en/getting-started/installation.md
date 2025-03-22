---
meta:
  nav: Installation
  title: Get started with Vuetify 3
  description: Details for v3 release - faq, changes, and upgrading.
  keywords: migration, releases, upgrading vuetify, beta, v3
related:
  - /getting-started/contributing/
  - /introduction/roadmap/
  - /getting-started/release-notes/
---

<script setup>
  import { version } from 'vuetify'
</script>

# Get started with Vuetify 3

Get started with Vuetify, the world’s most popular Vue.js framework for building feature rich, blazing fast applications.

<PageFeatures />

<VoPromotionsCardHighlight class="mb-4" slug="vuemastery-getting-started" />

## Installation

Vuetify has support for multiple different installation paths with the most common scaffolding tool being [create-vuetify](https://github.com/vuetifyjs/create-vuetify)

For more information regarding supported package managers, please visit their official websites:

* [pnpm](https://pnpm.io/)
* [yarn](https://yarnpkg.com/)
* [npm](https://npmjs.org/)
* [bun](https://bun.sh/package-manager)

## Using Vite

To get started with Vuetify 3, simply paste the following code into your terminal:

::: tabs

```bash [pnpm]
pnpm create vuetify
```

```bash [yarn]
yarn create vuetify
```

```bash [npm]
npm create vuetify@latest
```

```bash [bun]
bun create vuetify
```

:::

This command prompts you with a few options before generating your scaffolded Vue / Vuetify 3 project.

```bash
success Installed "create-vuetify@x.x.x" with binaries:
    - create-vuetify

? Project name: ❯ vuetify-project // the folder to generate your application
? Use TypeScript?: ❯ No / Yes
? Would you like to install dependencies with yarn, npm, or pnpm?:
  ❯ yarn
    npm
    pnpm
    bun
    none
```

After making your selections, [create-vuetify](https://github.com/vuetifyjs/create-vuetify) will generate the structure for your new application.

Once the scaffold is complete, start the vite development server by running the following commands:

```bash
cd vuetify-project
pnpm dev
```

<PromotedEntry />

## Using Nuxt 3

[Nuxt](https://nuxt.com/) is an open-source framework that has helpful features to quickly get you started with developing a full-stack Vue app, such as file-based routing, SSR and component auto-imports.

### Manual setup

Nuxt is powered by Nitro and can be used with Vite or Webpack 5 bundlers, so the steps to get Vuetify working in Nuxt 3 are quite similar to [the manual steps described below](#existing-projects).

Start off creating a nuxt app by executing the following commands:

::: tabs

```bash [pnpm]
pnpx nuxi@latest init <project-name>
cd <project-name>
# Create a .npmrc file with shamefully-hoist=true
pnpm install
```

```bash [yarn]
npx nuxi@latest init <project-name>
cd <project-name>
yarn
```

```bash [npm]
npx nuxi@latest init <project-name>
cd <project-name>
npm install
```

```bash [bun]
bunx nuxi@latest init <project-name>
cd <project-name>
bun install
```

:::

and then install the required Vuetify modules as dependencies:

::: tabs

```bash [pnpm]
pnpm i -D vuetify vite-plugin-vuetify
pnpm i @mdi/font
```

```bash [yarn]
yarn add -D vuetify vite-plugin-vuetify
yarn add @mdi/font
```

```bash [npm]
npm i -D vuetify vite-plugin-vuetify
npm i @mdi/font
```

```bash [bun]
bun add -d vuetify vite-plugin-vuetify
bun add @mdi/font
```

:::

Next, integrate the following entries into your `nuxt.config.ts` file:

```ts { data-resource="nuxt.config.ts" }
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  //...
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
```

Nuxt allows you to change its Vite config by using its built-in hook `vite:extendConfig`. In its callback function, add the Vuetify plugin to the array of Vite plugins. To resolve relative asset URLs that are passed to Vuetify components such as `VImg` (e.g. `~/assets/img/some.png`) the `transformAssetUrls` function needs to be added in the `vite` entry .

In the next step, initialize Vuetify and add it to the main Vue app instance. This can be done in the `plugins` folder as any plugin that is placed in this folder will be automatically loaded by Nuxt at startup.

```ts { data-resource="~/plugins/vuetify.ts" }
// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
  })
  app.vueApp.use(vuetify)
})
```

Finally, add Vuetify's root `VApp` component either in `~/app.vue` or `~/layouts/default.vue`, for example:

```html { data-resource="app.vue" }
<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
```

or

```html { data-resource="~/layouts/default.vue" }
<template>
  <v-app>
    <!-- .... -->
  </v-app>
</template>
```

You should now have access to all Vuetify components and tools in the Nuxt app.

### vuetify-nuxt-module

Alternatively, you can use the [vuetify-nuxt-module](https://github.com/vuetifyjs/nuxt-module) (works only with Vite). The module is strongly opinionated and has a built-in default configuration out of the box. You can use it without any configuration, and it will work for most use cases.

Check the [documentation](https://nuxt.vuetifyjs.com/) for more information on how to use it.

## Using Laravel Mix

```js
import { createApp } from 'vue'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives
})

createApp(App).use(vuetify).mount('#app')
```

To import the fonts you need to add to webpack.mix.js:

```js
mix.copy('node_modules/@mdi/font/fonts/', 'dist/fonts/')
```

## Using CDN

We recommend using the latest version of Vuetify 3 from [jsdelivr](https://www.jsdelivr.com/). All components and styles are included.

`https://cdn.jsdelivr.net/npm/vuetify@{{ version }}/dist/vuetify.min.css` { .text-truncate }

`https://cdn.jsdelivr.net/npm/vuetify@{{ version }}/dist/vuetify.min.js` { .text-truncate }

```js
const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify()

const app = createApp()
app.use(vuetify).mount('#app')
```

## Using as ES Module with CDN

To import Vuetify (and Vue) using an [import map](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) you can use the same CDN but contain it in a ES module without tooling

```html
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vuetify@{{ version }}/dist/vuetify.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css" />
  <link rel="stylesheet" href="https://fonts.bunny.net/css?family=roboto:400,500,700" />
  <script type="importmap">
  {
    "imports": {
      "vue": "https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.esm-browser.js",
      "vuetify": "https://cdn.jsdelivr.net/npm/vuetify@{{ version }}/dist/vuetify.esm.js"
    }
  }
  </script>
</head>
```

```html
<script type="module">
  import { createApp, ref, computed } from "vue"
  import { createVuetify } from "vuetify"
  //... setup as usual
</script>
```

## Using Vitepress

You can use Vuetify's components in your Vitepress static site.

After initializing your Vitepress project, add Vuetify to your dependencies

::: tabs

```bash [pnpm]
pnpm i vuetify
```

```bash [yarn]
yarn add vuetify
```

```bash [npm]
npm i vuetify
```

```bash [bun]
bun add vuetify
```

:::

Then, in your `.vitepress/theme/index.ts`

```ts
import DefaultTheme from 'vitepress/theme'
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({ components, directives })

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(vuetify)
  },
}
```

## Existing projects

Follow these steps if for example you are adding Vuetify to an existing project, or simply do not want to use a scaffolding tool.

::: tabs

```bash [pnpm]
pnpm i vuetify
```

```bash [yarn]
yarn add vuetify
```

```bash [npm]
npm i vuetify
```

```bash [bun]
bun add vuetify
```

:::

::: tip

If you are upgrading from an earlier version of Vuetify, make sure to check out our [Upgrade Guide](/getting-started/upgrade-guide/)

:::

In the file where you create the Vue application, add the following code

```js
import { createApp } from 'vue'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Components
import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

createApp(App).use(vuetify).mount('#app')
```

This will include all components and directives regardless of whether or not you are using them. If you instead only want to include used components, have a look at the [Vite](https://npmjs.com/package/vite-plugin-vuetify) or [Webpack](https://npmjs.com/package/webpack-plugin-vuetify) plugins, depending on your setup. The plugins also makes it possible to customize SCSS variables.

Lastly, do not forget to install [icons](/features/icon-fonts/).

## SSR caveats

Vue 3 has no way to automatically detect if SSR is used &mdash; so nuxt, gridsome, and other SSR frameworks must manually set the `ssr` option to `true` in order to properly render the application.

```js { data-resource="src/plugins/vuetify.js" }
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const vuetify = createVuetify({
  ssr: true,
})
```

## Exposed exports

The following export paths exist for the Vuetify framework:

### JS / TS

| Name                             | Description                                                                                                                                        |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|
| `vuetify`                        | Main entry point. Contains `createVuetify()` and public composables.                                                                               |
| `vuetify/styles`                 | Precompiled global CSS (reset, utilities, etc.), no component styles. Will be redirected to SASS if `styles.configFile` is set in vite or webpack. |
| `vuetify/components`             | All components. Not recommended as it will include all components during development, slowing down your build.                                     |
| `vuetify/components/<name>`      | Individual components. Grouped by top-level name, for example VListItem, VListGroup, and VListItemTitle are all in `vuetify/components/VList`.     |
| `vuetify/directives`             | All directives.                                                                                                                                    |
| `vuetify/directives/<name>`      | Individual directives.                                                                                                                             |
| `vuetify/blueprints/<name>`      | Preset collections of prop defaults.                                                                                                               |
| `vuetify/locale`                 | Translations for strings in vuetify components. Each language is a named export.                                                                   |
| `vuetify/locale/adapters/<name>` | Adapters to retrieve translations from other libraries such as vue-i18n.                                                                           |
| `vuetify/iconsets/<name>`        | Icon presets, see [Icon Fonts](/features/icon-fonts/)                                                                                              |

### SASS

See [SASS Variables](/features/sass-variables/) for more information.

| Name               | Description                                                                                     |
|--------------------|-------------------------------------------------------------------------------------------------|
| `vuetify`          | Global CSS (reset, utilities, etc.), no component styles. Equivalent to `vuetify/styles` in JS. |
| `vuetify/settings` | All SASS variables, including component variables.                                              |
| `vuetify/tools`    | Mixins and functions.                                                                           |

## Nightly Builds

The three development branches (`master`, `dev`, and `next`) are automatically published to NPM at 1200 UTC under the [`@vuetify/nightly`](https://www.npmjs.com/package/@vuetify/nightly?activeTab=versions) namespace. They may be outdated or buggy and are therefore not officially supported and are only supplied for testing purposes. These builds can be installed with a [package alias](https://docs.npmjs.com/cli/v8/commands/npm-install#:~:text=Install%20a%20package%20under%20a%20custom%20alias).

| Branch name | Purpose          | package.json entry                         | Changelog                                                           |
|-------------|------------------|--------------------------------------------|---------------------------------------------------------------------|
| `master`    | Bug fixes        | `"vuetify": "npm:@vuetify/nightly@latest"` | [Changelog](https://unpkg.com/@vuetify/nightly@latest/CHANGELOG.md) |
| `dev`       | New features     | `"vuetify": "npm:@vuetify/nightly@dev"`    | [Changelog](https://unpkg.com/@vuetify/nightly@dev/CHANGELOG.md)    |
| `next`      | Breaking changes | `"vuetify": "npm:@vuetify/nightly@next"`   | [Changelog](https://unpkg.com/@vuetify/nightly@next/CHANGELOG.md)   |

```diff
 "devDependencies": {
-  "vuetify": "^3.3.0"
+  "vuetify": "npm:@vuetify/nightly@3.3.0-master.2023-05-21"
 }
```

## Questions

Have a question that belongs here? Tell us in our [Discord Community](https://community.vuetifyjs.com/) or create a request on our [Issue Generator](https://issues.vuetifyjs.com/).

<PromotedPromoted slug="vuetify-discord" />
