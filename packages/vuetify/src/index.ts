import Vuetify from './framework'
import {
  inject,
  provide,
} from 'vue'

const VuetifySymbol = Symbol.for('vuetify')

function VuetifyProvide (vuetify: any) {
  provide(VuetifySymbol, vuetify)
}

function VuetifyInject () {
  const vuetify = inject(VuetifySymbol)

  if (!vuetify) {
    throw Error(`Unable to find vuetify instance on Symbol <${String(VuetifySymbol)}>`)
  }

  return vuetify
}

export {
  Vuetify,
  VuetifyInject,
  VuetifyProvide,
}

// import * as components from './components'
// import * as directives from './directives'
// import Vuetify from './framework'

// export default Vuetify

// const install = Vuetify.install

// Vuetify.install = (Vue, args) => {
//   install.call(Vuetify, Vue, {
//     components,
//     directives,
//     ...args,
//   })
// }

// if (typeof window !== 'undefined' && window.Vue) {
//   window.Vue.use(Vuetify)
// }
