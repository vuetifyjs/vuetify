<template>
  <v-tooltip
    v-if="auth.user.isAdmin"
    location="bottom"
    text="Admin"
  >
    <template #activator="{ props: activatorProps }">
      <v-icon
        v-bind="activatorProps"
        color="primary"
        icon="$vuetify"
      />
    </template>
  </v-tooltip>
</template>

<script setup>
  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
</script>
