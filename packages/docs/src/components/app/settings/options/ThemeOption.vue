<template>
  <v-radio-group
    v-model="user.theme"
    class="mb-2"
    color="primary"
    true-icon="i-mdi:check-circle-outline"
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
</template>

<script setup lang="ts">
  const { t } = useI18n()
  const theme = useTheme()
  const user = useUserStore()

  const items = [
    {
      text: t('light'),
      icon: 'i-mdi:white-balance-sunny',
      value: 'light',
    },
    {
      text: t('dark'),
      icon: 'i-mdi:weather-night',
      value: 'dark',
    },
    {
      text: 'Blackguard',
      icon: 'i-mdi:space-invaders',
      value: 'blackguard',
    },
    {
      text: 'Polaris',
      icon: 'i-mdi:image-filter-hdr',
      value: 'polaris',
    },
    {
      text: 'Nebula',
      icon: 'i-mdi:rocket-launch-outline',
      value: 'nebula',
    },
    {
      text: t('system'),
      icon: 'i-mdi:desktop-tower-monitor',
      value: 'system',
    },
  ]
</script>
