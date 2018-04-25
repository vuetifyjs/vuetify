import './stylus/app.styl'
import * as components from './components'
import * as directives from './directives'

import snackbar from './components/Vuetify/util/snackbar'

function Vuetify (Vue, args) {
  const Vuetify = components.Vuetify

  Vue.use(Vuetify, {
    components,
    directives,
    ...args
  })
  Vue.prototype.$snackbar = snackbar
}

Vuetify.version = process.env.VUETIFY_VERSION

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuetify)
}

export default Vuetify
