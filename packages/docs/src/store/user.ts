// Utilities
import { merge } from 'lodash-es'

// Globals
import { IN_BROWSER } from '@/util/globals'

import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export type RootState = {
  v: number
  api: 'link-only' | 'inline'
  pwaRefresh: boolean
  theme: string
  mixedTheme: boolean
  direction: 'rtl' | 'ltr'
  notifications: {
    read: string[]
    last: {
      banner: null | number
      v2banner: null | number
      install: null | number
      notification: null | number
      promotion: null | number
      jobs: null | number
    }
  }
}

export const useUserStore = defineStore('user', () => {
  const state = reactive<RootState>({
    v: 1,
    api: 'link-only',
    pwaRefresh: true,
    theme: 'system',
    mixedTheme: true,
    direction: 'ltr',
    notifications: {
      read: [],
      last: {
        banner: null,
        v2banner: null,
        install: null,
        notification: null,
        promotion: null,
        jobs: null,
      },
    },
  })

  function load () {
    if (!IN_BROWSER) return

    const stored = localStorage.getItem('vuetify@user')
    const data = stored ? JSON.parse(stored) : {}

    if (!data.v) {
      data.pwaRefresh = true
      if (typeof data.api === 'boolean') {
        data.api = data.api ? 'inline' : 'link-only'
      }
      if (typeof data.rtl === 'boolean') {
        data.direction = data.rtl ? 'rtl' : 'ltr'
        delete data.rtl
      }
      if (typeof data.theme === 'object') {
        data.mixedTheme = data.theme.mixed
        data.theme = data.theme.system ? 'system'
          : data.theme.dark ? 'dark'
          : 'light'
      }
      if (typeof data.last === 'object') {
        data.notifications.last = data.last
        delete data.last
      }
    }

    if (Array.isArray(data.notifications)) {
      data.notifications = { read: data.notifications }
    }

    Object.assign(state, merge(state, data))
  }

  function save () {
    if (!IN_BROWSER) return

    localStorage.setItem('vuetify@user', JSON.stringify(state, null, 2))
  }

  load()

  return { ...toRefs(state), load, save }
})
