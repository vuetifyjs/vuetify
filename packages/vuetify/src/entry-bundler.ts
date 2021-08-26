import './styles/main.sass'
import * as components from './components'
import * as directives from './directives'
import * as framework from './framework'

export const createVuetify = (options: framework.VuetifyOptions = {}) => {
  return framework.createVuetify({ components, directives, ...options })
}

export const version = __VUETIFY_VERSION__

export {
  components,
  directives,
}
