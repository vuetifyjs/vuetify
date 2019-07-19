<template>
  <div>
    <v-layout row justify-space-around>
      <v-icon @click="model--">mdi-minus</v-icon>
      {{ model }}
      <v-icon @click="model++">mdi-plus</v-icon>
    </v-layout>
    <v-carousel v-model="model">
      <v-carousel-item
        v-for="(color, i) in colors"
        :key="color"
      >
        <v-sheet
          :color="color"
          height="100%"
          tile
        >
          <v-layout
            align-center
            fill-height
            justify-center
          >
            <div class="display-3">Slide {{ i + 1 }}</div>
          </v-layout>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        colors: [
          'primary',
          'secondary',
          'yellow darken-2',
          'red',
          'orange',
        ],
        model: 0,
      }
    },
  }
</script>
