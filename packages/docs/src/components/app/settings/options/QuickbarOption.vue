<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.quickbar && auth.isSubscriber ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.quickbar"
      :disabled="!auth.isSubscriber"
      :label="t('dashboard.perks.disable-quickbar')"
      :messages="t('dashboard.perks.disable-quickbar-message')"
      :readonly="!auth.isSubscriber"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useAuthStore, useUserStore } from '@vuetify/one'

  const { t } = useI18n()
  const auth = useAuthStore()
  const user = useUserStore()
</script>
