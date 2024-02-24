<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.slashSearch ? 'primary' : 'disabled'
      }
    }"
  >
    <SettingsSwitch
      v-model="user.slashSearch"
      :label="t('slash-search')"
      :messages="t('slash-search-message')"
    />
  </v-defaults-provider>
</template>

<script setup>
  const { t } = useI18n()
  const user = useUserStore()
</script>
