<template>
  <app-tooltip-btn
    :icon="icon"
    color="medium-emphasis"
    path="theme"
    @click="onClick"
  />
</template>

<script setup>
  // Components
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  // Composables
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed } from 'vue'

  const user = useUserStore()

  const icon = computed(() => user.theme === 'dark'
    ? 'mdi-weather-night'
    : 'mdi-weather-sunny'
  )

  function onClick () {
    user.theme = user.theme === 'dark' ? 'light' : 'dark'
  }
</script>
