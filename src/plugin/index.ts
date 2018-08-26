import Vue, { VueConstructor } from 'vue'
import { consoleError } from '../util/console'
import { VuetifyObject, VuetifyUseOptions } from 'types'

let _Vue: VueConstructor

class Vuetify extends Vue implements VuetifyObject {
  constructor (opts: VuetifyUseOptions) {
    super()

    if (!_Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }

    this.$options.data = {

    }
  }
}

export function install (Vue: VueConstructor) {
  if (_Vue && Vue === _Vue) {
    consoleError('already installed. Vue.use(Vuetify) should only be called once.')
  }

  _Vue = Vue

  Vue.mixin({ beforeCreate: init })
}

function init (this: Vue) {
  const options = this.$options

  if (options.vuetify) {
    this.$vuetify = options.vuetify
  } else if (options.parent && options.parent.$vuetify) {
    this.$vuetify = options.parent.$vuetify
  }
}
