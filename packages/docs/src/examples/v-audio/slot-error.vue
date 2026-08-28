<template>
  <v-container class="d-flex flex-wrap justify-center align-center ga-8">
    <v-audio
      max-width="420"
      src="https://example.com/missing-recording.mp3"
      error
    >
      <template v-slot:error>
        <div class="d-flex align-center ga-4">
          <v-icon class="opacity-60" color="error" icon="$error"></v-icon>
          <div>
            <div class="font-weight-bold mb-1">Recording unavailable</div>
            <div class="text-body-medium">Report problem to our <a href="">support</a></div>
          </div>
        </div>
      </template>
    </v-audio>

    <v-audio
      ref="secondAudioRef"
      max-width="420"
      src="https://example.com/missing-recording.mp3"
      error
    >
      <template v-slot:error>
        <div
          class="d-flex align-center ga-4 pl-4 pr-8 py-3 rounded-pill border cursor-pointer"
          @click="secondAudioRef.retry()"
        >
          <v-icon class="opacity-60" icon="$loading"></v-icon>
          <div>
            <div class="font-weight-bold mb-1">Connection timeout</div>
            <div class="text-body-medium">Tap to reload</div>
          </div>
        </div>
      </template>
    </v-audio>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const secondAudioRef = ref()
</script>
