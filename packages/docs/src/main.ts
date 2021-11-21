import { ViteSSG } from 'vite-ssg'
// import 'virtual:api'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

// plugins
import { useI18n } from './plugins-v3/i18n'
// import { usePwa } from './plugins-v3/pwa'
import { usePinia, pinia } from './plugins-v3/pinia'
import { useVuetify } from './plugins-v3/vuetify'
import { useLocaleStore } from './store-v3/locale'

// styles
import 'prism-theme-vars/base.css'
import { useUserStore } from './store-v3/user'
import { useGlobalComponents } from './plugins-v3/global-components'

const routes = setupLayouts(generatedRoutes)

const localeStore = useLocaleStore(pinia)
const userStore = useUserStore(pinia)

localeStore.$subscribe((_, state) => {
  console.log('updating locale storage', state.locale)
  window.localStorage.setItem('currentLocale', state.locale)
})

userStore.$subscribe((_, state) => {
  console.log('updating user store', state)
  window.localStorage.setItem('vuetify@user', JSON.stringify(state))
})

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: [
      {
        path: '/',
        redirect: () => {
          return { path: `/${localeStore.locale}` }
        },
      },
      ...routes,
    ],
  },
  ctx => {
    useGlobalComponents(ctx)
    useI18n(ctx)
    // usePwa(ctx)
    usePinia(ctx)
    useVuetify(ctx)
  },
)
