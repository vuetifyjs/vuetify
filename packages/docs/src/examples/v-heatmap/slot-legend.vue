<template>
  <v-container>
    <v-row justify="center">
      <v-heatmap
        :columns="columns"
        :items="items"
        :rows="rows"
        :thresholds="thresholds"
        legend
      >
        <template v-slot:legend="{ thresholds: legendThresholds, activeBuckets, toggle }">
          <div class="d-flex flex-wrap ga-2 justify-end pt-4">
            <v-chip
              v-for="(threshold, i) in legendThresholds"
              :key="i"
              :color="threshold.color"
              :variant="activeBuckets.includes(i) ? 'flat' : 'outlined'"
              size="small"
              @click="toggle(i)"
            >
              ≥ {{ threshold.min }}
            </v-chip>
          </div>
        </template>
      </v-heatmap>
    </v-row>
  </v-container>
</template>

<script setup>
  const rows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const columns = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6']

  const thresholds = [
    { min: 1, color: '#cfe0ff' },
    { min: 3, color: '#89a7ff' },
    { min: 6, color: '#4a76e8' },
    { min: 9, color: '#1e47c2' },
  ]

  const items = rows.flatMap(row =>
    columns.map(column => ({
      row,
      column,
      value: Math.floor(Math.random() * 12),
    }))
  )
</script>
