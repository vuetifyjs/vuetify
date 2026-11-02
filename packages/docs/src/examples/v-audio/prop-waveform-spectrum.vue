<template>
  <v-container class="d-flex flex-column align-center ga-4">
    <v-audio
      :gap="[0, 12]"
      class="pa-6 pb-3 border rounded-xl elevation-2 bg-purple-darken-4"
      crossorigin="anonymous"
      max-width="360"
      src="https://cdn.freesound.org/previews/871/871092_14978258-lq.mp3"
    >
      <template v-slot:progress="{ props }">
        <v-audio-waveform
          v-bind="props"
          bar-gap="2"
          bar-width="6"
          bars="42"
          class="mx-auto mb-2"
          live="spectrum"
          mirror="0"
        ></v-audio-waveform>
      </template>
    </v-audio>

    <v-audio
      crossorigin="anonymous"
      min-width="0"
      src="https://cdn.freesound.org/previews/871/871092_14978258-lq.mp3"
      width="auto"
    >
      <template v-slot:controls="{ playing, play, pause, currentTime }">
        <v-chip
          :aria-label="playing ? 'Pause' : 'Play'"
          color="lime-darken-1"
          density="compact"
          size="large"
          variant="flat"
          @click="playing ? pause() : play()"
        >
          <v-icon :icon="playing ? '$pause' : '$play'" size="24" start></v-icon>
          <v-audio-waveform
            :peaks="[0.5, 0.8, 1, 0.5]"
            bar-gap="2"
            bar-radius="2"
            bar-width="3"
            bars="4"
            class="mr-3"
            height="18"
            live="spectrum"
          ></v-audio-waveform>
          {{ currentTime.remaining }}
        </v-chip>
      </template>
    </v-audio>
  </v-container>
</template>
