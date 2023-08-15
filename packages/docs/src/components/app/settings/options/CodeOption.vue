<template>
  <v-switch
    v-model="user.composition"
    class="ps-3 flex-0-0"
    inset
    color="success"
    label="Enable Composition API"
    messages="Determines the script shown in code examples for components."
    density="compact"
  />
</template>

<script setup>
  // Composables
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
