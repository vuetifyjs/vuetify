// Types
type CosmicImage = {
  url: string
}

interface Promotion {
  text: string
  images: {
    default: CosmicImage
    logoLight: CosmicImage
    logoDark: CosmicImage
    bgDark: CosmicImage
    bgLight: CosmicImage
  }
  url: string
  discoverable: boolean
  advertisement: boolean
  startDate: string | null
  endDate: string | null
  price: number
  type: string
}

export const usePromotionsStore = defineStore('promotions', () => {
  const promotions = ref<Promotion[]>([])

  onBeforeMount(async () => {
    if (promotions.value.length) return

    const { bucket } = useCosmic()

    const { objects = [] }: { objects: Promotion[] } = (
      await bucket?.objects
        .find({ type: 'promotions' })
        .props('metadata,slug,title')
        .status('published')
    ) || {}

    promotions.value = objects
  })

  return { promotions }
})
