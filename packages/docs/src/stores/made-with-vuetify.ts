export const useMadeWithVuetifyStore = defineStore('made-with-vuetify', () => {
  const items = ref([])

  onBeforeMount(async () => {
    const res = await fetch('https://madewithvuejs.com/api/tag/vuetify')
      .then(res => res.json())

    items.value = res.data
  })

  return { items }
})
