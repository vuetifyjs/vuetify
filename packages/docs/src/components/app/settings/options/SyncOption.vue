<template>
  <v-defaults-provider
    v-if="isAuthenticated"
    :defaults="{
      VIcon: {
        color: user.syncSettings ? 'primary' : 'disabled'
      }
    }"
  >
    <v-switch
      v-model="user.syncSettings"
      class="ps-3 flex-0-0"
      inset
      color="primary"
      label="Sync Settings"
      messages="When logged in w/ GitHub, sync settings across devices."
      density="compact"
      true-icon="mdi-check"
      false-icon="$close"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useAuth0 } from '@auth0/auth0-vue'

  // Stores
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
  const { isAuthenticated } = useAuth0()
</script>
