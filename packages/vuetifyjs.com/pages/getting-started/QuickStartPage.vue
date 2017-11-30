<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      app-alert(error :value="`${namespace}.alert1`")

      section#supported-browsers
        section-head(:value="`${namespace}.browserHeader`")
        section-text(:value="`${namespace}.browserText`")
        v-list.transparent.py-0
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
                  v-icon(v-if="!browser.supported" color="error") clear
                  v-icon(v-else color="success") check

      section#cdn-install
        section-head(:value="`${namespace}.cdnHeader`")
        section-text(:value="`${namespace}.cdnText`")

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
          |       &lt;v-content&gt;
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
        section-head(:value="`${namespace}.newHeader`")
        section-text(:value="`${namespace}.newText`")
        template-list

      section#existing-applications
        section-head(:value="`${namespace}.existingHeader`")
        section-text(:value="`${namespace}.existingText1`")
        section-text(:value="`${namespace}.existingText2`")
        markup(lang="cli")
          |$  npm install vuetify
          |# or
          |$  yarn add vuetify
        section-text(:value="`${namespace}.existingText3`")
        markup(lang="js")
          |import Vue from 'vue'
          |import Vuetify from 'vuetify'
          |&nbsp;
          |Vue.use(Vuetify)
        section-text(:value="`${namespace}.existingText4`")
        markup(lang="js")
          |// index.js or main.js
          |import('path/to/node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader
        markup(lang="stylus")
          |// main.styl
          |@import 'path/to/node_modules/vuetify/src/stylus/main.styl' // Ensure you are using stylus-loader
          |&nbsp;
        section-text(:value="`${namespace}.existingText5`")
        app-alert(error :value="`${namespace}.alert2`")

      section#ie11-support
        section-head(:value="`${namespace}.ie11Header`")
        section-text(:value="`${namespace}.ie11Text`")

        markup(lang="cli")
          |// my-project/
          |npm install babel-polyfill --save-dev // or yarn add babel-polyfill

        markup(lang="javascript")
          |// my-project/src/index.js
          |import 'babel-polyfill'
          |...
          |new Vue()

        section-text(:value="`${namespace}.ie11Text2`")
</template>

<script>
  import TemplateList from '@/components/misc/TemplateList'

  export default {
    components: { TemplateList },

    data: () => ({
      browsers: [
        { icon: 'internet-explorer', title: 'IE9 / IE10', supported: false },
        { icon: 'internet-explorer', title: 'IE11', supported: 'Supported w/ polyfill' },
        { icon: 'edge', title: 'Edge', supported: true },
        { icon: 'chrome', title: 'Chrome', supported: true },
        { icon: 'firefox', title: 'Firefox', supported: true },
        { icon: 'safari', title: 'Safari 9+', supported: true },
      ]
    })
  }
</script>
