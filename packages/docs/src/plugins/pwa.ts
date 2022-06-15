import type { PwaPlugin } from '@/types'
import { usePwaStore } from '@/store/pwa'
import { useUserStore } from '@/store/user'

export const usePwa: PwaPlugin = async ({ isClient, router }) => {
  if (!isClient) return

  const { registerSW } = await import('virtual:pwa-register')

  await router.isReady()

  const pwa = usePwaStore()
  const user = useUserStore()
  const updateSW = pwa.updateSW = registerSW({
    async onNeedRefresh () {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration?.active && registration?.waiting) {
        await messageSW(registration.active, { type: 'CLEAN_CACHE' })
      }

      if (user.pwaRefresh) pwa.snackbar = true
    },
  })

  router.afterEach(async (to, from) => {
    if (to.path !== from.path) {
      updateSW(true)
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
