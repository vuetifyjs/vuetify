---
nav: Installation
meta:
  title: Get started with Vuetify 3 Alpha
  description: Details for v3 alpha release - faq, changes, and upgrading.
  keywords: migration, releases, upgrading vuetify, alpha, v3
related:
  - /getting-started/contributing/
  - /introduction/roadmap/
  - /getting-started/release-notes/
---

# Vuetify 3 Alpha

Vuetify 3 Alpha is here! Below is a collection of information to help you get started and answer some frequently asked questions regarding the alpha.

<alert type="error">

  Before proceeding, it is important to note that this installation is intended primarily for testing purposes, and should not be considered for production applications.

</alert>

## Installation

Installation of the alpha is limited to new cli projects at this time and intended primarily for testing. If you have any questions or run into issues, please reach out to our [Discord community](https://community.vuetifyjs.com/).

### vue-cli

In order for the installation to proceed correctly, **vue-cli 4.0** is required. Further instructions are available at [vue-cli](https://github.com/vuejs/vue-cli).

Once installed, generate a project with the following command using the **vue-cli 4.0**:

```bash
vue create my-app
```

When prompted, choose **Vue 3** (possibly **Vue 3 Preview** depending on the exact version of vue-cli):

```bash
? Please pick a preset: (Use arrow keys)
    Default ([Vue 2] babel, eslint)
  ❯ Default (Vue 3) ([Vue 3] babel, eslint)
    Manually select features
```

It is recommended to commit or stash your changes at this point, in case you need to rollback the changes.

Next, navigate to your project directory and add Vuetify to your project:

```bash
cd my-app
vue add vuetify
```

Once prompted, choose `Vuetify 3 Preview`:

```bash
? Choose a preset:
  Configure (advanced)
  Default (recommended)
  Vite Preview (Vuetify 3 + Vite)
  Prototype (rapid development)
❯ Vuetify 3 Preview (Vuetify 3)
```

### Vite

Installing Vuetify 3 using vite can be done using [vue-cli](#vue-cli). To start, use npm/yarn to set up your vite project outlined in the [Vite documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project):

```bash
# npm 6.x
npm init @vitejs/app my-app --template vue

# npm 7+, extra double-dash is needed:
npm init @vitejs/app my-app -- --template vue

# yarn
yarn create @vitejs/app my-app --template vue
```

Next, navigate to your project directory and add Vuetify to your project:

```bash
cd my-app
vue add vuetify
```

Once prompted, choose **Preview (Vuetify 3 + Vite)**:

```bash
? Choose a preset:
  Configure (advanced)
  Default (recommended)
❯ Vite Preview (Vuetify 3 + Vite)
  Prototype (rapid development)
  Vuetify 3 Preview (Vuetify 3)
```

## Usage

With Vue 3.0, the initialization process for Vue apps (and by extension Vuetify) has changed. With the new `createVuetify` method, the options passed to it have also changed. Please see the pages in the Features section of the documentation for further details.

```js
import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'

const app = createApp(App)
const vuetify = createVuetify(...) // Replaces new Vuetify(...)

app.use(vuetify)

app.mount('#app')
```

Components and directives are no longer included by default, they either have to imported separately or loaded automatically with the appropriate [Vite](https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin) or [Webpack](https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader) plugin.

```js
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})
```

## Frequently asked questions

### Table of Contents

- [What is included in the Alpha?](#included)
- [When will Vuetify 3 be released?](#version-3)
- [Can I use it with Vite?](#use-vite)

### Questions

Have a question that belongs here? Tell us in our [Discord Community](https://community.vuetifyjs.com/) or create a request on our [Issue Generator](https://issues.vuetifyjs.com/).

---

- **What is included in the alpha?** { #included }

  Currently most base functionality of Vuetify is included in the alpha. This includes core services such as theme, configuration, and layout. A small subset of base components are also included such as grid system, sheets, and buttons. For full list of available components, visit the **UI Component** and **API** sections.

- **When will Vuetify 3 be released?** { #version-3 }

  Version 3 is currently under development - Alpha is the first step toward this. Follow our progress via our project on [Github](https://github.com/orgs/vuetifyjs/projects/7) or read an overview of what's to come on our [Roadmap](/introduction/roadmap/).

- **Can I use it with Vite?** { #use-vite }

  Yes. We recommend creating a new project using the [vite](#vite) installation instructions.

## How to report an issue or bug

For bugs related to the Alpha, please create an issue via our [Issue Generator](https://issues.vuetifyjs.com/) using the following [Reproduction Template](https://v3-template.vuetifyjs.com/). At this time we are only accepting bugs for the following:

- Vuetify components and functions available in the Alpha
- Documentation content

<alert type="info">

  We ask that documentation issues remain related to content only. The `next` documentation is a work in progress and not fully updated to Vue 3. Some features may be missing or not functioning and will be constantly worked on as new components and functionality becomes available. We will begin fielding these bugs closer to Phase 3 as things become stable.

</alert>

## How to connect with Vuetify team

The Vuetify team can be reached via [Discord Community](https://community.vuetifyjs.com/). If you have questions or would like to discuss Vuetify 3, come visit the #v3-discussion channel.

<backmatter />
