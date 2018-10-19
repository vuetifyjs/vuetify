<template lang="pug">
  views-doc
    helpers-section-text(slot="sup" :value="`Guides.ALaCarte.headerText2`")
    template(slot-scope="{ namespace }")
      section#importing-components
        helpers-section-head(:value="`${namespace}.importHeader`")
        helpers-section-text(:value="`${namespace}.importText1`")
        core-alert(:value="`${namespace}.webpackVersionWarning`" warning).text--primary
        helpers-markup#global-import(lang="js").
          // main.js
          import Vue from 'vue'
          import App from './App.vue'
          import Vuetify, {
            VApp, // required
            VNavigationDrawer,
            VFooter,
            VToolbar,
            transitions
          } from 'vuetify/lib'
          import { Ripple } from 'vuetify/lib/directives'

          Vue.use(Vuetify, {
            components: {
              VApp,
              VNavigationDrawer,
              VFooter,
              VToolbar,
              transitions
            },
            directives: {
              Ripple
            }
          })
        core-alert(:value="`${namespace}.optionsDirectivesNotice`" info)
        helpers-section-text(:value="`${namespace}.importText2`")
        helpers-markup#local-import(lang="js").
          // .vue files
          import { VCard, VCardText, VCardMedia } from 'vuetify/lib'

          export default {
            components: {
              VCard,
              VCardText,
              VCardMedia
            }
          }
      section#required-styles
        helpers-section-head(:value="`${namespace}.styleHeader`")
        helpers-section-text(:value="`${namespace}.styleText1`")
        helpers-markup(lang="cli").
          $ npm install --save-dev stylus stylus-loader
          # or
          $ yarn add --dev stylus stylus-loader
        helpers-section-text(:value="`${namespace}.styleText2`")
        helpers-markup(lang="js").
          // src/main.js
          import 'vuetify/src/stylus/app.styl'
        core-alert(:value="`${namespace}.stylusDetailNotice`" info)

      section#vuetify-loader
        helpers-section-head(:value="`${namespace}.loaderHeader`")
        helpers-section-text(:value="`${namespace}.loaderText1`")
        helpers-markup(lang="js").
          // You still need to register Vuetify itself
          import Vue from 'vue'
          import Vuetify from 'vuetify/lib'
          import 'vuetify/src/stylus/app.styl'

          Vue.use(Vuetify)
        helpers-markup(lang="js").
          // webpack.config.js
          const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
          module.exports = {
            plugins: [
              new VuetifyLoaderPlugin()
            ]
          }

          // or vue.config.js
          const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
          module.exports = {
            configureWebpack: {
              plugins: [
                new VuetifyLoaderPlugin()
              ]
            }
          }
        helpers-section-text(:value="`${namespace}.loaderText2`")

      section#loader-limitations
        helpers-section-head(:value="`${namespace}.loaderLimitationsHeader`")
        helpers-section-text(:value="`${namespace}.loaderLimitationsText1`")
        helpers-section-subheader(:value="`${namespace}.loaderLimitationsDynamicHeader`")
        helpers-section-text(:value="`${namespace}.loaderLimitationsDynamicText1`")
        helpers-markup(lang="html").
          // SomeComponent.vue
          #{'<template>'}
            #{'<v-data-iterator content-tag="v-layout">'}
            ...
        helpers-markup(lang="js").
          // main.js
          import Vuetify, { VLayout } from 'vuetify'

          Vue.use(Vuetify, {
            components: { VLayout }
          })
        helpers-section-text(:value="`${namespace}.loaderLimitationsDynamicText2`")
        helpers-markup(lang="html").
          #{'<template>'}
            #{'<component :is="button ? \'v-btn\' : \'v-chip\'">'}
            ...
          #{'</template>'}

          &lt;script&gt;
            import { VBtn, VChip } from 'vuetify/lib'
            export default {
              components: { VBtn, VChip },
              data: () => ({ button: false })
            }
          #{'</script>'}
        helpers-section-subheader(:value="`${namespace}.loaderLimitationsFunctionalHeader`")
        helpers-section-text(:value="`${namespace}.loaderLimitationsFunctionalText1`")
        helpers-section-subheader(:value="`${namespace}.loaderLimitationsPugHeader`")
        helpers-section-text(:value="`${namespace}.loaderLimitationsPugText1`")
</template>
