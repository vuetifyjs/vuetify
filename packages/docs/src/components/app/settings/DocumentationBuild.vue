<template>
  <AppListLinkListItem
    v-if="GITHUB_SHA"
    :append-icon="appendIcon"
    :href="`https://github.com/vuetifyjs/vuetify/commit/${GITHUB_SHA}`"
    :label="t('documentation-build')"
    :prepend-icon="prependIcon"
    :title="GITHUB_SHA.slice(0, 7)"
    rel="noopener noreferrer"
    target="_blank"
  />
</template>

<script setup>
  const GITHUB_SHA = import.meta.env.VITE_GITHUB_SHA

  const { t } = useI18n()

  defineProps({
    prependIcon: {
      type: String,
      default: 'mdi-package',
    },
    appendIcon: {
      type: String,
      default: 'mdi-open-in-new',
    },
  })
</script>
