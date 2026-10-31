<template>
  <div>
    <p class="mb-3 text-body-2">Focus a region, then press I to zoom in, O to zoom out, or R to reset.</p>

    <v-map
      ref="map"
      v-model:zoom="zoom"
      :svg="svg"
      label="Map keyboard shortcuts"
      @focusin="active = true"
      @focusout="onFocusout"
    ></v-map>

    <p class="mt-3 text-body-small">Zoom: {{ zoom.toFixed(2) }}×</p>
  </div>
</template>

<script setup>
  import { shallowRef, toRef, useTemplateRef } from 'vue'
  import { useHotkey } from 'vuetify'

  const map = useTemplateRef('map')
  const active = shallowRef(false)
  const zoom = shallowRef(1)

  useHotkey(toRef(() => active.value ? 'i' : undefined), () => map.value?.zoomIn())
  useHotkey(toRef(() => active.value ? 'o' : undefined), () => map.value?.zoomOut())
  useHotkey(toRef(() => active.value ? 'r' : undefined), () => map.value?.reset())

  function onFocusout (event) {
    active.value = !!map.value?.$el.contains(event.relatedTarget)
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320">
    <path id="west" aria-label="West" fill="#607d8b" d="M30 80L190 30L230 160L150 280L30 220Z" />
    <path id="central" aria-label="Central" fill="#78909c" d="M190 30L390 40L420 200L300 290L150 280L230 160Z" />
    <path id="east" aria-label="East" fill="#90a4ae" d="M390 40L560 90L570 250L420 200Z" />
  </svg>`
</script>
