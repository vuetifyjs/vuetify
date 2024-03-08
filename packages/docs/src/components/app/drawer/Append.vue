<template>
  <v-divider />

  <div class="d-flex align-center text-caption text-medium-emphasis pa-2">
    <AppDrawerDrawerToggleRail v-if="auth.isSubscriber" class="me-2" />

    <div class="d-flex ms-auto overflow-hidden">
      <v-btn
        v-if="commits.latest"
        :href="`https://github.com/vuetifyjs/vuetify/commit/${commits.latest?.sha}`"
        :text="commits.latest?.sha.slice(0, 7)"
        class="text-caption me-2"
        prepend-icon="mdi-source-commit"
        rel="noopener noreferrer"
        size="small"
        target="_blank"
        variant="text"
        slim
      />

      <v-btn
        :text="version"
        :to="rpath(`/getting-started/release-notes/?version=v${version}`)"
        class="text-caption"
        prepend-icon="mdi-tag-outline"
        size="small"
        variant="text"
        slim
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  // Utilities
  import { version } from 'vuetify'

  const auth = useAuthStore()
  const commits = useCommitsStore()
</script>
