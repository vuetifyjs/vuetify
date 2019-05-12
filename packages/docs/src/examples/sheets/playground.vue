<template>
  <v-layout column align-center>
    <v-layout row wrap justify-space-around>
      <v-slider v-model="width" min="0" max="500" label="Width"></v-slider>
      <v-slider v-model="height" min="0" max="500" label="Height"></v-slider>
      <v-slider v-model="elevation" min="0" max="24" label="Elevation"></v-slider>
      <v-select v-model="color" :items="colors" label="Color"></v-select>
      <v-switch v-model="tile" label="Tile"></v-switch>
    </v-layout>
    <v-sheet
      :width="width"
      :height="height"
      :elevation="elevation"
      :color="color"
      :tile="tile"
    ></v-sheet>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      width: 100,
      height: 100,
      elevation: 4,
      colors: ['white', 'gray darken-2', 'warning', 'error', 'success', 'teal'],
      color: 'white',
      tile: false
    })
  }
</script>

<style scoped>
.v-input__slider, .v-select {
  width: 100%;
}
</style>
