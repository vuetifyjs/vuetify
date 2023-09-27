<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.disableAds && auth.isSubscriber ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.disableAds"
      :disabled="!auth.isSubscriber"
      :label="t('disable-ads')"
      :messages="t('disable-ads-message')"
      :readonly="!auth.isSubscriber"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  const { t } = useI18n()
  const auth = useAuthStore()
  const user = useUserStore()
</script>
