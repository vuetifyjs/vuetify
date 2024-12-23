export const usePwaStore = defineStore('pwa', () => {
  const isOffline = ref(!navigator.onLine)
  const isUpdating = ref(false)
  const nextManifest = ref()
  const pendingUpdate = ref(false)
  const prevManifest = ref()
  const progress = ref(0)
  const progressTotal = ref(0)

  window.addEventListener('online', () => isOffline.value = false)
  window.addEventListener('offline', () => isOffline.value = true)

  const _availableOffline = ref(localStorage.getItem('vuetify:availableOffline') === 'true')
  const availableOffline = computed({
    get: () => _availableOffline.value,
    set: val => {
      _availableOffline.value = val
      localStorage.setItem('vuetify:availableOffline', String(val))
      if (val) {
        registerWorker()
      } else {
        removeWorker()
      }
    },
  })

  function registerWorker () {
    navigator.serviceWorker.addEventListener('message', e => {
      if (e.data?.type === 'PROGRESS') {
        isUpdating.value = true
        progress.value = e.data.value
        progressTotal.value = e.data.total
      }
    })
    navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    })
  }

  async function removeWorker () {
    const registration = await navigator.serviceWorker.getRegistration()
    await window.caches.delete(`precache-${location.origin}`)
    await window.caches.delete(`runtime-${location.origin}`)
    if (await registration?.unregister()) {
      window.location.reload()
    }
  }

  return {
    availableOffline,
    isOffline,
    isUpdating,
    nextManifest,
    pendingUpdate,
    prevManifest,
    progress,
    progressTotal,
    registerWorker,
    removeWorker,
  }
})
