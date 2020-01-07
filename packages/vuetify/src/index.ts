// Core
import Vuetify from './framework'
import { install } from './install'

// Functionality
import * as components from './components'
import * as directives from './directives'

// Vue
import {
  inject,
  provide,
} from 'vue'

const VuetifySymbol = Symbol.for('vuetify')

// Ordering for plugin install invocation was changed and won't work for us atm
// Hoping to remove this in the future or rename it
// v2.x https://github.com/vuejs/vue/blob/6fe07ebf5ab3fea1860c59fe7cdd2ec1b760f9b0/src/core/global-api/use.js#L15
// v3.x https://github.com/vuejs/vue-next/blob/master/packages/runtime-core/src/apiCreateApp.ts#L106
function VuetifyInstall (app: any, args: any) {
  install(app, {
    components,
    directives,
    ...args,
  })
}

function createVuetify (opts: any) {
  const vuetify = new Vuetify(opts)

  vuetify.init()

  provide(VuetifySymbol, vuetify.framework)
}

function useVuetify () {
  const vuetify = inject(VuetifySymbol)

  if (!vuetify) {
    throw Error(`Unable to find vuetify instance on Symbol <${String(VuetifySymbol)}>`)
  }

  return vuetify
}

export {
  createVuetify,
  useVuetify,
  Vuetify,
  VuetifyInstall,
}

export default Vuetify

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(Vuetify)
// }
