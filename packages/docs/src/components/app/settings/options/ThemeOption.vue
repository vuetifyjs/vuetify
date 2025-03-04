<template>
  <v-radio-group
    v-model="user.theme"
    class="mb-2"
    color="primary"
    true-icon="mdi-check-circle-outline"
    hide-details
  >
    <v-radio
      v-for="(item, i) in items"
      :key="i"
      :value="item.value"
    >
      <template #label>
        <v-icon :icon="item.icon" start />

        {{ item.text }}
      </template>
    </v-radio>
  </v-radio-group>

  <v-defaults-provider
    v-if="!theme.current.value?.dark"
    :defaults="{
      VIcon: {
        color: user.mixedTheme ? 'primary' : 'disabled'
      }
    }"
  >
    <SettingsSwitch
      v-model="user.mixedTheme"
      :label="t('dark-code')"
      :messages="t('dark-code-message')"
    />
  </v-defaults-provider>

  <AppBtn
    append-icon="mdi-page-next"
    color="surface-variant"
    to="?one=settings"
    variant="flat"
    block
  >
    Vuetify One Themes
  </AppBtn>
</template>

<script setup lang="ts">
  const { t } = useI18n()
  const theme = useTheme()
  const user = useUserStore()

  const items = [
    {
      text: t('light'),
      icon: 'mdi-white-balance-sunny',
      value: 'light',
    },
    {
      text: t('dark'),
      icon: 'mdi-weather-night',
      value: 'dark',
    },
    {
      text: t('system'),
      icon: 'mdi-desktop-tower-monitor',
      value: 'system',
    },
  ]
</script>
