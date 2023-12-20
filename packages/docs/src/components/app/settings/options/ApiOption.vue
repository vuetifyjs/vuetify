<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.api === 'inline' ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.api"
      :label="t('enable-inline-api')"
      :messages="t('enable-inline-api-message')"
      false-value="link-only"
      true-value="inline"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useUserStore } from '@vuetify/one'

  const { t } = useI18n()
  const user = useUserStore()
</script>
