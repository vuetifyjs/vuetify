<template>
  <v-container>
    <v-card>
      <v-card-title>Contained Palette</v-card-title>
      <v-card-text>
        The VCommandPalette can be rendered inline within any component using the <code>contained</code> prop.
      </v-card-text>
    </v-card>
    <v-command-palette
      :items="items"
      :model-value="true"
      contained
    ></v-command-palette>
  </v-container>
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
