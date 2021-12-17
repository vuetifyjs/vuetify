// Utilities
import { merge } from 'lodash-es'

// Globals
import { IN_BROWSER } from '@/util/globals'

import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export type RootState = {
  api: 'link-only' | 'inline'
  pwaRefresh: boolean
  theme: string
  direction: 'rtl' | 'ltr'
  notifications: {
    read: string[]
  }
}

export const useUserStore = defineStore('user', () => {
  const state = reactive<RootState>({
    api: 'link-only',
    pwaRefresh: false,
    theme: 'light',
    direction: 'ltr',
    notifications: {
      read: [],
    },
  })

  function load () {
    if (!IN_BROWSER) return

    const stored = localStorage.getItem('vuetify@user')
    const data = stored ? JSON.parse(stored) : {}

    Object.assign(state, merge(state, data))
  }

  load()

  return { ...toRefs(state), load }
})
