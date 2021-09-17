import { createI18n } from 'vue-i18n'
import type { i18nPlugin } from '@/types'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.globEager('../i18n-v3/*.json'))
    .map(([key, value]) => {
      return [key.slice(11, -5), value.default]
    }),
)

export const useI18n: i18nPlugin = ({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages,
  })

  app.use(i18n)
}
