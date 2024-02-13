<template>
  <Alert
    v-if="!auth.isSubscriber"
    type="success"
  >
    {{ t('dashboard.perks.alert') }}

    <AppLink :href="rpath('/user/subscriptions/')">$2.99 per month</AppLink>
  </alert>

  <AppSettingsSettingsHeader
    title="dashboard.perks.experience"
    text="dashboard.perks.experience-message"
  />

  <AppSettingsOptionsAdOption />

  <AppSettingsOptionsPinOption />

  <v-divider class="mt-4 mb-3" />

  <AppSettingsSettingsHeader
    title="dashboard.perks.avatar"
    text="dashboard.perks.avatar-message"
  />

  <AppSettingsOptionsAvatarOption />

  <v-divider class="mt-4 mb-3" />

  <AppSettingsSettingsHeader
    title="dashboard.perks.layout"
    text="dashboard.perks.layout-message"
  />

  <AppSettingsOptionsQuickbarOption />

  <AppSettingsOptionsRailDrawerOption />
</template>

<script setup lang="ts">
  const auth = useAuthStore()
  const { t } = useI18n()
</script>
