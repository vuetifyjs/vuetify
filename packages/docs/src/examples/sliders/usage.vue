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
          v-model="slider2"
          label="Label"
        ></v-slider>
      </v-flex>

      <v-flex xs12>
        <v-slider
          disabled
          label="Disabled"
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
          v-model="slider3"
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

      <v-flex xs12>
        <v-range-slider
          v-model="price"
          :max="600"
          :min="20"
          :step="10"
          hide-details
        >
          <template #prepend>
            <v-text-field
              v-model="price[0]"
              class="pt-0 mt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
            ></v-text-field>
          </template>
          <template #append>
            <v-text-field
              v-model="price[1]"
              class="pt-0 mt-0"
              hide-details
              single-line
              type="number"
              style="width: 60px"
            ></v-text-field>
          </template>
        </v-range-slider>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        slider: 45,
        slider2: 45,
        slider3: 45,
        volume: 10,
        price: [110, 440]
      }
    }
  }
</script>
