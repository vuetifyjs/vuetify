import { defineStore } from 'pinia'
import { onBeforeMount, ref } from 'vue'
import { useCosmic } from '../composables/cosmic'

export const useAdsStore = defineStore('ads', () => {
  const ads = ref<any[]>([])

  onBeforeMount(async () => {
    if (ads.value.length) return

    const { bucket } = useCosmic()

    const { objects } = await bucket.getObjects({
      type: 'ads',
      props: 'metadata,slug,title',
      status: 'published',
    })

    ads.value = objects
  })

  return { ads }
})
