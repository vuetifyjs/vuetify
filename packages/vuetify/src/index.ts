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

function VuetifyInstall (app: any, args: any) {
  install(app, {
    components,
    directives,
    ...args,
  })
}

function VuetifyProvide (vuetify: any) {
  vuetify.init()

  provide(VuetifySymbol, vuetify.framework)
}

function VuetifyInject () {
  const vuetify = inject(VuetifySymbol)

  if (!vuetify) {
    throw Error(`Unable to find vuetify instance on Symbol <${String(VuetifySymbol)}>`)
  }

  return vuetify
}

export {
  VuetifyInstall,
  Vuetify,
  VuetifyInject,
  VuetifyProvide,
}

export default Vuetify

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(Vuetify)
// }
