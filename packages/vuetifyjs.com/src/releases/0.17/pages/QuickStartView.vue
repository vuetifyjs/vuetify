<template lang="pug">
  doc-view(id="quick-start-view")
    v-layout(row wrap)
      v-flex(xs12 sm8 xl12)
        section-def
          dt(slot="title") Getting Started
          dd(slot="desc") Use one of the Vuetify.js Vue CLI packages <em>(based on the official examples)</em> to get your project started in no time. Vuetify.js supports <strong>SSR</strong> (server-side rendering), <strong>SPA</strong> (single page application), <strong>PWA</strong> (progressive web application) and standard <strong>HTML</strong> pages.
      ad

    v-alert(color="error" icon="warning" value).mb-4 In order for your application to work properly, you <strong>must</strong> wrap it in a <code>v-app</code> component. This component is used for dynamically managing your content area and is the mounting point for many components.
    v-alert(color="info" icon="local_offer" value).mb-4
      div The new <strong>Vuetify Store</strong> is now live <v-btn color="white" class="primary--text" href="https://next.vuetifyjs.com/store" target="_blank">Check it out! <v-icon>chevron_right</v-icon></v-btn>
    section#cdn-install
      section-header CDN Install
      section-text To test using Vuetify.js without installing a template from Vue CLI, copy the code below into your <code>index.html</code>. This will pull the latest version of Vue and Vuetify, allowing you to start playing with components. You can also use the <a href="https://template.vuetifyjs.com" target="_blank">Vuetify starter</a> on codepen.
      markup(lang="html")
        |&lt;!DOCTYPE html&gt;
        |&lt;html&gt;
        |&lt;head&gt;
        |   &lt;link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet"&gt;
        |   &lt;link href="https://unpkg.com/vuetify/dist/vuetify.min.css" rel="stylesheet"&gt;
        |   &lt;meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"&gt;
        |&lt;/head&gt;
        |&lt;body&gt;
        |   &lt;div id="app"&gt;
        |     &lt;v-app&gt;
        |       &lt;v-content&gt;
        |         &lt;v-container&gt;Hello world&lt;/v-container&gt;
        |       &lt;/v-content&gt;
        |     &lt;/v-app&gt;
        |   &lt;/div&gt;
        |&nbsp;
        |   &lt;script src="https://unpkg.com/vue/dist/vue.js"&gt;&lt;/script&gt;
        |   &lt;script src="https://unpkg.com/vuetify/dist/vuetify.js"&gt;&lt;/script&gt;
        |   &lt;script&gt;
        |     new Vue({ el: '#app' })
        |   &lt;/script&gt;
        |&lt;/body&gt;
        |&lt;/html&gt;

    section#new-applications
      section-header New applications

      section-text Vuetify has 8 pre-made Vue CLI templates, 3 which are forked from <a href="https://github.com/vuejs-templates" target="_blank" rel="noopener">official Vue.js templates</a>. They contain small modifications to help you get started with Vuetify even faster. These packages require <code>vue-cli</code>. For more information on vue-cli, visit the official <a href="https://github.com/vuejs/vue-cli" target="_blank" rel="noopener">Github</a> repository. These templates are designed to get you started as fast as possible with your next project

      div.elevation-2
        v-layout(wrap)
          input(
            :style="{ position: 'absolute', left: '-1000px', top: '-1000px' }"
            :value="copy"
            ref="copy"
          )
          v-flex(
            xs12
            sm4
            md3
            v-for="(template, i) in templates"
            :key="i"
          )
            div(style="display: none" v-html="template.desc")
            v-list(two-line).pa-0
              v-list-tile(
                href="javascript:;"
                @click="selectedIndex = i"
                :value="selectedIndex === i"
              )
                v-list-tile-action
                  v-icon(
                    v-html="template.icon"
                    :class="[selectedIndex === i ? 'primary--text' : '']"
                  )
                v-list-tile-content
                  v-list-tile-title(v-text="template.title")
                  v-list-tile-sub-title vue init vuetifyjs/{{ template.init }}
        v-expansion-panel.elevation-0
          v-expansion-panel-content(value)
            v-card(
              tile
              flat
              dark
              style="min-height: 75px"
            ).blue.darken-3.hide-overflow
              v-fade-transition(mode="out-in")
                v-layout(
                  row
                  justify-space-between
                  :key="selectedIndex"
                )
                  v-flex(xs10).layout.align-center
                    v-card-text(v-html="selectedTemplate.desc")
                    v-snackbar(
                      absolute
                      v-model="copied"
                      top
                      left
                    ) Init copied!
                      v-btn(flat @click="copied = !copied" color="light-blue") close
                  v-flex(xs2).layout.column.align-end.pa-3
                    v-tooltip(left debounce="300")
                      v-btn(
                        icon
                        dark
                        color="secondary"
                        :href="`https://github.com/vuetifyjs/${selectedTemplate.init}`"
                        target="_blank"
                        rel="noopener"
                        slot="activator"
                      )
                        v-icon(dark) fa-github
                      span Github
                    v-tooltip(left debounce="300")
                      v-btn(
                        icon
                        color="secondary"
                        dark
                        @click="copyMarkup"
                        slot="activator"
                      )
                        v-icon(dark) content_copy
                      span Copy markup

    section#existing-applications
      section-header Existing applications
      section-text To include Vuetify into an existing project, you must pull it into your node_modules. You can use either <code>npm</code> or <code>yarn</code> to accomplish this task. These are both package managers that allow you to control what resources are available to your application.

      section-text For a detailed explanation of how to get <code>npm</code> running in your environment, check out the <a href="https://docs.npmjs.com/getting-started/what-is-npm" target="_blank" rel="noopener">official documentation</a>. Alternatively, if you wish to use yarn, you can find the official documentation <a href="https://yarnpkg.com/lang/en/docs/" target="_blank" rel="noopener">here</a>. Once setup, you can run either command from your command prompt.

      markup(lang="cli")
        |$  npm install vuetify
        |# or
        |$  yarn add vuetify

      section-text Once Vuetify has been installed, navigate to your applications main entry point. In most cases this will be <code>index.js</code> or <code>main.js</code>. In this file you will import Vuetify and tell Vue to use it.

      markup(lang="js")
        |import Vue from 'vue'
        |import Vuetify from 'vuetify'
        |&nbsp;
        |Vue.use(Vuetify)

      section-text You will also need to include the Vuetify css file. Simply include the Vuetify css file in your <code>index.html</code> or import the actual stylus file or the minified css.

      markup(lang="js")
        |// index.js or main.js
        |import('path/to/node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader

      markup(lang="stylus")
        |// main.styl
        |@import 'path/to/node_modules/vuetify/src/stylus/main.styl' // Ensure you are using stylus-loader
        |&nbsp;

      section-text The easiest way to include the Material Design icons is to add a <code>link</code> tag to your <code>index.html</code> file.

      markup(lang="html")
        |&lt;head&gt;
        |   &lt;link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' rel="stylesheet"&gt;
        |&lt;/head&gt;

      v-alert(color="error" icon="warning" value) Warning: While Vuetify attempts to not cause any css collision as much as possible, there is no guarantee that your custom styles will not alter your experience when integrating this framework into your existing project.

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
                v-list-tile-sub-title {{ browser.supported === true ? 'Supported' : (browser.supported === false ? 'Not supported' : browser.supported) }}
              v-list-tile-action
                v-icon(v-if="!browser.supported").error--text clear
                v-icon(v-else).success--text check

    section
      section-header Internet Explorer 11 Support
      section-text To use Vuetify.js with Internet Explorer, you must include a polyfill in your project. Vuetify.js can work with either <a href="https://polyfill.io/v2/docs/" target="_blank" rel="noopener">polyfill.io</a> or <a href="https://babeljs.io/docs/usage/polyfill/#installation" target="_blank" rel="noopener">babel-polyfill</a>. The polyfill must be loaded before your project source code. Other polyfills may be needed to use specific features in your project. <strong>Keep in mind</strong>, the CDN versions of these polyfills do not always include everything by default. It is recommended that you pull the package into your project locally and import it there.

      section-text Due to Internet Explorer's limited support for <code>&lt;template&gt;</code> tags, you must take care to send fully compiled dom elements to the browser. This can be done by either building your Vue code in advance or by creating helper components to replace the dom elements. For instance, if sent directly to IE, this will fail:

      markup(lang="html")
        |&lt;template slot="items" slot-scope="props"&gt;
        |   &lt;td&gt;{&zwnj;{ props.item.name }&zwnj;}&lt;/td&gt;
        |&lt;/template&gt;

      section-text Using a custom component, in this example <code>&lt;cell&gt;</code>, we could use this markup:

      markup(lang="html")
        |&lt;!--Example component declaration--&gt;
        | Vue.component('cell', { template: '&lt;td&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/td&gt;' });
        |&nbsp;
        |&lt;!--Example scoped slot--&gt;
        |&lt;template slot="items" slot-scope="props"&gt;
        |   &lt;cell&gt;{&zwnj;{ props.item.name }&zwnj;}&lt;/cell&gt;
        |&lt;/template&gt;

      v-alert(value color="warning" icon="priority_high") If you still find yourself struggling with IE11, come get help from the Vuetify <a class="white--text" href="https://chat.vuetifyjs.com" target="_blank" rel="noopener">community</a>.

</template>

<script>
  export default {
    data () {
      return {
        browsers: [
          { icon: 'internet-explorer', title: 'IE9 / IE10', supported: false },
          { icon: 'internet-explorer', title: 'IE11', supported: 'Supported w/ polyfill' },
          { icon: 'edge', title: 'Edge', supported: true },
          { icon: 'chrome', title: 'Chrome', supported: true },
          { icon: 'firefox', title: 'Firefox', supported: true },
          { icon: 'safari', title: 'Safari 9+', supported: true },
        ],
        copied: false,
        copyTimeout: null,
        templates: [
          {
              icon: 'landscape',
              title: 'Simple HTML',
              init: 'simple',
              desc: 'This template is intended for users who want to try out Vue.js and Vuetify.js in the most simplistic way. It contains a basic index.html with no additional functionality. This is useful for developers who want to easily preview the features of the framework.',
          },
          {
            icon: 'web',
            title: 'Webpack Simple',
            init: 'webpack-simple',
            desc: 'This template is intended for users who are already familiar with Vue/Webpack. It contains a very simple webpack setup and is targetted at developers creating prototype or basic applications.'
          },
          {
            icon: 'layers',
            title: 'Webpack',
            init: 'webpack',
            desc: 'This template is intended for users who are looking for out of the box linting and unit testing.'
          },
          {
            icon: 'cloud_circle',
            title: 'Webpack SSR',
            init: 'webpack-ssr',
            desc: 'This template is for advanced users looking to utilize the new Vue SSR (server-side rendering). Based off of the structure in the Vue.js 2 <a class="white--text" href="https://github.com/vuejs/vue-hackernews-2.0" target="_blank" rel="noopener">Hackernews</a> repository. The Vuetify.js SSR template provides next generation functionality for advanced Vue applications.'
          },
          {
            icon: 'flash_on',
            title: 'NUXT',
            init: 'nuxt',
            desc: 'Utilizing the power of NUXT, supercharge your development experience with a bootstraped version ready to go with Vuetify out of the box.'
          },
          {
            icon: 'featured_video',
            title: 'PWA',
            init: 'pwa',
            desc: 'A pre-configured PWA (Progressive Web Application) template is at your disposal. Bootstraped with service workers, application manifest, and a 90+/100 Lighthouse score.'
          },
          {
            icon: 'power',
            title: 'Electron',
            init: 'electron',
            desc: "Vuetify's official Electron template for creating desktop applications."
          },
          {
            icon: 'call_split',
            title: 'A La Carte',
            init: 'a-la-carte',
            desc: 'In this template you can see an example of how to select only the components you want to use. This is useful for reducing package size with unused components.'
          }
        ],
        selectedIndex: 0
      }
    },

    computed: {
      copy () {
        return `vue init vuetifyjs/${this.selectedTemplate.init}`
      },
      selectedText () {
        return this.selectedTemplate.desc
      },
      selectedTemplate () {
        return this.templates[this.selectedIndex]
      }
    },

    watch: {
      copied (val) {
        !val && clearTimeout(this.copyTimeout)
      }
    },

    methods: {
      copyMarkup () {
        clearTimeout(this.copyTimeout)
        this.$refs.copy.select()
        document.execCommand('copy')
        this.copied = true
        this.copyTimeout = setTimeout(() => this.copied = false, 2000)
      }
    }
  }
</script>
