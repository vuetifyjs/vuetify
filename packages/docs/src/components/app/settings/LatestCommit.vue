<template>
  <AppListLinkListItem
    v-if="commits.latest"
    :href="`https://github.com/vuetifyjs/vuetify/commit/${commits.latest?.sha}`"
    :title="commits.latest?.sha.slice(0, 7)"
    :label="t('latest-commit')"
    append-icon="mdi-open-in-new"
    prepend-icon="mdi-source-commit"
    rel="noopener noreferrer"
    target="_blank"
    min-width="90"
  />
</template>

<script setup>
  const commits = useCommitsStore()
  const { t } = useI18n()

  onBeforeMount(() => {
    if (!commits.latest) commits.fetch()
  })
</script>
