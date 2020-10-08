<template>
  <v-time-picker
    v-bind="$attrs"
    v-on="$listeners"
  ></v-time-picker>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        'ampm-in-title': false,
        disabled: false,
        format: 'ampm',
        'full-width': false,
        landscape: false,
        'no-title': false,
        readonly: false,
        scrollable: false,
        'use-seconds': false,
      },
      options: {
        booleans: [
          'ampm-in-title',
          'disabled',
          'full-width',
          'no-title',
          'readonly',
          'use-seconds',
        ],
        btnToggles: {
          format: ['ampm', '24hr'],
        },
      },
      tabs: ['landscape', 'scrollable'],
    }),
  }
</script>
