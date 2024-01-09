<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: 'disabled'
      }
    }"
  >
    <settings-switch
      :model-value="true"
      :label="t('enable-banners')"
      :messages="t('enable-banners-message')"
      color="disabled"
      readonly
    >
      <template #append>
        <v-btn
          :color="isDisabled ? undefined : 'primary'"
          :disabled="isDisabled"
          :text="t('reset')"
          variant="outlined"
          size="small"
          @click="onResetNotifications"
        />
      </template>
    </settings-switch>
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useUserStore } from '@vuetify/one'

  // Utilities
  import { computed } from 'vue'

  const { t } = useI18n()
  const user = useUserStore()

  const isDisabled = computed(() => user.notifications.last.banner.length === 0)

  function onResetNotifications () {
    user.notifications.last.banner = []
  }
</script>
