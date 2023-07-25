<template>
  <v-switch
    v-model="user.quickbar"
    class="ps-3 flex-0-0"
    inset
    color="success"
    label="Enable Quickbar"
    messages="The quickbar is a small toolbar that appears in the navigation drawer on the bottom left of the screen. It provides quick access to common actions and settings."
    density="compact"
  />

  <br>

  <developer-mode />
</template>

<script setup>
  // Components
  import DeveloperMode from './DeveloperMode.vue'

  import { useUserStore } from '@/store/user'

  const user = useUserStore()
</script>
