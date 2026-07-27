import eachLimit from 'async-es/eachLimit'

type ManifestEntry = { url: string, revision?: string }
type Manifest = ManifestEntry[]

export async function openCache (name: string) {
  return caches.open(`${name}-${location.origin}`)
}

export async function cacheManifestEntries (
  manifest: Manifest,
  progress?: (value: number, total: number) => void
) {
  const cache = await openCache('precache')
  let count = 0
  const total = manifest.length
  await eachLimit(manifest, 8, async ({ url, revision }: ManifestEntry) => {
    let response
    try {
      const _url = new URL(url, location.origin)
      if (revision) {
        _url.searchParams.set('WB_REVISION', revision)
      }
      response = ensureCacheableResponse(await fetch(_url))
    } catch (err: any) {
      console.warn(`[SW] Failed to cache ${url}`, err.message)
      return
    }
    if (response.status === 200) {
      await cache.put(url, response)
    } else {
      console.warn(`[SW] Failed to cache ${url}`, response.status, response.statusText)
    }
    progress?.(++count, total)
  })
  console.log('[SW] Precached', total, 'files')
}

export async function cleanCache (previousManifest: Manifest) {
  if (!previousManifest) return

  const precache = await openCache('precache')

  const responses = await Promise.all(
    previousManifest.map(entry => precache.match(entry.url))
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

export function messageSW (sw: ServiceWorker, data: {}): Promise<any> {
  return new Promise(resolve => {
    const messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event: MessageEvent) => {
      resolve(event.data)
    }
    sw.postMessage(data, [messageChannel.port2])
  })
}
