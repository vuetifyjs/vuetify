<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.composition === 'composition' ? 'primary' : 'disabled'
      }
    }"
  >
    <v-switch
      v-model="user.composition"
      class="ps-3 flex-0-0"
      color="primary"
      density="compact"
      false-value="options"
      inset
      label="Enable Composition API"
      messages="Determines the script shown in code examples for components."
      true-value="composition"
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
