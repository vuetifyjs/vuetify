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
  const { t } = useI18n()
  const user = useUserStore()

  const isDisabled = computed(() => user.notifications.last.banner.length === 0)

  function onResetNotifications () {
    user.notifications.last.banner = []
  }
</script>
