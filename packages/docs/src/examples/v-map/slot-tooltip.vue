<template>
  <v-map :svg="svg" label="Regional offices">
    <template v-slot:tooltip="{ id, title }">
      <strong>{{ title }}</strong>
      <div>{{ offices[id] }} offices</div>
    </template>
  </v-map>
</template>

<script setup>
  const offices = { west: 12, central: 8, east: 5 }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320">
    <path id="west" aria-label="West" fill="#607d8b" d="M30 80L190 30L230 160L150 280L30 220Z" />
    <path id="central" aria-label="Central" fill="#78909c" d="M190 30L390 40L420 200L300 290L150 280L230 160Z" />
    <path id="east" aria-label="East" fill="#90a4ae" d="M390 40L560 90L570 250L420 200Z" />
  </svg>`
</script>
