<template>
  <app-settings-group title="theme" :items="items" :model-value="user.theme" @update:model-value="updateTheme" />
</template>

<script lang="ts">
  import { computed, ref } from 'vue'
  import { IN_BROWSER } from '@/util/globals'
  import { useUserStore } from '@/store/user'
  import AppSettingsGroup from './Group.vue'

  export default {
    name: 'DefaultSettingsTheme',

    components: { AppSettingsGroup },

    setup () {
      const user = useUserStore()
      const theme = ref('light')

      function getMatchMedia () {
        return (IN_BROWSER && window.matchMedia) ? window.matchMedia('(prefers-color-scheme: dark)') : false
      }

      function setTheme (value: string) {
        // theme.value = value
        console.log(user)
        user.theme = value
      }

      const items = computed(() => ([
        {
          text: 'light',
          icon: 'mdi-white-balance-sunny',
          cb: () => setTheme('light'),
        },
        {
          text: 'dark',
          icon: 'mdi-weather-night',
          cb: () => setTheme('dark'),
        },
        {
          text: 'system',
          icon: 'mdi-desktop-tower-monitor',
          cb: () => {
            const matchMedia = getMatchMedia()
            if (!matchMedia) return

            matchMedia.matches && setTheme('system')
          },
        },
        {
          text: 'mixed',
          icon: 'mdi-theme-light-dark',
          cb: () => setTheme('mixed'),
        },
      ]))

      function updateTheme (value: string) {
        const item = items.value.find(({ text }) => text === value)

        if (!item) return

        item.cb()
      }

      return {
        items,
        theme,
        user,
        updateTheme,
      }
    },
  }
</script>
