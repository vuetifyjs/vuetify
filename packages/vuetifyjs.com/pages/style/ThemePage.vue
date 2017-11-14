<template lang="pug">
  text-page(v-bind:data="$data" id="theme-page")
    section#light-and-dark
      section-heading(value="Style.Theme.lightAndDarkHeader")
      section-text(value="Style.Theme.lightAndDarkText1")
      markup(lang="html")
        |&lt;v-app light&gt;
        |...
        |&lt;/v-app&gt;
      section-text(value="Style.Theme.lightAndDarkText2")

    section#customizing
      section-heading(value="Style.Theme.customizingHeader")
      section-text(value="Style.Theme.customizingText1")
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
      section-text(value="Style.Theme.customizingText2")
      markup(lang="javascript")
        |Vue.use(Vuetify, {
        |   theme: {
        |     primary: '#3f51b5',
        |     secondary: '#b0bec5',
        |     accent: '#8c9eff',
        |     error: '#b71c1c'
        |   }
        |})
      section-text(value="Style.Theme.customizingText3")
      section-text(value="Style.Theme.customizingText4")
      markup(lang="javascript")
        |this.$vuetify.theme.primary = '#4caf50'

</template>

<script>
  export default {
    name: 'theme-page',

    data: () => ({
      header: 'Style.Theme.header',
      headerText: 'Style.Theme.headerText'
    })
  }
</script>
