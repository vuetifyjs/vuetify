---
meta:
  title: Commencer avec Vuetify
  description: Commencez avec Vue et Vuetify en un rien de temps. Support de Vue CLI, Webpack, Nuxt et plus.
  keywords: démarrage rapide, templates vuetify, installer vuetify
related:
  - /introduction/why-vuetify/
  - /getting-started/frequently-asked-questions/
  - /getting-started/browser-support/
---

<alert type="error">

  You are viewing documentation for **Vuetify 2**. For instructions on installing **Vuetify 3**, navigate to the [Version 3 Installation Guide](https://vuetifyjs.com/getting-started/installation/)

</alert>

# Installation

Lancez vous avec Vuetify, le framework Vue.js le plus populaire pour la création d'applications riches et rapides.

<entry-ad />

## Installation via Vue CLI

<alert type="warning">

  For information on how to use Vue CLI, visit the [official documentation](https://cli.vuejs.org/).

</alert>

Si vous n'avez toujours pas créé un nouveau projet Vue.js en utilisant le **CLI Vue 3**, vous pouvez le faire en tapant:

```bash
vue create my-app
# naviguer dans le nouveau répertoire de projet
cd my-app
```

Maintenant que vous avez créé un projet, vous pouvez ajouter le paquet Vuetify [Vue CLI](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify-cli) en utilisant le cli.

```bash
vue add vuetify
```

<alert type="warning">

  This command will make changes to your project template files, components folder, vue.config.js, etc. If you are installing Vuetify via Vue-CLI, make sure you commit your code to avoid any potential data loss. Template changes can be skipped by selecting the advanced install option during install.

</alert>

### Installation avec Vue UI

Vuetify peut également être installé en utilisant **Vue UI**, la nouvelle application visuelle pour Vue CLI. Assurez-vous que vous avez la dernière version de Vue CLI installée, puis à partir de votre terminal :

```bash
# assurez-vous que Vue CLI est >= 3.0
vue --version

# Puis démarrez l'interface
vue ui
```

Cela démarrera l'interface utilisateur Vue et ouvrira une nouvelle fenêtre dans votre navigateur. Sur le côté gauche de votre écran, cliquez sur **Plugins**. Une fois là, recherchez Vuetify dans le champ de saisie et installez le plugin.

![Installation du plugin Vuetify](https://cdn.vuetifyjs.com/images/quick-start/vue_ui.png "Plugin Vue UI Vuetify")

## Installation avec Nuxt.js

<vuetify-ad slug="vs-video-nuxt" />

Vuetify can be added by installing the Nuxt Vuetify module.

```bash
yarn add @nuxtjs/vuetify -D
# OU
npm install @nuxtjs/vuetify -D
```

Once installed, update your nuxt.config.js file to include the Vuetify module in the build.

```js
// nuxt.config.js
{
  buildModules: [
    // Simple usage
    '@nuxtjs/vuetify',

    // With options
    ['@nuxtjs/vuetify', { /* module options */ }]
  ]
}
```

<alert type="info">

  [Find more information for the Nuxt Community module on GitHub](https://github.com/nuxt-community/vuetify-module)

</alert>

## Installation avec Webpack

To install Vuetify into a Webpack project you need to add a few dependencies:

```bash
yarn add vuetify@v2-stable
# OR
npm install vuetify@v2-stable
```

```bash
yarn add sass@~1.32 sass-loader deepmerge -D
# OU
npm install sass@~1.32 sass-loader deepmerge -D
```

Once installed, locate your `webpack.config.js` file and copy the snippet below into the rules array. If you have an existing sass rule configured, you may need to apply some or all of the changes below. If you are looking to utilize the vuetify-loader for treeshaking, ensure that you are on version >=4 of Webpack. You can find more information on setting it up with webpack on the [Treeshaking](/features/treeshaking/) page.

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

Create a plugin file for Vuetify, `src/plugins/vuetify.js` with the below content:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

If using vuetify-loader use the content below:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {}

export default new Vuetify(opts)
```

Navigate to your main entry point where you instantiate your Vue instance and pass the Vuetify object in as an option.

```js
// src/main.js

import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export

new Vue({
  vuetify,
}).$mount('#app')
```

### Installation des polices

Vuetify uses Google's Roboto font and Material Design Icons. The simplest way to install these are to include their CDN's in your main `index.html` file.

```html
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
```

## Utilisation avec CDN

To test using Vuetify without installing a template from Vue CLI, copy the code below into your `index.html` file. This will pull the latest version of Vue and Vuetify, allowing you to start playing with components. You can also use the [Vuetify starter](https://template.vuetifyjs.com) on Codepen. While not recommended, if you need to utilize the CDN packages in a production environment, it is recommended that you scope the versions of your assets. For more information on how to do this, navigate to the jsdelivr website.

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

## Utilisation avec Electron

To use Vuetify with Electron, add the electron-builder plugin via Vue CLI.

```bash
# Installation
vue add electron-builder

# Utilisation
yarn electron:build
yarn electron:serve
```

## Utilisation avec PWA

If you are creating a new app with Vue CLI, you have the option to select Progressive Web App (PWA) Support in the first prompt after initiating vue create my-app. This package can also be installed into existing Vue CLI projects by entering the following command:

```bash
vue add pwa
```

## Utilisation avec Cordova

To use Vuetify with Cordova, add the Cordova plugin via Vue CLI:

```bash
# Si cordova n'est pas déjà installé
yarn global add cordova

# Installation
vue add cordova

# Utilisation
yarn cordova-serve-android # Développement Android
yarn cordova-build-android # Build Android
yarn cordova-serve-ios # Development IOS
yarn cordova-build-ios # Build IOS
yarn cordova-serve-browser # Development Browser
yarn cordova-build-browser # Build Browser # Build Browser
```

## Utilisation avec Capacitor

To use Vuetify with **Capacitor**, add the [Capacitor](https://github.com/capacitor-community/vue-cli-plugin-capacitor) plugin via Vue CLI:

```bash
# Installation
$ vue add @nklayman/capacitor

# Utilisation
$ yarn condensateur:serve
```

## Utilisation avec Vuepress

There are 2 ways we can use Vuetify with default **vuepress** theme. Either by  registering vuetify as a plugin in [vuepress](https://vuepress.vuejs.org/) `.vuepress/enhanceApp.js` file (code sample below), or by using vuetify directly from CDN:

```js
// register vuetify as a global plugin with vuepress
// .vuepress/enhanceApp.js
import Vuetify from 'vuetify'

export default ({
  Vue,      // the version of Vue being used in the VuePress app
  options,  // the options for the root Vue instance
  router,   // the router instance for the app
  siteData,  // site metadata
}) => {
  Vue.use(Vuetify)
}

// Alternatively, use vuetify directly from CDN.
// Update head section in .vuepress/config.js as follows
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

| Branch name | Purpose          | package.json entry                         | Changelog                                                           |
| ----------- | ---------------- | ------------------------------------------ | ------------------------------------------------------------------- |
| `master`    | Bug fixes        | `"vuetify": "npm:@vuetify/nightly@latest"` | [Changelog](https://unpkg.com/@vuetify/nightly@latest/CHANGELOG.md) |
| `dev`       | New features     | `"vuetify": "npm:@vuetify/nightly@dev"`    | [Changelog](https://unpkg.com/@vuetify/nightly@dev/CHANGELOG.md)    |
| `next`      | Breaking changes | `"vuetify": "npm:@vuetify/nightly@next"`   | [Changelog](https://unpkg.com/@vuetify/nightly@next/CHANGELOG.md)   |

<backmatter />
