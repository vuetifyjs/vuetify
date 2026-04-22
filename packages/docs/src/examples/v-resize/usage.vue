<template>
  <v-row
    class="align-center justify-center"
    v-resize="onResize"
  >
    <v-col class="text-center">
      <div class="text-title-small">Window Size</div>
      {{ windowSize }}
    </v-col>
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
