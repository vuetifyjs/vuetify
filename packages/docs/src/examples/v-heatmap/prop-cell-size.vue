<template>
  <v-container>
    <v-row justify="center">
      <v-heatmap
        :cell-size="[50, 20]"
        :columns="columns"
        :gap="5"
        :items="items"
        :rows="rows"
        :thresholds="thresholds"
        rounded="sm"
      >
        <template v-slot:row-header="{ row }">
          <v-spacer></v-spacer>
          {{ row }}
        </template>
      </v-heatmap>
    </v-row>
  </v-container>
</template>

<script setup>
  const columns = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const rows = [
    '12 AM', '2 AM', '4 AM', '6 AM', '8 AM', '10 AM',
    '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM',
  ]

  const thresholds = {
    from: { min: 1, color: '#fff3c4' },
    to: { min: 11, color: '#de911d' },
  }

  const items = rows.flatMap(row =>
    columns.map(column => ({
      row,
      column,
      value: Math.floor(Math.random() * 13),
    }))
  )
</script>
