<template>
  <div class="d-flex mb-2">
    <AppTextField
      v-model="appStore.apiSearch"
      :placeholder="t('search-api')"
      clearable
    />
  </div>
</template>

<script setup>
  const appStore = useAppStore()
  const { t } = useI18n()

  onBeforeUnmount(() => {
    appStore.apiSearch = ''
  })
</script>
