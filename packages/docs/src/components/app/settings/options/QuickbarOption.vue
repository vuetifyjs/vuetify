<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.quickbar ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.quickbar"
      :label="t('enable-quickbar')"
      :messages="t('enable-quickbar-message')"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useUserStore } from '@/store/user'

  const { t } = useI18n()
  const user = useUserStore()
</script>
