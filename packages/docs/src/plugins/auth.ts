// Composables
import { useAuth0 as _useAuth0, createAuth0 } from '@auth0/auth0-vue'

// Types
import type { App } from 'vue'

// Globals
import { IN_BROWSER } from '@/util/globals'

export function installAuth0 (app: App) {
  if (!IN_BROWSER) return

  app.use(
    createAuth0({
      domain: import.meta.env.VITE_AUTH0_DOMAIN,
      clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    })
  )
}

export function useAuth0 () {
  if (!IN_BROWSER) return

  return _useAuth0()
}
