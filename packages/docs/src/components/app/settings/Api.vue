<template>
  <app-settings-group v-model="user.api" title="api" :items="items" />
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
      text: 'link-only',
      icon: 'mdi-link',
    },
    {
      text: 'inline',
      icon: 'mdi-format-wrap-inline',
    },
  ]))
</script>
