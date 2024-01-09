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
  isLoading: boolean
  router: any
  server?: Banner
  banner?: Banner
}

export const useBannersStore = defineStore('banners', {
  state: (): State => ({
    banners: [],
    isLoading: false,
    router: null,
  }),
  actions: {
    async fetch () {
      if (this.banners.length) return

      const { bucket } = useCosmic()

      const adapter = useDate()
      const today = adapter.startOfDay(adapter.date())
      const tomorrow = adapter.endOfDay(today)

      try {
        this.isLoading = true

        const { objects = [] }: { objects: Banner[] } = (
          await bucket?.objects
            .find({
              type: 'banners',
              'metadata.start_date': {
                $lte: today,
              },
              'metadata.end_date': {
                $gte: tomorrow,
              },
            })
            .props('status,metadata,slug,title,modified_at')
            .sort('metadata.start_date')
            .limit(3)
        ) || {}

        this.banners = objects
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
  },
  getters: {
    banner (state) {
      const name = state.router.currentRoute.value.meta.page

      if (this.server) return this.server

      return state.banners.find(({
        metadata: {
          visible,
          active,
        },
      }) => {
        if (!active) return false

        if (visible.key === 'both') return true
        // '' is home
        if (visible.key === 'home' && name === '') return true

        return visible.key === 'docs' && name !== 'home'
      })
    },
    server (state) {
      return state.banners.find(({
        metadata: {
          visible,
          active,
        },
      }) => {
        if (!active) return false

        return visible.key === 'server'
      })
    },
  },
})
