<template>
  <v-carousel
    height="400"
    hide-delimiter-background
    show-arrows
  >
    <template v-slot:prev="{ props }">
      <v-btn
        color="success"
        variant="elevated"
        @click="props.onClick"
      >Previous slide</v-btn>
    </template>
    <template v-slot:next="{ props }">
      <v-btn
        color="info"
        variant="elevated"
        @click="props.onClick"
      >Next slide</v-btn>
    </template>
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
  const colors = [
    'indigo',
    'warning',
    'pink darken-2',
    'red lighten-1',
    'deep-purple accent-4',
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
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
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
