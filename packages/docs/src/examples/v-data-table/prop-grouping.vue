<template>
  <v-data-table
    :group-by="groupBy"
    :headers="headers"
    :items="desserts"
    :sort-by="sortBy"
    class="elevation-1"
    item-value="name"
  ></v-data-table>
</template>

<script>
  export default {
    data: () => ({
      sortBy: [{ key: 'name' }],
      groupBy: [{ key: 'dairy' }],
      headers: [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          value: 'name',
          groupable: false,
        },
        { title: 'Category', value: 'category', align: 'end' },
        { title: 'Dairy', value: 'dairy', align: 'end' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          category: 'Ice cream',
          dairy: 'Yes',
        },
        {
          name: 'Ice cream sandwich',
          category: 'Ice cream',
          dairy: 'Yes',
        },
        {
          name: 'Eclair',
          category: 'Cookie',
          dairy: 'Yes',
        },
        {
          name: 'Cupcake',
          category: 'Pastry',
          dairy: 'Yes',
        },
        {
          name: 'Gingerbread',
          category: 'Cookie',
          dairy: 'No',
        },
        {
          name: 'Jelly bean',
          category: 'Candy',
          dairy: 'No',
        },
        {
          name: 'Lollipop',
          category: 'Candy',
          dairy: 'No',
        },
        {
          name: 'Honeycomb',
          category: 'Toffee',
          dairy: 'No',
        },
        {
          name: 'Donut',
          category: 'Pastry',
          dairy: 'Yes',
        },
        {
          name: 'KitKat',
          category: 'Candy',
        },
      ],
    }),
  }
</script>
