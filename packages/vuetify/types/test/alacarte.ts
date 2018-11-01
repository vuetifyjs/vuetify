import Vue from 'vue'

import Vuetify from 'vuetify/es5/components/Vuetify'
import VBtn from 'vuetify/es5/components/VBtn'
import * as VCard from 'vuetify/es5/components/VCard'
import { Ripple } from 'vuetify/es5/directives'
import * as directives from 'vuetify/es5/directives'

Vuetify.install(Vue, {
  components: {
    VBtn,
    ...VCard
  },
  directives: {
    Ripple,
    ...directives
  }
})

Vue.extend({
  components: {
    VBtn,
    ...VCard
  },
  directives: {
    Ripple
  }
})
