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

  const thresholds = {
    from: { min: 0, color: '#5fb4f7' },
    to: { min: 15, color: '#f76b45' },
  }

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
        thresholds: {
          from: { min: 0, color: '#e3f2fd' },
          to: { min: 15, color: '#0d47a1' },
        },
        items: Array.from({ length: 25 }, (_, i) => ({
          row: rows[i % 5],
          value: Math.floor(Math.random() * 15),
        })),
      }
    },
  }
</script>
