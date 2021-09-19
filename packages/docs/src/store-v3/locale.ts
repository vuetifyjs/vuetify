import { defineStore } from 'pinia'

export type RootState = {
  locale: string
}

export const useLocaleStore = defineStore({
  id: 'locale',
  state: () => ({
    locale: window.localStorage.getItem('currentLocale') ?? 'en',
  } as RootState),
})
