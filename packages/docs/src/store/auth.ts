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
    const local = localStorage.getItem('vuetify@user')

    if (!_user || !url || !local || isUpdating.value) return

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
  })

  async function getUser () {
    if (!_user || !user.syncSettings || !url) return

    const { object } = await fetch(`${url}/api/user/get`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: _user.value.sub }),
    }).then(res => res.json())

    const settings = object.metadata.settings

    if (settings) Object.assign(user, settings)
  }

  return { getUser, isUpdating }
})
