<template>
  <v-map label="Regional offices" src="/maps/regions.svg">
    <template v-slot:tooltip="{ id, title }">
      <strong>{{ title }}</strong>
      <div>{{ offices[id] }} offices</div>
    </template>

    <circle aria-label="Main office" cx="320" cy="160" fill="currentColor" r="6"></circle>
  </v-map>
</template>

<script setup>
  const offices = { west: 12, central: 8, east: 5 }
</script>
