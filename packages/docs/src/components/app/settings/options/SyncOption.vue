<template>
  <v-defaults-provider
    v-if="isAuthenticated"
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
  import { useAuth0 } from '@/plugins/auth'
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useUserStore } from '@/store/user'

  const { t } = useI18n()
  const user = useUserStore()
  const { isAuthenticated } = useAuth0()
</script>
