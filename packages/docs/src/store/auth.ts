// Composables
import { useAuth0 } from '@/plugins/auth'

// Stores
import { useUserStore } from './user'

// Utilities
import { defineStore } from 'pinia'
import { computed, ref, shallowRef } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const auth = useAuth0()
  const user = useUserStore()

  const url = import.meta.env.VITE_API_SERVER_URL
  const admin = shallowRef(!url)
  const sponsor = ref([])

  const isSubscriber = computed(() => {
    return !url || !!sponsor.value.find((s: any) => s.monthlyPriceInDollars >= 1) || admin.value
  })

  user.$subscribe(() => {
    updateUser()
  })

  let isUpdating = false
  async function updateUser () {
    if (isUpdating || !url || !user.syncSettings || !auth?.user.value) return

    const token = await auth.getAccessTokenSilently({ detailedResponse: true })

    isUpdating = true

    try {
      fetch(`${url}/api/user/update?sub=${auth?.user.value.sub}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token.id_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          settings: user.$state,
        }),
      })
    } catch (e) {
      //
    } finally {
      isUpdating = false
    }
  }

  async function getUser () {
    if (!url || !user.syncSettings || !auth?.user.value) return

    const token = await auth.getAccessTokenSilently({ detailedResponse: true })

    try {
      const { object } = await fetch(`${url}/api/user/get?sub=${auth.user.value.sub}`, {
        headers: {
          Authorization: `Bearer ${token.id_token}`,
        },
      }).then(res => res.json())

      const settings = object.metadata.settings
      const local = localStorage.getItem('vuetify@user') || '{}'

      admin.value = object.metadata.admin
      sponsor.value = object.metadata.sponsor

      // Local already matches remote
      if (!settings || JSON.stringify(settings, null, 2) === local) return

      Object.assign(user, settings)
    } catch (e) {
      updateUser()
    }
  }

  let isVerifying = false
  async function verifyUserSponsorship () {
    if (isVerifying || !url || !auth?.user.value) return

    const token = await auth.getAccessTokenSilently({ detailedResponse: true })

    isVerifying = true

    try {
      const res = await fetch(`${url}/api/sponsors/verify?sub=${auth.user.value.sub}`, {
        headers: {
          Authorization: `Bearer ${token.id_token}`,
        },
      }).then(res => res.json())

      sponsor.value = res.sponsor
    } catch (e) {
      //
    } finally {
      isVerifying = false
    }
  }

  return {
    admin,
    getUser,
    isSubscriber,
    sponsor,
    verifyUserSponsorship,
  }
})
