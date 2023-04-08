<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-toolbar
      flat
      dense
    >
      <v-toolbar-title>
        <span class="text-subheading">METRONOME</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-share-variant"></v-btn>
    </v-toolbar>

    <v-card-text>
      <v-row
        class="mb-4"
        justify="space-between"
      >
        <v-col class="text-left">
          <span
            class="text-h2 font-weight-light"
            v-text="bpm"
          ></span>
          <span class="subheading font-weight-light me-1">BPM</span>
          <v-fade-transition>
            <v-avatar
              v-if="isPlaying"
              :color="color"
              :style="{
                animationDuration: animationDuration
              }"
              class="mb-1 v-avatar--metronome"
              size="12"
            ></v-avatar>
          </v-fade-transition>
        </v-col>
        <v-col class="text-right">
          <v-btn
            :color="color"
            theme="dark"
            icon
            elevation="0"
            @click="toggle"
          >
            <v-icon size="large" :icon="isPlaying ? 'mdi-pause' : 'mdi-play'"></v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-slider
        v-model="bpm"
        :color="color"
        track-color="grey"
        min="40"
        max="218"
        :step="1"
      >
        <template v-slot:prepend>
          <v-btn
            size="small"
            variant="text"
            icon="mdi-minus"
            :color="color"
            @click="decrement"
          ></v-btn>
        </template>

        <template v-slot:append>
          <v-btn
            size="small"
            variant="text"
            icon="mdi-plus"
            :color="color"
            @click="increment"
          ></v-btn>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      bpm: 40,
      interval: null,
      isPlaying: false,
    }),

    computed: {
      color () {
        if (this.bpm < 100) return 'indigo'
        if (this.bpm < 125) return 'teal'
        if (this.bpm < 140) return 'green'
        if (this.bpm < 175) return 'orange'
        return 'red'
      },
      animationDuration () {
        return `${60 / this.bpm}s`
      },
    },

    methods: {
      decrement () {
        this.bpm--
      },
      increment () {
        this.bpm++
      },
      toggle () {
        this.isPlaying = !this.isPlaying
      },
    },
  }
</script>

<style>
  @keyframes metronome-example {
    from {
      transform: scale(.5);
    }

    to {
      transform: scale(1);
    }
  }

  .v-avatar--metronome {
    animation-name: metronome-example;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
</style>
