<template>
  <div>
    <v-divider />

    <git-hub-login v-if="user.dev" />

    <latest-release v-else />
  </div>
</template>

<script setup>
  // Components
  import GitHubLogin from '@/components/app/GitHubLogin.vue'
  import LatestRelease from '@/components/app/settings/LatestRelease.vue'

  // Stores
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
