<template>
  <v-container class="my-6">
    <v-row justify="center">
      <v-heatmap
        :cell-size="[56, 32]"
        :columns="columns"
        :gap="1"
        :group-by="(v) => v.percentile"
        :items="items"
        :thresholds="linearScale"
        group-gap="12"
        rounded="0"
      >
        <template v-slot:group-header="{ group }">
          <div class="text-center font-weight-bold text-body-large">{{ group.key }} percentile</div>
        </template>
        <template v-slot:cell="{ item }">
          <span class="v-heatmap-cell__text">{{ item.value.toFixed(2) }}x</span>
        </template>
      </v-heatmap>
    </v-row>
  </v-container>
</template>

<script setup>
  const years = [2019, 2020, 2021, 2022, 2023, 2024]
  const columns = ['$1M+', '$10M+', '$50M+', '$100M+']
  const percentiles = ['50th', '75th', '90th']

  const linearScale = {
    from: { min: 1.0, color: '#fe7656' },
    to: { min: 3.2, color: '#e8f4e7' },
  }

  const baseByPercentile = { '50th': 0.8, '75th': 2.4, '90th': 2.8 }

  const items = percentiles.flatMap(percentile =>
    years.flatMap(year =>
      columns.map(column => {
        const base = baseByPercentile[percentile]
        const yearDrift = (2024 - year) * 0.05
        const sizeDrift = columns.indexOf(column) * 0.12
        const jitter = (Math.random() - 0.5) * 0.3
        return {
          row: year,
          column,
          percentile,
          value: Math.max(0.5, base + yearDrift + sizeDrift + jitter),
        }
      })
    )
  )
</script>
