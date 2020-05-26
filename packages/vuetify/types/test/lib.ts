import Vue from 'vue'

import Vuetify, {
  VBtn,
  VCard,
  VCardText,
} from 'vuetify/lib'

import * as directives from 'vuetify/lib/directives'

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

VBtn.extend()

Vue.extend({
  extends: VBtn,
})
