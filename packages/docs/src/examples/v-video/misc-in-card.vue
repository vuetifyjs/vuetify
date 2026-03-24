<template>
  <div class="d-flex justify-center">
    <v-card elevation="2" rounded="xl" width="400">
      <v-card-item class="py-4">
        <v-skeleton-loader type="list-item-avatar-two-line"></v-skeleton-loader>
      </v-card-item>
      <v-card-text class="pb-4 px-6">
        <v-video
          :volume="50"
          aspect-ratio="4 / 3"
          background-color="transparent"
          color="orange"
          controls-transition="slide-y-transition"
          elevation="0"
          image="https://cdn.jsek.work/cdn/vt-video-poster.jpg"
          rounded="xl"
          src="https://cdn.jsek.work/cdn/vt-video.mp4"
          width="100%"
          detached
          eager
          floating
          hide-play
          no-fullscreen
          split-time
        ></v-video>
      </v-card-text>
    </v-card>
  </div>
</template>
