// Composables
import { useAuth0 } from '@/plugins/auth'

// Stores
import { useUserStore } from './user'

// Utilities
import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const auth = useAuth0()
  const user = useUserStore()

  const isUpdating = shallowRef(false)
  const admin = shallowRef(false)
  const sponsor = ref(false)
  const url = import.meta.env.VITE_COSMIC_USER_URL

  user.$subscribe(() => {
    updateUser()
  })

  async function updateUser () {
    const local = localStorage.getItem('vuetify@user')
    if (!auth?.user?.value?.sub || !url || !local || isUpdating.value) return

    const settings = JSON.parse(local)

    if (!settings.syncSettings) return

    const token = await auth.getAccessTokenSilently({ detailedResponse: true })

    isUpdating.value = true

    fetch(`${url}/api/user/update?sub=${auth?.user.value.sub}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.id_token}`,
      },
      body: JSON.stringify({
        settings,
      }),
    }).finally(() => {
      isUpdating.value = false
    })
  }

  async function getUser () {
    if (!auth?.user?.value?.sub || !user.syncSettings || !url) return

    const token = await auth.getAccessTokenSilently({ detailedResponse: true })

    try {
      const { object } = await fetch(`${url}/api/user/get?sub=${auth?.user.value.sub}`, {
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

  async function verifyUserSponsorship () {
    if (!auth?.user?.value?.sub || !url) return

    const token = await auth.getAccessTokenSilently({ detailedResponse: true })

    try {
      const res = await fetch(`${url}/api/sponsors/verify?user=${auth?.user.value.nickname}&sub=${auth?.user.value.sub}`, {
        headers: {
          Authorization: `Bearer ${token.id_token}`,
        },
      }).then(res => res.json())

      sponsor.value = res.sponsor
    } catch (e) {
      //
    }
  }

  return {
    admin,
    sponsor,
    isUpdating,
    getUser,
    verifyUserSponsorship,
  }
})
