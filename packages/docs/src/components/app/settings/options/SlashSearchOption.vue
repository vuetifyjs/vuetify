<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.slashSearch ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.slashSearch"
      :label="t('slash-search')"
      :messages="t('slash-search-message')"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useUserStore } from '@vuetify/one'

  const { t } = useI18n()
  const user = useUserStore()
</script>
