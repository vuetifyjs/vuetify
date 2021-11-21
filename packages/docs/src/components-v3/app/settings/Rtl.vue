<template>
  <app-settings-group v-model="user.direction" title="direction" :items="items" />
</template>

<script>
  import { computed, watch } from 'vue'
  import { useUserStore } from '@/store-v3/user'
  import AppSettingsGroup from './Group.vue'

  export default {
    name: 'SettingsRtl',

    components: { AppSettingsGroup },

    setup () {
      const user = useUserStore()
      const items = computed(() => ([
        {
          text: 'ltr',
          icon: 'mdi-format-textdirection-l-to-r',
        },
        {
          text: 'rtl',
          icon: 'mdi-format-textdirection-r-to-l',
        },
      ]))

      watch(() => user.direction, value => {
        console.log('dir', value)
      })

      return { items, user }
    },
  }
</script>
