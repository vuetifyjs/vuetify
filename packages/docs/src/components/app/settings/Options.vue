<template>
  <app-link-list-item
    :to="rpath(`/getting-started/release-notes/?version=v${version}`)"
    :title="`v${version}`"
    append-icon="mdi-page-next"
    label="Latest release"
    prepend-icon="mdi-github"
    @click="onClick"
  />

  <app-link-list-item
    v-if="commits.latest"
    :href="`https://github.com/vuetifyjs/vuetify/commit/${commits.latest?.sha}`"
    :title="commits.latest?.sha.slice(0, 7)"
    append-icon="mdi-open-in-new"
    label="Latest commit"
    prepend-icon="mdi-source-commit"
    rel="noopener noreferrer"
    target="_blank"
    min-width="90"
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
  import { onBeforeMount } from 'vue'
  import { version } from 'vuetify'
  import { rpath } from '@/util/routes'

  // Stores
  import { useAppStore } from '@/store/app'
  import { useCommitsStore } from '@/store/commits'

  const { t } = useI18n()
  const app = useAppStore()
  const commits = useCommitsStore()

  onBeforeMount(() => {
    if (!commits.latest) commits.fetch()
  })

  function onClick () {
    app.settings = false
  }
</script>
