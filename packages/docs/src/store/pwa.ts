// Stores
import { useUserStore } from './user'

// Utilities
import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export const usePwaStore = defineStore('pwa', () => {
  const user = useUserStore()

  const state = reactive({
    snackbar: false,
    updateSW: null as null | ((reload?: boolean) => void),
  })

  function ignore () {
    state.snackbar = false
    user.pwaRefresh = false
  }

  function update () {
    state.snackbar = false
    state.updateSW?.(true)
  }

  return { ...toRefs(state), ignore, update }
})
