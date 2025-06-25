<template>
  <AppSettingsSettingsHeader text="dashboard.perks.rail-drawer-message" title="dashboard.perks.rail-drawer">
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
        :readonly="!one.isSubscriber"
      />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>
</template>

<script setup>
  const one = useOneStore()
  const user = useUserStore()
</script>
