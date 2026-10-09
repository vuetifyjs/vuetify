<template>
  <v-container class="d-flex flex-column ga-8" max-width="560">
    <v-audio :src="track.src"></v-audio>

    <v-audio
      :autoplay="autoplay"
      :src="tracks[index].src"
      actions="prev play next - volume"
    >
      <template v-slot:action.prev>
        <v-icon-btn aria-label="Previous" icon="mdi-skip-previous" @click="skip(-1)"></v-icon-btn>
      </template>

      <template v-slot:action.next>
        <v-icon-btn aria-label="Next" icon="mdi-skip-next" @click="skip(1)"></v-icon-btn>
      </template>
    </v-audio>

    <v-audio
      :gap="[4, 8]"
      :src="track.src"
      actions="play time progress volume"
      class="bg-surface rounded-pill border pa-1 mx-auto"
      max-width="360"
    >
      <template v-slot:append>
        <v-icon-btn aria-label="More actions" icon="mdi-dots-vertical" icon-size="20"></v-icon-btn>
      </template>
    </v-audio>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const tracks = [
    {
      artist: 'Bransboynd',
      src: 'https://cdn.pixabay.com/audio/2025/09/29/audio_8bde82c5c0.mp3',
      title: 'Mysterious Future Trap',
    },
    {
      artist: 'MemoryArcade',
      src: 'https://cdn.pixabay.com/audio/2026/02/06/audio_565c388dda.mp3',
      title: 'Burning Skyline',
    },
    {
      artist: 'HumanStudioED',
      src: 'https://cdn.pixabay.com/audio/2026/05/08/audio_c0a810ecde.mp3',
      title: 'No Copyright Cyberpunk',
    },
  ]

  const index = shallowRef(0)
  const autoplay = shallowRef(false)

  function skip (step) {
    index.value = (index.value + step + tracks.length) % tracks.length
    autoplay.value = true
  }

  const track = {
    artist: 'Bransboynd',
    src: 'https://cdn.pixabay.com/audio/2025/09/29/audio_8bde82c5c0.mp3',
    title: 'Mysterious Future Trap',
  }
</script>
