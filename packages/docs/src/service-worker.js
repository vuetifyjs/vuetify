import {
  ensureCacheableResponse,
  getCacheKeyForUrl,
  openCache,
} from '@/utils/pwa'

const MANIFEST = self.__WB_MANIFEST

self.addEventListener('message', async event => {
  if (event.data === 'sw:update' || event.data?.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting')
    self.skipWaiting()
  } else if (event.data?.type === 'GET_MANIFEST') {
    console.log('[SW] Sending manifest')
    event.ports[0].postMessage(MANIFEST)
  } else {
    console.log('[SW] Unknown message', event.data)
  }

  event.ports[0].postMessage({ type: 'DONE' })
})

self.addEventListener('install', () => {
  console.log('[SW] Installed')
  self.skipWaiting()
})

let hasModernCache = false
self.addEventListener('activate', event => {
  console.log('[SW] Activated')
  event.waitUntil((async () => {
    hasModernCache = await caches.has(`precache-${location.origin}`)
    if (hasModernCache) {
      await removeWorkboxCaches()
      await self.clients.claim()
    }
  })())
})

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url, location.href)

  if (!['http:', 'https:'].includes(url.protocol)) return

  if (event.request.method !== 'GET') return

  if (
    event.request.mode === 'navigate' &&
    event.request.destination === 'document' &&
    url.origin === self.location.origin
  ) {
    return event.respondWith(getFallbackDocument())
  }

  if (['https://tag.researchnow.com', 'https://srv.carbonads.net', 'https://pixel.adsafeprotected.com', 'https://cdn4.buysellads.net', 'https://ad.doubleclick.net'].includes(url.origin)) {
    return
  }

  if (getCacheKeyForUrl(url.href)) {
    return event.respondWith(matchPrecache(event.request))
  }

  if (event.request.destination !== 'document') {
    return event.respondWith(networkFirst(event.request))
  }
})

async function matchPrecache (request) {
  const precache = await openCache('precache')
  const matched = await precache.match(getCacheKeyForUrl(request.url))
  if (matched) return matched
  const response = fetch(request)
  const cacheKey = getCacheKeyForUrl(request.url)
  if (cacheKey) {
    response.then(response => {
      response = ensureCacheableResponse(response)
      if (response.status === 200) {
        precache.put(cacheKey, response.clone())
      } else {
        console.error(`[SW] Failed to fetch missing precached asset ${request.url}`)
      }
    })
  }
  return response
}

async function networkFirst (request) {
  const cache = await openCache('runtime')
  const fromNetwork = fetch(request).then(response => ensureCacheableResponse(response)).catch(() => null)
  const race = Promise.race([
    fromNetwork,
    new Promise(resolve => setTimeout(() => resolve('timeout'), 3000)),
  ])

  try {
    const response = await race
    if (response === 'timeout' || !response) {
      const cached = await caches.match(request)
      if (cached) return cached
      throw new Error('Network timeout and no cache available')
    }
    const is400 = response?.status >= 400 && response?.status < 500
    if (response?.status === 200) {
      cache.put(request, response.clone())
    } else if (!is400) {
      await cache.delete(request)
    }
    return response
  } catch (e) {
    console.warn('[SW] Failed to fetch', e)
    const cached = await caches.match(request)
    return cached || Response.error()
  }
}

async function getFallbackDocument () {
  const precache = await openCache('precache')

  const response = await fetch('/_fallback.html')
    .then(ensureCacheableResponse)
    .catch(() => {
      console.warn('[SW] Failed to fetch fallback document')
    })

  if (response?.status === 200) {
    await precache.put('/_fallback.html', response.clone())
    return response
  }

  return precache.match('/_fallback.html')
}

function removeWorkboxCaches () {
  return caches.keys().then(keys => {
    keys = keys.filter(key => key.startsWith('workbox-') || key.endsWith(self.registration.scope))
    if (keys.length) {
      console.log('[SW] Removing workbox caches')
      return Promise.all(
        keys.map(key => caches.delete(key))
      )
    }
  })
}
