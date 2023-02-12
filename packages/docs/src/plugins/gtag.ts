// Imports
import VueGtag, { trackRouter } from 'vue-gtag-next'

// Types
import type { ViteSSGContext } from '@vuetify/vite-ssg'

export const useGtag = (ctx: ViteSSGContext) => {
  // vue-gtag-next doesn't support esm properly
  const install = VueGtag.install ?? (VueGtag as any).default.install
  ctx.app.use(install, {
    property: { id: 'UA-75262397-11' },
  })

  trackRouter(ctx.router)
}
