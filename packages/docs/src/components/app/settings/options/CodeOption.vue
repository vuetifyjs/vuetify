<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.composition === 'composition' ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.composition"
      :label="t('enable-composition')"
      :messages="t('enable-composition-message')"
      false-value="options"
      true-value="composition"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Composables
  import { useUserStore } from '@vuetify/one'

  const { t } = useI18n()
  const user = useUserStore()
</script>
