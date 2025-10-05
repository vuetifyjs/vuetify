// Types
import type { Router } from 'vue-router'

export async function installPwa (router: Router) {
  const store = usePwaStore()

  await router.isReady()

  router.beforeEach(async (to, from) => {
    if (to.path !== from.path) {
      if (store.pendingUpdate && !store.isUpdating) {
        console.log('Reloading page to update service worker')
        window.location.pathname = to.fullPath
      }

      navigator.serviceWorker?.getRegistration().then(reg => {
        reg?.update()
      })
    }
  })

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', async () => {
      console.log('controllerchange')
      store.isUpdating = false
      store.pendingUpdate = true
    })

    if (store.availableOffline) {
      store.registerWorker()
    } else if (localStorage.getItem('vuetify:availableOffline') == null) {
      store.removeWorker()
    }
  }
}
