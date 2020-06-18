workbox.core.setCacheNameDetails({ prefix: 'docs-next' })

self.addEventListener('message', (event) => {
  if (!event.data) return

  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})

self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})
