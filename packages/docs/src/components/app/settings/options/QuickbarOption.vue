<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.quickbar ? 'primary' : 'disabled'
      }
    }"
  >
    <v-switch
      v-model="user.quickbar"
      class="ps-3 flex-0-0"
      inset
      color="primary"
      label="Enable Quickbar"
      messages="The quickbar is a small toolbar that appears in the navigation drawer on the bottom left of the screen. It provides quick access to common actions and settings."
      density="compact"

      true-icon="mdi-check"
      false-icon="$close"
    />
  </v-defaults-provider>
</template>

<script setup>
  // Stores
  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
