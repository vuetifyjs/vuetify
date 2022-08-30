// Imports
import type { App } from 'vue'
import VueGtag from 'vue-gtag-next'

export const useGtag = ({ app }: { app: App<Element> }) => {
  // vue-gtag-next doesn't support esm properly
  const install = VueGtag.install ?? (VueGtag as any).default.install
  app.use(install, {
    property: { id: 'UA-75262397-11' },
  })
}
