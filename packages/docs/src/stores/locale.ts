// Types
type RootState = {
  locale: string
}

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: preferredLocale(),
  } as RootState),
})
