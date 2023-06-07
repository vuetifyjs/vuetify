// Utilities
import { defineStore } from 'pinia'
import { preferredLocale } from '@/util/routes'

// Types
export type RootState = {
  locale: string
}

export const useLocaleStore = defineStore({
  id: 'locale',
  state: () => ({
    locale: preferredLocale(),
  } as RootState),
})
