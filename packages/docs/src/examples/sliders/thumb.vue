<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12>
        <v-subheader class="pl-0">Show thumb when using slider</v-subheader>
        <v-slider
          v-model="slider"
          thumb-label
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-subheader class="pl-0">Always show thumb label</v-subheader>
        <v-slider
          v-model="slider"
          thumb-label="always"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-subheader class="pl-0">Custom thumb color</v-subheader>
        <v-slider
          v-model="slider"
          thumb-color="red"
          thumb-label="always"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-subheader class="pl-0">Custom thumb size</v-subheader>
        <v-slider
          v-model="slider"
          :thumb-size="24"
          thumb-label="always"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-subheader class="pl-0">Always dirty</v-subheader>
        <v-slider
          v-model="slider"
          always-dirty
          hint="Try set it to '0'"
          persistent-hint
          thumb-label="always"
        ></v-slider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        slider: 45,
        selectedSeason: 0
      }
    },

    methods: {
      season (val) {
        switch (val) {
          case 0: return 'Winter'
          case 1: return 'Spring'
          case 2: return 'Summer'
          case 3: return 'Fall'
        }
      }
    }
  }
</script>
