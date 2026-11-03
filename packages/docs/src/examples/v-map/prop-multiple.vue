<template>
  <div>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>
    <v-map v-model="selected" :svg="svg" label="German service coverage" multiple></v-map>
    <div class="mt-3 text-body-small">Selected: {{ selected.join(', ') || 'None' }}</div>
    <p class="mt-3 text-label-small text-medium-emphasis">
      Map by <a href="https://mapsvg.com/maps/germany" rel="noopener" target="_blank">MapSVG</a>,
      adapted by <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/germany" rel="noopener" target="_blank">SVG Maps</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>).
    </p>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef } from 'vue'

  const selected = shallowRef(['by', 'be'])
  const svg = shallowRef()
  const error = shallowRef('')

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/germany@2.0.0/germany.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    }
  })
</script>
