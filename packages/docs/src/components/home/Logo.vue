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
  // Utilities
  import { computed } from 'vue'

  defineProps({
    size: String,
  })

  const logo = computed(() => {
    return `vuetify-logo-light-atom.svg`
  })
</script>
