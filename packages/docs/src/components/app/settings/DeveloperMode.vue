<template>
  <AppSettingsSettingsHeader text="developer-mode-message" title="developer-mode">
    <v-defaults-provider
      :defaults="{
        VIcon: {
          color: user.dev ? 'error' : 'disabled'
        }
      }"
    >
      <SettingsSwitch
        v-model="user.dev"
        base-color="error"
        color="error"
      />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>
</template>

<script setup>
  const user = useUserStore()
</script>
