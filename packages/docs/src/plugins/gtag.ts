// Imports
import type { App } from 'vue'
import VueGtag from 'vue-gtag-next'

export const useGtag = ({ app }: { app: App<Element> }) => {
  app.use(VueGtag, {
    property: { id: 'UA-75262397-11' },
  })
}
