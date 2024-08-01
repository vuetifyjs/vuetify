<template>
  <AppListLinkListItem
    :label="t('latest-release')"
    :title="`v${version}`"
    :to="rpath(`/getting-started/release-notes/?version=v${version}`)"
    append-icon="i-mdi:page-next"
    prepend-icon="i-mdi:tag-outline"
    @click="onClick"
  />
</template>

<script setup>
  // Utilities
  import { version } from 'vuetify'

  const app = useAppStore()
  const { t } = useI18n()

  function onClick () {
    app.settings = false
  }
</script>
