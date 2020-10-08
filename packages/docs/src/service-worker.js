// Imports
import { precacheAndRoute, matchPrecache } from 'workbox-precaching'
import { setDefaultHandler } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST)

setDefaultHandler(({ url, request }) => {
  // Render as SPA on subsequent visits
  if (
    url.origin === self.location.origin &&
    request.destination === 'document'
  ) return matchPrecache(url.pathname.startsWith('/eo-UY/') ? '_crowdin.html' : '/_fallback.html')
})

self.addEventListener('message', event => {
  if (event.data === 'sw:update') self.skipWaiting()
})
