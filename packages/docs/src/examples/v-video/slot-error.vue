<template>
  <v-container class="d-flex flex-wrap justify-center align-center ga-8">

    <v-video
      max-width="450"
      src="https://www.pexels.com/download/video/3620220"
      error
    >
      <template v-slot:error>
        <div class="d-flex align-center ga-4">
          <v-icon class="opacity-60" color="error"></v-icon>
          <div>
            <div class="font-weight-bold mb-1">Video unavailable</div>
            <div class="text-body-medium">Report problem to our <a href="">support</a></div>
          </div>
        </div>
      </template>
    </v-video>

    <v-video
      ref="secondVideoRef"
      max-width="450"
      src="https://www.pexels.com/download/video/3620220"
      error
    >
      <template v-slot:error>
        <div
          class="d-flex align-center ga-4 pl-4 pr-8 py-3 rounded-pill border cursor-pointer"
          @click="secondVideoRef.retry()"
        >
          <v-icon class="opacity-60" icon="$loading"></v-icon>
          <div>
            <div class="font-weight-bold mb-1">Connection timout</div>
            <div class="text-body-medium">Tap to reload</div>
          </div>
        </div>
      </template>
    </v-video>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const secondVideoRef = ref()
</script>
