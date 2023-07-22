<template>
  <div v-if="user.quickbar">
    <v-divider />

    <latest-release />
  </div>
</template>

<script setup>
  // Components
  import LatestRelease from '@/components/app/settings/LatestRelease.vue'

  // Stores
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
