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
        <v-subheader class="pl-0">Custom thumb size</v-subheader>
        <v-slider
          v-model="slider"
          :thumb-size="24"
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
        slider: 45
      }
    }
  }
</script>
