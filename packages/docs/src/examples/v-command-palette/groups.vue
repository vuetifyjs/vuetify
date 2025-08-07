<template>
  <div class="text-center">
    <v-btn
      color="primary"
      @click="dialog = true"
    >
      Open Grouped Palette
    </v-btn>

    <v-command-palette
      v-model="dialog"
      :items="items"
      title="Application Settings"
    />
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)

  const items = [
    {
      type: 'group',
      title: 'Appearance',
      children: [
        { id: 'theme', title: 'Theme', prependIcon: 'mdi-palette', handler: () => alert('Changing theme') },
        { id: 'fontSize', title: 'Font Size', prependIcon: 'mdi-format-font-size-increase', handler: () => alert('Changing font size') },
      ],
    },
    {
      type: 'group',
      title: 'Account',
      children: [
        { id: 'profile', title: 'Profile', prependIcon: 'mdi-account-circle', handler: () => alert('Editing profile') },
        { id: 'logout', title: 'Logout', prependIcon: 'mdi-logout', handler: () => alert('Logging out') },
      ],
    },
  ]
</script>

