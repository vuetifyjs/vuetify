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
    ></v-command-palette>

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)
  const snackbar = ref(false)
  const snackbarText = ref('')

  function showSnackbar (text) {
    snackbarText.value = text
    snackbar.value = true
  }

  const items = [
    {
      id: 'home',
      title: 'Home',
      prependIcon: 'mdi-home',
      handler: () => showSnackbar('Navigating to Home'),
    },
    {
      id: 'settings',
      title: 'Settings',
      prependIcon: 'mdi-cog',
      handler: () => showSnackbar('Opening Settings'),
    },
    {
      id: 'help',
      title: 'Help',
      prependIcon: 'mdi-help-circle',
      handler: () => showSnackbar('Showing Help'),
    },
  ]
</script>

<script>
  import { ref } from 'vue'

  export default {
    setup () {
      const dialog = ref(false)
      const snackbar = ref(false)
      const snackbarText = ref('')

      function showSnackbar (text) {
        snackbarText.value = text
        snackbar.value = true
      }

      const items = [
        {
          id: 'home',
          title: 'Home',
          prependIcon: 'mdi-home',
          handler: () => showSnackbar('Navigating to Home'),
        },
        {
          id: 'settings',
          title: 'Settings',
          prependIcon: 'mdi-cog',
          handler: () => showSnackbar('Opening Settings'),
        },
        {
          id: 'help',
          title: 'Help',
          prependIcon: 'mdi-help-circle',
          handler: () => showSnackbar('Showing Help'),
        },
      ]

      return {
        dialog,
        snackbar,
        snackbarText,
        showSnackbar,
        items,
      }
    },
  }
</script>
