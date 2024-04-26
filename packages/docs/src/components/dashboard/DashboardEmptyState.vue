<template>
  <v-empty-state
    :text="text"
    headline="My Dashboard"
    height="calc(100vh - var(--v-layout-top))"
  >
    <UserOneSubCard />

    <VoAuthCard v-if="!auth.user" />
  </v-empty-state>
</template>

<script setup lang="ts">
// Components
  import UserOneSubCard from '@/components/user/OneSubCard.vue'

  // Stores
  import { useAuthStore } from '@vuetify/one'

  const auth = useAuthStore()

  const text = computed(() => {
    return auth.user ? 'This page will soon be home to the Vuetify One Dashboard.' : 'In order to proceed, please login using GitHub or Discord.'
  })
</script>
