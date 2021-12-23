<template>
  <app-settings-group v-model="user.api" title="api" :items="items" />
</template>

<script>
  import { computed, watch } from 'vue'
  import { useUserStore } from '@/store/user'
  import AppSettingsGroup from './Group.vue'

  export default {
    name: 'SettingsApi',

    components: { AppSettingsGroup },

    setup () {
      const user = useUserStore()
      const items = computed(() => ([
        {
          text: 'link-only',
          icon: 'mdi-link',
        },
        {
          text: 'inline',
          icon: 'mdi-format-wrap-inline',
        },
      ]))

      watch(() => user.api, value => {
        console.log('api', value)
      })

      return { items, user }
    },
  }
</script>
