// Utilities
import merge from 'lodash/merge'

// Globals
import { IN_BROWSER } from '@/util/globals'

import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export type RootState = {
  api: boolean
  pwaRefresh: boolean
  theme: string
  direction: 'rtl' | 'ltr'
  notifications: {
    read: string[]
  }
}

export const useUserStore = defineStore('user', () => {
  const state = reactive<RootState>({
    api: false,
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

  function save () {
    if (!IN_BROWSER) return

    localStorage.setItem('vuetify@user', JSON.stringify(state))
  }

  load()

  return { ...toRefs(state), load, save }
})
