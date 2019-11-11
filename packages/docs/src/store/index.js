import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import * as modules from './modules'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    plugins: [pathify.plugin],
    modules,
  })
}
