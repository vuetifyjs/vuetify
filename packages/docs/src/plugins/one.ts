import { install } from '@vuetify/one'

import type { App } from 'vue'

export function installOne (app: App) {
  app.use(install as any)
}
