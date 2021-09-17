import { ViteSSG } from 'vite-ssg'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

// plugins
import { useI18n } from './plugins-v3/i18n'
import { usePwa } from './plugins-v3/pwa'
import { usePinia } from './plugins-v3/pinia'
import { useVuetify } from './plugins-v3/vuetify'

// styles
import 'prism-theme-vars/base.css'

const routes = setupLayouts(generatedRoutes)

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  { routes },
  ctx => {
    useI18n(ctx)
    usePwa(ctx)
    usePinia(ctx)
    useVuetify(ctx)
  },
)
