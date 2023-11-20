// Composables
import { useCosmic } from '@/composables/cosmic'
import { useDate } from 'vuetify'

// Utilities
import { defineStore } from 'pinia'

// Types
interface Banner {
  status: 'published' | 'unpublished'
  modified_at: string
  slug: string
  title: string
  metadata: {
    active: boolean
    closable: boolean
    color: string
    label: string
    text: string
    subtext: string
    link: string
    link_text: string
    link_color: string
    attributes: Record<string, any>
    start_date: string
    end_date: string
    theme: {
      key: 'light' | 'dark'
      value: 'Light' | 'Dark'
    }
    images: {
      bg: {
        url: string
      }
      logo: {
        url: string
      }
    }
    visible: {
      key: 'home' | 'docs' | 'both' | 'server'
      value: 'home'
    }
  }
}

interface State {
  banners: Banner[]
  router: any
  server?: Banner
  banner?: Banner
}

export const useBannersStore = defineStore('banners', {
  state: (): State => ({
    banners: [],
    router: null,
  }),
  actions: {
    async fetch () {
      if (this.banners.length) return

      const { bucket } = useCosmic()

      const today = (new Date()).toISOString().substring(0, 10)

      try {
        const { objects = [] }: { objects: Banner[] } = (
          await bucket?.objects
            .find({
              type: 'banners',
              'metadata.start_date': {
                $lte: today,
              },
            })
            .props('status,metadata,slug,title,modified_at')
            .sort('metadata.start_date')
            .limit(3)
        ) || {}

        this.banners = objects
      } catch (e) {}
    },
  },
  getters: {
    banner (state) {
      const name = state.router.currentRoute.value.meta.page
      const date = useDate()

      if (this.server) return this.server

      return state.banners.find(({
        metadata: {
          visible,
          start_date: startDate,
          end_date: endDate,
          active,
        },
      }) => {
        const start = date.startOfDay(date.date(startDate))
        const end = date.endOfDay(date.date(endDate))
        const today = date.endOfDay(date.date())

        if (
          !active ||
          date.isBefore(today, start) ||
          date.isAfter(today, end)
        ) return false

        if (visible.key === 'both') return true
        // '' is home
        if (visible.key === 'home' && name === '') return true

        return visible.key === 'docs' && name !== 'home'
      })
    },
    server (state) {
      const date = useDate()

      return state.banners.find(({
        metadata: {
          visible,
          start_date: startDate,
          end_date: endDate,
          active,
        },
      }) => {
        const start = date.startOfDay(date.date(startDate))
        const end = date.endOfDay(date.date(endDate))
        const today = date.endOfDay(date.date())

        if (
          !active ||
          date.isBefore(today, start) ||
          date.isAfter(today, end)
        ) return false

        return visible.key === 'server'
      })
    },
  },
})
