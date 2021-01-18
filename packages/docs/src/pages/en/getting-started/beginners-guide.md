---
meta:
  title: A Beginner's Guide to Vuetify
  description: A Review of the structure, principles, and knowledge tools that will get you using Vuetify in short order.
  keywords: quick start, beginner, beginner guide, using vuetify, vuetify resources
related:
  - /introduction/why-vuetify/
  - /introduction/installation/
  - /getting-started/frequently-asked-questions/
---
## Beginners Guide

Welcome to Vuetify! Vuetify is a UI framework and component library implements Google's Material Design System in Vue.js. The components, directives, and other features of Vuetify allow Vue.js developers to make beautiful, modern, resilient web applications with confidence and ease. Are you ready to Vuetify your app?

This page will give you an entrypoint for diving into this awesome toolset and begin to leverage it to build out your own great projects.

<entry-ad />

## What you need to know to get started

To properly use Vuetify, you will need to have a working understanding of Vue.js. Vue.js is a front-end javascript framework, used to create richly interactive user experiences. Before you dive into Vuetify, please make sure you are comfortable with the [fundamentals of Vue.js](https://vuejs.org/v2/guide/). To really get comfortable with Vuetify (and Vue.js, for that matter), you should have some experience with ES6+ Javascript, and if you want to customize the look and feel of your application, you should be familiar with [SASS](https://sass-lang.com/).

If you want to understand the design principles and structures that undergird the architecture of Vuetify, we recommend that you familiarize yourself with [Material Design](https://material.io/design/introduction) itself.

## What does Vuetify include?

Vuetify is a UI framework. This means that it offers more than just an amazing set of components. It also offers directives, SASS variables for theming, options, and a powerful `$vuetify` object that you can use to access your Vuetify application and its functionality from within your own component scripts. For example, the `$vuetify` object has a `goTo` method that enables [programmatically triggered scrolling](/features/scrolling/) on the page. Vuetify also provides a variety of [accessibility features](/features/accessibility/) and [Internationalization features](/features/internationalization) into its rendered code to ensure that Vuetify applications are inclusive and truly useable.

Vuetify provides an array of great visual resources such as icon set integration, a [grid system](/components/grids/), [flex utilties](/styles/flex/) and much more.

## What does Vuetify NOT include?

Vuetify concerns itself strictly on the UX of your application. That differentiates it from a framework like nuxt.js (though it [pairs nicely with Vuetify](/getting-started/installation/#nuxt-install)) which focuses upon static site generation, server and data interactions, and application organizational structure. If you are looking for something that gives you server-side rendering, or robust data fetching logic, nuxt.js is excellent.

## Using the documentation

### Search

Because Vuetify is rather robust, the documentation contains many pages. If you would like to search the documentation, rather than using its alphabetically organized sidebar, simply press you '/' key and it will focus your cursor on the search bar at the top of the page. Search is keyword-based and will provide a dropdown of detailed results organized by documentation page.

### Code samples

We have provided an array of rendered code samples for you to make use of the many features of Vuetify's components. If you would like to make use of any code sample, simply copy your code by clicking the copy icon next to the code block.

### Components

Vuetify has extensive documentation organized around each of the components it offers. Each component in the framework has 2 documentation pages. One page provides detailed examples of components and their use cases. The other provides a detailed breakdown of the API for the component, including its props, slots, and events. For example, if you are interested in using a Vuetify Button, the documentation features a [Buttons page](https://vuetifyjs.com/components/buttons/) and a corresponding [v-btn page](https://vuetifyjs.com/api/v-btn/). As you dive into Vuetify, you will begin to see that the ecosystem of components it provides work together with one another to create sophisticated and beautiful functionality.

#### Component Naming Convention

Vuetify uses a naming convention so that all components are prefixed with a `V`. You will typically see components described in kebab-case. So, the `App` component appears like this: `<v-app>`. You may also see the same component expressed in Pascal case, where it looks like this `<VApp>`.

## Anatomy of a Vuetify App

While its components can be used a la carte, Vuetify also provides full scaffolding for entire web application interfaces. It provides interactive features such as dialogs and drawers, as well as simpler components, such as select inputs and buttons. Because many of these features leverage a mixture of CSS and Javascript for their functionality, Vuetify apps require a framing structure. We make heavy use of our [codepen template](https://codepen.io/pen?template=OJJeVge) for examples, and it provides the basic requirements of a Vuetify layout. Every Vuetify app needs to be wrapped in a `<v-app>` component.

The core of the codepen markup looks like this:

```html
<script type="text/x-template" id="app-template">
  <v-app>
    <v-container>
      <!-- -->
    </v-container>
  </v-app>
</script>

<div id="app"></div>
```

and its JS looks like this:

```js
const App = {
  template: '#app-template',
  data: () => ({
    //
  })
}

new Vue({
  vuetify: new Vuetify(),
  render: h => h(App)
}).$mount('#app')
```

Please note that the entire Vuetify application is wrapped in a `<v-app>` component. This component is very important, as it provides context that is essential to much of the functionality and logic packed into Vuetify's components. On the Javascript side of things, your app is a standard Vue instance, initialized with an instance of Vuetify. To learn more about how to structure your application, check out the [Application page](/components/application/) in our documentation.

## CSS, Styles, & Animations

As noted above, Vuetify's underlying purpose is to bring the richness of Material Design into Vue applications. Material Design is, at its core, a set of aesthetic principles that can be applied to a range of aesthetics (check out [Material Studies](https://material.io/design/material-studies/about-our-material-studies.html) for interesting examples). Once you have embraced the principles and components of material design, you will likely want to customize your application look and feel to have its own unique qualities.

This is where an understanding of SASS comes in very handy. While Vuetify provides scaffolding tools for color pallete, breakpoints, and typography, individual Vue Templates can [use and extend](/features/sass-variables/#usage-in-templates) these using SASS variables (in either SASS or SCSS syntax).

Part of creating your own brand identity in Material Design is creating interesting transitions and animations. Vuetify provides some of these for you, but also facilitates [creating your own](/styles/transitions/#create-your-own).

Vuetify is oriented towards creating complete application interfaces, and facilitates creating [themes](/features/theme/). Check out what people have [made with Vuetify](/resources/made-with-vuetify/).

## Feature Guides

Learn more about the inner workings of Vuetify and become a skilled **v-developer** with our detailed feature guides. Each guide is designed to teach you how to get the most out of your development experience with information on: how to build responsive pages using [Layouts](/features/layouts/), how to customize the style of your application with [SASS variables](/features/sass-variables/), and how to slim down your application's package size via [Treeshaking](/features/treeshaking/), and more.

| Feature | Skill level | Time to read |
| ------- | ----------- | ------------ |
| [Bidirectionality (LTR/RTL)](/features/bidirectionality/) | Beginner | 1 min |
| [Global configuration](/features/global-config/) | Beginner | 1 min |
| [Icons](/features/icons/) | Beginner | 15 min |
| [Layouts](/features/layouts/) | Beginner | 5 min |
| [Theme](/features/theme/) | Beginner | 15 min |
| [Accessibility (a11y)](/features/accessibility) | Intermediate | 10 min |
| [Breakpoints](/features/breakpoints) | Intermediate | 15 min |
| [Internationalization (i18n)](/features/internationalization/) | Intermediate | 5 min |
| [Programmatic scrolling](/features/scrolling/) | Intermediate | 2 min |
| [SASS variables](/features/sass-variables/) | Intermediate | 10 min |
| [Presets](/features/presets/) | Advanced | 15 min |
| [Treeshaking](/features/treeshaking/) | Advanced | 15 min |

## Themes and Examples

Vuetify has been leveraged to make some pretty impressive projects, as you can see on our [made with Vuetify](/resources/made-with-vuetify/) page. We also have our own [Vuetify themes](/resources/themes/#vuetify-themes) that you can use to jumpstart your own projects.

There are free Vuetify themes available for download and use in any sort of project. If you want full-featured and robust themes, we have a range of Premium themes available a various price points, depending upon your intention to use them for personal projects, commercial projects, or both.

## Leveraging the Team

If you need support, encouragement, or interesting application ideas, Vuetify has a vibrant community delivering that every day. Vuetify is backed by a dedicated team of opensource developers actively keeping codebase sharp and providing support to our awesome and engaged user-base. You can become part of that community through our various community outlets.

- We provide [paid priority support](/introduction/support/)
- We have an active and welcoming [Discord Community](https://community.vuetifyjs.com/)
- We also maintain a message board via [GitHub Discussions](https://discussions.vuetifyjs.com/)

Vuetify has also become well-established enough to have its own [corner of Stack Overflow](https://stackoverflow.com/questions/tagged/vuetify.js)!

## Places to learn Vuetify

If you want to deep-dive into learning Vuetify, there are tons of educational resources you can use. Some of the Vue video learning websites have dedicated Vuetify courses.

- Scrimba has a totally free [Vuetify introduction course](https://scrimba.com/learn/vuetify)
- Vue Mastery has a [Vuetify course](https://www.vuemastery.com/courses/beautify-with-vuetify/getting-started-with-vuetify/)

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

<backmatter />
