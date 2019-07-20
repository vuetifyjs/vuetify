<template>
  <v-card flat color="transparent">
    <v-subheader>Min and max default slider</v-subheader>

    <v-card-text>
      <v-layout row>
        <v-flex class="pr-4">
          <v-slider
            v-model="slider"
            class="align-center"
            :max="max"
            :min="min"
            hide-details
          >
            <template v-slot:append>
              <v-text-field
                v-model="slider"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
              ></v-text-field>
            </template>
          </v-slider>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-subheader>Min and max range slider</v-subheader>

    <v-card-text>
      <v-layout row>
        <v-flex class="px-4">
          <v-range-slider
            v-model="range"
            :max="max"
            :min="min"
            hide-details
            class="align-center"
          >
            <template v-slot:prepend>
              <v-text-field
                v-model="range[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
              ></v-text-field>
            </template>
            <template v-slot:append>
              <v-text-field
                v-model="range[1]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
              ></v-text-field>
            </template>
          </v-range-slider>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        min: -50,
        max: 90,
        slider: 40,
        range: [-20, 70],
      }
    },
  }
</script>
