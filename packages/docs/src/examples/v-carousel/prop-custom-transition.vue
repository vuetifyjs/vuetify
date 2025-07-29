<template>
  <div>
    <v-sheet class="px-6 py-2 border-b" color="surface">
      <div class="d-flex gx-3 flex-wrap">
        <div class="d-flex align-center ga-3">
          <span class="mr-3">Mode:</span>
          <v-chip-group v-model="mode">
            <v-chip text="images" value="images" filter label></v-chip>
            <v-chip text="text" value="text" filter label></v-chip>
          </v-chip-group>
        </div>
        <div class="d-flex align-center ga-3">
          <span class="mr-3">Transition:</span>
          <v-chip-group v-model="currentTransition">
            <v-chip text="fade (built-in)" value="fade-transition" filter label></v-chip>
            <v-chip text="crossfade (custom)" value="crossfade" filter label></v-chip>
          </v-chip-group>
        </div>
      </div>
    </v-sheet>

    <v-carousel
      :class="{ 'crossfade-carousel': currentTransition === 'crossfade' }"
      hide-delimiters
    >
      <v-carousel-item
        v-for="({ src, text }, i) in items"
        :key="i"
        :reverse-transition="currentTransition"
        :src="src"
        :transition="currentTransition"
        cover
      >
        <template v-slot:default>
          <div class="d-flex align-center justify-center h-100">
            <div
              class="text-h1 font-weight-black text-success"
              style="font-family: monospace"
            >{{ text }}</div>
          </div>
        </template>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
  import { shallowRef, toRef } from 'vue'

  const mode = shallowRef('text')
  const currentTransition = shallowRef('crossfade')

  const items = toRef(() => mode.value === 'images'
    ? [
      { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg' },
      { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg' },
      { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg' },
      { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' },
    ]
    : [{ text: 'good' }, { text: 'goat' }])
</script>

<script>
  export default {
    data () {
      return {
        mode: 'text',
        currentTransition: 'crossfade',
      }
    },
    computed: {
      items () {
        return this.mode === 'images'
          ? [
            { src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg' },
            { src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg' },
            { src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg' },
            { src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg' },
          ]
          : [{ text: 'good' }, { text: 'goat' }]
      },
    },
  }
</script>

<style>
  .crossfade-carousel > .v-window__container {
    isolation: isolate;
    > .v-window-item {
      mix-blend-mode: plus-lighter;
    }
  }

  .crossfade-enter-active,
  .crossfade-leave-active {
    transition: all 0.7s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

  .crossfade-leave-from,
  .crossfade-leave-to {
    position: absolute !important;
    top: 0;
    width: 100%;
  }

  .crossfade-enter-from,
  .crossfade-leave-to {
    opacity: 0;
  }
</style>
