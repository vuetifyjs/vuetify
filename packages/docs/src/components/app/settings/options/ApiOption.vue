<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.api === 'inline' ? 'primary' : 'disabled'
      }
    }"
  >
    <v-switch
      v-model="user.api"
      class="ps-3 flex-0-0"
      color="primary"
      density="compact"
      false-value="link-only"
      inset
      label="Enable Inline API"
      messages="Display API tables inline on documentation pages."
      true-value="inline"
      true-icon="mdi-check"
      false-icon="$close"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
