// Types
interface Spot {
  slug: string
  metadata: {
    sponsor: string
    href: string
    image: {
      url: string
    }
  }
}

export const useSpotStore = defineStore('spot', () => {
  const { bucket } = useCosmic()

  const adapter = useDate()
  const today = adapter.startOfDay(adapter.date())
  const tomorrow = adapter.endOfDay(today)

  const spots = ref<Spot[]>([])

  const spot = computed(() => spots.value[0]?.metadata)

  onBeforeMount(async () => {
    if (spots.value.length) return

    const { objects = [] }: { objects: Spot[] } = (
      await bucket?.objects
        .find({
          type: 'spots',
          'metadata.start_date': {
            $lte: today,
          },
          'metadata.end_date': {
            $gte: tomorrow,
          },
        })
        .props('metadata,slug')
        .status('published')
    ) || {}

    spots.value = objects
  })

  return { spot }
})
