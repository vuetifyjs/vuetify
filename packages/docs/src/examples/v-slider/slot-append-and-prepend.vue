<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-toolbar
      dense
      flat
    >
      <v-toolbar-title>
        <span class="text-subheading">METRONOME</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon="mdi-share-variant" variant="text"></v-btn>
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
            elevation="0"
            theme="dark"
            icon
            @click="toggle"
          >
            <v-icon :icon="isPlaying ? 'mdi-pause' : 'mdi-play'" size="large"></v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-slider
        v-model="bpm"
        :color="color"
        :step="1"
        max="218"
        min="40"
        track-color="grey"
      >
        <template v-slot:prepend>
          <v-btn
            :color="color"
            icon="mdi-minus"
            size="small"
            variant="text"
            @click="decrement"
          ></v-btn>
        </template>

        <template v-slot:append>
          <v-btn
            :color="color"
            icon="mdi-plus"
            size="small"
            variant="text"
            @click="increment"
          ></v-btn>
        </template>
      </v-slider>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const bpm = ref(40)
  const isPlaying = ref(false)

  const color = computed(() => {
    if (bpm.value < 100) return 'indigo'
    if (bpm.value < 125) return 'teal'
    if (bpm.value < 140) return 'green'
    if (bpm.value < 175) return 'orange'
    return 'red'
  })
  const animationDuration = computed(() => {
    return `${60 / bpm.value}s`
  })

  function decrement () {
    bpm.value--
  }
  function increment () {
    bpm.value++
  }
  function toggle () {
    isPlaying.value = !isPlaying.value
  }
</script>

<script>
  export default {
    data: () => ({
      bpm: 40,
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
