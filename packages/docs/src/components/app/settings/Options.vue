<template>
  <div>
    <AppSettingsSettingsHeader
      title="theme"
      text="theme-message"
    />

    <AppSettingsOptionsThemeOption />

    <v-divider class="mt-4 mb-3" />

    <AppSettingsSettingsHeader
      title="general"
      text="general-message"
    />

    <AppSettingsOptionsCodeOption />

    <AppSettingsOptionsApiOption />

    <AppSettingsOptionsSlashSearchOption />

    <AppSettingsOptionsSyncOption />
  </div>
</template>
