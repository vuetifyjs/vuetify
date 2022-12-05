// Composables
import { useCosmic } from '@/composables/cosmic'

// Utilities
import { defineStore } from 'pinia'

// Globals
import { IS_PROD } from '@/util/globals'

// Types
interface Banner {
  status: 'published' | 'unpublished'
  slug: string
  title: string
  metadata: {
    closable: boolean
    color: string
    label: string
    text: string
    subtext: string
    link: string
    link_text: string
    link_color: string
    attributes: Record<string, any>
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
      key: 'home' | 'docs' | 'both'
      value: 'home'
    }
  }
}

interface State {
  banners: Banner[]
  router: any
}

export const useBannersStore = defineStore('banners', {
  state: (): State => ({
    banners: [],
    router: null,
  }),
  actions: {
    async fetch () {
      if (this.banners.length) return

      const { bucket } = useCosmic<Banner>()

      const today = (new Date()).toISOString().substring(0, 10)

      try {
        const { objects = [] } = (
          await bucket?.objects
            .find({
              type: 'banners',
              'metadata.start_date': {
                $lte: today,
              },
              'metadata.end_date': {
                $gte: today,
              },
            })
            .props('status,metadata,slug,title')
            .sort('metadata.start_date')
            .limit(1)
        ) || {}

        this.banners = objects
      } catch (e) {}
    },
  },
  getters: {
    banner: state => {
      const name = state.router.currentRoute.value.name

      return state.banners.find(({ metadata: { visible }, status }) => {
        if (IS_PROD && status !== 'published') return false

        if (visible.key === 'both') return true
        if (visible.key === 'home' && name === 'home') return true

        return visible.key === 'docs' && name !== 'home'
      })
    },
  },
})
