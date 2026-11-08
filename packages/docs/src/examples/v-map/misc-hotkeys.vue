<template>
  <div>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>

    <v-map
      ref="map"
      v-model:center="center"
      v-model:zoom="zoom"
      :svg="svg"
      label="New Zealand counties"
      zoom-step="1.2"
      @focusin="active = true"
      @focusout="onFocusout"
    >
      <v-card
        class="position-absolute top-0 right-0 ma-2 rounded-sm"
        min-width="200"
        border
      >
        <v-card-text class="d-flex flex-column gr-2">
          <template v-for="(item, i) in shortcuts" :key="item.keys">
            <v-divider v-if="i > 0"></v-divider>
            <div class="d-flex align-center justify-space-between ga-4">
              {{ item.label }}
              <v-hotkey :keys="item.keys" class="gc-0"></v-hotkey>
            </div>
          </template>
        </v-card-text>
      </v-card>
    </v-map>

    <div class="d-flex flex-wrap justify-space-between ga-2 mt-3 text-label-small text-medium-emphasis">
      <p>
        Map by <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/new-zealand" rel="noopener" target="_blank">SVG Maps</a>
        (<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>).
      </p>
      <p>
        Center: {{ `${Math.round(center.x)}, ${Math.round(center.y)}` }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef, toRef, useTemplateRef } from 'vue'
  import { useHotkey } from 'vuetify'

  const initialZoom = 2
  const initialCenter = { x: 438, y: 272 }

  const map = useTemplateRef('map')
  const active = shallowRef(false)
  const zoom = shallowRef(initialZoom)
  const center = shallowRef(initialCenter)
  const svg = shallowRef()
  const error = shallowRef('')

  const shortcuts = [
    { label: 'Zoom in', keys: 'plus' },
    { label: 'Zoom out', keys: 'minus' },
    { label: 'Move focus', keys: 'left up right down' },
    { label: 'Move viewport', keys: 'shift+left up right down' },
    { label: 'Reset', keys: '0' },
  ]

  useHotkey(toRef(() => active.value ? '=/plus/shift+plus' : undefined), () => map.value?.zoomIn())
  useHotkey(toRef(() => active.value ? 'minus' : undefined), () => map.value?.zoomOut())
  useHotkey(toRef(() => active.value ? '0' : undefined), () => {
    zoom.value = initialZoom
    center.value = initialCenter
  })

  function onFocusout (event) {
    active.value = !!map.value?.$el.contains(event.relatedTarget)
  }

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/new-zealand@2.0.0/new-zealand.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    }
  })
</script>
