// eslint-disable local-rules/sort-imports

// undefined
import * as components from './allComponents'

// Directives
import * as directives from '@/directives'

// undefined
import { createVuetify as _createVuetify } from '@/framework'

// Types
import type { VuetifyOptions } from '@/framework'

export * from '@/entry-bundler'
export { components }

export const createVuetify = (options: VuetifyOptions = {}) => {
  return _createVuetify({ components, directives, ...options })
}
