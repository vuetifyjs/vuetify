import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCosmic } from '@/composables/cosmic'

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
    if (sponsors.value.length) return

    const { bucket } = useCosmic()
    const { objects } = await bucket.getObjects<Sponsor>({
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

  function bySlug (slug: string) {
    return sponsors.value.find(sponsor => {
      return sponsor.slug === slug
    })
  }

  return { sponsors, bySlug, byTier, load }
})
