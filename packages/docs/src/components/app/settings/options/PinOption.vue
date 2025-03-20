<template>
  <AppSettingsSettingsHeader text="dashboard.perks.enable-pins-message" title="dashboard.perks.enable-pins">
    <template #title>
      <v-chip
        :text="t('new').toUpperCase()"
        class="ms-2"
        color="success"
        size="x-small"
        variant="outlined"
      />
    </template>
    <v-defaults-provider
      :defaults="{
        VIcon: { color: one.isSubscriber && user.pins ? 'primary' : 'disabled' }
      }"
    >
      <SettingsSwitch
        v-model="user.pins"
        :disabled="!one.isSubscriber"
      />
    </v-defaults-provider>
  </AppSettingsSettingsHeader>
</template>

<script setup>
  const { t } = useI18n()
  const one = useOneStore()
  const user = useUserStore()
</script>
