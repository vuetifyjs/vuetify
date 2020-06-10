/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

import { loadFonts } from './webfontloader'
import { registerComponents } from './app'
import { useMeta } from './vue-meta'
import { useVuetify } from '@/vuetify'

export function registerPlugins (app) {
  registerComponents(app)
  loadFonts(app)
  useMeta(app)
  useVuetify(app)
}
