<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.slashSearch ? 'primary' : 'disabled'
      }
    }"
  >
    <v-switch
      v-model="user.slashSearch"
      class="ps-3 flex-0-0"
      inset
      color="primary"
      label="Use / for Search hotkey"
      messages="The option sets the bound search key to '/' from Ctrl+K."
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
