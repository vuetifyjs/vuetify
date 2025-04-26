<template>
  <div>
    <AppSettingsSettingsHeader
      text="theme-message"
      title="theme"
    />

    <AppSettingsOptionsThemeOption />

    <AppSettingsOptionsOfflineOption />

    <v-divider class="mt-4 mb-3" />

    <AppSettingsOptionsPinOption />

    <AppSettingsOptionsRailDrawerOption />

    <AppSettingsOptionsCodeOption />

    <AppSettingsOptionsApiOption />

    <AppSettingsOptionsSlashSearchOption />

    <AppSettingsOptionsAdOption v-if="one.isSubscriber" />

    <AppSettingsDeveloperMode />
  </div>
</template>

<script setup lang="ts">
  const one = useOneStore()
</script>
