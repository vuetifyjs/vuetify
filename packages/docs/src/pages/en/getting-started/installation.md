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

# Vuetify 3 Beta

Welcome to the Vuetify 3 Beta release. To get started, select an installation method below or review some of the most [Frequently Asked Questions](#frequently-asked-questions)

<alert type="error">

  The Vuetify 3 Beta is for testing purposes only and is not intended for production applications.

</alert>

## Installation

### Vite

<vuetify slug="vs-video-vite" />

First, use npm/yarn to create your Vite project:

```bash
# npm 6.x
npm init @vitejs/app my-vuetify-app --template vue

# npm 7+, extra double-dash is needed:
npm init @vitejs/app my-vuetify-app -- --template vue

# yarn
yarn create @vitejs/app my-vuetify-app --template vue
```

<alert type="info">

  More detailed information can be found in the [Vite documentation](https://vitejs.dev/guide/#scaffolding-your-first-vite-project)

</alert>

For the next step you will need to have the **Vue CLI** installed. See their [installation guide](https://cli.vuejs.org/guide/installation.html)

Navigate to your newly created project and then add vuetify using our **Vue CLI** plugin:

```bash
cd my-vuetify-app
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

### Vue CLI

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

Navigate to your new project's folder, and using **Vue CLI**, add the `vuetify` package:

```bash
cd my-vuetify-app
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

### CDN

Coming soon™

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

- [What is included in the Beta?](#included)
- [When will Vuetify 3 be released?](#version-3)
- [Can I use it with Vite?](#use-vite)

### Questions

Have a question that belongs here? Tell us in our [Discord Community](https://community.vuetifyjs.com/) or create a request on our [Issue Generator](https://issues.vuetifyjs.com/).

---

- **What is included in the Beta?** { #included }

  Currently most base functionality of Vuetify is included in the beta. This includes core services such as theme, configuration, and layout. A small subset of base components are also included such as grid system, sheets, and buttons. For full list of available components, visit the **UI Component** and **API** sections.

- **When will Vuetify 3 be released?** { #version-3 }

  Beta could take upwards of 2 months. Immediately following is a Release Candidate and then final release. Follow our progress via our project on [Github](https://github.com/orgs/vuetifyjs/projects/7) or read an overview of what's to come on our [Roadmap](/introduction/roadmap/).

- **Can I use it with Vite?** { #use-vite }

  Yes. We recommend creating a new project using the [vite](#vite) installation instructions.

## How to report an issue or bug

For bugs related to the Beta, please create an issue via our [Issue Generator](https://issues.vuetifyjs.com/) using the following [Reproduction Template](https://v3-template.vuetifyjs.com/). At this time we are only accepting bugs for the following:

- Vuetify components and functions available in the Beta
- Documentation content

<alert type="info">

  We ask that documentation issues remain related to content only. The `next` documentation is a work in progress and not fully updated to Vue 3. Some features may be missing or not functioning and will be constantly worked on as new components and functionality becomes available. We will begin fielding these bugs closer to Phase 3 as things become stable.

</alert>

## How to connect with Vuetify team

The Vuetify team can be reached via [Discord Community](https://community.vuetifyjs.com/). If you have questions or would like to discuss Vuetify 3, come visit the #v3-discussion channel.

<backmatter />
