// Types
import type { Router } from 'vue-router'

export async function installPwa (router: Router) {
  await router.isReady()

  let pendingUpdate = false
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', async () => {
      pendingUpdate = true
    })
  }

  router.beforeEach(async (to, from) => {
    if (to.path !== from.path) {
      if (pendingUpdate) {
        console.log('Reloading page to update service worker')
        window.location.pathname = to.fullPath
      }

      navigator.serviceWorker?.getRegistration().then(reg => {
        reg?.update()
      })
    }
  })
}
