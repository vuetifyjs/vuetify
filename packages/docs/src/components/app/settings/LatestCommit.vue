<template>
  <app-link-list-item
    v-if="commits.latest"
    :href="`https://github.com/vuetifyjs/vuetify/commit/${commits.latest?.sha}`"
    :title="commits.latest?.sha.slice(0, 7)"
    append-icon="mdi-open-in-new"
    label="Latest commit"
    prepend-icon="mdi-source-commit"
    rel="noopener noreferrer"
    target="_blank"
    min-width="90"
  />
</template>

<script setup>
  // Utilities
  import { onBeforeMount } from 'vue'

  // Stores
  import { useCommitsStore } from '@/store/commits'

  const commits = useCommitsStore()

  onBeforeMount(() => {
    if (!commits.latest) commits.fetch()
  })
</script>
