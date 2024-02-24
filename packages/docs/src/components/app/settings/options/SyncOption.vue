<template>
  <v-defaults-provider
    v-if="auth.user"
    :defaults="{
      VIcon: {
        color: user.syncSettings ? 'primary' : 'disabled'
      }
    }"
  >
    <SettingsSwitch
      v-model="user.syncSettings"
      :label="t('sync-settings')"
      :messages="t('sync-settings-message')"
    />
  </v-defaults-provider>
</template>

<script setup>
  const { t } = useI18n()
  const user = useUserStore()
  const auth = useAuthStore()
</script>
