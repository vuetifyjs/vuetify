<template>
  <v-container class="d-flex flex-column ga-8" max-width="560">
    <v-audio :src="track.src"></v-audio>

    <v-audio :src="track.src" actions="prev play next - volume" time-display="remaining">
      <template v-slot:prev>
        <v-icon-btn aria-label="Previous" icon="mdi-skip-previous"></v-icon-btn>
      </template>

      <template v-slot:next>
        <v-icon-btn aria-label="Next" icon="mdi-skip-next"></v-icon-btn>
      </template>
    </v-audio>

    <v-audio
      :src="track.src"
      actions="play time progress"
      actions-class="ga-3"
      class="bg-surface rounded-pill border px-2"
      max-width="360"
    ></v-audio>
  </v-container>
</template>

<script setup>
  const track = {
    artist: 'Bransboynd',
    src: 'https://cdn.pixabay.com/audio/2025/09/29/audio_8bde82c5c0.mp3',
    title: 'Mysterious Future Trap',
  }
</script>
