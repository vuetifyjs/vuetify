<template>
  <div style="width: 100%;">
    <v-banner
      v-bind="$attrs"
      v-on="$listeners"
    >
      A banner for use on desktop / mobile
    </v-banner>
  </div>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      defaults: {
        elevation: null,
        icon: null,
        color: null,
        'single-line': false,
        outlined: false,
        rounded: false,
        shaped: false,
        tile: false,
      },
      options: {
        selects: {
          icon: ['$mdiAccount', '$mdiVuetify'],
          color: [
            'accent',
            'primary',
            'secondary',
          ],
        },
        sliders: {
          elevation: [0, 24],
        },
      },
      tabs: [
        'single-line',
        'sticky',
        'outlined',
        'rounded',
        'shaped',
        'tile',
        'dark',
      ],
    }),
  }
</script>
