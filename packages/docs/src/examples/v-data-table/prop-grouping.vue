<template>
  <v-data-table
    :group-by="groupBy"
    :headers="headers"
    :items="desserts"
    :sort-by="sortBy"
    item-value="name"
  ></v-data-table>
</template>

<script setup>
  import { ref } from 'vue'

  const sortBy = ref([{ key: 'name', order: 'asc' }])
  const groupBy = ref([{ key: 'category', order: 'asc' }, { key: 'status', order: 'asc' }])

  const headers = [
    {
      title: 'Dessert (100g serving)',
      align: 'start',
      key: 'name',
      groupable: false,
    },
    { title: 'Category', key: 'category', align: 'end' },
    { title: 'Dairy', key: 'dairy', align: 'end' },
  ]
  const desserts = [
    {
      name: 'Frozen Yogurt',
      category: 'Ice cream',
      status: 'Available',
      dairy: 'Yes',
    },
    {
      name: 'Ice cream sandwich',
      category: 'Ice cream',
      status: 'Available',
      dairy: 'Yes',
    },
    {
      name: 'Eclair',
      category: 'Cookie',
      status: 'Out of stock',
      dairy: 'Yes',
    },
    {
      name: 'Cupcake',
      category: 'Pastry',
      status: 'Out of stock',
      dairy: 'Yes',
    },
    {
      name: 'Gingerbread',
      category: 'Cookie',
      status: 'Available',
      dairy: 'No',
    },
    {
      name: 'Jelly bean',
      category: 'Candy',
      status: 'Available',
      dairy: 'No',
    },
    {
      name: 'Lollipop',
      category: 'Candy',
      status: 'Out of stock',
      dairy: 'No',
    },
    {
      name: 'Honeycomb',
      category: 'Toffee',
      status: 'Out of stock',
      dairy: 'No',
    },
    {
      name: 'Donut',
      category: 'Pastry',
      dairy: 'Yes',
      status: 'Available',
    },
    {
      name: 'KitKat',
      category: 'Candy',
      dairy: 'Yes',
      status: 'Available',
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      sortBy: [{ key: 'name', order: 'asc' }],
      groupBy: [{ key: 'category', order: 'asc' }, { key: 'status', order: 'asc' }],
      headers: [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          key: 'name',
          groupable: false,
        },
        { title: 'Category', key: 'category', align: 'end' },
        { title: 'Dairy', key: 'dairy', align: 'end' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          category: 'Ice cream',
          status: 'Available',
          dairy: 'Yes',
        },
        {
          name: 'Ice cream sandwich',
          category: 'Ice cream',
          status: 'Available',
          dairy: 'Yes',
        },
        {
          name: 'Eclair',
          category: 'Cookie',
          status: 'Out of stock',
          dairy: 'Yes',
        },
        {
          name: 'Cupcake',
          category: 'Pastry',
          status: 'Out of stock',
          dairy: 'Yes',
        },
        {
          name: 'Gingerbread',
          category: 'Cookie',
          status: 'Available',
          dairy: 'No',
        },
        {
          name: 'Jelly bean',
          category: 'Candy',
          status: 'Available',
          dairy: 'No',
        },
        {
          name: 'Lollipop',
          category: 'Candy',
          status: 'Out of stock',
          dairy: 'No',
        },
        {
          name: 'Honeycomb',
          category: 'Toffee',
          status: 'Out of stock',
          dairy: 'No',
        },
        {
          name: 'Donut',
          category: 'Pastry',
          dairy: 'Yes',
          status: 'Available',
        },
        {
          name: 'KitKat',
          category: 'Candy',
          dairy: 'Yes',
          status: 'Available',
        },
      ],
    }),
  }
</script>
