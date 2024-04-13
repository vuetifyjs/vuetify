<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.disableAds && auth.isSubscriber ? 'primary' : 'disabled'
      }
    }"
  >
    <SettingsSwitch
      v-model="user.disableAds"
      :disabled="!auth.isSubscriber"
      :label="t('dashboard.perks.disable-ads')"
      :messages="t('dashboard.perks.disable-ads-message')"
      :readonly="!auth.isSubscriber"
    />
  </v-defaults-provider>
</template>

<script setup>
  const { t } = useI18n()
  const auth = useAuthStore()
  const user = useUserStore()
</script>
