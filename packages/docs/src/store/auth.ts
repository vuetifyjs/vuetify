// Stores
import { useUserStore } from './user'

// Utilities
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

export const useAuthStore = defineStore('auth', () => {
  const { user: _user } = useAuth0()
  const user = useUserStore()

  const isUpdating = ref(false)
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

    try {
      const { object } = await fetch(`${url}/api/user/get?user=${_user.value.sub}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then(res => res.json())

      const settings = object.metadata.settings
      const local = localStorage.getItem('vuetify@user') || '{}'

      // Local already matches remote
      if (!settings || JSON.stringify(settings, null, 2) === local) return

      Object.assign(user, settings)
    } catch (e) {
      updateUser()
    }
  }

  return { getUser, isUpdating }
})
