<template>
  <v-container class="d-flex flex-column align-center justify-center">
    <v-card class="align-self-stretch mb-3">
      <v-card-title>Contained Palette</v-card-title>
      <v-card-text>
        The VCommandPalette can be rendered inline within any component using the <code>contained</code> prop.
      </v-card-text>
    </v-card>
    <v-command-palette
      :close-on-execute="false"
      :items="items"
      :model-value="true"
      class="align-self-stretch mx-auto"
      hotkeys-scope="focused"
      contained
    ></v-command-palette>

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackbarText }}
    </v-snackbar>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const snackbar = ref(false)
  const snackbarText = ref('')

  function showSnackbar (text) {
    snackbarText.value = text
    snackbar.value = true
  }

  const items = [
    {
      id: 'profile',
      title: 'Profile',
      prependIcon: 'mdi-account',
      handler: () => showSnackbar('Opening Profile'),
    },
    {
      id: 'settings',
      title: 'Settings',
      prependIcon: 'mdi-cog',
      handler: () => showSnackbar('Opening Settings'),
    },
  ]
</script>

<script>
  import { ref } from 'vue'

  export default {
    setup () {
      const snackbar = ref(false)
      const snackbarText = ref('')

      function showSnackbar (text) {
        snackbarText.value = text
        snackbar.value = true
      }

      const items = [
        {
          id: 'profile',
          title: 'Profile',
          prependIcon: 'mdi-account',
          handler: () => showSnackbar('Opening Profile'),
        },
        {
          id: 'settings',
          title: 'Settings',
          prependIcon: 'mdi-cog',
          handler: () => showSnackbar('Opening Settings'),
        },
      ]

      return {
        snackbar,
        snackbarText,
        showSnackbar,
        items,
      }
    },
  }
</script>
