<template>
  <AppListLinkListItem
    :to="rpath(`/getting-started/release-notes/?version=v${version}`)"
    :title="`v${version}`"
    :label="t('latest-release')"
    append-icon="mdi-page-next"
    prepend-icon="mdi-tag-outline"
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
