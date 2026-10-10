<template>
  <v-container max-width="720">
    <v-audio
      :autoplay="autoplay"
      :play-props="{ color: 'primary', size: 36, variant: 'flat' }"
      :src="track.src"
      actions="prev play next progress rate restart"
      class="py-3 px-2 border"
      gap="4"
    >
      <template v-slot:action.prev>
        <v-icon-btn aria-label="Previous" icon="mdi-skip-previous" @click="skip(-1)"></v-icon-btn>
      </template>

      <template v-slot:action.next>
        <v-icon-btn aria-label="Next" icon="mdi-skip-next" @click="skip(1)"></v-icon-btn>
      </template>

      <template v-slot:progress="{ progress, seek, currentTime, duration }">
        <div class="d-flex align-center ga-3 flex-grow-1 mx-1">
          <transition :name="coverTransition" mode="out-in">
            <v-avatar :key="index" :style="{ background: track.cover }" size="44" rounded></v-avatar>
          </transition>
          <div class="d-flex flex-column flex-grow-1">
            <v-fade-transition mode="out-in">
              <div :key="index" class="text-title-small font-weight-medium pt-2" dir="auto">{{ track.title }}</div>
            </v-fade-transition>
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
  import { shallowRef, toRef } from 'vue'

  const tracks = [
    {
      artist: 'Evgeny_Bardyuzha',
      cover: 'linear-gradient(135deg, #673ab7, #00e676)',
      origin: 'https://pixabay.com/music/beats-atmospheric-phonk-synthwave-password-infinity-123276/',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/02.mp3',
      title: 'Atmospheric Phonk Synthwave',
    },
    {
      artist: 'MemoryArcade',
      cover: 'linear-gradient(135deg, #ff5722, #ffc107)',
      origin: 'https://pixabay.com/music/rock-burning-skyline-480100/',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/04.mp3',
      title: 'Burning Skyline',
    },
    {
      artist: 'HumanStudioED',
      cover: 'linear-gradient(135deg, #e91e63, #00bcd4)',
      origin: 'https://pixabay.com/music/phonk-no-copyright-cyberpunk-525041/',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/05.mp3',
      title: 'No Copyright Cyberpunk',
    },
  ]

  const index = shallowRef(0)
  const step = shallowRef(1)
  const autoplay = shallowRef(false)
  const track = toRef(() => tracks[index.value])
  const coverTransition = toRef(() => step.value > 0 ? 'scroll-x-reverse-transition' : 'scroll-x-transition')

  function skip (value) {
    step.value = value
    index.value = (index.value + value + tracks.length) % tracks.length
    autoplay.value = true
  }
</script>
