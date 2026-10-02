<template>
  <v-container max-width="560">
    <v-audio
      actions="play progress time"
      progress-class="mx-3"
      src="https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
      time-display="elapsed"
    >
      <template v-slot:progress="{ props }">
        <v-audio-waveform v-bind="props" :peaks="peaks"></v-audio-waveform>
      </template>
    </v-audio>
  </v-container>
</template>

<script setup>
  const peaks = [
    0.35, 0.35, 0.57, 0.49, 0.69, 0.60, 0.85, 0.43,
    0.61, 0.28, 0.43, 0.67, 0.53, 0.49, 0.36, 0.02,
    0.02, 0.01, 0.01, 0.01, 0.03, 0.03, 0.01, 0.01,
    0.41, 0.37, 0.65, 0.69, 1.00, 0.66, 0.68, 0.72,
    0.75, 0.27, 0.25, 0.31, 0.38, 0.92, 0.48, 0.56,
    0.32, 0.33, 0.02, 0.03, 0.01, 0.01, 0.02, 0.02,
    0.04, 0.02, 0.29, 0.45, 0.48, 0.83, 0.87, 0.45,
    0.21, 0.37, 0.33, 0.29, 0.53, 0.66, 0.83, 0.98,
  ]
</script>
