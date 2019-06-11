<template>
  <v-layout justify-center wrap>
    <v-btn
      color="light-blue"
      class="mt-5"
      @click="overlay = !overlay"
    >
      Show Overlay
    </v-btn>

    <v-overlay
      :absolute="absolute"
      :opacity="opacity"
      :value="overlay"
      :z-index="zIndex"
    >
      <v-btn
        @click="overlay = false"
      >
        Close Overlay
      </v-btn>
    </v-overlay>

    <v-flex xs12>
      <v-container grid-list-md>
        <v-radio-group row>
          <v-text-field
            v-model="opacity"
            label="Opacity"
            max="1"
            min="0"
            step=".01"
            style="width: 125px"
            type="number"
            @keydown="false"
          ></v-text-field>
          <v-checkbox
            v-model="absolute"
            label="Absolute"
          ></v-checkbox>

          <v-checkbox
            v-model="overlay"
            label="value"
            class="ml-4"
          ></v-checkbox>
        </v-radio-group>

        <v-flex xs12>
          <v-subheader>z-index</v-subheader>

          <v-slider
            v-model="zIndex"
            class="align-center"
            hide-details
            :max="max"
            :min="min"
          >
            <template #append>
              <v-text-field
                v-model="zIndex"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 60px"
              ></v-text-field>
            </template>
          </v-slider>
        </v-flex>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      absolute: false,
      max: 50,
      min: -50,
      opacity: 0.46,
      overlay: false,
      zIndex: 5,
    }),
  }
</script>
