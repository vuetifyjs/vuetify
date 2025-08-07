<template>
  <div class="text-center">
    <v-btn
      color="primary"
      @click="dialog = true"
    >
      Open Command Palette
    </v-btn>

    <v-command-palette
      v-model="dialog"
      :items="items"
      title="Vuetify"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)

  const items = [
    {
      id: 'home',
      title: 'Home',
      prependIcon: 'mdi-home',
      handler: () => alert('Navigating to Home'),
    },
    {
      id: 'settings',
      title: 'Settings',
      prependIcon: 'mdi-cog',
      handler: () => alert('Opening Settings'),
    },
    {
      id: 'help',
      title: 'Help',
      prependIcon: 'mdi-help-circle',
      handler: () => alert('Showing Help'),
    },
  ]
</script>

