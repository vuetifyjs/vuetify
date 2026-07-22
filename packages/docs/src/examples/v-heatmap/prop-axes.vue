<template>
  <v-container>
    <v-row justify="center">
      <v-heatmap
        :cell-size="40"
        :columns="columns"
        :gap="6"
        :items="items"
        :rows="rows"
        :thresholds="thresholds"
        rounded="20"
      >
        <template v-slot:row-header="{ row }">
          <span class="text-capitalize font-weight-bold">{{ row }}</span>&nbsp;(°F)
        </template>

        <template v-slot:cell="{ item }">
          <span class="v-heatmap__cell-text text-white">{{ item.value }}</span>
        </template>
      </v-heatmap>
    </v-row>
  </v-container>
</template>

<script setup>
  const rows = ['min', 'avg', 'max']
  const columns = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const thresholds = {
    from: { min: 41, color: '#5c9fd6' },
    to: { min: 82, color: '#e0522b' },
  }

  const temperatures = {
    min: [66, 66, 63, 57, 52, 48, 46, 48, 52, 57, 61, 64],
    avg: [73, 73, 70, 64, 59, 55, 54, 55, 59, 64, 68, 72],
    max: [79, 79, 75, 72, 66, 61, 61, 63, 66, 72, 75, 77],
  }

  const items = rows.flatMap(row =>
    columns.map((column, i) => ({
      row,
      column,
      value: temperatures[row][i],
    }))
  )
</script>
