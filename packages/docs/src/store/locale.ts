// Utilities
import { defineStore } from 'pinia'

// Globals
import { IN_BROWSER } from '@/util/globals'

// Types
export type RootState = {
  locale: string
}

export const useLocaleStore = defineStore({
  id: 'locale',
  state: () => ({
    locale: (IN_BROWSER && window.localStorage.getItem('currentLocale')) || 'en',
  } as RootState),
})
