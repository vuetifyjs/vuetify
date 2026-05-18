<template>
  <v-container>
    <v-row class="ga-6" justify="center">
      <v-heatmap
        :items="items"
        :legend="{ labels: ['Cold', 'Hot'], cellSize: 16 }"
        :rows="rows"
        :thresholds="thresholds"
      ></v-heatmap>
    </v-row>
  </v-container>
</template>

<script setup>
  const rows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

  const thresholds = [
    { min: 1, color: '#64b5f5' },
    { min: 4, color: '#e4f2fd' },
    { min: 8, color: '#ffdf88' },
    { min: 12, color: '#f56d43' },
  ]

  const items = Array.from({ length: 25 }, (_, i) => ({
    row: rows[i % 5],
    value: Math.floor(Math.random() * 15),
  }))
</script>
