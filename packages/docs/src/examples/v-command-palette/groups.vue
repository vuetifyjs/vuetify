<template>
  <div class="text-center">
    <v-command-palette
      :items="items"
      :model-value="true"
      contained
    ></v-command-palette>
  </div>
</template>

<script setup>
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
