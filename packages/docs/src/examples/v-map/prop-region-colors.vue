<template>
  <v-map
    v-model="selected"
    :region-colors="colors"
    :region-labels="labels"
    :svg="svg"
    label="Regional availability"
    color="primary"
  ></v-map>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selected = shallowRef('central')
  const colors = { west: 'success', central: 'warning', east: '#78909c' }
  const labels = { west: 'Available', central: 'Limited capacity', east: 'Coming soon' }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320">
    <path id="west" d="M30 80L190 30L230 160L150 280L30 220Z" />
    <path id="central" d="M190 30L390 40L420 200L300 290L150 280L230 160Z" />
    <path id="east" d="M390 40L560 90L570 250L420 200Z" />
  </svg>`
</script>
