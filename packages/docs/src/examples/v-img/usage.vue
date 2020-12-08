<template>
  <v-row
    align="center"
    justify="center"
  >
    <v-img
      class="grey lighten-2"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-img>
  </v-row>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      show: true,
      defaults: {
        contain: false,
        'lazy-src': 'https://picsum.photos/id/11/10/6',
        'max-height': 150,
        'max-width': 250,
        src: 'https://picsum.photos/id/11/500/300',
      },
      options: {
        booleans: [
          'contain',
        ],
        sliders: {
          'max-height': [0, 300],
          'max-width': [0, 500],
        },
      },
      tabs: [],
    }),
  }
</script>
