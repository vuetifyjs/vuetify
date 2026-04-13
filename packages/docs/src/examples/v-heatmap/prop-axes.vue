<template>
  <v-container class="my-6">
    <v-row justify="center">
      <v-heatmap
        :cell-size="40"
        :columns="columns"
        :gap="6"
        :items="items"
        :rows="rows"
        :thresholds="thresholds"
        rounded="circle"
      >
        <template v-slot:cell="{ item }">
          <span class="v-heatmap-cell__text text-white">{{ item.value }}</span>
        </template>
      </v-heatmap>
    </v-row>
  </v-container>
</template>

<script setup>
  const rows = ['Avg (°C)', 'Max (°C)', 'Min (°C)']
  const columns = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const thresholds = [
    { min: -30, color: '#4a7ec1' },
    { min: -15, color: '#7a96c7' },
    { min: 0, color: '#a38fc4' },
    { min: 5, color: '#c682a5' },
    { min: 15, color: '#dc6b80' },
  ]

  const temperatures = {
    'Avg (°C)': [-24, -20, -12, -1, 8, 15, 16, 13, 7, -4, -15, -23],
    'Max (°C)': [-19, -14, -5, 5, 15, 21, 22, 19, 12, 0, -11, -20],
    'Min (°C)': [-29, -26, -20, -7, 2, 9, 10, 8, 2, -8, -20, -27],
  }

  const items = rows.flatMap(row =>
    columns.map((column, i) => ({
      row,
      column,
      value: temperatures[row][i],
    }))
  )
</script>

<script>
  export default {
    data () {
      const rows = ['Avg (°C)', 'Max (°C)', 'Min (°C)']
      const columns = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      const temperatures = {
        'Avg (°C)': [-24, -20, -12, -1, 8, 15, 16, 13, 7, -4, -15, -23],
        'Max (°C)': [-19, -14, -5, 5, 15, 21, 22, 19, 12, 0, -11, -20],
        'Min (°C)': [-29, -26, -20, -7, 2, 9, 10, 8, 2, -8, -20, -27],
      }

      return {
        rows,
        columns,
        thresholds: [
          { min: -30, color: '#4a7ec1' },
          { min: -15, color: '#7a96c7' },
          { min: 0, color: '#a38fc4' },
          { min: 5, color: '#c682a5' },
          { min: 15, color: '#dc6b80' },
        ],
        items: rows.flatMap(row =>
          columns.map((column, i) => ({
            row,
            column,
            value: temperatures[row][i],
          }))
        ),
      }
    },
  }
</script>
