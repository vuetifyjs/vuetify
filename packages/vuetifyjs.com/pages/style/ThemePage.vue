<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#light-and-dark
        section-head(:value="`${namespace}.lightAndDarkHeader`")
        section-text(:value="`${namespace}.lightAndDarkText1`")
        markup(lang="html")
          |&lt;v-app light&gt;
          |...
          |&lt;/v-app&gt;
        section-text(:value="`${namespace}.lightAndDarkText2`")

      section#customizing
        section-head(:value="`${namespace}.customizingHeader`")
        section-text(:value="`${namespace}.customizingText1`")
        markup(lang="javascript")
          |{
          |   primary: '#1976D2',
          |   secondary: '#424242',
          |   accent: '#82B1FF',
          |   error: '#FF5252',
          |   info: '#2196F3',
          |   success: '#4CAF50',
          |   warning: '#FFC107'
          |}
        section-text(:value="`${namespace}.customizingText2`")
        markup(lang="javascript")
          |Vue.use(Vuetify, {
          |   theme: {
          |     primary: '#3f51b5',
          |     secondary: '#b0bec5',
          |     accent: '#8c9eff',
          |     error: '#b71c1c'
          |   }
          |})
        section-text(:value="`${namespace}.customizingText3`")
        markup(lang="javascript")
          |import colors from 'vuetify/src/util/colors'
          |
          |Vue.use(Vuetify, {
          |   theme: {
          |     primary: colors.purple.base,
          |     secondary: colors.gray.darken1,
          |     accent: colors.shades.black,
          |     error: colors.red.accent3
          |   }
          |})
        section-text(:value="`${namespace}.customizingText4`")
        section-text(:value="`${namespace}.customizingText5`")
        markup(lang="javascript")
          |this.$vuetify.theme.primary = '#4caf50'
</template>
