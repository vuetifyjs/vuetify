<template>
  <v-video
    :chapters="chapters"
    class="mx-auto"
    image="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-video-poster.jpg"
    max-width="560"
    src="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-video.mp4"
    eager
  ></v-video>
</template>

<script setup>
  const chapters = [
    { start: 0, title: 'Opening' },
    { start: 12, title: 'Part 1' },
    { start: 30, title: 'Part 2' },
    { start: 50, title: 'Part 3' },
    { start: 70, title: 'Closing' },
  ]
</script>
