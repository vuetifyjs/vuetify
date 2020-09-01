<template>
  <v-file-input
    label="File input"
    v-bind="$attrs"
  ></v-file-input>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        chips: false,
        counter: false,
        disabled: false,
        'hide-input': false,
        multiple: false,
        'show-size': false,
        'small-chips': false,
        'truncate-length': 15,
      },
      options: {
        booleans: [
          'counter',
          'disabled',
          'hide-input',
          'multiple',
          'show-size',
        ],
        sliders: {
          'truncate-length': [1, 50],
        },
      },
      tabs: ['chips', 'small-chips'],
    }),
  }
</script>
