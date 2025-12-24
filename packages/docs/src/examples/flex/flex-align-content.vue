<template>
  <v-container class="d-flex flex-wrap ga-6" fluid>
    <div v-for="variant in variants" :key="variant.value">
      <div class="text-caption mb-2">align-content-{{ variant.value }}</div>
      <v-sheet
        :class="`d-flex align-content-${variant.value} flex-wrap bg-surface-variant`"
        height="200"
        width="300"
      >
        <v-sheet v-for="n in 5" :key="n" class="ma-2 pa-2">
          Flex item
        </v-sheet>
      </v-sheet>
    </div>
  </v-container>
</template>

<script setup>
  const variants = [
    { value: 'start' },
    { value: 'center' },
    { value: 'end' },
    { value: 'space-between' },
    { value: 'space-around' },
  ]
</script>
