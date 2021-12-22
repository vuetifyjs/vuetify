import type { PwaPlugin } from '@/types'

// https://github.com/antfu/vite-plugin-pwa#automatic-reload-when-new-content-available
export const usePwa: PwaPlugin = ({ isClient, router }) => {
  if (!isClient) {
    return
  }

  router.isReady().then(async () => {
    const { registerSW } = await import('virtual:pwa-register')
    registerSW({ immediate: true })
  })
}
