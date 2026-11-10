<template>
  <div>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>

    <v-map
      :regions="regions"
      :svg="svg"
      label="Dutch delivery availability"
    ></v-map>

    <p class="mt-3 text-label-small text-medium-emphasis">
      Map by <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/netherlands" rel="noopener" target="_blank">SVG Maps</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>).
    </p>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef } from 'vue'

  const svg = shallowRef()
  const error = shallowRef('')
  const regions = {
    nh: { title: 'North Holland: available', color: 'success' },
    zh: { title: 'South Holland: available', color: 'success' },
    ut: { title: 'Utrecht: limited capacity', color: 'warning' },
    fr: { title: 'Friesland: coming soon', color: '#78909c' },
  }

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/netherlands@2.0.0/netherlands.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    }
  })
</script>
