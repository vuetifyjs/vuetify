// Utilities
import { ROOT_DISPATCH } from '@/store'

const pwa = store => {
  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault()
    store.dispatch('app/setPwaInstallPrompt', e, ROOT_DISPATCH)
    store.dispatch('app/setPwaCanInstall', true, ROOT_DISPATCH)
  })

  document.addEventListener('swUpdated', e => {
    store.dispatch('app/setPwaUpdateAvailable', true, ROOT_DISPATCH)
    store.dispatch('app/setPwaUpdateDetail', e.detail, ROOT_DISPATCH)
  })
}

export default pwa
