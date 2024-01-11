<template>
  <v-divider />

  <div class="d-flex align-center text-caption text-medium-emphasis pa-2">
    <drawer-toggle-rail v-if="auth.isSubscriber" class="me-2" />

    <div class="d-flex ms-auto overflow-hidden">
      <v-btn
        v-if="commits.latest"
        :text="commits.latest?.sha.slice(0, 7)"
        :href="`https://github.com/vuetifyjs/vuetify/commit/${commits.latest?.sha}`"
        class="text-caption me-2"
        prepend-icon="mdi-source-commit"
        rel="noopener noreferrer"
        size="small"
        slim
        target="_blank"
        variant="text"
      />

      <v-btn
        :text="version"
        :to="rpath(`/getting-started/release-notes/?version=v${version}`)"
        class="text-caption"
        prepend-icon="mdi-tag-outline"
        size="small"
        slim
        variant="text"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  // Components
  import DrawerToggleRail from '@/components/app/drawer/DrawerToggleRail.vue'

  // Stores
  import { useAuthStore } from '@vuetify/one'
  import { useCommitsStore } from '@/store/commits'

  // Utilities
  import { rpath } from '@/util/routes'
  import { version } from 'vuetify'

  const auth = useAuthStore()
  const commits = useCommitsStore()
</script>
