// Imports
import VueGtag, { trackRouter } from 'vue-gtag-next'

// Types
import type { App } from 'vue'
import type { Router } from 'vue-router'

export function installGtag (app: App, router: Router) {
  if (!IN_BROWSER) return

  // vue-gtag-next doesn't support esm properly
  const install = VueGtag.install ?? (VueGtag as any).default.install
  app.use(install, {
    property: { id: 'UA-75262397-11' },
  })

  trackRouter(router)
}
