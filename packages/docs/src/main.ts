// Styles
import 'prism-theme-vars/base.css'

// App
import App from './App.vue'

// Virtual
// import 'virtual:api'
import { setupLayouts } from 'virtual:generated-layouts'

// Plugins
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue'
import { installPinia, pinia } from '@/plugins/pinia'
import { installGlobalComponents } from '@/plugins/global-components'
import { installGtag } from '@/plugins/gtag'
import { installOne } from '@/plugins/one'
import { installI18n } from '@/plugins/i18n'
import { useAppStore } from '@/stores/app'
import { useLocaleStore } from '@/stores/locale'
import { installPwa } from '@/plugins/pwa'
import { useUserStore } from '@vuetify/one'
import { installVuetify } from '@/plugins/vuetify'

// Utilities
import {
  disabledLanguagePattern,
  generatedRoutes,
  languagePattern,
  redirectRoutes,
  rpath,
  trailingSlash,
} from '@/utils/routes'
import { wrapInArray } from '@/utils/helpers'

// Globals
import { IN_BROWSER } from '@/utils/globals'

const routes = setupLayouts(generatedRoutes)

const appStore = useAppStore(pinia)
const localeStore = useLocaleStore(pinia)
const userStore = useUserStore(pinia)

if (IN_BROWSER) {
  localeStore.$subscribe((_, state) => {
    window.localStorage.setItem('currentLocale', state.locale)
  })
  userStore.$subscribe(() => {
    userStore.save()
  })
}

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: () => {
        return { path: `/${localeStore.locale}/` }
      },
    },
    ...routes,
    ...redirectRoutes,
    {
      path: `/:locale(${disabledLanguagePattern})/:pathMatch(.*)*`,
      redirect: to => {
        return rpath(wrapInArray(to.params.pathMatch).join('/'))
      },
    },
    {
      path: `/:locale(${languagePattern})/:pathMatch(.*)*`,
      component: () => import('@/layouts/404.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: to => {
        return rpath(to.fullPath)
      },
    },
  ],
  async scrollBehavior (to, from, savedPosition) {
    if (appStore.scrolling) return

    let main = IN_BROWSER && document.querySelector('main')
    // For default & hash navigation
    let wait = 0

    if (!main) {
      // For initial page load
      wait = 1500
      main = document.querySelector('main')
    } else if (to.path !== from.path && to.hash) {
      // For cross page navigation
      wait = 500
    }

    await (new Promise(resolve => setTimeout(resolve, wait)))

    if (to.hash) {
      return {
        el: to.hash,
        behavior: main ? 'smooth' : undefined,
        top: main ? parseInt(getComputedStyle(main).getPropertyValue('--v-layout-top')) : 0,
      }
    } else if (savedPosition) return savedPosition
    else return { top: 0 }
  },
})

app.use(createHead())
app.use(router)

app.config.errorHandler = (err, vm, info) => {
  console.error(err, vm, info)
}
app.config.warnHandler = (err, vm, info) => {
  console.warn(err, vm, info)
}

router.beforeEach((to, from, next) => {
  if (to.meta.locale !== from.meta.locale) {
    localeStore.locale = to.meta.locale as string
  }
  return to.path.endsWith('/') ? next() : next(`${trailingSlash(to.path)}` + to.hash)
})
router.afterEach((to, from) => {
  if (to.meta.locale !== from.meta.locale && from.meta.locale === 'eo-UY') {
    setTimeout(() => window.location.reload(), 100)
  }
})
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

installGlobalComponents(app)
installGtag(app, router)
installI18n(app)
installPwa(router)
installPinia(app, router)
installVuetify(app)
installOne(app)

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
  app.mount('#app')
})
