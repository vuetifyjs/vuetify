<template lang="pug">
  doc-view
    v-layout(row wrap)
      v-flex(xs12 sm8 xl12)
        section-def
          dt(slot="title") Theme
          dd(slot="desc") Easily change the colors of your application programmatically.
      ad
    section
      section-header Light and Dark
      section-text Vuetify supports both <strong>light</strong> and <strong>dark</strong> variants of the Material Design spec. This designation starts at the root application component, <code>v-app</code>.
      markup
        |&lt;v-app light&gt;
        |...
        |&lt;/v-app&gt;
      section-text When you designate a component as light or dark, all of its children will inherit and apply the same unless otherwise specified.
    section
      section-header Customizing
      section-text By default, Vuetify has a standard theme applied for all components.
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
      section-text This can be easily changed. Simply pass a <strong>theme</strong> property to the <code>Vue.use</code> function. You can choose to modify all or only some of the theme properties, with the remaining inheriting from the default.
      markup(lang="javascript")
        |Vue.use(Vuetify, {
        |   theme: {
        |     primary: '#3f51b5',
        |     secondary: '#b0bec5',
        |     accent: '#8c9eff',
        |     error: '#b71c1c'
        |   }
        |})
      section-text Under the hood, Vuetify will generate css classes based upon these values that will be accessible in the DOM. These classes will follow the same markup as other helper classes, <code>primary</code> or <code>secondary--text</code> for example.
      section-text These values will also be made available on the instance <strong>$vuetify</strong> object under the <strong>theme</strong> property. This allows you to <em>dynamically</em> modify your theme. Behind the scenes, Vuetify will regenerate and update your theme classes, seamlessly updating your application.
      markup(lang="javascript")
        |this.$vuetify.theme.primary = '#4caf50'
</template>
