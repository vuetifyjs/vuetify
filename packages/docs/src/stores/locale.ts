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
