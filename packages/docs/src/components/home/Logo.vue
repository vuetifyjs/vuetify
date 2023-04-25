<template>
  <v-img
    :height="size"
    :src="`https://cdn.vuetifyjs.com/docs/images/logos/${logo}`"
    :width="size"
    alt="Vuetify Logo"
    class="mx-auto"
    max-width="100%"
  />
</template>

<script setup>
  // Composables
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed } from 'vue'

  defineProps({
    size: String,
  })

  const theme = useTheme()

  const logo = computed(() => {
    return `vuetify-logo-v3-${theme.name.value}.svg`
  })
</script>
