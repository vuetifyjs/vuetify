// Vue
import Vue from 'vue'
import Vuex from 'vuex'

// Utilities
import pathify from '@/plugins/vuex-pathify'

// Modules
import * as modules from './modules'

Vue.use(Vuex)

export function createStore () {
  const store = new Vuex.Store({
    modules,
    plugins: [pathify.plugin],
  })

  store.subscribe(mutation => {
    if (!mutation.type.startsWith('user/')) return

    store.dispatch('user/update', mutation)
  })

  return store
}

export const ROOT_DISPATCH = Object.freeze({ root: true })
