<template>
  <div>
    <AppSettingsSettingsHeader
      text="theme-message"
      title="theme"
    />

    <AppSettingsOptionsThemeOption />

    <v-divider class="mt-4 mb-3" />

    <AppSettingsSettingsHeader
      text="general-message"
      title="general"
    />
    <AppSettingsOptionsPinOption />

    <AppSettingsOptionsCodeOption />

    <AppSettingsOptionsApiOption />

    <AppSettingsOptionsSlashSearchOption />
  </div>
</template>
