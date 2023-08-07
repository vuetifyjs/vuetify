<template>
  <app-settings-group v-model="user.composition" title="code" :items="items" />
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
      text: 'options',
      icon: 'mdi-google-nearby',
    },
    {
      text: 'composition',
      icon: 'mdi-puzzle-outline',
    },
  ]))
</script>
