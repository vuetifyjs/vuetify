<template>
  <v-navigation-drawer
    id="settings-drawer"
    v-model="app.settings"
    :location="isRtl ? 'left' : 'right'"
    width="350"
    disable-route-watcher
    temporary
    touchless
  >
    <v-toolbar :title="t('settings.header')" flat>
      <template #append>
        <v-btn
          icon="mdi-close"
          variant="flat"
          @click="app.settings = false"
        />
      </template>
    </v-toolbar>

    <v-divider />

    <v-container class="px-3 py-3">
      <AppSettingsOptions />
    </v-container>

    <template #append>
      <AppSettingsAppend />
    </template>
  </v-navigation-drawer>
</template>

<script setup>
  const app = useAppStore()

  const { t } = useI18n()
  const { isRtl } = useRtl()
</script>
