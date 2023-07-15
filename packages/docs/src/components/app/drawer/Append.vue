<template>
  <v-divider />

  <app-link-list-item
    :label="t('latest-release')"
    :title="`v${version}`"
    :to="rpath('/getting-started/release-notes/')"
    prepend-icon="mdi-label"
    append-icon="mdi-page-next"
  />
</template>

<script setup>
  // Composables
  import { version } from 'vuetify'
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { rpath } from '@/util/routes'

  const { t } = useI18n()
</script>
