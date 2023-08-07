<template>
  <latest-release />

  <documentation-build />

  <latest-commit />

  <v-divider class="mt-4" />

  <v-footer
    app
    absolute
    class="text-caption justify-end text-medium-emphasis"
    height="47"
  >
    {{ t('copyright') }} &copy; 2016-{{ (new Date()).getFullYear() }} Vuetify, LLC
  </v-footer>
</template>

<script setup>
  // Components
  import DocumentationBuild from '@/components/app/settings/DocumentationBuild.vue'
  import LatestCommit from '@/components/app/settings/LatestCommit.vue'
  import LatestRelease from '@/components/app/settings/LatestRelease.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
</script>
