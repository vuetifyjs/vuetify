<template>
  <v-btn
    :href="`https://github.com/vuetifyjs/vuetify/commit/${commits.latest?.sha}`"
    :prepend-icon="commits.latest ? 'mdi-source-commit' : undefined"
    :readonly="!commits.latest"
    :text="commits.latest?.sha.slice(0, 7)"
    class="text-caption"
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
