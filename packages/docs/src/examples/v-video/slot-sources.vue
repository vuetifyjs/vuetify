<template>
  <div class="d-flex justify-center">
    <v-video
      class="align-self-center"
      image="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.jpg"
      max-width="450"
      eager
      muted
    >
      <template v-slot:sources>
        <source
          src="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.mp4"
          type="video/mp4"
        >
      </template>
    </v-video>
  </div>
</template>
