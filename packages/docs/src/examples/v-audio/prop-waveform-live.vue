<template>
  <v-container class="d-flex justify-center">
    <v-audio
      actions="play progress elapsed"
      class="bg-surface-light rounded-pill pr-2"
      crossorigin="anonymous"
      progress-class="mx-2"
      src="https://cdn.freesound.org/previews/871/871092_14978258-lq.mp3"
      width="240"
    >
      <template v-slot:progress="{ props }">
        <v-audio-waveform v-bind="props" bars="32" live></v-audio-waveform>
      </template>
    </v-audio>
  </v-container>
</template>
