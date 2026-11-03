<template>
  <div>
    <v-alert v-if="error" :text="error" type="error" variant="tonal"></v-alert>
    <v-map :svg="svg" label="Italian offices">
      <template v-slot:map>
        <circle
          ref="marker"
          :aria-pressed="active"
          :fill="active ? 'rgb(var(--v-theme-success))' : 'rgb(var(--v-theme-primary))'"
          aria-label="Rome office"
          class="office-marker"
          cx="302"
          cy="370"
          r="8"
          role="button"
          tabindex="0"
          @click.stop="active = !active"
          @keydown.enter.prevent.stop="active = !active"
          @keydown.space.prevent.stop="active = !active"
          @pointerdown.stop
        ></circle>
      </template>

      <template v-slot:default>
        <v-tooltip :activator="marker" text="Rome office: 12 staff members"></v-tooltip>
      </template>
    </v-map>

    <p class="mt-3 text-body-medium" role="status">{{ active ? 'Rome office selected' : 'Select the office marker' }}</p>
    <p class="mt-3 text-label-small text-medium-emphasis">
      Map by <a href="https://github.com/VictorCazanave/svg-maps/tree/master/packages/italy" rel="noopener" target="_blank">SVG Maps</a>
      (<a href="https://creativecommons.org/licenses/by/4.0/" rel="noopener" target="_blank">CC BY 4.0</a>).
    </p>
  </div>
</template>

<script setup>
  import { onMounted, shallowRef, useTemplateRef } from 'vue'

  const marker = useTemplateRef('marker')
  const active = shallowRef(false)
  const svg = shallowRef()
  const error = shallowRef('')

  onMounted(async () => {
    try {
      const response = await fetch('https://cdn.jsdelivr.net/npm/@svg-maps/italy@2.0.0/italy.svg')
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      svg.value = await response.text()
    } catch {
      error.value = 'Could not load the map from jsDelivr.'
    }
  })
</script>

<style scoped>
  .office-marker {
    cursor: pointer;
    stroke: rgb(var(--v-theme-on-primary));
    stroke-width: 2px;
    vector-effect: non-scaling-stroke;
  }

  .office-marker:focus-visible {
    outline: none;
    stroke: currentColor;
    stroke-width: 3px;
  }
</style>
