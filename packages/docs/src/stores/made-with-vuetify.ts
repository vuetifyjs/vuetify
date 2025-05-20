export const useMadeWithVuetifyStore = defineStore('made-with-vuetify', () => {
  const items = shallowRef([])

  onBeforeMount(async () => {
    const res = await fetch('https://madewithvuejs.com/api/tag/vuetify', {
      priority: 'low',
    })
      .then(res => res.json())

    items.value = res.data
  })

  return { items }
})
