<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.api === 'inline' ? 'primary' : 'disabled'
      }
    }"
  >
    <SettingsSwitch
      v-model="user.api"
      :label="t('enable-inline-api')"
      :messages="t('enable-inline-api-message')"
      false-value="link-only"
      true-value="inline"
    />
  </v-defaults-provider>
</template>

<script setup>
  const { t } = useI18n()
  const user = useUserStore()
</script>
