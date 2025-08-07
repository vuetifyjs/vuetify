<template>
  <v-video
    :volume="50"
    :volume-props="{ direction: 'horizontal', menuProps: { location: 'top left' } }"
    class="mx-auto"
    controls-variant="tube"
    density="comfortable"
    image="https://jsek.work/vt-video-poster.jpg"
    max-width="450"
    rounded="lg"
    src="https://jsek.work/vt-video.mp4"
    track-color="red"
    eager
  >
    <template v-slot:prepend>
      <v-icon-btn icon="mdi-skip-next"></v-icon-btn>
    </template>
    <template v-slot:append>
      <v-icon-btn icon="mdi-closed-caption"></v-icon-btn>
      <v-icon-btn icon="mdi-cog"></v-icon-btn>
      <v-icon-btn icon="mdi-picture-in-picture-bottom-right"></v-icon-btn>
      <v-icon-btn icon="mdi-cast"></v-icon-btn>
    </template>
  </v-video>
</template>
