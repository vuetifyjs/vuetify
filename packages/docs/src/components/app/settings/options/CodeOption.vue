<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.composition === 'composition' ? 'primary' : 'disabled'
      }
    }"
  >
    <SettingsSwitch
      v-model="user.composition"
      :label="t('enable-composition')"
      :messages="t('enable-composition-message')"
      false-value="options"
      true-value="composition"
    />
  </v-defaults-provider>
</template>

<script setup>
  const { t } = useI18n()
  const user = useUserStore()
</script>
