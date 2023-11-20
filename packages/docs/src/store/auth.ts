// Stores
import { useUserStore } from './user'
import { useAppStore } from './app'

// Utilities
import { defineStore } from 'pinia'
import { computed, shallowRef, watch } from 'vue'

interface User {
  id: string
  isAdmin: boolean
  name: string
  picture: string | null
  settings: Record<string, any> | null
  identities: {
    id: string
    emails: string[]
    provider: string
    userId: string
    userHandle: string
    primary: boolean
  }[]
  sponsorships: {
    id: string
    platform: string
    target: string
    tierName: string
    amount: number
    isActive: boolean
    firstPayment: Date
    lastPayment: Date
  }[]
}

const url = import.meta.env.VITE_API_SERVER_URL

export const useAuthStore = defineStore('auth', () => {
  const app = useAppStore()
  const userStore = useUserStore()
  const user = shallowRef<User | null>(null)
  const isLoading = shallowRef(false)

  const isSubscriber = computed(() => (
    !url ||
    user.value?.isAdmin ||
    user.value?.sponsorships.some(s => s.isActive)
  ))

  let externalUpdate = false
  watch(user, user => {
    if (!user?.settings) return
    const local = localStorage.getItem('vuetify@user') || '{}'
    if (JSON.stringify(user.settings, null, 2) === local) return
    externalUpdate = true
    Object.assign(userStore, user.settings)
  })

  userStore.$subscribe(() => {
    if (!externalUpdate) {
      pushSettings()
    }
    externalUpdate = false
  })

  async function verify (force = false) {
    if (verify.promise) return verify.promise

    isLoading.value = true

    verify.promise = fetch(`${url}/auth/verify`, {
      credentials: 'include',
      headers: force ? {
        'Cache-Control': 'no-cache',
      } : undefined,
    }).then(
      async res => {
        if (res.ok) {
          user.value = (await res.json()).user
        } else if (res.status === 401) {
          user.value = null
        } else {
          app.snackbar(res.statusText, { color: 'error' })
          console.error(res.statusText)
        }
      },
      () => {},
    ).then(() => {
      isLoading.value = false
      verify.promise = null
    })
  }
  verify.promise = null as Promise<void> | null

  async function pushSettings () {
    try {
      await fetch(`${url}/user/settings`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          settings: userStore.$state,
        }),
      })
    } catch (err: any) {
      app.snackbar(err.message, { color: 'error' })
      console.error(err)
    }
  }

  async function login (provider: 'github' | 'discord' = 'github') {
    isLoading.value = true
    const redirectUrl = `${url}/auth/${provider}/redirect`

    const width = 400
    const height = 600
    const left = window.screenX + (window.innerWidth - width) / 2
    const top = window.screenY + (window.innerHeight - height) / 2

    const ctx = window.open(
      '',
      'vuetify:authorize:popup',
      `popup,left=${left},top=${top},width=${width},height=${height},resizable`
    )

    if (!ctx) {
      app.snackbar('Failed to open popup', { color: 'error' })
      console.error('Failed to open popup')
      return
    }

    ctx.location.href = redirectUrl

    let interval = -1
    let timeout = -1
    function messageHandler (e: MessageEvent) {
      if (e.origin !== url) return
      if (e.data?.type !== 'auth-response') return
      if (e.data.status === 'success') {
        if (!user.value) {
          window.localStorage.setItem('vuetify@lastLoginProvider', provider)
        }
        user.value = e.data.body.user
      } else {
        app.snackbar(e.data.message, { color: 'error' })
        console.error(e.data.message)
      }

      cleanup()
    }

    function cleanup () {
      window.removeEventListener('message', messageHandler)
      window.clearInterval(interval)
      window.clearTimeout(timeout)
      ctx?.close()
      isLoading.value = false
    }

    window.addEventListener('message', messageHandler)
    interval = window.setInterval(() => {
      if (!ctx || ctx.closed) {
        console.error('Auth popup closed')
        cleanup()
      } else {
        ctx.postMessage({ type: 'auth-request' }, '*')
      }
    }, 1000)
    timeout = window.setTimeout(() => {
      cleanup()
      app.snackbar('Auth timed out', { color: 'warning' })
      console.error('Auth timed out')
    }, 120 * 1000)
  }

  async function logout () {
    isLoading.value = true
    try {
      await fetch(`${url}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
      await verify(true)
      user.value = null
    } catch (err: any) {
      app.snackbar(err.message, { color: 'error' })
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const lastLoginProvider = () => (
    localStorage.getItem('vuetify@lastLoginProvider')
  )

  return {
    user,
    isLoading,
    verify,
    login,
    logout,
    isSubscriber,
    lastLoginProvider,
  }
})
