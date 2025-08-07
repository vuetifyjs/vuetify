<template>
  <v-card>
    <v-card-title>Contained Palette</v-card-title>
    <v-card-text>
      The VCommandPalette can be rendered inline within any component using the <code>contained</code> prop.
    </v-card-text>
    <v-divider />
    <v-command-palette
      :items="items"
      contained
      :model-value="true"
    />
  </v-card>
</template>

<script setup>
  const items = [
    {
      id: 'profile',
      title: 'Profile',
      prependIcon: 'mdi-account',
    },
    {
      id: 'settings',
      title: 'Settings',
      prependIcon: 'mdi-cog',
    },
  ]
</script>

