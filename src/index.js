import './stylus/app.styl'
import * as components from './components'
import * as directives from './directives'

function Vuetify (Vue, args) {
  const Vuetify = components.Vuetify

  Vue.use(Vuetify, {
    components,
    directives,
    ...args
  })
}

Vuetify.version = process.env.VUETIFY_VERSION

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuetify)
}

export default Vuetify
