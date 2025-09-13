<template>
  <div>
    <v-sheet class="px-6 py-2 border-b mb-3" color="surface">
      <div class="d-flex ga-2 ga-md-12 flex-wrap align-center justify-center">
        <div class="d-flex align-center ga-3">
          <v-chip-group v-model="controlsVariant" mandatory>
            <v-chip text="default" value="default" filter label></v-chip>
            <v-chip text="tube" value="tube" filter label></v-chip>
            <v-chip text="mini" value="mini" filter label></v-chip>
          </v-chip-group>
        </div>
        <div class="d-flex align-center ga-3">
          <v-chip-group v-model="features" multiple>
            <v-chip text="pills" value="pills" filter label></v-chip>
            <v-chip text="floating" value="floating" filter label></v-chip>
            <v-chip text="detached" value="detached" filter label></v-chip>
          </v-chip-group>
        </div>
      </div>
    </v-sheet>

    <div class="d-flex justify-center ga-3 mb-3">
      <v-btn
        v-for="key in ['color', 'background', 'track']"
        :key="key"
        variant="text"
      >
        <v-icon v-if="colors[key]" :color="colors[key]" icon="mdi-circle" start></v-icon>
        <v-icon v-else icon="mdi-circle-outline" start></v-icon>
        {{ key }}
        <v-menu :close-on-content-click="false" activator="parent">
          <v-color-picker
            v-model="colors[key]"
            hide-canvas
            hide-inputs
            hide-sliders
            show-swatches
          ></v-color-picker>
          <v-btn text="Clear" @click="colors[key] = null"></v-btn>
        </v-menu>
      </v-btn>
    </div>

    <v-video
      :background-color="colors.background"
      :color="colors.color"
      :controls-variant="controlsVariant"
      :detached="features.includes('detached')"
      :floating="features.includes('floating')"
      :pills="features.includes('pills')"
      :start-at="10"
      :track-color="colors.track"
      class="mx-auto mb-3"
      image="https://jsek.work/cdn/vt-sunflowers.jpg"
      max-width="450"
      src="https://jsek.work/cdn/vt-sunflowers.mp4"
      eager
      muted
      no-fullscreen
    >
      <template v-slot:append>
        <v-icon-btn icon="mdi-cog"></v-icon-btn>
        <v-divider opacity=".7" thickness="2" inset vertical></v-divider>
        <v-icon-btn icon="mdi-picture-in-picture-bottom-right"></v-icon-btn>
        <v-icon-btn class="mr-2" icon="mdi-cast"></v-icon-btn>
      </template>
    </v-video>
  </div>
</template>

<script setup>
  import { reactive, shallowRef } from 'vue'

  const features = shallowRef([])
  const controlsVariant = shallowRef('default')
  const colors = reactive({
    color: '#4cd2de',
    background: null,
    track: null,
  })
</script>

<script>
  export default {
    data: () => ({
      features: [],
      controlsVariant: 'default',
      colors: {
        color: '#4cd2de',
        background: null,
        track: null,
      },
    }),
  }
</script>
