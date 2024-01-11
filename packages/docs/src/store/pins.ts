// Pinia
import { defineStore } from 'pinia'

// Composables
import { useRoute } from 'vue-router'

// Utilities
import { computed, ref, shallowRef, watch } from 'vue'

// Stores
import { useUserStore } from '@vuetify/one'

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

  watch(isPinning, save)

  function toggle (value: boolean, pin: Pin) {
    if (value) {
      pins.value.push(pin)
    } else {
      pins.value = pins.value.filter(p => p.to !== pin.to)
    }

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
