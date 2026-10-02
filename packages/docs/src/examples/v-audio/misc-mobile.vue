<template>
  <v-container class="d-flex justify-center">
    <v-defaults-provider :defaults="defaults">
      <v-audio
        :src="track.src"
        actions="prev skip-backward play skip-forward next"
        actions-class="bg-surface-light rounded-pill pa-2 ga-2 mt-2"
        color="primary"
        width="358"
        hide-time
      >
        <template v-slot:progress="{ props, currentTime }">
          <div class="d-flex align-center ga-2 w-100">
            <v-chip :text="currentTime.elapsed" color="primary" size="small" variant="flat"></v-chip>
            <v-media-progress-bar v-bind="props" thumb></v-media-progress-bar>
            <v-chip :text="currentTime.total" color="primary" size="small" variant="flat"></v-chip>
          </div>
        </template>

        <template v-slot:prev>
          <v-icon-btn aria-label="Previous" color="secondary" icon="mdi-skip-previous"></v-icon-btn>
        </template>

        <template v-slot:skip-backward="{ seek }">
          <v-icon-btn aria-label="Rewind 10 seconds" icon="mdi-rewind-10" @click="seek({ by: -10 })"></v-icon-btn>
        </template>

        <template v-slot:play="{ props, playing }">
          <v-icon-btn
            v-bind="props"
            :rounded="playing ? 16 : 25"
            class="animate-rounded"
            color="primary"
            width="70"
          ></v-icon-btn>
        </template>

        <template v-slot:skip-forward="{ seek }">
          <v-icon-btn aria-label="Forward 10 seconds" icon="mdi-fast-forward-10" @click="seek({ by: 10 })"></v-icon-btn>
        </template>

        <template v-slot:next>
          <v-icon-btn aria-label="Next" color="secondary" icon="mdi-skip-next"></v-icon-btn>
        </template>
      </v-audio>
    </v-defaults-provider>
  </v-container>
</template>

<script setup>
  const track = {
    artist: 'HumanStudioED',
    src: 'https://cdn.pixabay.com/audio/2026/05/08/audio_c0a810ecde.mp3',
    title: 'No Copyright Cyberpunk',
  }
  const defaults = {
    VAudioControls: {
      VIconBtn: { color: 'surface', variant: 'flat', width: 60, height: 50, rounded: 'pill' },
    },
  }
</script>

<style scoped>
.animate-rounded {
  transition: border-radius .2s ease-in-out;
  &:active {
    border-radius: 12px !important;
  }
}
</style>
