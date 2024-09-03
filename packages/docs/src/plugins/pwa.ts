// Types
import type { Router } from 'vue-router'

export async function installPwa (router: Router) {
  await router.isReady()

  console.info('Registering SW')

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      type: 'classic',
    }).then(r => {
      if (r?.active?.state === 'activated') {
        console.info('SW already Activated')
        registerPeriodicSync(r)
      } else if (r?.installing) {
        r.installing.addEventListener('statechange', e => {
          const sw = e.target as ServiceWorker
          if (sw.state === 'activated') {
            console.info('SW Installed and Activated')
            registerPeriodicSync(r)
          }
        })
      }
    })
  }

  /* router.beforeEach(async (to, from) => {
    if (to.path !== from.path) {
      if (pendingUpdate) {
        console.log('Reloading page to update service worker')
        window.location.pathname = to.fullPath
      }

      navigator.serviceWorker?.getRegistration().then(reg => {
        reg?.update()
      })
    }
  }) */
}

function registerPeriodicSync (r: ServiceWorkerRegistration) {
  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine) {
      return
    }

    const resp = await fetch('/sw.js', {
      cache: 'no-store',
      headers: {
        cache: 'no-store',
        'cache-control': 'no-cache',
      },
    })

    if (resp?.status === 200) {
      await r.update()
    }
  }, 60 * 60 * 1000)
}
