<template>
  <app-link-list-item
    :href="`https://github.com/vuetifyjs/vuetify/releases/tag/v${version}`"
    :title="`v${version}`"
    append-icon="mdi-open-in-new"
    label="Latest release"
    prepend-icon="mdi-github"
    rel="noopener noreferrer"
    target="_blank"
  />

  <app-link-list-item
    :href="`https://github.com/vuetifyjs/vuetify/commit/${commits.latest?.sha}`"
    :title="commits.latest?.sha.slice(0, 7)"
    append-icon="mdi-open-in-new"
    label="Latest commit"
    prepend-icon="mdi-source-commit"
    rel="noopener noreferrer"
    target="_blank"
  />

  <documentation-build />

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

  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { version } from 'vuetify'

  // Stores
  import { useCommitsStore } from '@/store/commits'

  const { t } = useI18n()
  const commits = useCommitsStore()

  commits.fetch()
</script>
