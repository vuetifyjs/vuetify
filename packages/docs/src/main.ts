// Styles
import './main.scss'
import 'prism-theme-vars/base.css'

// Plugins
import * as Swetrix from 'swetrix'
import * as Sentry from '@sentry/vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory, START_LOCATION } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import { installVuetify } from '@/plugins/vuetify'
import { installPinia, pinia } from '@/plugins/pinia'
import { installGlobalComponents } from '@/plugins/global-components'
import { installOne } from '@/plugins/one'
import { installI18n } from '@/plugins/i18n'
import { useLocaleStore } from '@/stores/locale'
import { installPwa } from '@/plugins/pwa'
import { useUserStore } from '@vuetify/one'

// App
import App from './App.vue'

// Virtual
// import 'virtual:api'
import { setupLayouts } from 'virtual:generated-layouts'

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

const localeStore = useLocaleStore(pinia)
const userStore = useUserStore(pinia)

const app = createApp(App)

if (IN_BROWSER) {
  window.localStorage.setItem(
    'userSessions',
    String(Number(window.localStorage.getItem('userSessions') || 0) + 1)
  )
  localeStore.$subscribe((_, state) => {
    window.localStorage.setItem('currentLocale', state.locale)
  })
  userStore.$subscribe(() => {
    userStore.save()
  })
  Swetrix.init('ZMrLolxUmS0l', {
    apiURL: 'https://swetrix-api.vuetifyjs.com/log',
  })
  Swetrix.trackViews()
  Sentry.init({
    app,
    dsn: 'https://491ef7e8180648c488b1fcc158eb9ecc@glitchtip.vuetifyjs.com/1',
    release: import.meta.env.VITE_GITHUB_SHA,
    environment: import.meta.env.VITE_GITHUB_REF,
    enabled: import.meta.env.VITE_GITHUB_SHA,

    sampleRate: 1,
    integrations: integrations => {
      return integrations.filter(
        integration => integration.name !== 'BrowserSession',
      )
    },
  })
}

const waitForElementStable = (selector: string, maxWaitMs = 3000): Promise<boolean> => {
  return new Promise<boolean>(resolve => {
    const startTime = performance.now()
    let lastTop: number | null = null
    let stableFrames = 0
    let userAborted = false

    // Listen for user events to abort the automatic scroll
    const abortEvents = ['wheel', 'touchmove', 'keydown']
    const onUserInteraction = () => {
      userAborted = true
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      cleanup()
      // Return false to cancel the scrollIntoView
      resolve(false)
    }

    const cleanup = () => {
      abortEvents.forEach(e => window.removeEventListener(e, onUserInteraction, { capture: true }))
    }

    // Register the listeners (once: true so they clean up automatically when triggered)
    abortEvents.forEach(e => window.addEventListener(e, onUserInteraction, { capture: true, once: true, passive: true }))

    const checkFrame = (currentTime: number) => {
      // If the user moved, stop the loop immediately
      if (userAborted) return

      // abort if we exceed 3 seconds (bounded)
      if (currentTime - startTime > maxWaitMs) {
        cleanup()
        return resolve(false)
      }

      // avoid CSS selector issues by only allowing ID selectors
      const el = document.getElementById(selector.slice(1))
      if (el) {
        const currentTop = el.getBoundingClientRect().top
        // Check if the Y position is identical to the previous frame
        if (lastTop === currentTop) {
          stableFrames++
          // If it has been stable for 3 consecutive frames, consider it "position stable"
          if (stableFrames >= 3) {
            cleanup()
            return resolve(true)
          }
        } else {
          // If it has moved, reset the counter
          stableFrames = 0
          lastTop = currentTop
        }
      }

      // next frame
      requestAnimationFrame(checkFrame)
    }

    requestAnimationFrame(checkFrame)
  })
}

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
    // 1: Table of Contents (TOC) rewrites should never scroll: Toc.vue will scroll.
    if (to.path === from.path && to.hash !== from.hash) return false

    // 2: Initial load
    if (from === START_LOCATION) {
      if (to.hash) {
        // We do the rAF poll limited to 3s
        const isStable = await waitForElementStable(to.hash, 3000)

        if (isStable) {
          // avoid CSS selector issues by only allowing ID selectors
          const el = document.getElementById(to.hash.slice(1))
          if (el) {
            // manual scroll with "instant" (without behavior: smooth) because the user just entered the page
            // vue-router's scrollBehavior uses scrollTo that does no respect scroll-margin-top CSS rule
            el.scrollIntoView({ behavior: 'instant' })
            return false
          }
        }
      }
      return { top: 0 }
    }

    // 3: Standard navigation crossing pages
    let wait = 0
    if (to.path !== from.path && to.hash) {
      wait = 500
    }

    if (wait > 0) {
      await (new Promise(resolve => setTimeout(resolve, wait)))
    }

    if (to.hash) {
      // avoid CSS selector issues by only allowing ID selectors
      const el = document.getElementById(to.hash.slice(1))
      // manual scroll with "instant/smooth"
      // vue-router's scrollBehavior uses scrollTo that does no respect scroll-margin-top CSS rule
      if (el) {
        // 3.1: Keep 'smooth' ONLY for explicit clicks (onClick) in the TOC
        // If the user does not want animations, or the jump is greater than 500 pixels, instant.
        const isReduced =
          window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
          Math.abs(el.getBoundingClientRect().top) > 500

        el.scrollIntoView({ behavior: isReduced ? 'instant' : 'smooth' })
        return false
      }

      return { el: to.hash }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

app.use(createHead())
app.use(router)

app.config.errorHandler = (err, vm, info) => {
  console.error(err, vm, info)
  Swetrix.trackError({
    name: (err as any).name,
    message: (err as any).message,
    lineno: null,
    colno: null,
    filename: null,
  })
}
app.config.warnHandler = (err, vm, info) => {
  console.warn(err, vm, info)
}

router.beforeEach((to, from) => {
  if (to.meta.locale !== from.meta.locale) {
    localeStore.locale = to.meta.locale as string
  }
  if (!to.path.endsWith('/')) return `${trailingSlash(to.path)}` + to.hash
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
      Swetrix.trackError({
        name: err.name,
        message: err.message,
        lineno: null,
        colno: null,
        filename: null,
      })
    }
  } else {
    console.error(err)
    Swetrix.trackError({
      name: err?.name,
      message: err?.message,
      lineno: null,
      colno: null,
      filename: null,
    })
  }
})

installGlobalComponents(app)
installI18n(app)
installPwa(router)
installPinia(app, router)
installVuetify(app)
installOne(app)

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
  app.mount('#app')
})
