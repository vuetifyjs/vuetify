<template>
  <app-btn
    v-if="!hasToggle"
    :icon="icon"
    color="medium-emphasis"
    path="theme"
    @click="onClick"
  />
</template>

<script setup>
  // Composables
  import { useRoute } from 'vue-router'
  import { useTheme } from 'vuetify'
  import { useUserStore } from '@vuetify/one'

  // Utilities
  import { computed } from 'vue'
  import { gtagClick } from '@/util/analytics'

  const theme = useTheme()
  const user = useUserStore()
  const { name } = useRoute()

  const icon = computed(() => theme.global.name.value === 'dark'
    ? 'mdi-weather-night'
    : 'mdi-weather-sunny'
  )
  const hasToggle = computed(() => !['dark', 'light'].includes(theme.name.value))

  function onClick () {
    gtagClick('app-bar', 'theme-toggle', name)
    user.theme = theme.global.name.value === 'dark' ? 'light' : 'dark'
  }
</script>
