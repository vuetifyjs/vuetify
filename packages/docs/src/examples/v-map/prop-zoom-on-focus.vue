<template>
  <div>
    <v-switch v-model="fit" label="Fit the focused region" hide-details></v-switch>
    <p class="mb-3 text-body-2">Tab into the map, then use the arrow keys to move between offices.</p>

    <v-map v-model:zoom="zoom" :svg="svg" :zoom-on-focus="fit" label="Office details"></v-map>

    <p class="mt-3 text-body-small">Zoom: {{ zoom.toFixed(2) }}×</p>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const fit = shallowRef(true)
  const zoom = shallowRef(1)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200">
    <rect id="regional" aria-label="Regional office" x="20" y="20" width="250" height="160" fill="#607d8b" />
    <rect id="local" aria-label="Local office" x="330" y="90" width="20" height="20" fill="#90a4ae" />
  </svg>`
</script>
