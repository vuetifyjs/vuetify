import { defineStore } from 'pinia'

interface Sponsors {
  gold: String[]
  diamond: String[]
}

export type RootState = {
  byTier: Sponsors
}

export const useSponsorStore = defineStore({
  id: 'sponsors',
  state: () => ({
    byTier: {
      gold: ['Sponsor 1', 'Sponsor 2'],
      diamond: ['Sponsor 1', 'Sponsor 2'],
    },
  } as RootState),

})
