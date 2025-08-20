<template>
  <div class="d-flex justify-center">
    <v-command-palette
      :close-on-execute="false"
      :items="items"
      :model-value="true"
      class="flex-grow-1"
      hotkeys-scope="focused"
      contained
    ></v-command-palette>

    <v-snackbar v-model="snackbar" :timeout="2000">
      {{ snackbarText }}
    </v-snackbar>
  </div>
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
      type: 'group',
      title: 'Appearance',
      children: [
        { id: 'theme', title: 'Theme', prependIcon: 'mdi-palette', handler: () => showSnackbar('Changing theme') },
        { id: 'fontSize', title: 'Font Size', prependIcon: 'mdi-format-font-size-increase', handler: () => showSnackbar('Changing font size') },
      ],
    },
    {
      type: 'group',
      title: 'Account',
      children: [
        { id: 'profile', title: 'Profile', prependIcon: 'mdi-account-circle', handler: () => showSnackbar('Editing profile') },
        { id: 'logout', title: 'Logout', prependIcon: 'mdi-logout', handler: () => showSnackbar('Logging out') },
      ],
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
          type: 'group',
          title: 'Appearance',
          children: [
            { id: 'theme', title: 'Theme', prependIcon: 'mdi-palette', handler: () => showSnackbar('Changing theme') },
            { id: 'fontSize', title: 'Font Size', prependIcon: 'mdi-format-font-size-increase', handler: () => showSnackbar('Changing font size') },
          ],
        },
        {
          type: 'group',
          title: 'Account',
          children: [
            { id: 'profile', title: 'Profile', prependIcon: 'mdi-account-circle', handler: () => showSnackbar('Editing profile') },
            { id: 'logout', title: 'Logout', prependIcon: 'mdi-logout', handler: () => showSnackbar('Logging out') },
          ],
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
