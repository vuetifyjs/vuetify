<template>
  <app-settings-group
    ref="group"
    v-model="model"
    :items="items"
    multiple
    title="theme"
  />
</template>

<script setup lang="ts">
  // Components
  import AppSettingsGroup from './Group.vue'

  // Composables
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed, ref } from 'vue'

  const group = ref<InstanceType<typeof AppSettingsGroup>>()
  const user = useUserStore()

  const items = [
    {
      text: 'light',
      icon: 'mdi-white-balance-sunny',
    },
    {
      text: 'dark',
      icon: 'mdi-weather-night',
    },
    {
      text: 'system',
      icon: 'mdi-desktop-tower-monitor',
    },
    {
      text: 'mixed',
      icon: 'mdi-theme-light-dark',
    },
  ]

  const model = computed({
    get () {
      return [user.theme].concat(user.mixedTheme ? 'mixed' : [])
    },
    set (val: string[]) {
      {
        const idx = val.indexOf('mixed')
        user.mixedTheme = !!~idx
        if (~idx) {
          val.splice(idx, 1)
        }
      }
      {
        const idx = val.indexOf(user.theme)
        if (~idx) {
          val.splice(idx, 1)
        }
        if (val.length) {
          user.theme = val[0]
        }
      }
    },
  })
</script>
