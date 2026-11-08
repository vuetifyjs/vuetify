<template>
  <div class="d-flex justify-center">
    <v-video
      max-width="450"
      eager
    >
      <template v-slot:sources>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
          type="video/webm"
        >
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        >
      </template>
    </v-video>
  </div>
</template>
