<template>
  <div class="d-flex align-center justify-center ga-6 flex-wrap">
    <v-defaults-provider :defaults="{ VVideoControls: { VIconBtn: { color: 'red', border: 'sm' } } }">
      <v-video
        aspect-ratio="1"
        color="blue"
        controls-variant="mini"
        image="https://cdn.jsek.work/cdn/vt-sunflowers.jpg"
        rounded="lg"
        src="https://cdn.jsek.work/cdn/vt-sunflowers.mp4"
        style="--v-video-controls-pill-border-radius: 8px"
        width="300"
        eager
        hide-fullscreen
        hide-volume
        muted
        pills
      >
        <template v-slot:prepend>
          <VIconBtn class="mx-n1" icon="mdi-skip-previous"></VIconBtn>
        </template>
        <template v-slot:append>
          <VIconBtn class="mx-n1" icon="mdi-skip-next"></VIconBtn>
        </template>
      </v-video>
    </v-defaults-provider>

    <v-video
      aspect-ratio="1"
      controls-variant="mini"
      image="https://cdn.jsek.work/cdn/vt-sunflowers.jpg"
      rounded="xl"
      src="https://cdn.jsek.work/cdn/vt-sunflowers.mp4"
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
