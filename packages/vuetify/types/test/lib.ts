import Vue from 'vue'

import Vuetify, {
  VBtn,
  VCard,
  VCardText,
  directives,
  colors
} from 'vuetify/lib'

Vuetify.install(Vue, {
  components: {
    VBtn,
    VCard,
    VCardText
  },
  directives,
  theme: {
    themes: {
      dark: {
        primary: colors.green.base,
        secondary: colors.blueGrey.base
      }
    } as any
  }
})
