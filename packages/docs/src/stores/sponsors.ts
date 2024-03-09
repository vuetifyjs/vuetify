// Types
export interface Sponsor {
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

  async function fetchSponsors () {
    if (sponsors.value.length) return

    const { bucket } = useCosmic()
    const { objects = [] }: { objects: Sponsor[] } = (
      await bucket?.objects
        .find({ type: 'sponsors' })
        .props('metadata,slug,title')
        .sort('created_at')
    ) || {}

    sponsors.value = objects
  }

  onServerPrefetch(fetchSponsors)
  onBeforeMount(fetchSponsors)

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

  return { sponsors, bySlug, byTier }
})
