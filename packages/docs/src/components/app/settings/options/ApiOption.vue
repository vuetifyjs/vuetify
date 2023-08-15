<template>
  <v-switch
    v-model="user.api"
    class="ps-3 flex-0-0"
    color="success"
    density="compact"
    false-value="link-only"
    inset
    label="Enable Inline API"
    messages="Display API tables inline on documentation pages."
    true-value="inline"
  />
</template>

<script setup>
  // Composables
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
