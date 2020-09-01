// Utilities
import { ROOT_DISPATCH } from '@/store'
import { IN_BROWSER } from '@/util/globals'

const pwa = store => {
  if (!IN_BROWSER) return

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    store.dispatch('pwa/setInstallPrompt', e, ROOT_DISPATCH)
    store.dispatch('pwa/setCanInstall', true, ROOT_DISPATCH)
  })

  document.addEventListener('swUpdated', e => {
    store.dispatch('pwa/setUpdateAvailable', true, ROOT_DISPATCH)
    store.dispatch('pwa/setUpdateDetail', e.detail, ROOT_DISPATCH)
  })
}

export default pwa
