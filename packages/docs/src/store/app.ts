import { defineStore } from 'pinia'

export type RootState = {
  drawer: boolean | null
}

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    drawer: null,
    settings: false,
  } as RootState),
})
