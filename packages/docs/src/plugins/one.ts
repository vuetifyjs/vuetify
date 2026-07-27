// Styles
import '@vuetify/one/styles'

// Types
import type { App } from 'vue'

export function installOne (app: App) {
  return app.use(createOne())
}
