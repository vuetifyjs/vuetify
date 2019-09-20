import Vue from 'vue'

import Vuetify, {
  VBtn,
  VCard,
  VCardText,
  directives,
} from 'vuetify/lib'

Vuetify.install(Vue)

Vuetify.install(Vue, {})

Vuetify.install(Vue, {
  components: {
    VBtn,
    VCard,
    VCardText,
  },
  directives,
})

/* eslint-disable-next-line no-new */
new Vue({
  vuetify: new Vuetify(),
})
