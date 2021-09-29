import Cosmic from 'cosmicjs'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface Sponsor {
  metadata: {
    tier: number
  }
  slug: string
  title: string
}

export type RootState = {
  sponsors: Sponsor[]
}

export const useSponsorsStore = defineStore('sponsors', () => {
  const sponsors = ref<Sponsor[]>([])

  async function load () {
    const api = Cosmic()
    // eslint-disable-next-line camelcase
    const read_key = import.meta.env.VITE_COSMIC_BUCKET_READ_KEY
    const slug = import.meta.env.VITE_COSMIC_BUCKET_SLUG
    const bucket = api.bucket({ slug, read_key })

    const { objects } = await bucket.getObjects({
      query: {
        type: 'sponsors',
      },
      props: 'slug,title,metadata',
      sort: 'created_at',
    })

    sponsors.value = objects ?? []
  }

  const byTier = computed(() => {
    const tiers: Record<string, Sponsor[]> = {}

    for (const sponsor of sponsors.value) {
      const tier = sponsor.metadata.tier

      if (!tiers[tier]) {
        tiers[tier] = []
      }

      tiers[tier].push(sponsor)
    }

    return tiers
  })

  return { sponsors, byTier, load }
})
