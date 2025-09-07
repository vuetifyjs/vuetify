<template>
  <v-data-table
    :headers="headers"
    :items="employees"
    class="elevation-1"
  >
    <template v-slot:item.index="{ index }">
      {{ index + 1 }}
    </template>
  </v-data-table>
</template>

<script setup>
  const headers = [
    { title: '#', key: 'index' },
    { title: 'Name', key: 'name' },
  ]

  const employees = [
    { name: 'Alice Johnson' },
    { name: 'Bob Carter' },
    { name: 'Clara Diaz' },
    { name: 'David Evans' },
    { name: 'Eva Flores' },
    { name: 'Frank Green' },
    { name: 'Grace Harris' },
    { name: 'Hank Irving' },
  ]
</script>
