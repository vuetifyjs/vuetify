<template>
  <v-icon
    v-if="auth.isSubscriber"
    color="#e98b20"
    icon="mdi-crown"
  />
</template>

<script setup>
  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
</script>
