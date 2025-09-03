<template>
  <v-container fluid>
    <v-autocomplete
      :filter-keys="['title', 'raw.abbr']"
      :items="states"
      item-title="name"
      label="State"
    ></v-autocomplete>
  </v-container>
</template>

<script setup>
  const states = [
    { name: 'Florida', abbr: 'FL' },
    { name: 'Georgia', abbr: 'GA' },
    { name: 'Nebraska', abbr: 'NE' },
    { name: 'California', abbr: 'CA' },
    { name: 'New York', abbr: 'NY' },
  ]
</script>

<script>
  export default {
    data: () => ({
      states: [
        { name: 'Florida', abbr: 'FL' },
        { name: 'Georgia', abbr: 'GA' },
        { name: 'Nebraska', abbr: 'NE' },
        { name: 'California', abbr: 'CA' },
        { name: 'New York', abbr: 'NY' },
      ],
    }),
  }
</script>
