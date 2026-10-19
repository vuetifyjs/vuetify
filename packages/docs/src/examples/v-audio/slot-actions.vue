<template>
  <v-container class="d-flex justify-center">
    <v-card class="pa-6" rounded="xl" width="400">
      <div class="d-flex">
        <div class="mr-auto">
          <div class="text-title-medium font-weight-bold" dir="auto">{{ track.title }}</div>
          <div class="text-body-medium text-medium-emphasis mb-2" dir="auto">{{ track.artist }}</div>
        </div>
        <v-icon-btn icon="mdi-heart-outline"></v-icon-btn>
      </div>

      <v-audio
        :progress-props="{ thumbSize: 12, height: 4 }"
        :src="track.src"
        actions="left play right"
        progress-variant="pill"
      >
        <template v-slot:action.left="{ seek }">
          <v-icon-btn aria-label="Repeat" icon="mdi-repeat"></v-icon-btn>
          <v-spacer></v-spacer>
          <v-icon-btn aria-label="Add to library" icon="mdi-plus" icon-size="20"></v-icon-btn>
          <v-spacer></v-spacer>
          <v-icon-btn aria-label="Rewind 10 seconds" icon="mdi-rewind" @click="seek({ by: -10 })"></v-icon-btn>
        </template>

        <template v-slot:play="{ props }">
          <v-icon-btn v-bind="props" icon-size="44"></v-icon-btn>
        </template>

        <template v-slot:action.right="{ seek }">
          <v-icon-btn aria-label="Forward 10 seconds" icon="mdi-fast-forward" @click="seek({ by: 10 })"></v-icon-btn>
          <v-spacer></v-spacer>
          <v-icon-btn aria-label="More actions" icon="mdi-dots-horizontal" icon-size="20"></v-icon-btn>
          <v-spacer></v-spacer>
          <v-icon-btn aria-label="Shuffle" icon="mdi-shuffle-variant"></v-icon-btn>
        </template>
      </v-audio>
    </v-card>
  </v-container>
</template>

<script setup>
  const track = {
    artist: 'MemoryArcade',
    origin: 'https://pixabay.com/music/rock-burning-skyline-480100/',
    src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/04.mp3',
    title: 'Burning Skyline',
  }
</script>
