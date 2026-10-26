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
      origin: 'https://pixabay.com/music/beats-mysterious-future-trap-412274/',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/03.mp3',
      title: 'Mysterious Future Trap',
    },
    {
      artist: 'MemoryArcade',
      origin: 'https://pixabay.com/music/rock-burning-skyline-480100/',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/04.mp3',
      title: 'Burning Skyline',
    },
    {
      artist: 'HumanStudioED',
      origin: 'https://pixabay.com/music/phonk-no-copyright-cyberpunk-525041/',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/05.mp3',
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
    origin: 'https://pixabay.com/music/beats-mysterious-future-trap-412274/',
    src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/03.mp3',
    title: 'Mysterious Future Trap',
  }
</script>
