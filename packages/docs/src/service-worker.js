// Imports
import { matchPrecache, precacheAndRoute } from 'workbox-precaching'
import { registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing'
import { CacheFirst, NetworkOnly } from 'workbox-strategies'

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    return Promise.all(
      (await caches.keys())
        .filter(k => k.includes(self.registration.scope) && (k.includes('-precache-') || k.includes('-runtime-')))
        .map(name => caches.delete(name))
    )
  })())
})
precacheAndRoute(self.__WB_MANIFEST)

const cacheFirst = new CacheFirst()
const networkOnly = new NetworkOnly()

registerRoute(
  ({ request }) => request.destination !== 'document',
  cacheFirst
)

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
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
  else console.log(event)
})

function getFallbackDocument (url) {
  return matchPrecache(url.pathname.startsWith('/eo-UY/') ? '_crowdin.html' : '/_fallback.html')
}
