// Imports
import { createGtag, event } from 'vue-gtag'

// Types
import type { App } from 'vue'
import type { Router } from 'vue-router'

export function installGtag (app: App, router: Router) {
  if (!IN_BROWSER) return

  const gtag = createGtag({
    tagId: 'UA-75262397-11',
    pageTracker: { router },
  })

  app.use(gtag)
}

export function useGtag () {
  return {
    event: (eventName: string, params: Record<string, any>) => {
      event(eventName, params)
    },
  }
}
