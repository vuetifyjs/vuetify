<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.disableAds && one.isSubscriber ? 'primary' : 'disabled'
      }
    }"
  >
    <SettingsSwitch
      v-model="user.disableAds"
      :disabled="!one.isSubscriber"
      :label="t('dashboard.perks.disable-ads')"
      :messages="t('dashboard.perks.disable-ads-message')"
      :readonly="!one.isSubscriber"
    />
  </v-defaults-provider>
</template>

<script setup>
  const { t } = useI18n()
  const one = useOneStore()
  const user = useUserStore()
</script>
