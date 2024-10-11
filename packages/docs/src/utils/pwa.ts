import eachLimit from 'async-es/eachLimit'

type ManifestEntry = { url: string, revision?: string }
type Manifest = ManifestEntry[]

const urlsToCacheKeys = new Map<string, string>()
export function getCacheKeyForUrl (url: string) {
  url = createCacheKey(url).url

  return urlsToCacheKeys.get(url)
}

export async function openCache (name: string) {
  return caches.open(`${name}-${location.origin}`)
}

export async function cacheManifestEntries (
  manifest: Manifest,
  previousManifest: Manifest,
  progress?: (value: number, total: number) => void
) {
  for (const entry of manifest) {
    const cacheKey = createCacheKey(entry)
    urlsToCacheKeys.set(cacheKey.url, cacheKey.cacheKey)
  }
  const cache = await openCache('precache')
  let count = 0
  const total = urlsToCacheKeys.size
  await eachLimit(urlsToCacheKeys, 4, async ([url, cacheKey]: [string, string]) => {
    let response
    try {
      response = ensureCacheableResponse(await fetch(url))
    } catch (err: any) {
      console.warn(`[SW] Failed to cache ${url}`, err.message)
      return
    }
    if (response.status === 200) {
      await cache.put(cacheKey, response)
    } else {
      console.warn(`[SW] Failed to cache ${url}`, response.status, response.statusText)
    }
    progress?.(++count, total)
  })
  console.log('[SW] Precached', total, 'files')
  if (previousManifest) {
    await cleanCache(previousManifest)
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

async function cleanCache (previousManifest: Manifest) {
  if (!previousManifest) return

  const precache = await openCache('precache')

  const responses = await Promise.all(
    previousManifest.map(entry => precache.match(createCacheKey(entry).cacheKey))
  )

  // Date of earliest entry in the old manifest
  const date = Array.from(
    new Set(responses.filter(v => !!v).map(getDate))
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

function getDate (response: Response) {
  const date = new Date(Object.fromEntries(response.headers).date)
  return date.getTime()
}

export function ensureCacheableResponse (response: Response) {
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

export function createCacheKey (entry: string | ManifestEntry) {
  const { revision = null, url } = typeof entry === 'string'
    ? { url: entry }
    : entry

  const cacheKeyUrl = new URL(url, location.origin)

  if (revision) {
    cacheKeyUrl.searchParams.set('__WB_REVISION__', revision)
  }

  return {
    cacheKey: cacheKeyUrl.href,
    url: new URL(url, location.origin).href,
  }
}
