<template lang="pug">
  doc-view(id="quick-start-view")
    v-layout(column-xs row-sm)
      v-flex(xs12 sm8 md12)
        section-def
          dt(slot="title") Getting Started
          dd(slot="desc") Use one of the Vuetify.js Vue CLI packages <em>(based on the official examples)</em> to get your project started in no time. Vuetify.js supports <strong>SSR</strong> (server-side rendering), <strong>SPA</strong> (single page application), <strong>PWA</strong> (progressive web application) and standard <strong>HTML</strong> pages.
      ad

    section
      section-header CDN Install
      section-text To test using Vuetify.js without installing a template from Vue CLI, include the files below into the <code>index</code> file of your application after the Vue.js script. Vuetify will automatically install and be ready to use.
      markup(lang="html")
        |// Font library and icon pack
        |&lt;link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet" type="text/css"&gt;
        |&nbsp;
        |&lt;script src="https://unpkg.com/vue/dist/vue.js"&gt;&lt;/script&gt;
        |&nbsp;
        |// Vuetify.js required files
        |&lt;link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet" type="text/css"&gt;
        |&nbsp;
        |&lt;script src="https://unpkg.com/vuetify/dist/vuetify.min.js"&gt;&lt;/script&gt;

    section
      section-header New applications
      section-text Vuetify has 5 pre-made Vue CLI templates, 3 which are forked from <a href="https://github.com/vuejs-templates" target="_blank">official Vue.js templates</a>. They contain small modifications to help you get started with Vuetify even faster. These packages require <code>vue-cli</code>. For more information on vue-cli, visit the official <a href="https://github.com/vuejs/vue-cli" target="_blank">Github</a> repository.
      v-tabs(class="elevation-1 mb-5" grow icons light)
        v-tabs-bar(slot="activators")
          v-tabs-slider
          v-tabs-item(ripple href="#simple") Simple HTML
            v-icon landscape
          v-tabs-item(ripple href="#webpack") Webpack
            v-icon web
          v-tabs-item(ripple href="#webpack-advanced") Webpack Advanced
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
              section-text This template is for advanced users looking to utilize the new Vue SSR (server-side rendering). Based off of the structure in the Vue.js 2 <a href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank">Hackernews</a> repository. The Vuetify.js SSR template provides next generation functionality for advanced Vue applications.
              markup(lang="cli")
                |$  vue init vuetifyjs/webpack-ssr
        v-tabs-content(id="nuxt")
          v-card(flat)
            v-card-text
              h4 NUXT Quick Start
              section-text Utilizing the power of NUXT, supercharge your development experience with a bootstraped version ready to go with Vuetify out of the box.
              markup(lang="cli")
                |$  vue init vuetifyjs/nuxt
    section
      section-header NPM Install
      section-text After the vue-cli installation finishes, <kbd>cd</kbd> into your project directory and type <kbd>npm install</kbd>. Alternatively, if you are using Facebook's recently released <a href="https://yarnpkg.com/" target="_blank">yarn package manager</a>, you can simply type <kbd>yarn</kbd>.

      section-text Once the package installation is complete, type <kbd>npm run dev</kbd> into your console. This will start a <a href="https://nodejs.org/en/" target="_blank">nodejs</a> server locally which can be accessed by navigating to <a href="http://localhost:8080" target="_blank">http://localhost:8080</a> in your browser.

    section
      section-header Existing applications
      section-text If you are wanting to use Vuetify in an existing project, you can install by using npm or yarn. Keep in mind, you will still need to <strong><em>include</em></strong> Vuetify, Roboto font library, and Material icon library css files as they are <strong>not</strong> part of the javascript import.
      markup(lang="cli")
        |$  npm install vuetify --save-dev
        |&nbsp;
        |$  yarn add vuetify --dev
      section-text In your index.js, import Vuetify and apply the plugin to Vue.
      markup(lang="js")
        |import Vue from 'vue'
        |import Vuetify from 'vuetify'
        |&nbsp;
        |Vue.use(Vuetify)
      v-alert(error value) Warning: While Vuetify attempts to not cause any css collision as much as possible, there is no guarantee that your custom styles will not alter your experience when integrating this framework into your existing project.

    section
      section-header Support Browsers
      section-text Vuetify.js is a progressive framework that attempts to push web development to the next level. In order to best accomplish this task, some sacrifices had to be made in terms of support for older versions of Internet Explorer.
      v-list
        v-layout(row wrap).mb-3
          v-flex(
            xs12 sm6 md4
            v-for="browser in browsers"
            v-bind:key="browser"
          ).px-0
            v-list-item
              v-list-tile(avatar tag="ul")
                v-list-tile-avatar
                  v-icon(fa light).primary {{ browser.icon }}
                v-list-tile-content
                  v-list-tile-title {{ browser.title }}
                  v-list-tile-sub-title {{ browser.supported ? 'Supported' : 'Not supported' }}
                v-list-tile-action
                  v-icon(v-if="!browser.supported").error--text clear
                  v-icon(v-else).success--text check
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
          { icon: 'safari', title: 'Safari', supported: true },
        ]
      }
    }
  }
</script>
