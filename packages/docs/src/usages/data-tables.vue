<template>
  <div>
    <br>
    <br>
    <br>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="name"
      show-select
      class="elevation-1"
      v-bind="attrs"
    />
  </div>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data () {
      return {
        selected: [],
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'left',
            value: 'name',
          },
          { text: 'Category', value: 'category' },
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
          {
            name: 'Butterfinger',
            category: 'Candy',
          },
          {
            name: 'Scone',
            category: 'Pastry',
          },
          {
            name: 'Crunch bar',
            category: 'Candy',
          },
          {
            name: 'Fudge sundae',
            category: 'Ice cream',
          },
          {
            name: 'Twizzlers',
            category: 'Candy',
          },
          {
            name: 'Root beer float',
            category: 'Ice cream',
          },
          {
            name: 'Strawberry shortcake',
            category: 'Pastry',
          },
          {
            name: 'Croissant',
            category: 'Pastry',
          },
          {
            name: 'Cannoli dip',
            category: 'Ice cream',
          },
          {
            name: 'Sorbet',
            category: 'Ice cream',
          },
        ],
      }
    },
  }
</script>
