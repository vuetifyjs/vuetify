import { defineAsyncComponent } from 'vue'

// Types
import type { App } from 'vue'

export function installGlobalComponents (app: App) {
  app
    .component('AppMarkdown', defineAsyncComponent(() => import('@/components/app/Markdown.vue')))
}
