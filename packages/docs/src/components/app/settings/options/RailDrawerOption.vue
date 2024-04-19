<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.railDrawer && one.isSubscriber ? 'primary' : 'disabled'
      }
    }"
  >
    <SettingsSwitch
      v-model="user.railDrawer"
      :disabled="!one.isSubscriber"
      :label="t('dashboard.perks.rail-drawer')"
      :messages="t('dashboard.perks.rail-drawer-message')"
      :readonly="!one.isSubscriber"
    />
  </v-defaults-provider>
</template>

<script setup>
  const { t } = useI18n()
  const one = useOneStore()
  const user = useUserStore()
</script>
