<template>
  <v-container>
    <v-audio :peaks="peaks" :src="src" max-width="520">
      <template v-slot:append>
        <v-btn
          :href="src"
          density="comfortable"
          icon="mdi-download"
          variant="text"
          download
        ></v-btn>
      </template>
    </v-audio>
  </v-container>
</template>

<script setup>
  const src = 'https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3'
  const peaks = [
    0.35, 0.57, 0.69, 0.85, 0.61, 0.43, 0.53, 0.36,
    0.02, 0.01, 0.03, 0.01, 0.41, 0.65, 1.00, 0.68,
    0.75, 0.25, 0.38, 0.48, 0.32, 0.02, 0.01, 0.02,
    0.29, 0.48, 0.87, 0.21, 0.33, 0.53, 0.83, 0.98,
  ]
</script>

<script>
  export default {
    data: () => ({
      src: 'https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3',
      peaks: [
        0.35, 0.57, 0.69, 0.85, 0.61, 0.43, 0.53, 0.36,
        0.02, 0.01, 0.03, 0.01, 0.41, 0.65, 1.00, 0.68,
        0.75, 0.25, 0.38, 0.48, 0.32, 0.02, 0.01, 0.02,
        0.29, 0.48, 0.87, 0.21, 0.33, 0.53, 0.83, 0.98,
      ],
    }),
  }
</script>
