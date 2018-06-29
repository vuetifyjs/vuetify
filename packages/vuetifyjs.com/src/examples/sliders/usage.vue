<template>
  <v-container
    fluid
    grid-list-lg
  >
    <v-layout
      row
      wrap
    >
      <v-flex xs12>
        <v-slider
          v-model="slider"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-slider
          disabled
          label="Disabled"
          inverse-label
          value="30"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-slider
          label="Readonly"
          readonly
          value="30"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-slider
          v-model="slider"
          label="Label"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-slider
          v-model="slider"
          inverse-label
          label="Inverse label"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-slider
          v-model="volume"
          append-icon="volume_up"
          prepend-icon="volume_down"
        ></v-slider>
      </v-flex>

      <v-flex
        shrink
        style="width: 60px"
      >
        <v-text-field
          v-model="price[0]"
          class="mt-0"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-flex>

      <v-flex>
        <v-range-slider
          v-model="price"
          :max="600"
          :min="20"
          :step="10"
        ></v-range-slider>
      </v-flex>

      <v-flex
        shrink
        style="width: 60px"
      >
        <v-text-field
          v-model="price[1]"
          class="mt-0"
          hide-details
          single-line
          type="number"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        slider: 45,
        volume: 10,
        price: [110, 440]
      }
    }
  }
</script>
