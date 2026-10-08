<template>
  <v-video
    :volume="50"
    :volume-props="{ direction: 'horizontal', menuProps: { location: 'top left' } }"
    actions="play next time - volume append fullscreen"
    class="mx-auto"
    density="comfortable"
    image="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-video-poster.jpg"
    max-width="450"
    rounded="lg"
    src="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-video.mp4"
    progress-color="red"
    eager
  >
    <template v-slot:action.next>
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
