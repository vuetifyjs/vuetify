<template>
  <app-settings-group v-model="user.direction" title="direction" :items="items" />
</template>

<script setup>
  // Components
  import AppSettingsGroup from './Group.vue'

  // Composables
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed } from 'vue'

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
</script>
