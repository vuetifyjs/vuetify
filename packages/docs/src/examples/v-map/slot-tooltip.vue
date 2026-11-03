<template>
  <div>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>
    <v-map :regions="regions" :svg="svg" label="Mexican offices">
      <template v-slot:tooltip="{ region }">
        <strong>{{ region.title }}</strong>
        <div>{{ region.offices ?? 'No' }} offices</div>
      </template>
    </v-map>
    <p class="mt-3 text-label-small text-medium-emphasis">
      Map by <a href="https://mapsvg.com/maps/mexico" rel="noopener" target="_blank">MapSVG</a>,
      adapted by <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/mexico" rel="noopener" target="_blank">SVG Maps</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>).
    </p>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef } from 'vue'

  const svg = shallowRef()
  const error = shallowRef('')
  const regions = {
    cmx: { offices: 12 },
    jal: { offices: 8 },
    nle: { offices: 5 },
    yuc: { offices: 3 },
  }

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/mexico@2.0.0/mexico.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    }
  })
</script>
