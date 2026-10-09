<template>
  <v-container max-width="560">
    <v-audio :src="track.src" actions="play progress time" gap="8">
      <template v-slot:append>
        <v-icon-btn
          :href="track.src"
          aria-label="Download"
          icon="mdi-download"
          tag="a"
          variant="text"
          download
        ></v-icon-btn>
      </template>
    </v-audio>
  </v-container>
</template>

<script setup>
  const track = {
    artist: 'Bransboynd',
    src: 'https://cdn.pixabay.com/audio/2026/09/07/audio_5e9aae4ea8.mp3',
    title: 'Cinematic Documentary Background',
  }
</script>
