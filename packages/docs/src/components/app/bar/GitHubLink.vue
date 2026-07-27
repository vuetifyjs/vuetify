<template>
  <AppBtn
    color="medium-emphasis"
    href="https://github.com/vuetifyjs/vuetify"
    icon="mdi-github"
    rel="noopener"
    target="_blank"
    v-tooltip:bottom="t('github')"
    @click="sweClick('app-bar', 'github', name)"
  />
</template>

<script setup>
  const { name } = useRoute()
  const { t } = useI18n()
</script>
