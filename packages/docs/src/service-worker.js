// Imports
import { matchPrecache, precacheAndRoute } from 'workbox-precaching'
import { registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing'
import { CacheFirst, NetworkOnly } from 'workbox-strategies'

const MANIFEST = self.__WB_MANIFEST

precacheAndRoute(MANIFEST)

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

self.addEventListener('message', async event => {
  if (event.data?.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting')
    self.skipWaiting()
  } else if (event.data?.type === 'CLEAN_CACHE') {
    const precache = await openCache('precache')

    const responses = await Promise.all(
      MANIFEST.map(entry => precache.match(entry.url + (entry.revision ? `?__WB_REVISION__=${entry.revision}` : '')))
    )

    // Date of earliest entry in the old manifest
    const date = Array.from(
      new Set(responses.map(getDate))
    ).sort()[0]

    let n = 0
    for (const cache of [precache, await openCache('runtime')]) {
      for (const req of await cache.keys()) {
        const res = await cache.match(req)
        if (res && getDate(res) < date) {
          ++n
          await cache.delete(req)
        }
      }
    }
    console.log(`[SW] Cleared ${n} old items from cache`)
  } else console.log(event)
})

function getFallbackDocument (url) {
  return matchPrecache(url.pathname.startsWith('/eo-UY/') ? '_crowdin.html' : '/_fallback.html')
}

async function openCache (name) {
  const precache = (await caches.keys()).find(k => k.includes(self.registration.scope) && k.includes(`-${name}-`))

  if (!precache) return

  return caches.open(precache)
}

function getDate (response) {
  const date = new Date(Object.fromEntries(response.headers).date)
  date.setMinutes(0, 0, 0)
  return date.getTime()
}
