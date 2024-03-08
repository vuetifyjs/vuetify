<template>
  <Alert
    v-if="!auth.isSubscriber"
    type="success"
  >
    {{ t('dashboard.perks.alert') }}

    <AppLink :href="rpath('/user/subscriptions/')">$2.99 per month</AppLink>
  </alert>

  <AppSettingsSettingsHeader
    text="dashboard.perks.experience-message"
    title="dashboard.perks.experience"
  />

  <AppSettingsOptionsAdOption />

  <AppSettingsOptionsPinOption />

  <v-divider class="mt-4 mb-3" />

  <AppSettingsSettingsHeader
    text="dashboard.perks.avatar-message"
    title="dashboard.perks.avatar"
  />

  <AppSettingsOptionsAvatarOption />

  <v-divider class="mt-4 mb-3" />

  <AppSettingsSettingsHeader
    text="dashboard.perks.layout-message"
    title="dashboard.perks.layout"
  />

  <AppSettingsOptionsQuickbarOption />

  <AppSettingsOptionsRailDrawerOption />
</template>

<script setup lang="ts">
  const auth = useAuthStore()
  const { t } = useI18n()
</script>
