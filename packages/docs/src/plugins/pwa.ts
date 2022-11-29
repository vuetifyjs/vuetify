// Stores
import { usePwaStore } from '@/store/pwa'
import { useUserStore } from '@/store/user'

// Types
import type { PwaPlugin } from '@/types'

export const usePwa: PwaPlugin = async ({ isClient, router }) => {
  if (!isClient) return

  const { registerSW } = await import('virtual:pwa-register')

  await router.isReady()

  const pwa = usePwaStore()
  const user = useUserStore()
  pwa.updateSW = registerSW({
    async onNeedRefresh () {
      const registration = await navigator.serviceWorker?.getRegistration()
      if (registration?.active && registration?.waiting) {
        const manifest = await messageSW(registration.active, { type: 'GET_MANIFEST' })
        await messageSW(registration.waiting, { type: 'SET_MANIFEST', manifest })
      }

      if (user.pwaRefresh) pwa.snackbar = true
    },
  })

  let registration: ServiceWorkerRegistration | undefined
  router.beforeEach(async (to, from) => {
    if (to.path !== from.path) {
      navigator.serviceWorker?.getRegistration().then(reg => {
        registration = reg
        reg?.update()
      })

      if (!user.pwaRefresh && registration?.active && registration?.waiting) {
        pwa.loading = true
        const promise = new Promise<void>(resolve => {
          registration!.waiting?.addEventListener('statechange', e => {
            const sw = e.target as ServiceWorker
            console.log('SW state change:', sw.state)
            if (sw.state === 'activated') {
              window.location.pathname = to.fullPath
              resolve()
            } else if (sw.state === 'redundant') {
              resolve()
            }
          })
        })
        await messageSW(registration.waiting, { type: 'SKIP_WAITING' })
        await promise
      }
    }
  })
}

function messageSW (sw: ServiceWorker, data: {}): Promise<any> {
  return new Promise(resolve => {
    const messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event: MessageEvent) => {
      resolve(event.data)
    }
    sw.postMessage(data, [messageChannel.port2])
  })
}
