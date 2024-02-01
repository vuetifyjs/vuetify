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
  // Utilities
  import { onBeforeUnmount } from 'vue'
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useAppStore } from '@/store/app'

  const appStore = useAppStore()
  const { t } = useI18n()

  onBeforeUnmount(() => {
    appStore.apiSearch = ''
  })
</script>
