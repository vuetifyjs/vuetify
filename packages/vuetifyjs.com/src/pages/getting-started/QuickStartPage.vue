<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#supported-browsers
        helpers-section-head(:value="`${namespace}.browserHeader`")
        helpers-section-text(:value="`${namespace}.browserText`")
        v-list.transparent.py-0
          v-layout(row wrap)
            v-flex(
              xs12 sm6 md4
              v-for="browser in browsers"
              v-bind:key="browser.title"
            ).px-0
              translation-translatable(:i18n="getBrowserSupport(browser)")
              v-list-tile(avatar tag="ul")
                v-list-tile-avatar(:color="browser.supported ? browser.supported === 'polyfill' ? 'warning' : 'success' : 'error'")
                  v-icon(dark v-if="typeof browser.icon === 'string'") fab fa-{{ browser.icon }}
                  v-icon(dark v-else v-for="icon in browser.icon" :key="icon").browser-icon--split fab fa-{{ icon }}
                v-list-tile-content
                  v-list-tile-title {{ browser.title }}
                  v-list-tile-sub-title
                    span {{ $t(getBrowserSupport(browser)) }}

      section#vue-cli-3
        helpers-section-head(:value="`${namespace}.vueCliHeader`")
        helpers-section-text(:value="`${namespace}.vueCliText1`")

        helpers-markup(lang="bash")
          | $ yarn global add @vue/cli
          | // OR
          | $ npm install @vue/cli -g

        core-alert(info :value="`${namespace}.vueCliText2`")

        helpers-section-text(:value="`${namespace}.vueCliText3`")
        helpers-section-text(:value="`${namespace}.vueCliText4`")

        helpers-markup(lang="bash")
          | $ vue create my-app
          | $ cd my-app

        helpers-section-text(:value="`${namespace}.vueCliText5`")

        helpers-markup(lang="bash")
          | $ vue add vuetify

        helpers-section-text(:value="`${namespace}.vueCliText6`")
        helpers-section-text(:value="`${namespace}.vueCliText7`")

        helpers-markup(lang="bash")
          | $ yarn serve
          | // OR
          | $ npm run serve

      section#cdn-install
        helpers-section-head(:value="`${namespace}.cdnHeader`")
        helpers-section-text(:value="`${namespace}.cdnText`")

        helpers-markup(lang="html")
          | &lt;!DOCTYPE html&gt;
          | &lt;html&gt;
          | &lt;head&gt;
          |   &lt;link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet"&gt;
          |   &lt;link href="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css" rel="stylesheet"&gt;
          |   &lt;meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"&gt;
          | &lt;/head&gt;
          | &lt;body&gt;
          |   &lt;div id="app"&gt;
          |     &lt;v-app&gt;
          |       &lt;v-content&gt;
          |         &lt;v-container&gt;Hello world&lt;/v-container&gt;
          |       &lt;/v-content&gt;
          |     &lt;/v-app&gt;
          |   &lt;/div&gt;
          | &nbsp;
          |   &lt;script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"&gt;&lt;/script&gt;
          |   &lt;script src="https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.js"&gt;&lt;/script&gt;
          |   &lt;script&gt;
          |     new Vue({ el: '#app' })
          |   &lt;/script&gt;
          | &lt;/body&gt;
          | &lt;/html&gt;

      section#new-applications
        helpers-section-head(:value="`${namespace}.newHeader`")
        helpers-section-text(:value="`${namespace}.newText`")
        core-alert(:value="`${namespace}.newAlert`")
        template-list

      section#existing-applications
        helpers-section-head(:value="`${namespace}.existingHeader`")
        helpers-section-text(:value="`${namespace}.existingText1`")
        core-alert(info :value="`${namespace}.existingAlert`")
        helpers-section-text(:value="`${namespace}.existingText2`")
        helpers-markup(lang="cli")
          | $ npm install vuetify --save
          | # or
          | $ yarn add vuetify
        helpers-section-text(:value="`${namespace}.existingText3`")
        helpers-markup(lang="js")
          | import Vue from 'vue'
          | import Vuetify from 'vuetify'
          | &nbsp;
          | Vue.use(Vuetify)
        helpers-section-text(:value="`${namespace}.existingText4`")
        helpers-markup(lang="js")
          | // index.js or main.js
          | import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
        helpers-markup(lang="stylus")
          | // main.styl
          | @import '~vuetify/src/stylus/main' // Ensure you are using stylus-loader

        helpers-section-text(:value="`${namespace}.existingText5`")
        helpers-markup(lang="html")
          | &lt;head&gt;
          |   &lt;link href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons' rel="stylesheet"&gt;
          | &lt;/head&gt;
        helpers-section-text(:value="`${namespace}.existingText6`")
        helpers-markup(lang="js")
          | // index.js or main.js
          | import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
        helpers-section-text(:value="`${namespace}.existingText7`")
        helpers-markup(lang="js")
          | // App.vue
          | import WebFontLoader from 'webfontloader'
          | &nbsp;
          | export default {
          |   mounted () {
          |     WebFontLoader.load({
          |       google: {
          |         families: ['Roboto:100,300,400,500,700,900']
          |       },
          |       active: this.setFontLoaded
          |     })
          |   },
          |   methods: {
          |     setFontLoaded () {
          |       this.$emit('font-loaded')
          |     }
          |   }
          | }
        core-alert(error :value="`${namespace}.alert2`")

      section#ie11-support
        helpers-section-head(:value="`${namespace}.ie11Header`")
        helpers-section-text(:value="`${namespace}.ie11Text`")

        helpers-markup(lang="cli")
          | // my-project/
          | $ npm install babel-polyfill --save
          | // or
          | $ yarn add babel-polyfill

        helpers-section-text(:value="`${namespace}.ie11Text1`")

        helpers-markup(lang="javascript")
          | // my-project/src/index.js
          | import 'babel-polyfill'
          | ...
          | new Vue()

        helpers-section-text(:value="`${namespace}.ie11Text2`")

        helpers-markup(lang="cli")
          | $ yarn add @babel/preset-env -d
          | // or
          | $ npm install @babel/preset-env --save-dev

        helpers-section-text(:value="`${namespace}.ie11Text3`")

        helpers-markup(lang="json")
          | // .babelrc
          | {
          |   "presets": ["@babel/preset-env"]
          | }

        helpers-markup(lang="javascript")
          | // babel.config.js
          | module.exports = {
          |   presets: ['@babel/preset-env']
          | }

        helpers-section-text(:value="`${namespace}.ie11Text4`")
        helpers-markup(lang="html")
          | &lt;template slot="items" slot-scope="props"&gt;
          |   &lt;td&gt;{‌{ props.item.name }‌}&lt;/td&gt;
          | &lt;/template&gt;
</template>

<script>
  import TemplateList from '@/components/misc/TemplateList'

  export default {
    components: { TemplateList },

    data: () => ({
      browsers: [
        { icon: 'chrome', title: 'Chrome', supported: true },
        { icon: 'firefox', title: 'Firefox', supported: true },
        { icon: 'edge', title: 'Edge', supported: true },
        { icon: 'safari', title: 'Safari 10+', supported: true },
        { icon: ['internet-explorer', 'safari'], title: 'IE11 / Safari 9', supported: 'polyfill' },
        { icon: 'internet-explorer', title: 'IE9 / IE10', supported: false }
      ]
    }),

    methods: {
      getBrowserSupport (browser) {
        if (browser.supported === true) return 'GettingStarted.QuickStart.browserSupport.supported'
        else if (browser.supported === false) return 'GettingStarted.QuickStart.browserSupport.notSupported'
        else return `GettingStarted.QuickStart.browserSupport.${browser.supported}`
      }
    }
  }
</script>

<style lang="stylus">
  .browser-icon--split
    position: absolute

    &:nth-child(1)
      clip: rect(0px 21px 40px 0px)
    &:nth-child(2)
      clip: rect(0px 40px 40px 22px)
</style>
