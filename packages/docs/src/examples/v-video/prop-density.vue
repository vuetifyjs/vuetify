<template>
  <div class="d-flex align-center justify-center ga-6">
    <v-card
      v-for="density in ['default', 'comfortable', 'compact']"
      :key="density"
      :subtitle="density"
    >
      <v-video
        :density="density"
        :start-at="10"
        height="200"
        image="https://jsek.work/vt-sunflowers.jpg"
        src="https://jsek.work/vt-sunflowers.mp4"
        width="250"
        eager
        muted
      ></v-video>
    </v-card>
  </div>
</template>
