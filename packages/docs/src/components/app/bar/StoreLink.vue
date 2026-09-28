<template>
  <AppBtn
    color="medium-emphasis"
    href="https://store.vuetifyjs.com/?utm_source=vuetifyjs.com&utm_medium=toolbar"
    icon="$vuetify-store"
    rel="noopener"
    target="_blank"
    v-tooltip:bottom="t('vuetify-store')"
    @click="sweClick('app-bar', 'store', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
  const { t } = useI18n()
</script>
