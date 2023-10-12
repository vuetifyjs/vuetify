<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.pwaRefresh ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.pwaRefresh"
      :label="t('enable-pwa-refresh')"
      :messages="t('enable-pwa-refresh-message')"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useUserStore } from '@/store/user'

  const { t } = useI18n()
  const user = useUserStore()
</script>
