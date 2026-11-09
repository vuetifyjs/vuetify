<template>
  <div>
    <v-video
      :start-at="10"
      :volume-props="{ inline: true }"
      class="mx-auto"
      height="300"
      image="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.jpg"
      max-width="500"
      rounded="lg"
      src="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.mp4"
      eager
      hide-overlay
      pills
    >
      <template v-slot:controls="{ play, pause, playing, progress, seek, volume, fullscreen, toggleFullscreen, labels }">
        <v-defaults-provider
          :defaults="{
            VIconBtn: { color: 'red', rounded: 'lg', size: '36', variant: 'flat' },
            VMediaVolume: { VSlider: { color: 'red', trackColor: 'white' } },
            VSlider: { color: 'red', trackColor: 'white' },
          }"
        >
          <div class="d-flex ga-3 w-100 px-2">
            <v-icon-btn
              :aria-label="labels.playAction"
              :icon="playing ? 'mdi-pause' : 'mdi-play'"
              v-tooltip:top="labels.playAction"
              @click="() => playing ? pause() : play()"
            ></v-icon-btn>
            <v-slider
              :aria-label="labels.seek"
              :model-value="progress"
              width="75%"
              no-keyboard
              @update:model-value="v => seek({ to: `${v}%` })"
            ></v-slider>
            <v-media-volume
              v-model="volume.value"
              :label="labels.volumeAction"
              :slider-props="{ maxWidth: 100, width: '25%' }"
              class="ga-3"
              inline
            ></v-media-volume>
            <v-icon-btn
              :aria-label="labels.fullscreenAction"
              :icon="fullscreen ? '$fullscreenExit' : '$fullscreen'"
              v-tooltip:top="labels.fullscreenAction"
              @click="toggleFullscreen"
            ></v-icon-btn>
          </div>
        </v-defaults-provider>
      </template>
    </v-video>
  </div>
</template>
