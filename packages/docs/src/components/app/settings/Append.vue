<template>
  <v-divider v-if="GITHUB_SHA" />

  <app-link-list-item
    v-if="GITHUB_SHA"
    :href="`https://github.com/vuetifyjs/vuetify/commit/${GITHUB_SHA}`"
    :label="t('documentation-build')"
    :title="GITHUB_SHA"
    prepend-icon="mdi-package"
    append-icon="mdi-open-in-new"
    rel="noopener noreferrer"
    target="_blank"
  />
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  const GITHUB_SHA = import.meta.env.VITE_GITHUB_SHA

  const { t } = useI18n()
</script>
