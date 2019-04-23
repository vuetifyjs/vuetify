<template>
  <v-layout row justify-space-around>
    <v-color-picker hide-inputs></v-color-picker>
    <v-color-picker hide-mode-switch></v-color-picker>
    <v-layout column style="flex: 0 0 auto">
      <v-color-picker :mode.sync="mode"></v-color-picker>
      <v-select v-model="mode" :items="modes" style="max-width: 300px"></v-select>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      mode: 'hsla',
      modes: ['hsla', 'rgba', 'hexa']
    })
  }
</script>
