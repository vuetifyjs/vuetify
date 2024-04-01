<template>
  <v-btn
    v-if="commits.latest"
    :href="`https://github.com/vuetifyjs/vuetify/commit/${commits.latest?.sha}`"
    :text="commits.latest?.sha.slice(0, 7)"
    class="text-caption"
    prepend-icon="mdi-source-commit"
    rel="noopener noreferrer"
    size="small"
    target="_blank"
    variant="text"
    slim
  />
</template>

<script lang="ts" setup>
  const commits = useCommitsStore()
</script>
