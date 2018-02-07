<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#light-and-dark
        section-head(:value="`${namespace}.lightAndDarkHeader`")
        section-text(:value="`${namespace}.lightAndDarkText1`")
        markup(lang="html")
          |&lt;v-app dark&gt;
          | ...
          |&lt;/v-app&gt;
        section-text(:value="`${namespace}.lightAndDarkText2`")

      section#customizing
        section-head(:value="`${namespace}.customizingHeader`")
        section-text(:value="`${namespace}.customizingText1`")
        markup(lang="javascript")
          | {
          |   primary: '#1976D2',
          |   secondary: '#424242',
          |   accent: '#82B1FF',
          |   error: '#FF5252',
          |   info: '#2196F3',
          |   success: '#4CAF50',
          |   warning: '#FFC107'
          | }
        section-text(:value="`${namespace}.customizingText2`")
        markup(lang="javascript")
          | Vue.use(Vuetify, {
          |   theme: {
          |     primary: '#3f51b5',
          |     secondary: '#b0bec5',
          |     accent: '#8c9eff',
          |     error: '#b71c1c'
          |   }
          | })
        section-text(:value="`${namespace}.customizingText3`")
        markup(lang="javascript")
          | import colors from 'vuetify/es5/util/colors'
          |
          | Vue.use(Vuetify, {
          |   theme: {
          |     primary: colors.purple.base,
          |     secondary: colors.grey.darken1,
          |     accent: colors.shades.black,
          |     error: colors.red.accent3
          |   }
          | })
        section-text(:value="`${namespace}.customizingText4`")
        section-text(:value="`${namespace}.customizingText5`")
        markup(lang="javascript")
          | this.$vuetify.theme.primary = '#4caf50'

      section#options
        section-head(:value="`${namespace}.optionHeader`")
        section-text(:value="`${namespace}.optionText1`")
        section-text(:value="`${namespace}.optionText2`")
        markup(lang="javascript")
          | Vue.use(Vuetify, {
          |   theme: {
          |     primary: 'red',
          |     secondary: 'purple'
          |   },
          |   options: {
          |     themeVariations: ['primary', 'secondary']
          |   }
          | })
        h3.mb-3 {{ $t(`${namespace}.optionHeader2`) }}
        section-text(:value="`${namespace}.optionText3`")
        markup(lang="javascript")
          | Vue.use(Vuetify, {
          |   options: {
          |     minifyTheme: function () {
          |       return process.env.NODE_ENV === 'production'
          |         ? val.replace(/[\s|\r\n|\r|\n]/g, '')
          |         : null
          |     }
          |   }
          | })
        h3.mb-3 {{ $t(`${namespace}.optionHeader3`) }}
        section-text(:value="`${namespace}.optionText4`")
        markup(lang="javascript")
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

      section#stylus-guide
        section-head(:value="`${namespace}.stylusHeader`")
        section-text(:value="`${namespace}.stylusText1`")
        h3.mb-3 {{ $t(`${namespace}.stylusHeader2`) }}
        section-text(:value="`${namespace}.stylusText2`")
        markup(lang="cli")
          | $ npm i stylus stylus-loader style-loader css-loader --save-dev
          |// or
          | $ yarn add -D stylus stylus-loader style-loader css-loader
        section-text(:value="`${namespace}.stylusText3`")
        markup(lang="javascript")
          | module: {
          |   rules: [
          |     {
          |       test: /\.styl$/,
          |       loader: ['style-loader', 'css-loader', 'stylus-loader']
          |     }
          |   ]
          | }
        section-text(:value="`${namespace}.stylusText4`")
        markup(lang="stylus")
          | // main.styl
          | @import '~vuetify/src/stylus/main'
        section-text(:value="`${namespace}.stylusText5`")
        markup(lang="javascript")
          | // app.js
          | import './stylus/main.styl'
        section-text(:value="`${namespace}.stylusText6`")
        h3.mb-3 {{ $t(`${namespace}.stylusHeader3`) }}
        section-text(:value="`${namespace}.stylusText7`")
        markup(lang="stylus")
          | $body-font-family = 'Open Sans'
          | $alert-font-size = 18px
          | &nbsp;
          | @import '~vuetify/src/stylus/main'
          | // For a-la-carte
          | @import '~vuetify/src/stylus/app'
</template>
