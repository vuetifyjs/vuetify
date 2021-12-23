<template>
  <app-settings-group v-model="model" title="theme" :items="items" multiple />
</template>

<script lang="ts">
  import { computed } from 'vue'
  import { useUserStore } from '@/store/user'
  import AppSettingsGroup from './Group.vue'

  export default {
    name: 'AppSettingsTheme',

    components: { AppSettingsGroup },

    setup () {
      const user = useUserStore()

      const items = computed(() => ([
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
      ]))

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

      return {
        items,
        user,
        model,
      }
    },
  }
</script>
