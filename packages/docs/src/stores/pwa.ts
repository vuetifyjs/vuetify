import { cacheManifestEntries } from '@/utils/pwa'

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

  async function registerWorker () {
    const registration = await navigator.serviceWorker.register('/service-worker.js', {
      scope: '/',
    })
    registration.addEventListener('updatefound', async () => {
      const next = registration.installing
      nextManifest.value = next && await messageSW(next, { type: 'GET_MANIFEST' })
      console.log({ nextManifest: nextManifest.value })
      if (availableOffline.value) {
        updateCache()
      }
    })
    const prev = registration.active
    prevManifest.value = prev && await messageSW(prev, { type: 'GET_MANIFEST' })
    console.log({ prevManifest: prevManifest.value })
    if (localStorage.getItem('vuetify:cacheReady') !== 'true') {
      await updateCache()
    }
  }

  async function removeWorker () {
    const registration = await navigator.serviceWorker.getRegistration()
    if (await registration?.unregister()) {
      window.location.reload()
    }
  }

  async function updateCache () {
    localStorage.setItem('vuetify:cacheReady', 'false')
    isUpdating.value = true
    const next = nextManifest.value ?? prevManifest.value
    const prev = nextManifest.value ? prevManifest.value : undefined
    await cacheManifestEntries(next, prev, (value, total) => {
      progress.value = value
      progressTotal.value = total
    })
    isUpdating.value = false
    localStorage.setItem('vuetify:cacheReady', 'true')
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

function messageSW (sw: ServiceWorker, data: {}): Promise<any> {
  return new Promise(resolve => {
    const messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event: MessageEvent) => {
      resolve(event.data)
    }
    sw.postMessage(data, [messageChannel.port2])
  })
}
