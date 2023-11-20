<template>
  <v-icon
    v-if="auth.user.isAdmin"
    color="primary"
    icon="$vuetify"
  />
</template>

<script setup>
  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
</script>
