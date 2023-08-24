// Composables
import { useAuth0 } from '@auth0/auth0-vue'

// Stores
import { useUserStore } from './user'

// Utilities
import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const { user: _user, getAccessTokenSilently } = useAuth0()
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

    if (!_user?.value?.sub || !url || !local || isUpdating.value) return

    const settings = JSON.parse(local)

    if (!settings.syncSettings) return

    isUpdating.value = true

    fetch(`${url}/api/user/update`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: _user.value.sub,
        settings,
      }),
    }).finally(() => {
      isUpdating.value = false
    })
  }

  async function getUser () {
    if (!_user?.value?.sub || !user.syncSettings || !url) return

    const token = await getAccessTokenSilently({ detailedResponse: true })

    try {
      const { object } = await fetch(`${url}/api/user/get?user=${_user.value.sub}`, {
        headers: {
          'Content-Type': 'application/json',
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
    if (!_user?.value?.sub || !url) return

    const token = await getAccessTokenSilently({ detailedResponse: true })

    try {
      const res = await fetch(`${url}/api/sponsors/verify?user=${_user.value.nickname}&sub=${_user.value.sub}`, {
        headers: {
          'Content-Type': 'application/json',
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
