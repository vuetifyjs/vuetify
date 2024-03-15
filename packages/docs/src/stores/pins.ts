export type Pin = {
  category: string
  title: string
  to: string
}

export const usePinsStore = defineStore('pins', () => {
  const user = useUserStore()
  const route = useRoute()

  const pins = ref<Pin[]>([])
  const isPinning = shallowRef(false)

  const pageIsPinned = computed(() => pins.value.some(p => p.to === route.path))

  function toggle (value: boolean, pin: Pin) {
    let array = pins.value.slice()

    if (value) {
      array.push(pin)
    } else {
      array = array.filter(p => p.to !== pin.to)
    }

    array.sort((a, b) => {
      if (a.title > b.title) return 1
      if (a.title < b.title) return -1
      return 0
    })

    pins.value = array

    save()
  }

  function load () {
    // TODO: remove next one release
    pins.value = (user.pinned || []) as any
  }

  function save () {
    user.pinned = pins.value
  }

  return {
    pins,
    isPinning,
    pageIsPinned,
    toggle,
    load,
    save,
  }
})
