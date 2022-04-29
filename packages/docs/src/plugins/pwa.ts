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
    onNeedRefresh () {
      if (user.pwaRefresh) pwa.snackbar = true
    },
  })

  router.afterEach(async (to, from) => {
    if (to.path !== from.path) {
      updateSW(true)
    }
  })
}
