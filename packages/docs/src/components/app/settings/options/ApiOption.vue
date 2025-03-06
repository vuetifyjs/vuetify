<template>
  <AppSettingsSettingsHeader text="enable-inline-api-message" title="enable-inline-api">
    <v-defaults-provider
      :defaults="{
        VIcon: { color: user.api === 'inline' ? 'primary' : 'disabled' }
      }"
    >
      <SettingsSwitch
        v-model="user.api"
        false-value="link-only"
        true-value="inline"
      />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>
</template>

<script setup>
  const user = useUserStore()
</script>
