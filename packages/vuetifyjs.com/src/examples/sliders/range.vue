<template>
  <v-card flat color="transparent">
    <v-subheader>Default range slider</v-subheader>

    <v-card-text>
      <v-range-slider
        v-model="value1"
      ></v-range-slider>
    </v-card-text>

    <v-subheader>Disabled range slider</v-subheader>

    <v-card-text>
      <v-range-slider
        v-model="value2"
        disabled
      ></v-range-slider>
    </v-card-text>

    <v-subheader>Min and max range slider</v-subheader>

    <v-card-text>
      <v-layout row>
        <v-flex shrink style="width: 60px">
          <v-text-field
            v-model="value3[0]"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>

        <v-flex class="px-3">
          <v-range-slider
            v-model="value3"
            :max="600"
            :min="20"
            :step="10"
          ></v-range-slider>
        </v-flex>

        <v-flex shrink style="width: 60px">
          <v-text-field
            v-model="value3[1]"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        value1: [30, 60],
        value2: [0, 40],
        value3: [110, 440]
      }
    }
  }
</script>
