<template>
  <app-link-list-item
    :to="rpath(`/getting-started/release-notes/?version=v${version}`)"
    :title="`v${version}`"
    :label="t('latest-release')"
    append-icon="mdi-page-next"
    prepend-icon="mdi-tag-outline"
    @click="onClick"
  />
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'
  // Stores
  import { useAppStore } from '@/store/app'

  // Utilities
  import { rpath } from '@/util/routes'
  import { version } from 'vuetify'

  const app = useAppStore()
  const { t } = useI18n()

  function onClick () {
    app.settings = false
  }
</script>
