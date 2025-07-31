<template>
  <v-divider class="mt-4 mb-3" />

  <AppSettingsSettingsHeader
    :text="
      store.isOffline ? 'settings.offline.offline-message'
      : store.availableOffline ? 'settings.offline.active-message'
        : 'settings.offline.message'"
    title="settings.offline.header"
  >
    <v-defaults-provider
      :defaults="{
        VIcon: { color: store.availableOffline ? 'primary' : 'disabled' }
      }"
    >
      <SettingsSwitch
        v-model="store.availableOffline"
        class="flex-0-0-auto ms-auto"
      />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>

  <v-progress-linear
    v-slot="{ value }"
    :active="store.isUpdating"
    :max="store.progressTotal"
    :model-value="store.progress"
    color="primary"
    height="18"
    rounded="pill"
    rounded-bar
  >
    <div
      :style="{
        width: '100%',
        display: 'grid',
        gridTemplateAreas: `'a'`,
        textAlign: 'center',
        '--progress': `calc(${ value } * 1%)`,
      }"
    >
      <div
        class="on-primary"
        style="grid-area: a; clip-path: inset(0 calc(100% - var(--progress)) 0 0 round 9px)"
      >Downloading: {{ store.progress }} / {{ store.progressTotal }}</div>
      <div
        style="grid-area: a; clip-path: inset(0 0 0 var(--progress) round 9px)"
      >Downloading: {{ store.progress }} / {{ store.progressTotal }}</div>
    </div>
  </v-progress-linear>

  <v-expand-transition>
    <v-card v-if="store.availableOffline && !store.isUpdating && store.pendingUpdate" color="surface-variant" variant="tonal">
      <v-card-text class="text-caption pb-0">{{ t('settings.offline.pending') }}</v-card-text>
      <template #actions>
        <v-spacer />
        <v-btn color="primary" variant="plain" @click="reload">
          {{ t('settings.offline.reload') }}
        </v-btn>
      </template>
    </v-card>
  </v-expand-transition>
</template>

<script setup lang="ts">
  const { t } = useI18n()

  const store = usePwaStore()

  function reload () {
    location.reload()
  }
</script>
