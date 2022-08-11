import { ViteSSG } from '@vuetify/vite-ssg'
// import 'virtual:api'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'

// plugins
import { useGtag } from './plugins/gtag'
import { useI18n } from './plugins/i18n'
import { usePwa } from './plugins/pwa'
import { pinia, usePinia } from './plugins/pinia'
import { useVuetify } from './plugins/vuetify'
import { useLocaleStore } from './store/locale'

// styles
import 'prism-theme-vars/base.css'
import { useUserStore } from './store/user'
import { useGlobalComponents } from './plugins/global-components'
import { fallbackLocale, generatedRoutes, rpath, trailingSlash } from '@/util/routes'

const routes = setupLayouts(generatedRoutes)

const localeStore = useLocaleStore(pinia)
const userStore = useUserStore(pinia)

localeStore.$subscribe((_, state) => {
  console.log('updating locale storage', state.locale)
  window.localStorage.setItem('currentLocale', state.locale)
})

userStore.$subscribe((_, state) => {
  console.log('updating user store', state)
  userStore.save()
})

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: [
      {
        path: '/',
        redirect: () => {
          return { path: `/${localeStore.locale}/` }
        },
      },
      ...routes,
      {
        path: `/:locale(${fallbackLocale})/:pathMatch(.*)*`,
        component: () => import('@/layouts/404.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: to => {
          return rpath(to.fullPath)
        },
      },
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) return savedPosition
      if (to.hash) return { el: to.hash }
      else return { top: 0 }
    },
  },
  ctx => {
    ctx.app.config.errorHandler = (err, vm, info) => {
      console.error(err, vm, info)
    }
    ctx.app.config.warnHandler = (err, vm, info) => {
      console.warn(err, vm, info)
    }

    ctx.router.beforeEach(({ path, hash }, from, next) => {
      return path.endsWith('/') ? next() : next(`${trailingSlash(path)}` + hash)
    })
    ctx.router.onError(err => {
      console.error(err)
    })

    useGlobalComponents(ctx)
    useGtag(ctx)
    useI18n(ctx)
    usePwa(ctx)
    usePinia(ctx)
    useVuetify(ctx)
  },
)
