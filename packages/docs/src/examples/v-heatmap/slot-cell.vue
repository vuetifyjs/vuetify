<template>
  <v-container class="my-6">
    <v-row justify="center">
      <v-heatmap
        :cell-size="[48, 40]"
        :columns="columns"
        :items="items"
        :rows="rows"
        :thresholds="thresholds"
      >
        <template v-slot:cell="{ item }">
          <span class="v-heatmap-cell__text">{{ item.value.toFixed(2) }}</span>
        </template>
      </v-heatmap>
    </v-row>
  </v-container>
</template>

<script setup>
  const rows = ['A', 'B', 'C', 'D', 'E']
  const columns = ['G1', 'G2', 'G3', 'G4', 'G5']

  const thresholds = [
    { min: 0.2, color: '#443983' },
    { min: 0.4, color: '#21918c' },
    { min: 0.6, color: '#35b779' },
    { min: 0.8, color: '#fde725' },
  ]

  const items = rows.flatMap(row =>
    columns.map(column => ({
      row,
      column,
      value: Math.round(Math.random() * 100) / 100,
    }))
  )
</script>

<script>
  export default {
    data () {
      const rows = ['A', 'B', 'C', 'D', 'E']
      const columns = ['G1', 'G2', 'G3', 'G4', 'G5']

      return {
        rows,
        columns,
        thresholds: [
          { min: 0.2, color: '#443983' },
          { min: 0.4, color: '#21918c' },
          { min: 0.6, color: '#35b779' },
          { min: 0.8, color: '#fde725' },
        ],
        items: rows.flatMap(row =>
          columns.map(column => ({
            row,
            column,
            value: Math.round(Math.random() * 100) / 100,
          }))
        ),
      }
    },
  }
</script>
