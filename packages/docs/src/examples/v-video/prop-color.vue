<template>
  <div>
    <v-video
      :color="color"
      :start-at="10"
      class="mx-auto"
      image="https://jsek.work/vt-sunflowers.jpg"
      src="https://jsek.work/vt-sunflowers.mp4"
      eager
      muted
    ></v-video>

    <div class="d-flex justify-center ga-3">
      <v-icon-btn
        v-for="c in options"
        :key="c"
        :color="c"
        :icon="c ? 'mdi-circle' : 'mdi-circle-outline'"
        variant="text"
        @click="color = c"
      ></v-icon-btn>
      <v-icon-btn
        icon="mdi-palette"
        variant="text"
      >
        <v-icon></v-icon>
        <v-menu :close-on-content-click="false" activator="parent">
          <v-color-picker
            v-model="color"
            hide-canvas
            hide-inputs
            hide-sliders
            show-swatches
          ></v-color-picker>
        </v-menu>
      </v-icon-btn>
    </div>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const color = shallowRef(null)
  const options = [null, 'primary', 'yellow', 'green-darken-1']
</script>
