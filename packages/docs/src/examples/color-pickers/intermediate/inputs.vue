<template>
  <v-layout wrap justify-space-around>
    <v-color-picker class="ma-2" hide-inputs></v-color-picker>
    <v-color-picker class="ma-2" hide-mode-switch></v-color-picker>
    <v-layout class="ma-2" column style="flex: 0 0 auto">
      <v-color-picker :mode.sync="mode"></v-color-picker>
      <v-select v-model="mode" :items="modes" style="max-width: 300px"></v-select>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      mode: 'hsla',
      modes: ['hsla', 'rgba', 'hexa'],
    }),
  }
</script>
