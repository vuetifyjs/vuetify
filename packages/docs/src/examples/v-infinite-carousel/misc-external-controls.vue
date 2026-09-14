<template>
  <v-container>
    <v-infinite-carousel ref="carousel" :paused="!playing" shift-distance="20%">
      <v-chip v-for="item in items" :key="item" color="primary">{{ item }}</v-chip>
    </v-infinite-carousel>

    <div class="d-flex justify-end ga-2 mt-4">
      <v-icon-btn
        aria-label="Previous"
        color="primary"
        icon="$arrowleft"
        icon-size="16"
        rounded="sm"
        size="24"
        variant="elevated"
        @click="carousel.slide('prev')"
      ></v-icon-btn>

      <v-icon-btn
        :aria-label="playing ? 'Pause' : 'Play'"
        :icon="playing ? '$pause' : '$play'"
        color="primary"
        icon-size="16"
        rounded="sm"
        size="24"
        variant="elevated"
        @click="playing = !playing"
      ></v-icon-btn>

      <v-icon-btn
        aria-label="Next"
        color="primary"
        icon="$arrowright"
        icon-size="16"
        rounded="sm"
        size="24"
        variant="elevated"
        @click="carousel.slide('next')"
      ></v-icon-btn>
    </div>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const carousel = ref()
  const playing = ref(true)
  const items = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`)
</script>
