---
layout: blog
meta:
  title: April 2025 Update
  description: April delivered tangible progress on MCP, the new theming engine, component refinements, docs, ESLint v4, and tooling across the Vuetify ecosystem.
  keywords: Vuetify April 2025, Model Context Protocol, Vuetify theming, ESLint flat config, Vuetify Playground, Tailwind integration
---

# April 2025 Update

This month is packed full of exciting updates and progress across the Vuetify ecosystem.

---

🖊️ John Leider • 📅 May 1st 2025

<PromotedEntry />

---

## Building Momentum

TODO

---

## Releases

The month of April saw the release of "Andromeda", the latest version of Vuetify, which includes a host of new features, improvements, and bug fixes. Most notably, [VNumberInput](https://vuetifyjs.com/components/number-inputs/) and [VSnackbarQueue](https://vuetifyjs.com/components/snackbar-queue/) were promoted from Labs to the Core framework! We've also followed up with several patch releases to address bugs and improve stability.

![Hero image for andromeda release notes](https://cdn.vuetifyjs.com/ "Andromeda release notes hero image"){ height=200}

**Details:**

- [v3.8.0](https://vuetifyjs.com/getting-started/release-notes/?version=v3.8.0)
- [v3.8.1](https://vuetifyjs.com/getting-started/release-notes/?version=v3.8.1)
- [v3.8.2](https://vuetifyjs.com/getting-started/release-notes/?version=v3.8.2)
- [v3.8.3](https://vuetifyjs.com/getting-started/release-notes/?version=v3.8.3)

## MCP Soon™️{ #mcp }

One of the most exciting developments underway is the creation of [MCP: Model Context Protocol](https://modelcontextprotocol.io/introduction) and our efforts to provide LLMs with the most up to date framework information using it. The **@vuetify/mcp** package represents our attempt to improve how developers interact with Vuetify through AI and LLM-powered tools.

![Image of outdated LLM response showing Vuetify 2](https://cdn.vuetifyjs.com/ "Outdated LLM response"){ height=300 }

Today, developers often receive outdated or inaccurate help from AI chatbots because these models aren't trained on Vuetify’s latest updates and new innovations we're building. MCP is our answer to that problem.

We want to ensure developers have access to contextually accurate, up-to-date, and deeply integrated Vuetify tools, documentation, snippets and much more right when they need it.

![Video of VSCode in Agent mode](https://cdn.vuetifyjs.com/ "VSCode agent doing work"){ height=300 }

This initiative won't just improve AI responses—it will fundamentally change how accessible and powerful Vuetify development can be.

MCP is a major step towards empowering our community even further and we look forward to making the package public soon (like very soon).

**Details:** [@vuetify/mcp](https://github.com/vuetifyjs/mcp)

## Theming Evolved

Alongside MCP, another major focus has been the Vuetify’s theming system. Our goal is to enable full customization of Vuetify — allowing developers to use any UI library, support long-awaited Material Design 3, and adapt the framework effortlessly to a wide variety of design systems. This includes things such as:

- First party Tailwind integration.
- Support for unstyled mode that includes only the necessary styles for components to function.
- New and improved ways of interacting with the theme system.

The work happening right now is a foundational step toward that vision. We're targeting an October reveal for this theming overhaul and will be teasing more about it in the months ahead. Here's a small preview of the new theming API in action:

```html
<template>
  <v-app>
    <v-main>
      <v-container>
        <!-- Change to a specific theme -->
        <v-btn @click="theme.change('dark')">Change to Dark</v-btn>

        <!-- Toggle between Light / Dark -->
        <v-btn @click="theme.toggle()">Toggle Light / Dark</v-btn>

        <!-- Toggle between specific themes -->
        <v-btn @click="theme.toggle(['custom', 'light'])">Toggle Custom / Light</v-btn>

        <!-- Cycle between all themes -->
        <v-btn @click="theme.cycle()">Cycle All Themes</v-btn>

        <!-- Cycle between specific themes -->
        <v-btn @click="theme.cycle(['custom', 'light', 'utopia'])">Cycle Specific Themes</v-btn>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()
</script>
```

These changes focus on expanding Vuetify’s flexibility, making it an even more powerful tool for projects of every scale and style.

**Details:**

- [PR#21244](https://github.com/vuetifyjs/vuetify/pull/21244)
- [PR#21224](https://github.com/vuetifyjs/vuetify/pull/21224)
- [Commit 3190331](https://github.com/vuetifyjs/vuetify/commit/3190331e70f42b7fdf4d7ee04f662b15eefde026)
- [Commit abfdb77](https://github.com/vuetifyjs/vuetify/commit/abfdb777e0e00d4a1798f52d7e4c118e7409fcb9)

## Performance improvements

This month, we focused on performance improvements across the board, including saving a bunch of overhead associated with computed caching and call frequency.

For those anticipating the release of [VTreeview](https://vuetifyjs.com/components/treeview), there has been movement on an [upstream](https://github.com/vuejs/babel-plugin-jsx/issues/712) issue that was bottlenecking performance. Once released, we will be able to wrap up the component and move it to the Core framework 🎉.

**Details:**

- [PR#21167](https://github.com/vuetifyjs/vuetify/pull/21167)
- [Commit 8d798e3](https://github.com/vuetifyjs/vuetify/commit/8d798e36baf86f04eebf2828be0cffa0dc31053a)
- [vue-macros#942](https://github.com/vue-macros/vue-macros/pull/942)

## Unvuetify

The motivation behind @unvuetify is simple: existing plugins aren’t keeping up with the evolving capabilities of Vue and Nuxt. Features like lazy hydration, auto-importing, and tree shaking are either missing or cumbersome in older plugins.

This monorepo isn’t a hard replacement — you can still use vite-plugin-vuetify or webpack-plugin-vuetify if they suit your needs. But if you're working with Nuxt 3, Vue 3.5, or want more flexibility and performance, @unvuetify is built for you.

Created [@unvuetify](https://github.com/userquin/unvuetify-monorepo) repository to enable:

- Vue Lazy Hydration support: ready to use Vue Lazy Hydration with Vuetify components and Nuxt 3/4.
- Extensible: allow prefixing Vuetify components, directives and composables with Vuetify prefix.
- VSCode directives suggestions.
- Nuxt 3/4 utilities: drop a simple Nuxt module and it will auto-import all Vuetify components, directives and composables for you.
- and more...

**Details:**

- [@unvuetify/shared](https://github.com/userquin/unvuetify-monorepo/tree/main/packages/shared): utilities to resolve Vuetify components and directives
- [@unvuetify/unimport-presets](https://github.com/userquin/unvuetify-monorepo/tree/main/packages/unimport-presets): presets to auto-import Vuetify composables and directives
- [@unvuetify/unplugin-vue-components-resolvers](https://github.com/userquin/unvuetify-monorepo/tree/main/packages/unplugin-vue-components-resolvers): resolvers to auto-import Vuetify components and directives
- [@unvuetify/vite-styles-plugin](https://github.com/userquin/unvuetify-monorepo/tree/main/packages/styles-plugin): Vite plugin to load Vuetify sass/scss styles with Nuxt 3 SSR support
- [@unvuetify/nuxt-utils](https://github.com/userquin/unvuetify-monorepo/tree/main/packages/nuxt-utils): utilities to configure Vuetify composables, directives, components and styles in your Nuxt 3 application

## DX efforts

A major focus has been making Vuetify more accessible to developers at all levels.

- **MCP**: Coding companion that provides contextually accurate, up-to-date, and deeply integrated Vuetify tools, documentation, snippets and much more right when you need it.
- **Vuetify Create**: Released with significant [improvements](https://github.com/vuetifyjs/create) and planning for 3.0 representing a total rewrite of our project scaffolding tool.
- **Labs Components**: Added auto-import support by default for labs components.
- **Internationalization**: Expansion of translations including Spanish additions to the documentation.
- **Modern ESLint Configuration**: Complete rewrite of our ESLint configuration with a functional approach, being rolled out across all repositories.

**Details:**

- [create/releases](https://github.com/vuetifyjs/create/releases)
- [ESLint configuration](https://github.com/vuetifyjs/eslint-config-vuetify)
- [Commit 98ef110](https://github.com/vuetifyjs/vuetify-loader/commit/98ef1106fb3875a5079d309986de61e12cd5683d)

## Vuetify One teams

We have recently updated Vuetify One to support teams, which allows you to invite up to 25 members to collaborate on your Vuetify projects. This update is designed to share subscription benefits across your team.

![Image of Vuetify One teams subscription panel](https://cdn.vuetifyjs.com/ "Vuetify One teams subscription panel"){ height=400 }

If you have any issues or questions, please reach out to us on [Discord](https://community.vuetifyjs.com).

**Details:** [PR#15](https://github.com/vuetifyjs/one/pull/15)

## Vuetify Play

Of the many changes coming to Vuetify play, one of the longest requested features is finally here: **router support**! This means you can now create and share Vuetify Play projects that include Vue Router, allowing for more complex and interactive examples.

![Image of Vuetify Play with router support](https://cdn.vuetifyjs.com/ "Vuetify Play with router support"){ height=250 }

We are also in the process of updating the entire Vuetify Play interface to be more intuitive and user-friendly. This includes a new design, improved navigation, and better organization of examples and components. We look forward to sharing more details in the coming months.

**Details:**

- [PR#7](https://github.com/vuetifyjs/play/pull/7)
- [Commit 0e89a33](https://github.com/vuetifyjs/play/commit/0e89a334f241d440987908a456c205bed53e96d6)

## Vuetify Issues

We are wrapping up the new [Vuetify Issue Generator](https://issues.vuetifyjs.com/), which will replace the current system (still on Vuetify v1.5!).

![Gif of Issues in action](https://cdn.vuetifyjs.com/ "Vuetify Issues in action"){ height=400 }

::: success

Cool example of the month: [VScrollSelect](https://play.vuetifyjs.com/playgrounds/CS5a9g) by [J-Sek](https://github.com/J-Sek)

:::

## The Road Ahead

TODO
