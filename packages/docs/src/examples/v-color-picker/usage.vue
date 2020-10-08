<template>
  <v-container class="fill-height">
    <v-row
      align="center"
      justify="center"
    >
      <v-color-picker
        v-bind="$attrs"
        v-on="$listeners"
      ></v-color-picker>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        disabled: false,
        'dot-size': 25,
        'hide-canvas': false,
        'hide-inputs': false,
        'hide-mode-switch': false,
        mode: null,
        'show-swatches': false,
        'swatches-max-height': 200,
      },
      options: {
        booleans: [
          'disabled',
          'hide-canvas',
          'hide-inputs',
          'hide-mode-switch',
          'show-swatches',
        ],
        selects: {
          mode: [
            'rgba',
            'hsla',
            'hexa',
          ],
        },
        sliders: {
          'dot-size': [0, 50],
          'swatches-max-height': [100, 250],
        },
      },
      tabs: [],
    }),
  }
</script>
