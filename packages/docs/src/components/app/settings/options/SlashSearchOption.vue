<template>
  <AppSettingsSettingsHeader text="slash-search-message" title="slash-search">
    <v-defaults-provider
      :defaults="{
        VIcon: { color: user.ecosystem.docs.slashSearch ? 'primary' : 'disabled' }
      }"
    >
      <SettingsSwitch v-model="user.ecosystem.docs.slashSearch" />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>
</template>

<script setup>
  const user = useUserStore()
</script>
