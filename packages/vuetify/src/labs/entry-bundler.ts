/* eslint-disable local-rules/sort-imports */

// Components
import * as components from './allComponents'
import * as directives from '@/directives'
import { createVuetify as _createVuetify } from '@/framework'

// Types
import type { VuetifyOptions } from '@/framework'

export * from '@/entry-bundler'
export { components }

export const createVuetify = (options: VuetifyOptions = {}) => {
  return _createVuetify({ components, directives, ...options })
}
