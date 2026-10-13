<template>
  <div class="d-flex align-center justify-center ga-6 flex-wrap">
    <v-video
      :play-props="{ size: '56' }"
      actions="- prev play next -"
      aspect-ratio="1"
      image="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.jpg"
      progress-variant="pill"
      rounded="lg"
      src="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.mp4"
      width="300"
      eager
      muted
      pills
    >
      <template v-slot:action.prev>
        <VIconBtn icon="mdi-skip-previous"></VIconBtn>
      </template>
      <template v-slot:action.next>
        <VIconBtn icon="mdi-skip-next"></VIconBtn>
      </template>
    </v-video>

    <v-video
      aspect-ratio="1"
      image="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.jpg"
      rounded="xl"
      src="https://cdn.vuetifyjs.com/docs/images/components/v-video/vt-sunflowers.mp4"
      width="300"
      eager
      hide-overlay
      no-fullscreen
      pills
    >
      <template v-slot:controls="{ play, pause, playing, progress }">
        <div class="ml-auto" style="display: grid">
          <v-progress-circular
            :model-value="progress"
            color="#fffa"
            size="58"
            style="grid-area: 1/1; margin: -5px"
            width="3"
          ></v-progress-circular>
          <v-icon-btn
            :icon="playing ? 'mdi-pause' : 'mdi-play'"
            color="primary"
            size="large"
            style="grid-area: 1/1"
            variant="flat"
            @click="() => playing ? pause() : play()"
          ></v-icon-btn>
        </div>
      </template>
    </v-video>
  </div>
</template>
