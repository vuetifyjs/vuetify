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
    primary: colors.green,
    secondary: colors.blueGrey.base
  }
})
