<template>
  <v-list>
    <v-list-tile
      v-for="color in ['primary', 'secondary', 'info', 'success', 'warning', 'error']"
      :key="color"
      v-ripple="{ class: `${color}--text` }"
    >
      <v-list-tile-title>Item with "{{ color }}" class</v-list-tile-title>
    </v-list-tile>
  </v-list>
</template>
