<template>
  <v-switch
    v-model="user.api"
    class="ps-3 flex-0-0"
    inset
    color="success"
    label="Enable Inline API"
    messages="Display API tables inline on documentation pages."
    density="compact"
  />
</template>

<script setup>
  // Composables
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
