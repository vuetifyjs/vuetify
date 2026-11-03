<template>
  <div>
    <v-switch v-model="fit" label="Fit the focused region" hide-details></v-switch>
    <p class="mb-3 text-body-medium">Tab into the map, then use the arrow keys to move between states. Small ones such as Distrito Federal are magnified, and large ones such as Amazonas zoom back out.</p>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>
    <v-map v-model:zoom="zoom" :max-zoom="16" :svg="svg" :zoom-on-focus="fit" label="Brazilian states"></v-map>

    <p class="mt-3 text-body-small">Zoom: {{ zoom.toFixed(2) }}×</p>
    <p class="mt-3 text-label-small text-medium-emphasis">
      Map by <a href="https://mapsvg.com/maps/brazil" rel="noopener" target="_blank">MapSVG</a>,
      adapted by <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/brazil" rel="noopener" target="_blank">SVG Maps</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>).
    </p>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef } from 'vue'

  const fit = shallowRef(true)
  const zoom = shallowRef(1)
  const svg = shallowRef()
  const error = shallowRef('')

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/brazil@2.0.0/brazil.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    }
  })
</script>
