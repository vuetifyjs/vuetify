// Imports
import { createI18n } from 'vue-i18n'

// Types
import type { I18nPlugin } from '@/types'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob('../i18n/messages/*.json', { eager: true }))
    .map(([key, value]) => {
      return [key.slice(key.lastIndexOf('/') + 1, -5), (value as any).default]
    }),
)

export const useI18n: I18nPlugin = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
  })

  app.use(i18n)
}
