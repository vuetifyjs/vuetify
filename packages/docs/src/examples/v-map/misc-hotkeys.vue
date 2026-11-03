<template>
  <div>
    <p class="mb-3 text-body-medium">Focus a county, then press I to zoom in, O to zoom out, or R to reset.</p>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>

    <v-map
      ref="map"
      v-model:zoom="zoom"
      :svg="svg"
      label="Swedish counties"
      @focusin="active = true"
      @focusout="onFocusout"
    ></v-map>

    <p class="mt-3 text-body-small">Zoom: {{ zoom.toFixed(2) }}×</p>
    <p class="mt-3 text-label-small text-medium-emphasis">
      Map by <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/sweden" rel="noopener" target="_blank">SVG Maps</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>).
    </p>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef, toRef, useTemplateRef } from 'vue'
  import { useHotkey } from 'vuetify'

  const map = useTemplateRef('map')
  const active = shallowRef(false)
  const zoom = shallowRef(1)
  const svg = shallowRef()
  const error = shallowRef('')

  useHotkey(toRef(() => active.value ? 'i' : undefined), () => map.value?.zoomIn())
  useHotkey(toRef(() => active.value ? 'o' : undefined), () => map.value?.zoomOut())
  useHotkey(toRef(() => active.value ? 'r' : undefined), () => map.value?.resetZoom())

  function onFocusout (event) {
    active.value = !!map.value?.$el.contains(event.relatedTarget)
  }

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/sweden@2.0.0/sweden.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    }
  })
</script>
