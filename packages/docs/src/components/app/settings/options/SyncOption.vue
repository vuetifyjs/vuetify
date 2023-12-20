<template>
  <v-defaults-provider
    v-if="auth.user"
    :defaults="{
      VIcon: {
        color: user.syncSettings ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.syncSettings"
      :label="t('sync-settings')"
      :messages="t('sync-settings-message')"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useAuthStore, useUserStore } from '@vuetify/one'

  const { t } = useI18n()
  const user = useUserStore()
  const auth = useAuthStore()
</script>
