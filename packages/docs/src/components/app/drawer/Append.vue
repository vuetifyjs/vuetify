<template>
  <v-divider />

  <div class="d-flex align-center text-caption text-medium-emphasis pa-2">
    <AppDrawerDrawerToggleRail v-if="auth.isSubscriber" class="me-2" />

    <div class="d-flex ms-auto overflow-hidden">
      <AppCommitBtn class="me-2" />

      <AppVersionBtn />
    </div>
  </div>
</template>

<script setup lang="ts">
  const auth = useAuthStore()
</script>
