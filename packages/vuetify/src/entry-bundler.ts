import './styles/main.sass'

import * as components from './components'
import * as directives from './directives'
import * as framework from './framework'

export * from './components'
export * from './framework'

export const createVuetify = (options: framework.VuetifyOptions = {}) => {
  return framework.createVuetify({ components, directives, ...options })
}
