<template>
  <v-switch
    v-model="user.dev"
    class="ps-3 flex-0-0"
    color="error"
    density="comfortable"
    inset
    messages="Development mode enables new features and functionality within the documentation that are still in development."
  >
    <template #label>
      <div v-text="t('developer-mode')" />
    </template>
  </v-switch>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useUserStore } from '@/store/user'

  const { t } = useI18n()
  const user = useUserStore()
</script>
