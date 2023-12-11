<template>
  <v-tooltip
    v-if="auth.isOneSubscriber"
    text="Vuetify One Subscriber"
    location="bottom"
  >
    <template #activator="{ props: activatorProps }">
      <v-icon
        v-bind="activatorProps"
        color="primary"
        icon="mdi-numeric-1-box"
      />
    </template>
  </v-tooltip>
</template>

<script setup>
  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
</script>
