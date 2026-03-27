<template>
  <div>
    <div class="d-flex ga-4 mb-4 align-center flex-wrap">
      <v-switch v-model="openAll" label="Open all groups" hide-details></v-switch>
      <v-btn size="small" variant="tonal" @click="opened = []">Close all</v-btn>
    </div>

    <pre class="mb-4 pa-2 bg-surface-variant rounded text-body-2">opened: {{ opened }}</pre>

    <v-data-table
      v-model:opened="opened"
      :group-by="groupBy"
      :group-key="groupKey"
      :headers="headers"
      :items="desserts"
      :open-all-groups="openAll"
      :sort-by="sortBy"
      item-value="name"
    ></v-data-table>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const opened = ref([])
  const openAll = ref(false)

  const sortBy = ref([{ key: 'name', order: 'asc' }])
  const groupBy = ref([{ key: 'category', order: 'asc' }, { key: 'status', order: 'asc' }])

  const groupKey = ({ key, value, parentKey }) => `${parentKey}/${key}:${value}`

  const headers = [
    { key: 'data-table-group', title: 'Category' },
    {
      title: 'Dessert (100g serving)',
      align: 'start',
      key: 'name',
      groupable: false,
    },
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
      opened: [],
      openAll: false,
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
    methods: {
      groupKey ({ key, value, parentKey }) {
        return `${parentKey}/${key}:${value}`
      },
    },
  }
</script>
