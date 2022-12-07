<template>
  <v-btn
    color="error"
    size="large"
    variant="flat"
    @click="onClick"
  >
    Clear Cache
  </v-btn>
</template>

<script setup>
  // Composables
  import { useUserStore } from '@/store/user'

  const user = useUserStore()

  function onClick () {
    for (const key in user.notifications.last) {
      user.notifications.last[key] = null
    }

    user.notifications.read = []
  }
</script>
