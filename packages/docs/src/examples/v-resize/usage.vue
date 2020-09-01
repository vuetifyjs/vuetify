<template>
  <v-row
    v-resize="onResize"
    align="center"
    justify="center"
  >
    <v-subheader>Window Size</v-subheader>
    {{ windowSize }}
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      windowSize: {
        x: 0,
        y: 0,
      },
    }),

    mounted () {
      this.onResize()
    },

    methods: {
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },
    },
  }
</script>
