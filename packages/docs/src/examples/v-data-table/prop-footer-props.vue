<template>
  <v-data-table
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    item-key="name"
  ></v-data-table>
</template>

<script setup>
  const headers = [
    {
      title: 'Dessert (100g serving)',
      align: 'start',
      value: 'name',
    },
    { title: 'Category', value: 'category' },
  ]
  const desserts = [
    {
      name: 'Frozen Yogurt',
      category: 'Ice cream',
    },
    {
      name: 'Ice cream sandwich',
      category: 'Ice cream',
    },
    {
      name: 'Eclair',
      category: 'Cookie',
    },
    {
      name: 'Cupcake',
      category: 'Pastry',
    },
    {
      name: 'Gingerbread',
      category: 'Cookie',
    },
    {
      name: 'Jelly bean',
      category: 'Candy',
    },
    {
      name: 'Lollipop',
      category: 'Candy',
    },
    {
      name: 'Honeycomb',
      category: 'Toffee',
    },
    {
      name: 'Donut',
      category: 'Pastry',
    },
    {
      name: 'KitKat',
      category: 'Candy',
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      headers: [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          value: 'name',
        },
        { title: 'Category', value: 'category' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          category: 'Ice cream',
        },
        {
          name: 'Ice cream sandwich',
          category: 'Ice cream',
        },
        {
          name: 'Eclair',
          category: 'Cookie',
        },
        {
          name: 'Cupcake',
          category: 'Pastry',
        },
        {
          name: 'Gingerbread',
          category: 'Cookie',
        },
        {
          name: 'Jelly bean',
          category: 'Candy',
        },
        {
          name: 'Lollipop',
          category: 'Candy',
        },
        {
          name: 'Honeycomb',
          category: 'Toffee',
        },
        {
          name: 'Donut',
          category: 'Pastry',
        },
        {
          name: 'KitKat',
          category: 'Candy',
        },
      ],
    }),
  }
</script>
