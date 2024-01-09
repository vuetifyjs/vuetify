<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.railDrawer && auth.isSubscriber ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.railDrawer"
      :disabled="!auth.isSubscriber"
      :label="t('dashboard.perks.rail-drawer')"
      :messages="t('dashboard.perks.rail-drawer-message')"
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
