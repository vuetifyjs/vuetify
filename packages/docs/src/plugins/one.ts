// Styles
import '@vuetify/one/styles'

// Plugins
import { createOne } from '@vuetify/one'

// Types
import type { App } from 'vue'

export function installOne (app: App) {
  const one = createOne()

  return app.use(one as any)
}
