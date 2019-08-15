<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-subheader class="pl-0">Show thumb when using slider</v-subheader>
        <v-slider
          v-model="slider"
          thumb-label
        ></v-slider>
      </v-col>

      <v-col cols="12">
        <v-subheader class="pl-0">Always show thumb label</v-subheader>
        <v-slider
          v-model="slider"
          thumb-label="always"
        ></v-slider>
      </v-col>

      <v-col cols="12">
        <v-subheader class="pl-0">Custom thumb size</v-subheader>
        <v-slider
          v-model="slider"
          :thumb-size="24"
          thumb-label="always"
        ></v-slider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        slider: 45,
      }
    },
  }
</script>
