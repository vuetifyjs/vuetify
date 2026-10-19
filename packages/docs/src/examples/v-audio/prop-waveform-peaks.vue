<template>
  <v-container max-width="560">
    <v-audio
      :gap="[0, 12]"
      actions="play progress elapsed"
      src="https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
    >
      <template v-slot:progress="{ props }">
        <v-audio-waveform v-bind="props" :peaks="peaks"></v-audio-waveform>
      </template>
    </v-audio>
  </v-container>
</template>

<script setup>
  const peaks = [
    0.69, 0.05, 1.00, 0.83, 0.65, 0.59, 0.49, 0.03,
    0.92, 0.93, 0.04, 0.89, 0.04, 0.00, 0.00, 0.00,
    0.69, 0.05, 1.00, 0.83, 0.65, 0.59, 0.49, 0.03,
    0.92, 0.93, 0.04, 0.89, 0.04, 0.00, 0.00, 0.00,
    0.69, 0.05, 1.00, 0.83, 0.65, 0.59, 0.49, 0.03,
    0.92, 0.93, 0.04, 0.89, 0.04, 0.00, 0.00, 0.00,
    0.69, 0.05, 1.00, 0.83, 0.65, 0.59, 0.49, 0.03,
    0.92, 0.93, 0.04, 0.89, 0.04, 0.00, 0.00, 0.00,
  ]
</script>
