export default {
  header: 'Quick start',
  headerText: 'Use one of the Vuetify Vue CLI packages _(based on the official examples)_ to get your project started in no time. Vuetify supports **SSR** (server-side rendering), **SPA** (single page application), **PWA** (progressive web application) and standard **HTML** pages.',
  alert1: 'In order for your application to work properly, you **must** wrap it in a `v-app` component. This component is used for dynamically managing your content area and is the mounting point for many components.',
  browserHeader: 'Supported Browsers',
  browserText: 'Vuetify is a progressive framework that attempts to push web development to the next level. In order to best accomplish this task, some sacrifices had to be made in terms of support for older versions of Internet Explorer. This is not an exhaustive list of compatible browsers, but the main targeted ones.',
  cdnHeader: 'CDN Install',
  cdnText: 'To test using Vuetify.js without installing a template from Vue CLI, copy the code below into your `index.html`. This will pull the latest version of Vue and Vuetify, allowing you to start playing with components. You can also use the [Vuetify starter](https://template.vuetifyjs.com) on codepen.',
  newHeader: 'New applications',
  newText: 'Vuetify has 8 pre-made Vue CLI templates, 3 which are forked from [official Vue.js templates](https://github.com/vuejs-templates). They contain small modifications to help you get started with Vuetify even faster. These packages require `vue-cli`. For more information on vue-cli, visit the official [Github](https://github.com/vuejs/vue-cli) repository. These templates are designed to get you started as fast as possible with your next project',
  existingHeader: 'Existing applications',
  existingText1: 'To include Vuetify into an existing project, you must pull it into your node_modules. You can use either `npm` or `yarn` to accomplish this task. These are both package managers that allow you to control what resources are available to your application.',
  existingText2: 'For a detailed explanation of how to get `npm` running in your environment, check out the [official documentation](https://docs.npmjs.com/getting-started/what-is-npm). Alternatively, if you wish to use yarn, you can find the official documentation [here](https://yarnpkg.com/lang/en/docs/). Once setup, you can run either command from your command prompt.',
  existingText3: 'Once Vuetify has been installed, navigate to your applications main entry point. In most cases this will be `index.js` or `main.js`. In this file you will import Vuetify and tell Vue to use it.',
  existingText4: 'You will also need to include the Vuetify css file. Simply include the Vuetify css file in your `index.html` or import the actual stylus file or the minified css.',
  existingText5: 'The easiest way to include the Material Design icons is to add a `link` tag to your `index.html` file.',
  alert2: 'Warning: While Vuetify attempts to not cause any css collision as much as possible, there is no guarantee that your custom styles will not alter your experience when integrating this framework into your existing project.',
  ie11Header: 'IE11 & Safari 9 support',
  ie11Text: 'In your project directory, install `babel-polyfill` and import it into your main entry:',
  ie11Text2: 'Due to Internet Explorer\'s limited support for `<template>` tags, you must send fully compiled dom elements to the browser. This can be done by either building your Vue code in advance or by creating helper components to replace the dom elements. For instance, if sent directly to IE, this will fail:',
  browserSupport: {
    supported: 'Supported',
    notSupported: 'Not supported',
    polyfill: 'Supported with polyfill'
  },
  toc: [
    {
      text: 'Introduction',
      href: 'introduction'
    },
    {
      text: 'Supported browsers',
      href: 'supported-browsers'
    },
    {
      text: 'CDN install',
      href: 'cdn-install'
    },
    {
      text: 'New applications',
      href: 'new-applications'
    },
    {
      text: 'Existing applications',
      href: 'existing-applications'
    },
    {
      text: 'IE11 support',
      href: 'ie11-support'
    }
  ]
}
