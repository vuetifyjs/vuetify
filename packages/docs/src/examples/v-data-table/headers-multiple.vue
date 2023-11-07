<template>
  <v-data-table
    :headers="headers"
    :items="items"
    class="elevation-1"
    item-key="name"
    items-per-page="5"
  ></v-data-table>
</template>

<script setup>
  const items = [
    {
      name: 'Great Pyramid of Giza',
      location: 'Egypt',
      height: '146.6',
      base: '230.4',
      volume: '2583285',
      constructionDate: 'c. 2580–2560 BC',
    },
    {
      name: 'Pyramid of Khafre',
      location: 'Egypt',
      height: '136.4',
      base: '215.3',
      volume: '1477485',
      constructionDate: 'c. 2570 BC',
    },
    {
      name: 'Red Pyramid',
      location: 'Egypt',
      height: '104',
      base: '220',
      volume: '1602895',
      constructionDate: 'c. 2590 BC',
    },
    {
      name: 'Bent Pyramid',
      location: 'Egypt',
      height: '101.1',
      base: '188.6',
      volume: '1200690',
      constructionDate: 'c. 2600 BC',
    },
    {
      name: 'Pyramid of the Sun',
      location: 'Mexico',
      height: '65',
      base: '225',
      volume: '1237097',
      constructionDate: 'c. 200 CE',
    },
  ]
  const headers = [
    {
      text: 'Pyramid',
      align: 'start',
      sortable: false,
      value: 'name',
    },
    { text: 'Location', value: 'location' },
    { text: 'Height (m)', value: 'height' },
    { text: 'Base (m)', value: 'base' },
    { text: 'Volume (cu m)', value: 'volume' },
    { text: 'Construction Date', value: 'constructionDate' },
  ]
</script>

<script>
  export default {
    data: () => ({
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7,
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8,
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2,
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45,
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6,
        },
      ],
      headers: [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          key: 'name',
          rowspan: 2,
        },
        {
          title: 'Properties',
          children: [
            { title: 'Calories', align: 'end', key: 'calories' },
            { title: 'Fat (g)', align: 'end', key: 'fat' },
            { title: 'Carbs (g)', align: 'end', key: 'carbs' },
            { title: 'Protein (g)', align: 'end', key: 'protein' },
            { title: 'Iron (%)', align: 'end', key: 'iron' },
          ],
        },
      ],
    }),
  }
</script>
