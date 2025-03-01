<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.quickbar && one.isSubscriber ? 'primary' : 'disabled'
      }
    }"
  >
    <SettingsSwitch
      v-model="user.quickbar"
      :disabled="!one.isSubscriber"
      :label="t('dashboard.perks.disable-quickbar')"
      :messages="t('dashboard.perks.disable-quickbar-message')"
      :readonly="!one.isSubscriber"
    />
  </v-defaults-provider>
</template>

<script setup>
  const { t } = useI18n()
  const one = useOneStore()
  const user = useUserStore()
</script>
