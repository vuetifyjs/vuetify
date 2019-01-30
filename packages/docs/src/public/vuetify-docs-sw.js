const CACHE = 'docs'
const assets = ['/']

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll(assets))
  )
})

self.addEventListener('fetch', function (event) {
  const response = fromCache(event.request) // try cache
    .then(response => response)
    .catch(() => fromServer(event.request) // try server
      .then(response => response).catch(() => fallback()) // generic fallback
    )
    // Only fetch if asset is from origin
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(response)
    event.waitUntil(update(event.request))
  }
})

function fromCache (request) {
  return new Promise((resolve, reject) => {
    caches.open(CACHE).then(cache => {
      cache.match(request)
        .then(matching => {
          if (matching) resolve(matching)
          else reject(matching, 'no-match')
        })
        .catch(e => reject(e, 'no-match'))
    })
  })
}

function fromServer (request) {
  return fetch(request)
}

function fallback () {
  // If both fail, show a generic fallback:
  return caches.match('/en-US/')
}

function update (request) {
  return caches.open(CACHE).then(cache =>
    fetch(request).then(response =>
      cache.put(request, response)
    )
  )
}
