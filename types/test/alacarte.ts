import Vue from 'vue'

import Vuetify from 'vuetify/es5/components/Vuetify'
import VBtn from 'vuetify/es5/components/VBtn'
import * as VCard from 'vuetify/es5/components/VCard'

Vue.use(Vuetify, {
  components: {
    VBtn,
    ...VCard
  }
})

Vuetify.install(Vue, {
  components: {
    VBtn,
    ...VCard
  }
})

Vue.extend({
  components: {
    VBtn,
    ...VCard
  }
})
