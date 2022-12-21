<template>
  <app-btn
    :icon="icon"
    color="medium-emphasis"
    path="theme"
    @click="onClick"
  />
</template>

<script setup>
  // Composables
  import { useRoute } from 'vue-router'
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed } from 'vue'
  import { gtagClick } from '@/util/analytics'

  const user = useUserStore()
  const { name } = useRoute()

  const icon = computed(() => user.theme === 'dark'
    ? 'mdi-weather-night'
    : 'mdi-weather-sunny'
  )

  function onClick () {
    gtagClick('app-bar', 'theme-toggle', name)
    user.theme = user.theme === 'dark' ? 'light' : 'dark'
  }
</script>
