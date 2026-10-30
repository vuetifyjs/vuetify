<template>
  <div>
    <v-map
      v-model="selected"
      v-model:zoom="zoom"
      label="Regional service areas"
      src="/maps/regions.svg"
    ></v-map>

    <div class="mt-3 text-body-small">
      Selected: {{ selected ?? 'None' }} · Zoom: {{ zoom.toFixed(1) }}×
    </div>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selected = shallowRef(null)
  const zoom = shallowRef(1)
</script>
