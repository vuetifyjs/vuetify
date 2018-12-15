<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#theme-generator
        helpers-section-head(:value="`${namespace}.themeGeneratorHeader`")
        helpers-section-text(:value="`${namespace}.themeGeneratorText1`")

      section#light-and-dark
        helpers-section-head(:value="`${namespace}.lightAndDarkHeader`")
        helpers-section-text(:value="`${namespace}.lightAndDarkText1`")
        helpers-markup(lang="html")
          |&lt;v-app dark&gt;
          | ...
          |&lt;/v-app&gt;
        helpers-section-text(:value="`${namespace}.lightAndDarkText2`")

      section#customizing
        helpers-section-head(:value="`${namespace}.customizingHeader`")
        helpers-section-text(:value="`${namespace}.customizingText1`")
        helpers-markup(lang="javascript")
          | {
          |   primary: '#1976D2',
          |   secondary: '#424242',
          |   accent: '#82B1FF',
          |   error: '#FF5252',
          |   info: '#2196F3',
          |   success: '#4CAF50',
          |   warning: '#FFC107'
          | }
        helpers-section-text(:value="`${namespace}.customizingText2`")
        helpers-markup(lang="javascript")
          | Vue.use(Vuetify, {
          |   theme: {
          |     primary: '#3f51b5',
          |     secondary: '#b0bec5',
          |     accent: '#8c9eff',
          |     error: '#b71c1c'
          |   }
          | })
        helpers-section-text(:value="`${namespace}.customizingText3`")
        helpers-markup(lang="javascript")
          | import colors from 'vuetify/es5/util/colors'
          |
          | Vue.use(Vuetify, {
          |   theme: {
          |     primary: colors.purple,
          |     secondary: colors.grey.darken1,
          |     accent: colors.shades.black,
          |     error: colors.red.accent3
          |   }
          | })
        helpers-section-text(:value="`${namespace}.customizingText4`")
        helpers-section-text(:value="`${namespace}.customizingText5`")
        helpers-markup(lang="javascript")
          | this.$vuetify.theme.primary = '#4caf50'

        helpers-section-subheader(:value="`${namespace}.variantsSubheader`")
        helpers-section-text(:value="`${namespace}.variantsText1`")
        helpers-markup(lang="javascript")
          | // src/theme.js
          | import colors from 'vuetify/es5/util/colors'
          |
          | export default {
          |   primary: {
          |     base: colors.purple.base,
          |     darken1: colors.purple.darken2
          |   },
          |   secondary: colors.indigo,
          |   // All keys will generate theme styles,
          |   // Here we add a custom `tertiary` color
          |   tertiary: colors.pink.base
          | }

        helpers-section-text(:value="`${namespace}.variantsText2`")
        helpers-markup(lang="javascript")
          | // src/index.js
          | import Vue from 'vue'
          | import Vuetify from 'vuetify'
          | import theme from './theme'
          |
          | Vue.use(Vuetify, { theme })

        helpers-section-text(:value="`${namespace}.variantsText3`")
        helpers-markup(lang="typescript")
          | interface ParsedThemeItem {
          |   base: string
          |   lighten5: string
          |   lighten4: string
          |   lighten3: string
          |   lighten2: string
          |   lighten1: string
          |   darken1: string
          |   darken2: string
          |   darken3: string
          |   darken4: string
          |
          |   [name: string]: string
          | }

      section#options
        helpers-section-head(:value="`${namespace}.optionHeader`")
        helpers-section-text(:value="`${namespace}.optionText1`")
        h3.mb-3 {{ $t(`${namespace}.optionHeader2`) }}
        helpers-section-text(:value="`${namespace}.optionText3`")
        helpers-markup(lang="javascript")
          | Vue.use(Vuetify, {
          |   options: {
          |     minifyTheme: function (css) {
          |       return process.env.NODE_ENV === 'production'
          |         ? css.replace(/[\s|\r\n|\r|\n]/g, '')
          |         : css
          |     }
          |   }
          | })
        h3.mb-3 {{ $t(`${namespace}.optionHeader3`) }}
        helpers-section-text(:value="`${namespace}.optionText4`")
        helpers-markup(lang="javascript")
          | const themeCache = LRU({
          |   max: 10,
          |   maxAge: 1000 * 60 * 60 // 1 hour
          | })
          |
          | Vue.use(Vuetify, {
          |   options: {
          |     themeCache
          |   }
          | })
        h3.mb-3 {{ $t(`${namespace}.optionHeader4`) }}
        helpers-section-text(:value="`${namespace}.optionText5`")
        helpers-markup(lang="javascript")
          | Vue.use(Vuetify, {
          |   options: {
          |     customProperties: true
          |   }
          | })
        helpers-markup(lang="html")
          | #{'<style scoped>'}
          |   .something {
          |     color: var(--v-primary-base)
          |     background-color: var(--v-accent-lighten2)
          |   }
          | #{'</style>'}
        h3.mb-3 {{ $t(`${namespace}.optionHeader5`) }}
        helpers-section-text(:value="`${namespace}.optionText6`")
        helpers-markup()
          | Content-Security-Policy: script-src 'self' 'nonce-dQw4w9WgXcQ'
        helpers-markup(lang="javascript")
          | Vue.use(Vuetify, {
          |   options: {
          |     cspNonce: 'dQw4w9WgXcQ'
          |   }
          | })

      section#stylus-guide
        helpers-section-head(:value="`${namespace}.stylusHeader`")
        helpers-section-text(:value="`${namespace}.stylusText1`")
        h3.mb-3 {{ $t(`${namespace}.stylusHeader2`) }}
        helpers-section-text(:value="`${namespace}.stylusText2`")
        helpers-markup(lang="cli")
          | $ npm i stylus stylus-loader style-loader css-loader --save-dev
          |// or
          | $ yarn add -D stylus stylus-loader style-loader css-loader
        helpers-section-text(:value="`${namespace}.stylusText3`")
        helpers-markup(lang="javascript")
          | module: {
          |   rules: [
          |     {
          |       test: /\.styl$/,
          |       loader: ['style-loader', 'css-loader', 'stylus-loader']
          |     }
          |   ]
          | }
        helpers-section-text(:value="`${namespace}.stylusText4`")
        helpers-markup(lang="stylus")
          | // main.styl
          | @import '~vuetify/src/stylus/main'
        helpers-section-text(:value="`${namespace}.stylusText5`")
        helpers-markup(lang="javascript")
          | // app.js
          | import './stylus/main.styl'
        helpers-section-text(:value="`${namespace}.stylusText6`")
        h3.mb-3 {{ $t(`${namespace}.stylusHeader3`) }}
        helpers-section-text(:value="`${namespace}.stylusText7`")
        helpers-markup(lang="stylus")
          | @import '~vuetify/src/stylus/settings/_variables'
          | &nbsp;
          | $material-light.background = #FFF
          | $body-font-family = 'Open Sans'
          | $alert-font-size = 18px
          | &nbsp;
          | @import '~vuetify/src/stylus/main'
          | // Or for a-la-carte:
          | @import '~vuetify/src/stylus/app'
</template>
