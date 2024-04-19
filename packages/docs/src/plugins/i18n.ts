// Imports
import { createI18n } from 'vue-i18n'

// Types
import type { App } from 'vue'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob('../i18n/messages/*.json', { eager: true }))
    .map(([key, value]) => {
      return [key.slice(key.lastIndexOf('/') + 1, -5), (value as any).default]
    }),
)

export function installI18n (app: App) {
  const localeStore = useLocaleStore()

  const i18n = createI18n({
    legacy: false,
    locale: localeStore.locale,
    messages,
  })

  watch(() => localeStore.locale, locale => {
    i18n.global.locale.value = locale
  })

  app.use(i18n)
}
