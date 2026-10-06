<template>
  <v-container max-width="720">
    <v-audio
      :play-props="{ color: 'primary', size: 36, variant: 'flat' }"
      :src="track.src"
      actions="prev play next progress rate restart"
      actions-class="ga-1"
      class="py-3 px-2 border"
    >
      <template v-slot:action.prev>
        <v-icon-btn aria-label="Previous" icon="mdi-skip-previous"></v-icon-btn>
      </template>

      <template v-slot:action.next>
        <v-icon-btn aria-label="Next" icon="mdi-skip-next"></v-icon-btn>
      </template>

      <template v-slot:progress="{ progress, seek, currentTime, duration }">
        <div class="d-flex align-center ga-3 flex-grow-1 mx-1">
          <v-avatar size="44" style="background: linear-gradient(135deg, #673ab7, #00e676)" rounded></v-avatar>
          <div class="d-flex flex-column flex-grow-1">
            <div class="text-title-small font-weight-medium pb-1" dir="auto">{{ track.title }}</div>
            <div class="d-flex align-center ga-2 text-body-small">
              {{ currentTime.elapsed }}
              <v-locale-provider :rtl="false">
                <v-slider
                  :disabled="!duration"
                  :model-value="progress"
                  :step="0.1"
                  aria-label="Seek"
                  thumb-size="12"
                  track-size="2"
                  hide-details
                  @update:model-value="v => seek({ to: `${v}%` })"
                ></v-slider>
              </v-locale-provider>
              {{ currentTime.total }}
            </div>
          </div>
        </div>
      </template>

      <template v-slot:action.rate="{ playbackRate, setPlaybackRate }">
        <v-chip
          :text="`${playbackRate}x`"
          aria-label="Toggle playback speed"
          size="small"
          variant="tonal"
          label
          @click="setPlaybackRate(playbackRate >= 2 ? 1 : playbackRate + 0.5)"
        ></v-chip>
      </template>

      <template v-slot:action.restart="{ seek }">
        <v-icon-btn aria-label="Restart" icon="mdi-restart" @click="seek({ to: 0 })"></v-icon-btn>
      </template>
    </v-audio>
  </v-container>
</template>

<script setup>
  const track = {
    artist: 'Evgeny_Bardyuzha',
    src: 'https://cdn.pixabay.com/audio/2022/10/18/audio_31c2730e64.mp3',
    title: 'Atmospheric Phonk Synthwave (Password Infinity)',
  }
</script>
