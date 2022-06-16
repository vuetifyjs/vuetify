import { defineStore } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import { useCosmic } from '../composables/cosmic'

type Ad = {
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

    const { objects } = await bucket.getObjects<Ad>({
      query: {
        type: 'ads',
      },
      props: 'slug,title,metadata',
      status: 'published',
    })

    if (objects) { ads.value = objects }
  })

  return { ads }
})
