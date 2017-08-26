require('./stylus/app.styl')
import * as components from './components'
import * as directives from './directives'

export default function install (Vue) {
  const Vuetify = components.Vuetify

  Vue.use(Vuetify, {
    components,
    directives
  })
}
