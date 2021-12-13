import { defineStore } from 'pinia'

export type RootState = {
  drawer: boolean
}

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    drawer: true,
    settings: false,
  } as RootState),
})
