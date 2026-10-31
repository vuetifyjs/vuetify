<template>
  <div>
    <v-map :svg="svg" label="Office coverage">
      <template v-slot:map>
        <circle
          ref="marker"
          :aria-pressed="active"
          :fill="active ? 'rgb(var(--v-theme-success))' : 'rgb(var(--v-theme-primary))'"
          aria-label="Central office"
          class="office-marker"
          cx="320"
          cy="160"
          r="12"
          role="button"
          tabindex="0"
          @click.stop="active = !active"
          @keydown.enter.prevent.stop="active = !active"
          @keydown.space.prevent.stop="active = !active"
          @pointerdown.stop
        ></circle>
      </template>

      <template v-slot:default>
        <v-tooltip :activator="marker" text="Central office: 12 staff members"></v-tooltip>
      </template>
    </v-map>

    <p class="mt-3 text-body-2" role="status">{{ active ? 'Central office selected' : 'Select the office marker' }}</p>
  </div>
</template>

<script setup>
  import { shallowRef, useTemplateRef } from 'vue'

  const marker = useTemplateRef('marker')
  const active = shallowRef(false)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320">
    <path id="west" aria-label="West" fill="#607d8b" d="M30 80L190 30L230 160L150 280L30 220Z" />
    <path id="central" aria-label="Central" fill="#78909c" d="M190 30L390 40L420 200L300 290L150 280L230 160Z" />
    <path id="east" aria-label="East" fill="#90a4ae" d="M390 40L560 90L570 250L420 200Z" />
  </svg>`
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
