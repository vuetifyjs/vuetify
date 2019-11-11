<template>
  <div>
    <v-container>
      <v-row
        justify="space-around"
      >
        <v-switch
          v-model="showSwatches"
          class="mx-2"
          label="Show Swatches"
        ></v-switch>
        <v-switch
          v-model="hideInputs"
          class="mx-2"
          label="Hide Inputs"
        ></v-switch>
        <v-switch
          v-model="hideCanvas"
          class="mx-2"
          label="Hide Canvas"
        ></v-switch>
        <v-switch
          v-model="hideModeSwitch"
          class="mx-2"
          label="Hide Mode Switch"
        ></v-switch>

        <v-col class="mx-2" cols="3">
          <v-select
            v-model="mode"
            :items="modes"
            label="Mode"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

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
      showSwatches: false,
    }),
  }
</script>
