<template>
  <v-row
    v-resize="onResize"
    align="center"
    justify="center"
  >
    <v-col class="text-center">
      <div class="text-subtitle-2">Window Size</div>
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
