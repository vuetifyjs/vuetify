<template>
  <div class="d-flex flex-wrap align-start justify-center ga-6">
    <div v-for="density in options" :key="density">
      <v-video
        :density="density"
        height="150"
        image="https://cdn.jsek.work/cdn/vt-sunflowers.jpg"
        rounded="lg"
        src="https://cdn.jsek.work/cdn/vt-sunflowers.mp4"
        start-at="10"
        volume="80"
        width="250"
        detached
        eager
      ></v-video>
      <v-overlay>
        <v-chip class="ma-2">{{ density }}</v-chip>
      </v-overlay>
    </div>
  </div>
</template>

<script setup lang="ts">
  const options = ['default', 'comfortable', 'compact'] as const
</script>

<script lang="ts">
  export default {
    data: () => ({
      options: ['default', 'comfortable', 'compact'] as const,
    }),
  }
</script>
