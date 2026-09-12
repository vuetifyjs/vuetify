<template>
  <v-container>
    <v-infinite-carousel class="mb-6" speed="120">
      <v-chip v-for="item in items" :key="item" color="primary">{{ item }}</v-chip>
    </v-infinite-carousel>

    <v-infinite-carousel class="mb-6" reverse>
      <v-chip v-for="item in items" :key="item" color="secondary">{{ item }}</v-chip>
    </v-infinite-carousel>

    <v-infinite-carousel draggable paused>
      <v-chip v-for="item in items" :key="item" color="surface-variant">{{ item }}</v-chip>
    </v-infinite-carousel>
  </v-container>
</template>

<script setup>
  const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)
</script>
