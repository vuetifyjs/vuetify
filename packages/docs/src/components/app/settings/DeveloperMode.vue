<template>
  <v-switch
    v-model="user.dev"
    class="ps-3"
    color="error"
    density="comfortable"
    hide-details
    inset
  >
    <template #label>
      <div class="text-body-2" v-text="t('developer-mode')" />
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
