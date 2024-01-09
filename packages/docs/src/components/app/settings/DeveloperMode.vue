<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.dev ? 'error' : 'disabled'
      }
    }"
  >
    <v-switch
      v-model="user.dev"
      :messages="t('developer-mode-message')"
      class="ps-1"
      color="error"
      density="comfortable"
      inset

      true-icon="mdi-check"
      false-icon="$close"
    >
      <template #label>
        <div v-text="t('developer-mode')" />
      </template>
    </v-switch>
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useUserStore } from '@vuetify/one'

  const { t } = useI18n()
  const user = useUserStore()
</script>
