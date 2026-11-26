<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="3"
    :items-per-page-options="[3, 5, -1]"
    first-icon="mdi-arrow-collapse-left"
    items-per-page-text="Desserts per page"
    last-icon="mdi-arrow-collapse-right"
    next-icon="mdi-arrow-right"
    prev-icon="mdi-arrow-left"
    show-current-page
  ></v-data-table>
</template>

<script setup>
  const headers = [
    { title: 'Dessert (100g serving)', value: 'name' },
    { title: 'Category', value: 'category' },
  ]
  const desserts = [
    { name: 'Frozen Yogurt', category: 'Ice cream' },
    { name: 'Ice cream sandwich', category: 'Ice cream' },
    { name: 'Eclair', category: 'Cookie' },
    { name: 'Cupcake', category: 'Pastry' },
    { name: 'Gingerbread', category: 'Cookie' },
    { name: 'Jelly bean', category: 'Candy' },
    { name: 'Lollipop', category: 'Candy' },
    { name: 'Honeycomb', category: 'Toffee' },
    { name: 'Donut', category: 'Pastry' },
    { name: 'KitKat', category: 'Candy' },
  ]
</script>

<script>
  export default {
    data: () => ({
      headers: [
        { title: 'Dessert (100g serving)', value: 'name' },
        { title: 'Category', value: 'category' },
      ],
      desserts: [
        { name: 'Frozen Yogurt', category: 'Ice cream' },
        { name: 'Ice cream sandwich', category: 'Ice cream' },
        { name: 'Eclair', category: 'Cookie' },
        { name: 'Cupcake', category: 'Pastry' },
        { name: 'Gingerbread', category: 'Cookie' },
        { name: 'Jelly bean', category: 'Candy' },
        { name: 'Lollipop', category: 'Candy' },
        { name: 'Honeycomb', category: 'Toffee' },
        { name: 'Donut', category: 'Pastry' },
        { name: 'KitKat', category: 'Candy' },
      ],
    }),
  }
</script>
