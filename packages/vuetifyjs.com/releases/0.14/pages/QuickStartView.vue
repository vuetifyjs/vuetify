<template lang="pug">
  doc-view(id="quick-start-view")
    v-layout(row wrap)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Getting Started
          dd(slot="desc") Use one of the Vuetify.js Vue CLI packages <em>(based on the official examples)</em> to get your project started in no time. Vuetify.js supports <strong>SSR</strong> (server-side rendering), <strong>SPA</strong> (single page application), <strong>PWA</strong> (progressive web application) and standard <strong>HTML</strong> pages.
      ad

    section#cdn-install
      section-header CDN Install
      section-text To test using Vuetify.js without installing a template from Vue CLI, copy the code below into your <code>index.html</code>. This will pull the latest version of Vue and Vuetify, allowing you to start playing with components.
      markup(lang="html")
        |&lt;!DOCTYPE html&gt;
        |&lt;html&gt;
        |&lt;head&gt;
        |  &lt;link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet"&gt;
        |  &lt;link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet"&gt;
        |&lt;/head&gt;
        |&lt;body&gt;
        |  &lt;div id="app"&gt;
        |    &lt;v-app&gt;
        |      &lt;main&gt;
        |        &lt;v-container&gt;Hello world&lt;/v-container&gt;
        |      &lt;/main&gt;
        |    &lt;/v-app&gt;
        |  &lt;/div&gt;
        |&nbsp;
        |  &lt;script src="https://unpkg.com/vue/dist/vue.js"&gt;&lt;/script&gt;
        |  &lt;script src="https://unpkg.com/vuetify/dist/vuetify.js"&gt;&lt;/script&gt;
        |  &lt;script&gt;
        |    new Vue({ el: '#app' })
        |  &lt;/script&gt;
        |&lt;/body&gt;
        |&lt;/html&gt;

    section#new-applications
      section-header New applications

      section-text Vuetify has 5 pre-made Vue CLI templates, 3 which are forked from <a href="https://github.com/vuejs-templates" target="_blank" rel="noopener">official Vue.js templates</a>. They contain small modifications to help you get started with Vuetify even faster. These packages require <code>vue-cli</code>. For more information on vue-cli, visit the official <a href="https://github.com/vuejs/vue-cli" target="_blank" rel="noopener">Github</a> repository.
      v-tabs(class="elevation-1 mb-3" grow icons dark)
        v-tabs-bar(slot="activators")
          v-tabs-slider.yellow
          v-tabs-item(ripple href="#simple") Simple HTML
            v-icon landscape
          v-tabs-item(ripple href="#webpack-simple") Webpack Simple
            v-icon web
          v-tabs-item(ripple href="#webpack") Webpack
            v-icon layers
          v-tabs-item(ripple href="#webpack-ssr") Webpack SSR
            v-icon cloud_circle
          v-tabs-item(ripple href="#nuxt") NUXT
            v-icon flash_on
        v-tabs-content(id="simple")
          v-card(flat)
            v-card-text
              h4 Simple HTML Quick Start
              section-text This template is intended for users who want to try out Vue.js and Vuetify.js in the most simplistic way. It contains a basic index.html with no additional functionality. This is useful for developers who want to easily preview the features of the framework.
              markup(lang="cli")
                |$  vue init vuetifyjs/simple
              section-text After the installation is complete, you are ready to go. Open the <code>index.html</code> in any browser to get started.
        v-tabs-content(id="webpack")
          v-card(flat)
            v-card-text
              h4 Webpack Quick Start
              section-text This template is intended for users who are already familiar with Vue/Webpack. It contains a very simple webpack setup and is targetted at developers creating prototype or basic applications.
              markup(lang="cli")
                |$  vue init vuetifyjs/webpack
        v-tabs-content(id="webpack-advanced")
          v-card(flat)
            v-card-text
              h4 Webpack Advanced Quick Start
              section-text This template is intended for users who are looking for out of the box linting and unit testing.
              markup(lang="cli")
                |$  vue init vuetifyjs/webpack-advanced
        v-tabs-content(id="webpack-ssr")
          v-card(flat)
            v-card-text
              h4 Webpack SSR Quick Start
              section-text This template is for advanced users looking to utilize the new Vue SSR (server-side rendering). Based off of the structure in the Vue.js 2 <a href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">Hackernews</a> repository. The Vuetify.js SSR template provides next generation functionality for advanced Vue applications.
              markup(lang="cli")
                |$  vue init vuetifyjs/webpack-ssr
        v-tabs-content(id="nuxt")
          v-card(flat)
            v-card-text
              h4 NUXT Quick Start
              section-text Utilizing the power of NUXT, supercharge your development experience with a bootstraped version ready to go with Vuetify out of the box. 
              section-text <strong>Note:</strong> NUXT is not always compatible with the newest version of Vue.
              markup(lang="cli")
                |$  vue init vuetifyjs/nuxt

      section-text After the vue-cli installation finishes, <kbd>cd</kbd> into your project directory and type <kbd>npm install</kbd>. Alternatively, if you are using Facebook's <a href="https://yarnpkg.com/" target="_blank" rel="noopener">yarn package manager</a>, you can simply type <kbd>yarn</kbd>.

      section-text Once the package installation is complete, type <kbd>npm run dev</kbd> into your console. This will start a <a href="https://nodejs.org/en/" target="_blank" rel="noopener">nodejs</a> server locally which can be accessed by navigating to <a href="http://localhost:8080" target="_blank" rel="noopener">http://localhost:8080</a> in your browser.

    section#existing-applications
      section-header Existing applications
      section-text To include Vuetify into an existing project, you must pull it into your node_modules. You can use either <code>npm</code> or <code>yarn</code> to accomplish this task. These are both package managers that allow you to control what resources are available to your application.

      h4.headline NPM and Yarn
      section-text For a detailed explanation of how to get <code>npm</code> running in your environment, check out the <a href="https://docs.npmjs.com/getting-started/what-is-npm" target="_blank" rel="noopener">official documentation</a>. Alternatively, if you wish to use yarn, you can find the official documentation <a href="https://yarnpkg.com/lang/en/docs/" target="_blank" rel="noopener">here</a>. Once setup, you can run either command from your command prompt.

      markup(lang="cli")
        |$  npm install vuetify
        |# or
        |$  yarn add vuetify

      section-text Once Vuetify has been installed, navigate to your applications main entry point. In most cases this will be <code>index.js</code> or <code>main.js</code>. In this file you will import Vuetify and tell Vue to use it.

      markup(lang="js")
        |// index.js or main.js
        |import('path/to/node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader
        |&nbsp;
        |import Vue from 'vue'
        |import Vuetify from 'vuetify'
        |&nbsp;
        |Vue.use(Vuetify)

      section-text You can also simply include the css file in your index.html or import the actual stylus file.

      v-alert(error value) Warning: While Vuetify attempts to not cause any css collision as much as possible, there is no guarantee that your custom styles will not alter your experience when integrating this framework into your existing project.

    section
      section-header Support Browsers
      section-text Vuetify.js is a progressive framework that attempts to push web development to the next level. In order to best accomplish this task, some sacrifices had to be made in terms of support for older versions of Internet Explorer.
      v-list.transparent
        v-layout(row wrap)
          v-flex(
            xs12 sm6 md4
            v-for="browser in browsers"
            v-bind:key="browser.title"
          ).px-0
            v-list-tile(avatar tag="ul")
              v-list-tile-avatar
                v-icon(dark).primary fa-{{ browser.icon }}
              v-list-tile-content
                v-list-tile-title {{ browser.title }}
                v-list-tile-sub-title {{ browser.supported ? 'Supported' : 'Not supported' }}
              v-list-tile-action
                v-icon(v-if="!browser.supported").error--text clear
                v-icon(v-else).success--text check

    section
      section-header Internet Explorer 11 Support
      section-text To use Vuetify.js with Internet Explorer, you must include a polyfill in your project. Vuetify.js can work with either <a href="https://polyfill.io/v2/docs/" target="_blank" rel="noopener">polyfill.io</a> or <a href="https://babeljs.io/docs/usage/polyfill/#installation" target="_blank" rel="noopener">babel-polyfill</a>. The polyfill must be loaded before your project source code. Other polyfills may be needed to use specific features in your project.

      section-text Due to Internet Explorer's limited support for <code>&lt;template&gt;</code> tags, you must take care to send fully compiled dom elements to the browser. This can be done by either building your Vue code in advance or by creating helper components to replace the dom elements. For instance, if sent directly to IE, this will fail:

      markup(lang="html")
        | &lt;template slot="items" scope="props"&gt;
        |   &lt;td&gt;{&zwnj;{ props.item.name }&zwnj;}&lt;/td&gt;
        |&lt;/template&gt;

      section-text Using a custom component, in this example <code>&lt;cell&gt;</code>, we could use this markup:

      markup(lang="html")
        |&lt;!--Example component declaration--&gt;
        | Vue.component('cell', { template: '&lt;td&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/td&gt;' });
        |&nbsp;
        |&lt;!--Example scoped slot--&gt;
        |&lt;template slot="items" scope="props"&gt;
        |   &lt;cell&gt;{&zwnj;{ props.item.name }&zwnj;}&lt;/cell&gt;
        |&lt;/template&gt;

      v-alert(value warning) If you still find yourself struggling with IE11, come get help from the Vuetify <a class="white--text" href="https://chat.vuetifyjs.com" target="_blank" rel="noopener">community</a>.

</template>

<script>
  export default {
    data () {
      return {
        browsers: [
          { icon: 'internet-explorer', title: 'IE9 / IE10', supported: false },
          { icon: 'internet-explorer', title: 'IE11', supported: true },
          { icon: 'edge', title: 'Edge', supported: true },
          { icon: 'chrome', title: 'Chrome', supported: true },
          { icon: 'firefox', title: 'Firefox', supported: true },
          { icon: 'safari', title: 'Safari 9+', supported: true },
        ]
      }
    }
  }
</script>
