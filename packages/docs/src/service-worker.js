import eachLimit from 'async-es/eachLimit'

const MANIFEST = self.__WB_MANIFEST

let previousManifest
self.addEventListener('message', async event => {
  if (event.data === 'sw:update' || event.data?.type === 'SKIP_WAITING') {
    console.log('[SW] Skip waiting')
    self.skipWaiting()
  } else if (event.data?.type === 'GET_MANIFEST') {
    console.log('[SW] Sending manifest')
    event.ports[0].postMessage(MANIFEST)
  } else if (event.data?.type === 'SET_MANIFEST') {
    console.log('[SW] Recieved manifest')
    previousManifest = event.data.manifest
  } else {
    console.log('[SW] Unknown message', event.data)
  }

  event.ports[0].postMessage({ type: 'DONE' })
})

self.addEventListener('install', event => {
  console.log('[SW] Installed')
  event.waitUntil((async () => {
    if (self.registration.active) {
      await Promise.race([
        new Promise(resolve => setTimeout(resolve, 500)),
        messageSW(self.registration.active, { type: 'GET_MANIFEST' })
          .then(manifest => {
            previousManifest = manifest
            console.log('[SW] Recieved manifest')
          }),
      ])
    }
    self.skipWaiting()
  })())
})

let hasModernCache = false
self.addEventListener('activate', event => {
  console.log('[SW] Activated')
  event.waitUntil((async () => {
    hasModernCache = await caches.has(`precache-${self.registration.scope}`)
    if (hasModernCache) {
      await removeWorkboxCaches()
      await self.clients.claim()
    }
    await cacheManifestEntries(MANIFEST)
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
      }
    })
  }
  return response
}

const urlsToCacheKeys = new Map()
function getCacheKeyForUrl (url) {
  url = createCacheKey(url).url

  return urlsToCacheKeys.get(url)
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

  const cacheKey = getCacheKeyForUrl('/_fallback.html')
  const request = fetch('/_fallback.html')
  if (cacheKey) {
    request.then(response => {
      response = ensureCacheableResponse(response)
      if (response.status === 200) {
        precache.put(cacheKey, response.clone())
      }
    })
  }
  request.catch(() => {
    console.warn('[SW] Failed to fetch fallback document')
  })

  const fallback = await precache.match(cacheKey)

  if (!fallback) {
    return request.then(ensureCacheableResponse)
  }

  return fallback
}

async function cleanCache () {
  if (!previousManifest) return

  const precache = await openCache('precache')

  const responses = await Promise.all(
    previousManifest.map(entry => precache.match(createCacheKey(entry).cacheKey))
  )

  // Date of earliest entry in the old manifest
  const date = Array.from(
    new Set(responses.filter(v => v).map(getDate))
  ).reduce((acc, val) => Math.min(acc, val), Date.now())

  console.log('[SW] Cleaning caches before', new Date(date))

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
  return caches.open(`${name}-${self.registration.scope}`)
}

function getDate (response) {
  const date = new Date(Object.fromEntries(response.headers).date)
  return date.getTime()
}

function createCacheKey (entry) {
  const { revision, url } = typeof entry === 'string'
    ? { url: entry }
    : entry

  const cacheKeyUrl = new URL(url, location.href)

  if (revision) {
    cacheKeyUrl.searchParams.set('__WB_REVISION__', revision)
  }

  return {
    cacheKey: cacheKeyUrl.href,
    url: cacheKeyUrl.href,
  }
}

function removeWorkboxCaches () {
  return caches.keys().then(keys => {
    keys = keys.filter(key => key.startsWith('workbox-'))
    if (keys.length) {
      console.log('[SW] Removing workbox caches')
      return Promise.all(
        keys.map(key => caches.delete(key))
      )
    }
  })
}

async function cacheManifestEntries (manifest) {
  for (const entry of manifest) {
    const cacheKey = createCacheKey(entry)
    urlsToCacheKeys.set(cacheKey.url, cacheKey.cacheKey)
  }
  const cache = await openCache('precache')
  await eachLimit(urlsToCacheKeys, 10, async ([url, cacheKey]) => {
    const response = ensureCacheableResponse(await fetch(url))
    if (response.status === 200) {
      await cache.put(cacheKey, response)
    } else {
      console.warn(`[SW] Failed to cache ${url}`, response.status, response.statusText)
    }
  })
  console.log('[SW] Precached', urlsToCacheKeys.size, 'files')
  if (previousManifest && hasModernCache) {
    await cleanCache()
    let count = 0
    for (const entry of previousManifest) {
      const cacheKey = createCacheKey(entry)
      if (!urlsToCacheKeys.has(cacheKey.url)) {
        count++
        urlsToCacheKeys.set(cacheKey.url, cacheKey.cacheKey)
      }
    }
    console.log('[SW] Reused', count, 'of', previousManifest.length, 'files')
  }
}

function messageSW (sw, data) {
  return new Promise(resolve => {
    const messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = event => {
      resolve(event.data)
    }
    sw.postMessage(data, [messageChannel.port2])
  })
}

function ensureCacheableResponse (response) {
  if (!response.redirected) return response

  if (!response.url || new URL(response.url).origin !== location.origin) {
    console.error('[SW] Uncacheable redirect', response.url, response)
    return Response.error()
  }

  const cloned = response.clone()
  return new Response(cloned.body, {
    headers: new Headers(cloned.headers),
    status: cloned.status,
    statusText: cloned.statusText,
  })
}
