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
