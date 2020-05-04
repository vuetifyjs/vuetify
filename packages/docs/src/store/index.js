// Vue
import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'

// Modules
import * as modules from './modules'

Vue.use(Vuex)

export function createStore () {
  const store = new Vuex.Store({
    modules,
    plugins: [pathify.plugin],
  })

  store.dispatch('app/init')

  return store
}
