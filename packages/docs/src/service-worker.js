import { precacheAndRoute, matchPrecache } from 'workbox-precaching'
import { setDefaultHandler } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST)

setDefaultHandler(({ url, request }) => {
  if (
    url.origin === self.location.origin &&
    request.destination === 'document'
  ) {
    return fetch(request).catch(() => matchPrecache('/_fallback.html'))
  }
})

self.addEventListener('message', event => {
  if (!event.data) return

  if (event.data === 'skipWaiting') {
    self.skipWaiting()
  }
})
