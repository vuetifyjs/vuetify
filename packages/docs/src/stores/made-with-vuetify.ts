import type { CSSProperties } from 'vue'

export interface Project {
  id: number
  title: string
  teaser: string
  url: string
  image: string
  styles: CSSProperties
}

export const useMadeWithVuetifyStore = defineStore('made-with-vuetify', () => {
  const items = ref<Project[]>([])

  onBeforeMount(async () => {
    const res = await fetch('https://madewithvuejs.com/api/tag/vuetify')
      .then(res => res.json())

    items.value = res.data
  })

  return { items }
})
