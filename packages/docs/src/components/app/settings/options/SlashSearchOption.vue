<template>
  <AppSettingsSettingsHeader text="slash-search-message" title="slash-search">
    <v-defaults-provider
      :defaults="{
        VIcon: { color: user.slashSearch ? 'primary' : 'disabled' }
      }"
    >
      <SettingsSwitch v-model="user.slashSearch" />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>
</template>

<script setup>
  const user = useUserStore()
</script>
