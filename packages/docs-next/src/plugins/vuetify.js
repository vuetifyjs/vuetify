/**
 * plugins/vuetify.js
 *
 * Vuetify documentation: https://vuetifyjs.com/
 */

// Imports
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export function createVuetify () {
  return new Vuetify()
}
