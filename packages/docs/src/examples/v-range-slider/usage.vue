<template>
  <v-row justify="space-around">
    <v-col cols="12">
      <v-range-slider
        v-model="range"
        label="Range Slider"
        v-bind="$attrs"
        v-on="$listeners"
      ></v-range-slider>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      range: [-25, 25],
      defaults: {
        dense: false,
        disabled: false,
        'hide-details': false,
        hint: 'Im a hint',
        'inverse-label': false,
        max: 50,
        min: -50,
        'persistent-hint': false,
        readonly: false,
        vertical: false,
      },
      options: {
        booleans: [
          'disabled',
          'hide-details',
          'inverse-label',
          'persistent-hint',
          'readonly',
        ],
        sliders: {
          min: [-100, 100],
          max: [-100, 100],
        },
      },
      tabs: ['dense', 'vertical'],
    }),
  }
</script>
