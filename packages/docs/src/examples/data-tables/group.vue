<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    item-key="name"
    group-by="category"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            category: 'Ice cream'
          },
          {
            name: 'Ice cream sandwich',
            category: 'Ice cream'
          },
          {
            name: 'Eclair',
            category: 'Cookie'
          },
          {
            name: 'Cupcake',
            category: 'Pastry'
          },
          {
            name: 'Gingerbread',
            category: 'Cookie'
          },
          {
            name: 'Jelly bean',
            category: 'Candy'
          },
          {
            name: 'Lollipop',
            category: 'Candy'
          },
          {
            name: 'Honeycomb',
            category: 'Toffee'
          },
          {
            name: 'Donut',
            category: 'Pastry'
          },
          {
            name: 'KitKat',
            category: 'Candy'
          }
        ]
      }
    }
  }
</script>
