<template>
  <v-layout justify-center wrap>
    <v-flex xs12>
      <v-layout align-center column>
        <v-btn
          class="mt-5"
          color="primary"
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
            color="primary"
            @click="overlay = false"
          >
            Hide Overlay
          </v-btn>
        </v-overlay>
      </v-layout>
    </v-flex>

    <v-layout justify-center row>
      <v-radio-group row>
        <v-checkbox
          v-model="absolute"
          label="Absolute"
        ></v-checkbox>
        <v-checkbox
          v-model="overlay"
          class="mx-4"
          label="value"
        ></v-checkbox>
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
        <v-text-field
          v-model="zIndex"
          label="z-index"
          max="9999"
          min="-9999"
          step="1"
          style="width: 125px"
          type="number"
          @keydown="false"
        ></v-text-field>
      </v-radio-group>
    </v-layout>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      absolute: false,
      opacity: 0.46,
      overlay: false,
      zIndex: 5,
    }),
  }
</script>
