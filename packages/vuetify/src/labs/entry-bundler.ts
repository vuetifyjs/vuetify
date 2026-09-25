// Components
import * as components from './allComponents'
import { createVuetify as _createVuetify } from '@/framework'

// Directives
import * as directives from '@/directives'

// Types
import type { VuetifyOptions } from '@/framework'

export * from '@/entry-bundler'
export { components }

export const createVuetify = (options: VuetifyOptions = {}) => {
  return _createVuetify({ components, directives, ...options })
}
