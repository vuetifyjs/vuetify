// Imports
import { cleanupOutdatedCaches, matchPrecache, precacheAndRoute } from 'workbox-precaching'
import { registerRoute, setCatchHandler, setDefaultHandler } from 'workbox-routing'
import { NetworkFirst, NetworkOnly } from 'workbox-strategies'

const MANIFEST = self.__WB_MANIFEST

cleanupOutdatedCaches()
precacheAndRoute(MANIFEST)

const networkOnly = new NetworkOnly()
const networkFirst = new NetworkFirst()

registerRoute(
  ({ url }) => ['https://tag.researchnow.com', 'https://srv.carbonads.net', 'https://pixel.adsafeprotected.com', 'https://cdn4.buysellads.net', 'https://ad.doubleclick.net'].includes(url.origin),
  networkOnly
)

registerRoute(
  ({ request }) => request.destination !== 'document',
  networkFirst
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

setDefaultHandler(networkFirst)

setCatchHandler(async ({ url, request }) => {
  if (
    url.origin === self.location.origin &&
    request.destination === 'document'
  ) {
    return getFallbackDocument(url)
  }

  return Response.error()
})

let previousManifest
self.addEventListener('message', async event => {
  if (event.data === 'sw:update' || event.data?.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting')
    self.skipWaiting()
  } else if (event.data?.type === 'GET_MANIFEST') {
    event.ports[0].postMessage(MANIFEST)
  } else if (event.data?.type === 'SET_MANIFEST') {
    previousManifest = event.data.manifest
  } else if (event.data?.type === 'CLEAN_CACHE') {
    await cleanCache(event.data.manifest)
  } else console.log(event)

  event.ports[0].postMessage({ type: 'DONE' })
})

self.addEventListener('activate', event => {
  previousManifest && event.waitUntil(cleanCache(previousManifest))
  event.waitUntil(self.clients.claim())
})

function getFallbackDocument (url) {
  return matchPrecache(url.pathname.startsWith('/eo-UY/') ? '_crowdin.html' : '/_fallback.html')
}

async function cleanCache (manifest) {
  const precache = await openCache('precache')

  const responses = await Promise.all(
    manifest.map(entry => precache.match(entry.url + (entry.revision ? `?__WB_REVISION__=${entry.revision}` : '')))
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
