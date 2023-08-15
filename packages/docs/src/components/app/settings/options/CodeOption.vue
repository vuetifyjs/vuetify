<template>
  <v-switch
    v-model="user.composition"
    class="ps-3 flex-0-0"
    color="success"
    density="compact"
    false-value="options"
    inset
    label="Enable Composition API"
    messages="Determines the script shown in code examples for components."
    true-value="composition"
  />
</template>

<script setup>
  // Composables
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
