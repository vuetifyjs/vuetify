<template>
  <AppListLinkListItem
    v-if="commits.latest?.sha"
    :href="`https://github.com/vuetifyjs/vuetify/commit/${commits.latest.sha}`"
    :label="t('latest-commit')"
    :title="commits.latest.sha.slice(0, 7)"
    append-icon="mdi-open-in-new"
    min-width="90"
    prepend-icon="mdi-source-commit"
    rel="noopener noreferrer"
    target="_blank"
  />
</template>

<script setup>
  const commits = useCommitsStore()
  const { t } = useI18n()

  onBeforeMount(() => {
    if (!commits.latest) commits.fetch()
  })
</script>
