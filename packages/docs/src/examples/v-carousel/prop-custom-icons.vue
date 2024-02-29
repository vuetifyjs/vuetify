<template>
  <v-card
    class="mx-auto"
    elevation="24"
    max-width="444"
  >
    <v-carousel
      :continuous="false"
      :show-arrows="false"
      delimiter-icon="mdi-square"
      height="300"
      hide-delimiter-background
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
      >
        <v-sheet
          :color="colors[i]"
          height="100%"
          tile
        >
          <div class="d-flex fill-height justify-center align-center">
            <div class="text-h2">
              {{ slide }} Slide
            </div>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script setup>
  const colors = [
    'green',
    'secondary',
    'yellow darken-4',
    'red lighten-2',
    'orange darken-1',
  ]
  const slides = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
  ]
</script>

<script>
  export default {
    data () {
      return {
        colors: [
          'green',
          'secondary',
          'yellow darken-4',
          'red lighten-2',
          'orange darken-1',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
  }
</script>
