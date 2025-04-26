<template>
  <AppSettingsSettingsHeader text="dashboard.perks.disable-ads-message" title="dashboard.perks.disable-ads">
    <v-defaults-provider
      :defaults="{
        VIcon: { color: user.disableAds && one.isSubscriber ? 'primary' : 'disabled' }
      }"
    >
      <SettingsSwitch
        v-model="user.disableAds"
        :disabled="!one.isSubscriber"
        :readonly="!one.isSubscriber"
      />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>
</template>

<script setup>
  const one = useOneStore()
  const user = useUserStore()
</script>
