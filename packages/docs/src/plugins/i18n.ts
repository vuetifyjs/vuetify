// Imports
import { createI18n } from 'vue-i18n'
import { useLocaleStore } from '@/store/locale'

// Types
import type { ViteSSGContext } from '@vuetify/vite-ssg'
import { watch } from 'vue'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob('../i18n/messages/*.json', { eager: true }))
    .map(([key, value]) => {
      return [key.slice(key.lastIndexOf('/') + 1, -5), (value as any).default]
    }),
)

export function installI18n ({ app }: ViteSSGContext) {
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
