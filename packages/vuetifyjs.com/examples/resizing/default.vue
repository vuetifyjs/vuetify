<template>
  <v-layout v-resize="onResize" column align-center justify-center>
    <v-subheader>Window Size</v-subheader>
    {{ windowSize }}
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      windowSize: {
        x: 0,
        y: 0
      }
    }),

    mounted () {
      this.onResize()
    },

    methods: {
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      }
    }
  }
</script>
