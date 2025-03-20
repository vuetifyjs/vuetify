<template>
  <v-btn
    :text="version"
    :to="rpath(`/getting-started/release-notes/?version=v${version}`)"
    class="text-caption"
    prepend-icon="mdi-tag-outline"
    size="small"
    variant="text"
    slim
  />
</template>

<script lang="ts" setup>
  // Utilities
  import { version } from 'vuetify'
</script>
