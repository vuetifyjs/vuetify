<template>
  <v-container class="my-6">
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

<script>
  export default {
    data () {
      const rows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']

      return {
        rows,
        thresholds: [
          { min: 1, color: '#e3f2fd' },
          { min: 4, color: '#64b5f6' },
          { min: 8, color: '#1976d2' },
          { min: 12, color: '#0d47a1' },
        ],
        items: Array.from({ length: 25 }, (_, i) => ({
          row: rows[i % 5],
          value: Math.floor(Math.random() * 15),
        })),
      }
    },
  }
</script>
