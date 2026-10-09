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
    origin: 'https://pixabay.com/music/ambient-cinematic-documentary-background-599280/',
    src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/06.mp3',
    title: 'Cinematic Documentary Background',
  }
</script>
