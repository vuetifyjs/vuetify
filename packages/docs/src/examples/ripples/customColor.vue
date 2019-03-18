<template>
  <v-list>
    <v-list-item
      v-for="color in ['primary', 'secondary', 'info', 'success', 'warning', 'error']"
      :key="color"
      v-ripple="{ class: `${color}--text` }"
    >
      <v-list-item-title>Item with "{{ color }}" class</v-list-item-title>
    </v-list-item>
  </v-list>
</template>
