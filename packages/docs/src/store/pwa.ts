import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export type RootState = {
  sw: {
    install: any
  }
}

export const usePwaStore = defineStore('pwa', () => {
  const state = reactive({
    sw: {
      install: true,
    },
  })

  return { ...toRefs(state) }
})
