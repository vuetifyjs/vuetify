<template>
  <v-container>
    <v-infinite-carousel class="mb-6" shift-distance="100%" auto-play show-arrows>
      <v-chip v-for="item in items" :key="item" color="primary">{{ item }}</v-chip>
    </v-infinite-carousel>

    <v-infinite-carousel shift-distance="10rem" show-arrows="hover" auto-play>
      <v-chip v-for="item in items" :key="item" color="secondary">{{ item }}</v-chip>
    </v-infinite-carousel>
  </v-container>
</template>

<script setup>
  const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)
</script>
