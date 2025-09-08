<template>
  <v-data-table
    :headers="headers"
    :items="employees"
    class="elevation-1"
  >
    <!-- Show index before the name -->
    <template v-slot:item.name="{ item, index }">
      {{ index + 1 }}. {{ item.name }}
    </template>
  </v-data-table>
</template>

<script setup>
  const headers = [
    { title: 'Name', key: 'name' },
    { title: 'Age', key: 'age' },
    { title: 'Department', key: 'department' },
  ]

  const employees = [
    { name: 'Alice Johnson', age: 28, department: 'Engineering' },
    { name: 'Bob Carter', age: 34, department: 'Marketing' },
    { name: 'Clara Diaz', age: 25, department: 'HR' },
    { name: 'David Evans', age: 42, department: 'Finance' },
    { name: 'Eva Flores', age: 31, department: 'Design' },
    { name: 'Frank Green', age: 29, department: 'Support' },
    { name: 'Grace Harris', age: 36, department: 'Operations' },
    { name: 'Hank Irving', age: 27, department: 'IT' },
  ]
</script>
