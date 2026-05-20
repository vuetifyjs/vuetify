<template>
  <AppSettingsSettingsHeader text="developer-mode-message" title="developer-mode">
    <v-defaults-provider
      :defaults="{
        VIcon: {
          color: user.one.devmode ? 'error' : 'disabled'
        }
      }"
    >
      <SettingsSwitch
        v-model="user.one.devmode"
        base-color="error"
        color="error"
      />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>
</template>

<script setup>
  const user = useUserStore()
</script>
