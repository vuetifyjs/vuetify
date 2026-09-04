<template>
  <v-container class="d-flex flex-column ga-6">
    <div>
      <div class="text-subtitle-2 mb-2">Peaks supplied by the server</div>
      <v-audio
        :peaks="peaks"
        max-width="520"
        src="https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
      ></v-audio>
    </div>

    <div>
      <div class="text-subtitle-2 mb-2">Peaks decoded in the browser</div>
      <v-audio
        crossorigin="anonymous"
        max-width="520"
        src="https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
      ></v-audio>
    </div>
  </v-container>
</template>

<script setup>
  // One value per bar, normalized 0 to 1 — the shape a server-side pass produces.
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

<script>
  export default {
    data: () => ({
      peaks: [
        0.35, 0.35, 0.57, 0.49, 0.69, 0.60, 0.85, 0.43,
        0.61, 0.28, 0.43, 0.67, 0.53, 0.49, 0.36, 0.02,
        0.02, 0.01, 0.01, 0.01, 0.03, 0.03, 0.01, 0.01,
        0.41, 0.37, 0.65, 0.69, 1.00, 0.66, 0.68, 0.72,
        0.75, 0.27, 0.25, 0.31, 0.38, 0.92, 0.48, 0.56,
        0.32, 0.33, 0.02, 0.03, 0.01, 0.01, 0.02, 0.02,
        0.04, 0.02, 0.29, 0.45, 0.48, 0.83, 0.87, 0.45,
        0.21, 0.37, 0.33, 0.29, 0.53, 0.66, 0.83, 0.98,
      ],
    }),
  }
</script>
