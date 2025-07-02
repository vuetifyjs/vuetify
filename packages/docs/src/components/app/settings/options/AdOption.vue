<template>
  <AppSettingsSettingsHeader text="dashboard.perks.disable-ads-message" title="dashboard.perks.disable-ads">
    <v-defaults-provider
      :defaults="{
        VIcon: { color: !user.one.ads.enabled && one.isSubscriber ? 'primary' : 'disabled' }
      }"
    >
      <SettingsSwitch
        :disabled="!one.isSubscriber"
        :model-value="!user.one.ads.enabled"
        :readonly="!one.isSubscriber"
        @update:model-value="val => user.one.ads.enabled = !val"
      />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>
</template>

<script setup>
  const one = useOneStore()
  const user = useUserStore()
</script>
