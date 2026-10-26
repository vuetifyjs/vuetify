<template>
  <v-video
    actions="play (prev next) elapsed progress remaining (volume cc fullscreen)"
    class="mx-auto"
    color="primary"
    image="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-video-poster.jpg"
    max-width="560"
    rounded="lg"
    src="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-video.mp4"
    eager
    pills
  >
    <template v-slot:action.prev>
      <v-icon-btn aria-label="Previous" icon="mdi-skip-previous"></v-icon-btn>
    </template>

    <template v-slot:action.next>
      <v-icon-btn aria-label="Next" icon="mdi-skip-next"></v-icon-btn>
    </template>

    <template v-slot:action.cc>
      <v-icon-btn aria-label="Captions" icon="mdi-closed-caption"></v-icon-btn>
    </template>
  </v-video>
</template>
