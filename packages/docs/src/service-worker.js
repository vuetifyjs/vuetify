// Imports
import { matchPrecache, precacheAndRoute } from 'workbox-precaching'
import { registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing'
import { NetworkOnly } from 'workbox-strategies'

precacheAndRoute(self.__WB_MANIFEST)

const networkOnly = new NetworkOnly()

registerRoute(
  ({ url, request }) => url.origin === self.location.origin && request.destination === 'document',
  async options => {
    const { url } = options
    const fallback = await getFallbackDocument(url)
    if (fallback) {
      console.log(`[SW] serving fallback for ${url.pathname}`)
    }

    return fallback ?? networkOnly.handle(options)
  }
)

setDefaultHandler(networkOnly)

setCatchHandler(async ({ url, request }) => {
  if (
    url.origin === self.location.origin &&
    request.destination === 'document'
  ) {
    return getFallbackDocument(url)
  }

  return Response.error()
})

self.addEventListener('message', event => {
  if (event.data === 'sw:update') self.skipWaiting()
})

function getFallbackDocument (url) {
  return matchPrecache(url.pathname.startsWith('/eo-UY/') ? '_crowdin.html' : '/_fallback.html')
}
