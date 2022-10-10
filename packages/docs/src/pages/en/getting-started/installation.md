---
nav: Installation
meta:
  title: Get started with Vuetify 3 Beta
  description: Details for v3 beta release - faq, changes, and upgrading.
  keywords: migration, releases, upgrading vuetify, beta, v3
related:
  - /getting-started/contributing/
  - /introduction/roadmap/
  - /getting-started/release-notes/
---

<script setup>
  import { ref } from 'vue'
  import { version } from 'vuetify'

  const tab = ref('yarn')
</script>

# Vuetify 3 Beta

Welcome to the Vuetify 3 Beta release. To get started, select an installation method below or review some of the most [Frequently Asked Questions](#frequently-asked-questions)

<alert type="error">

  The Vuetify 3 Beta is for testing purposes only and is not intended for production applications.

</alert>

## Installation

To get started with Vuetify 3 create a new Vue project using [Vue CLI](#vue-cli). For [Vite preview](#vite), installations, there is an added step you must first use the **create** command using one of the following package managers:

* [yarn](https://yarnpkg.com/)
* [npm](https://npmjs.org/)
* [pnpm](https://pnpm.io/)

We recommend using **yarn**, but any will work just fine. For more information on different installation options for vite, visit the official [installation guide](https://vitejs.dev/guide/#scaffolding-your-first-vite-project).

### Vite

Vite is a build tool from the creator of Vue designed to provide faster and leaner development. It offers significantly lower build and compilation times during development and extremely fast Hot Module Replacement (HMR). The following sections cover how you can create a new vite application for Vue and Vuetify 3.

<v-tabs v-model="tab" color="primary">
  <v-tab value="yarn" variant="plain">Yarn</v-tab>
  <v-tab value="npm" variant="plain">NPM</v-tab>
  <v-tab value="pnpm" variant="plain">PNPM</v-tab>
</v-tabs>
<v-window v-model="tab">
  <v-window-item value="yarn">

```bash
yarn create vite my-app --template vue
```

  </v-window-item>
  <v-window-item value="npm">

<p class="mt-4">Use the following command to check your current version:</p>

```bash
npm -v
```

Note the displayed value to determine the correct installation command. For more information on how to upgrade **npm** on your system, visit the official [Upgrade NPM Page](https://docs.npmjs.com/try-the-latest-stable-version-of-npm).

For version **7 and above**, an additional "**- -**" is required before specifying the vite template parameters. Use the following code for newer npm versions:

```bash
npm create vite my-vue-app -- --template vue
```

If your npm version is **less than 7**, the extra "**- -**" is not required. Use the following code for older npm versions:

```bash
npm create vite my-vue-app --template vue
```

  </v-window-item>
  <v-window-item value="pnpm">

```bash
pnpm create vite my-vue-app -- --template vue
```

  </v-window-item>
</v-window>

----

Once your project is created, navigate to the [Adding Vuetify](#adding-vuetify) section to continue.

### Vue CLI

For more information on how to setup Vue CLI, see the official [installation guide](https://cli.vuejs.org/guide/installation.html).

<alert type="warning">

  Vuetify 3 requires **Vue CLI 5.0** in order to install properly. For more information, visit the Vue CLI [installation guide](https://cli.vuejs.org/guide/installation.html).

</alert>

Generate a new Vue 3 application by entering the following command into your terminal:

```bash
vue create my-vuetify-app
```

When prompted, select the **Vue 3 Preview** preset:

```bash
? Please pick a preset:
    Default ([Vue 2] babel, eslint)
  ❯ Default (Vue 3 Preview) ([Vue 3] babel, eslint)
    Manually select features
```

After choosing your option, **Vue CLI** generates a new Vue 3 project located in the **my-vuetify-app** folder (or whatever name you provided).

<alert type="info">

  Before installing Vuetify, we **recommend** you commit your changes to `git` or whichever source control software you use. This allows you to rollback changes if you encounter an issue.

</alert>

#### Adding Vuetify

Navigate to your new project's folder, and using **Vue CLI**, add the `vuetify` package:

```bash
cd my-vuetify-app
vue add vuetify
```

Once prompted, choose `Vuetify 3 Preview`:

```bash
? Choose a preset:
  Vuetify 2 - Configure Vue CLI (advanced)
  Vuetify 2 - Vue CLI (recommended)
  Vuetify 2 - Prototype (rapid development)
  Vuetify 3 - Vite (preview)
❯ Vuetify 3 - Vue CLI (preview 3)
```

## Usage

With Vue 3.0, the initialization process for Vue apps (and by extension Vuetify) has changed. With the new `createVuetify` method, the options passed to it have also changed. Please see the pages in the Features section of the documentation for further details.

```js { data-resource="main.js" }
import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'

const app = createApp(App)
const vuetify = createVuetify() // Replaces new Vuetify()

app.use(vuetify)

app.mount('#app')
```

Components and directives are no longer included by default, they either have to imported separately or loaded automatically with the appropriate [Vite](https://www.npmjs.com/package/vite-plugin-vuetify) or [Webpack](https://www.npmjs.com/package/webpack-plugin-vuetify) plugin. See [treeshaking](/features/treeshaking) for more information.

```js { data-resource="main.js" }
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
```

### CDN

We recommend using the latest version of Vuetify 3 from [jsdelivr](https://www.jsdelivr.com/). All components and styles are included.

`https://cdn.jsdelivr.net/npm/vuetify@{{ version }}/dist/vuetify.min.css`

`https://cdn.jsdelivr.net/npm/vuetify@{{ version }}/dist/vuetify.min.js`

```js
const { createApp } = Vue
const { createVuetify } = Vuetify

const vuetify = createVuetify()

const app = createApp()
app.use(vuetify).mount('#app')
```

## Frequently asked questions

<promoted slug="vuetify-discord" />

### Table of Contents

* [What is included in the Beta?](#included)
* [When will Vuetify 3 be released?](#version-3)
* [Can I use it with Vite?](#use-vite)

### Questions

Have a question that belongs here? Tell us in our [Discord Community](https://community.vuetifyjs.com/) or create a request on our [Issue Generator](https://issues.vuetifyjs.com/).

----

* **What is included in the Beta?** { #included }

  Currently most base functionality of Vuetify is included in the beta. This includes core services such as theme, configuration, and layout. A small subset of base components are also included such as grid system, sheets, and buttons. For full list of available components, visit the **UI Component** and **API** sections.

* **When will Vuetify 3 be released?** { #version-3 }

  Beta could take upwards of 2 months. Immediately following is a Release Candidate and then final release. Follow our progress via our project on [Github](https://github.com/orgs/vuetifyjs/projects/7) or read an overview of what's to come on our [Roadmap](/introduction/roadmap/).

* **Can I use it with Vite?** { #use-vite }

  Yes. We recommend creating a new project using the [vite](#vite) installation instructions.

## How to report an issue or bug

For bugs related to the Beta, please create an issue via our [Issue Generator](https://issues.vuetifyjs.com/) using the following [Reproduction Template](https://v3-template.vuetifyjs.com/). At this time we are only accepting bugs for the following:

* Vuetify components and functions available in the Beta
* Documentation content

<alert type="info">

  We ask that documentation issues remain related to content only. The `next` documentation is a work in progress and not fully updated to Vue 3. Some features may be missing or not functioning and will be constantly worked on as new components and functionality becomes available. We will begin fielding these bugs closer to Phase 3 as things become stable.

</alert>

## How to connect with Vuetify team

The Vuetify team can be reached via [Discord Community](https://community.vuetifyjs.com/). If you have questions or would like to discuss Vuetify 3, come visit the #v3-discussion channel.

<backmatter />
