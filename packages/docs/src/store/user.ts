// Utilities
import { merge } from 'lodash-es'

// Globals
import { IN_BROWSER } from '@/util/globals'

import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'

export type RootState = {
  v: 2 | 3 | 4
  api: 'link-only' | 'inline'
  dev: boolean
  disableAds: boolean
  composition: ('options' | 'composition')
  pwaRefresh: boolean
  slashSearch: boolean
  syncSettings: boolean
  theme: string
  mixedTheme: boolean
  direction: 'rtl' | 'ltr'
  quickbar: boolean
  railDrawer: boolean
  notifications: {
    show: boolean
    read: string[]
    last: {
      banner: string[]
      v2banner: null | number
      install: null | number
      notification: null | number
      promotion: null | number
      jobs: null | number
    }
  }
}

// @ts-expect-error too hard to actually validate in strict mode
type SavedState = {
  api: boolean
  drawer: { alphabetical: boolean, mini: boolean }
  last: {
    install: null | number
    notification: null | number
    promotion: null | number
    jobs: null | number
  }
  pwaRefresh: boolean
  rtl: boolean
  theme: {
    dark: boolean
    system: boolean
    mixed: boolean
  }
} | {
  api: 'link-only' | 'inline'
  pwaRefresh: boolean
  theme: string
  mixedTheme: boolean
  direction: 'rtl' | 'ltr'
  notifications: {
    read: string[]
    last: {
      install: null | number
      notification: null | number
      promotion: null | number
      jobs: null | number
    }
  }
} | {
  v: 1
  api: 'link-only' | 'inline'
  dev?: boolean
  composition?: ('options' | 'composition') | ('options' | 'composition')[]
  pwaRefresh: boolean
  theme: string
  mixedTheme: boolean
  direction: 'rtl' | 'ltr'
  notifications: {
    show?: boolean
    read: string[]
    last: {
      banner?: null | number | string[]
      v2banner?: null | number
      install: null | number
      notification: null | number
      promotion: null | number
      jobs: null | number
    }
  }
} | RootState

export const DEFAULT_USER: RootState = {
  v: 4,
  api: 'link-only',
  dev: false,
  disableAds: false,
  composition: 'options',
  pwaRefresh: true,
  theme: 'system',
  mixedTheme: true,
  direction: 'ltr',
  slashSearch: false,
  syncSettings: true,
  quickbar: false,
  railDrawer: false,
  notifications: {
    show: true,
    read: [],
    last: {
      banner: [],
      v2banner: null,
      install: null,
      notification: null,
      promotion: null,
      jobs: null,
    },
  },
}

export const useUserStore = defineStore('user', () => {
  const state = reactive(merge({}, DEFAULT_USER))

  function load () {
    if (!IN_BROWSER) return

    const stored = localStorage.getItem('vuetify@user')
    const data = stored ? JSON.parse(stored) : {}
    const needsRefresh = data.v === state.v

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
      if (Array.isArray(data.notifications)) {
        data.notifications = { read: data.notifications }
      }
      if (typeof data.last === 'object') {
        data.notifications.last = data.last
        delete data.last
      }
    }

    if (data.v === 1) {
      if (Array.isArray(data.composition)) {
        data.composition = 'composition'
      }
      if (!Array.isArray(data.notifications.last.banner)) {
        data.notifications.last.banner = []
      }
    }

    if (data.v === 2) {
      data.syncSettings = true
      data.disableAds = false
      data.v = 3
    }

    if (data.v === 3) {
      data.quickbar = false
    }

    data.v = state.v
    Object.assign(state, merge(state, data))
    if (needsRefresh) {
      save()
    }
  }

  function save () {
    if (!IN_BROWSER) return

    localStorage.setItem('vuetify@user', JSON.stringify(state, null, 2))
  }

  function reset () {
    if (!IN_BROWSER) return

    Object.assign(state, merge({}, DEFAULT_USER))

    save()
  }

  load()

  return {
    ...toRefs(state),
    load,
    save,
    reset,
  }
})
