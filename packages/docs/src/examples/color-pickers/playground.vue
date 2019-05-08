<template>
  <div>
    <v-container>
      <v-layout
        justify-center
        wrap
      >
        <v-flex xs3>
          <v-switch
            v-model="showSwatches"
            label="Show Swatches"
          ></v-switch>
          <v-switch
            v-model="hideInputs"
            label="Hide Inputs"
          ></v-switch>
          <v-switch
            v-model="hideCanvas"
            label="Hide Canvas"
          ></v-switch>
          <v-switch
            v-model="hideModeSwitch"
            label="Hide Mode Switch"
          ></v-switch>
        </v-flex>

        <v-flex xs3>
          <v-select
            v-model="mode"
            :items="modes"
            label="Mode"
          ></v-select>
        </v-flex>
      </v-layout>
    </v-container>

    <div class="my-4"></div>

    <v-color-picker
      v-model="color"
      :hide-canvas="hideCanvas"
      :hide-inputs="hideInputs"
      :hide-mode-switch="hideModeSwitch"
      :mode.sync="mode"
      :show-swatches="showSwatches"
      class="mx-auto"
    ></v-color-picker>
  </div>
</template>

<script>
  export default {
    data: () => ({
      color: '#8E00FF',
      hideCanvas: false,
      hideInputs: false,
      hideModeSwitch: false,
      mode: 'rgba',
      modes: ['rgba', 'hsla', 'hexa'],
      showSwatches: false
    })
  }
</script>
