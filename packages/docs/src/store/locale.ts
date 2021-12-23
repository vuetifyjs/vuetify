import { defineStore } from 'pinia'
import { IN_BROWSER } from '@/util/globals'

export type RootState = {
  locale: string
}

export const useLocaleStore = defineStore({
  id: 'locale',
  state: () => ({
    locale: (IN_BROWSER && window.localStorage.getItem('currentLocale')) || 'en',
  } as RootState),
})
