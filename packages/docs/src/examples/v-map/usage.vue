<template>
  <div>
    <v-progress-linear v-if="loading" aria-label="Loading map" indeterminate></v-progress-linear>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>

    <v-map
      v-model="selected"
      :svg="svg"
      label="Austria states"
      wheel-zoom
    >
      <template v-slot:default="{ zoom, minZoom, maxZoom, zoomIn, zoomOut, resetZoom }">
        <div
          class="d-flex ga-2 position-absolute"
          style="inset-block-start: 12px; inset-inline-end: 12px"
        >
          <v-btn :disabled="zoom >= maxZoom" size="small" @click="zoomIn">Zoom in</v-btn>
          <v-btn :disabled="zoom <= minZoom" size="small" @click="zoomOut">Zoom out</v-btn>
          <v-btn size="small" @click="resetZoom">Reset</v-btn>
        </div>
      </template>
    </v-map>

    <div class="mt-3 text-body-small">Selected: {{ selected ?? 'None' }}</div>
    <p class="mt-3 text-label-small text-medium-emphasis">
      Map by <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/austria" rel="noopener" target="_blank">SVG Maps</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>).
    </p>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef } from 'vue'

  const selected = shallowRef(null)
  const svg = shallowRef()
  const loading = shallowRef(true)
  const error = shallowRef('')

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/austria@2.0.0/austria.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    } finally {
      loading.value = false
    }
  })
</script>
