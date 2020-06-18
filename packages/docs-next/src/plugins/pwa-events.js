// Utilities
import { ROOT_DISPATCH } from '@/store'

const pwa = store => {
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
