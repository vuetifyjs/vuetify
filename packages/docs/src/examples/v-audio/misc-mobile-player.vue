<template>
  <v-container class="d-flex flex-column align-center ga-4">
    <transition :name="transition" mode="out-in">
      <v-img
        :key="index"
        :src="track.cover"
        aspect-ratio="1"
        class="rounded-xl"
        gradient="to bottom, transparent 40%, rgba(0, 0, 0, .8)"
        width="358"
        cover
      >
        <div class="d-flex flex-column justify-end align-center fill-height pb-8 text-white text-center">
          <div class="text-headline-small font-weight-medium" dir="auto">{{ track.title }}</div>
          <div class="text-body-medium opacity-80" dir="auto">{{ track.artist }}</div>
        </div>
      </v-img>
    </transition>

    <v-defaults-provider :defaults="defaults">
      <v-audio
        :autoplay="autoplay"
        :loop="repeat"
        :src="track.src"
        actions="prev skip-backward play skip-forward next"
        class="mobile-player"
        color="#6d64a5"
        gap="8"
        progress-variant="wavy"
        start-at="1:00"
        width="358"
        hide-buffer
        hide-thumb
        hide-time
      >
        <template v-slot:progress="{ props, currentTime }">
          <div class="d-flex align-center ga-2 w-100 mb-2">
            <v-chip :text="currentTime.elapsed" color="#6d64a5" size="small" variant="flat"></v-chip>
            <v-media-progress-bar v-bind="props"></v-media-progress-bar>
            <v-chip :text="currentTime.total" color="#6d64a5" size="small" variant="flat"></v-chip>
          </div>
        </template>

        <template v-slot:action.prev>
          <v-icon-btn aria-label="Previous" color="#81864c" icon="mdi-skip-previous" @click="skip(-1)"></v-icon-btn>
        </template>

        <template v-slot:action.skip-backward="{ seek }">
          <v-icon-btn aria-label="Rewind 10 seconds" icon="mdi-rewind-10" @click="seek({ by: -10 })"></v-icon-btn>
        </template>

        <template v-slot:play="{ props, playing }">
          <v-icon-btn
            v-bind="props"
            :rounded="playing ? 16 : 25"
            class="animate-rounded"
            color="#6d64a5"
            width="70"
          ></v-icon-btn>
        </template>

        <template v-slot:action.skip-forward="{ seek }">
          <v-icon-btn aria-label="Forward 10 seconds" icon="mdi-fast-forward-10" @click="seek({ by: 10 })"></v-icon-btn>
        </template>

        <template v-slot:action.next>
          <v-icon-btn aria-label="Next" color="#81864c" icon="mdi-skip-next" @click="skip(1)"></v-icon-btn>
        </template>
      </v-audio>
    </v-defaults-provider>

    <div class="d-flex justify-space-between" style="width: 358px">
      <v-btn
        :active="shuffle"
        prepend-icon="mdi-shuffle-variant"
        rounded="pill"
        size="large"
        text="Shuffle"
        variant="tonal"
        @click="shuffle = !shuffle"
      ></v-btn>
      <v-btn
        :active="liked.has(index)"
        :prepend-icon="liked.has(index) ? 'mdi-heart' : 'mdi-heart-outline'"
        rounded="pill"
        size="large"
        text="Like"
        variant="tonal"
        @click="toggleLike"
      ></v-btn>
      <v-btn
        :active="repeat"
        prepend-icon="mdi-repeat"
        rounded="pill"
        size="large"
        text="Repeat"
        variant="tonal"
        @click="repeat = !repeat"
      ></v-btn>
    </div>
  </v-container>
</template>

<script setup>
  import { shallowRef, toRef } from 'vue'

  const tracks = [
    {
      artist: 'HumanStudioED',
      cover: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      origin: 'https://pixabay.com/music/phonk-no-copyright-cyberpunk-525041/',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/05.mp3',
      title: 'No Copyright Cyberpunk',
    },
    {
      artist: 'MemoryArcade',
      cover: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      origin: 'https://pixabay.com/music/rock-burning-skyline-480100/',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/04.mp3',
      title: 'Burning Skyline',
    },
    {
      artist: 'Bransboynd',
      cover: 'https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg',
      origin: 'https://pixabay.com/music/beats-mysterious-future-trap-412274/',
      src: 'https://cdn.vuetifyjs.com/docs/images/components/v-audio/03.mp3',
      title: 'Mysterious Future Trap',
    },
  ]

  const index = shallowRef(0)
  const step = shallowRef(1)
  const autoplay = shallowRef(false)
  const shuffle = shallowRef(false)
  const repeat = shallowRef(false)
  const liked = shallowRef(new Set())
  const track = toRef(() => tracks[index.value])
  const transition = toRef(() => step.value > 0 ? 'scroll-x-reverse-transition' : 'scroll-x-transition')

  function skip (value) {
    step.value = value
    const offset = shuffle.value ? 1 + Math.floor(Math.random() * (tracks.length - 1)) : value
    index.value = (index.value + offset + tracks.length) % tracks.length
    autoplay.value = true
  }

  function toggleLike () {
    const next = new Set(liked.value)
    next.has(index.value) ? next.delete(index.value) : next.add(index.value)
    liked.value = next
  }

  const defaults = {
    VAudioControls: {
      VIconBtn: { color: 'surface', variant: 'flat', width: 60, height: 50, rounded: 'pill' },
    },
  }
</script>

<style scoped>
.mobile-player :deep(.v-audio-controls__actions) {
  background: rgb(var(--v-theme-surface-light));
  border-radius: 9999px;
  margin-top: 8px;
  padding: 8px;
}

.animate-rounded {
  transition: border-radius .2s ease-in-out;
  &:active {
    border-radius: 12px !important;
  }
}
</style>
