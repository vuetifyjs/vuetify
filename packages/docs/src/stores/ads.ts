// Types
interface Ad {
  slug: string
  title: string
  metadata?: {
    url: string
    type: string
    description?: string
    // eslint-disable-next-line camelcase
    description_short?: string
    sponsored: boolean
    discoverable: boolean
    src: string
    images?: {
      logo?: {
        url: string
      }
      preview?: {
        url: string
      }
      background?: {
        url: string
      }
    }
  }
}

export const useAdsStore = defineStore('ads', () => {
  const ads = ref<Ad[]>([])

  onBeforeMount(async () => {
    if (ads.value.length) return

    const { bucket } = useCosmic()

    const { objects = [] }: { objects: Ad[] } = (
      await bucket?.objects
        .find({ type: 'ads' })
        .props('slug,title,metadata')
        .status('published')
    ) || {}

    ads.value = objects
  })

  return { ads }
})
