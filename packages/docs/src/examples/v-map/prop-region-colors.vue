<template>
  <v-map
    v-model="selected"
    :region-colors="colors"
    :region-labels="labels"
    label="Regional availability"
    selected-color="primary"
    src="/maps/regions.svg"
  ></v-map>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selected = shallowRef('central')
  const colors = { west: 'success', central: 'warning', east: '#78909c' }
  const labels = { west: 'Available', central: 'Limited capacity', east: 'Coming soon' }
</script>
