<template>
  <v-carousel
    height="300"
    mousewheel
  >
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="i"
      :color="color"
    >
      <div class="d-flex fill-height align-center justify-center text-h5 text-white">
        Slide {{ i + 1 }}
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
  const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error']
</script>
