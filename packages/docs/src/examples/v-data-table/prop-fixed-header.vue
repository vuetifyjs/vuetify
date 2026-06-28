<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    height="300"
    fixed-header
    items-per-page="20"
  ></v-data-table>
</template>

<script setup>
  const headers = [
    { title: 'Dessert (100g)', align: 'start', key: 'name' },
    { title: 'Calories', align: 'end', key: 'calories' },
    { title: 'Fat (g)', align: 'end', key: 'fat' },
    { title: 'Carbs (g)', align: 'end', key: 'carbs' },
    { title: 'Protein (g)', align: 'end', key: 'protein' },
  ]

  const desserts = [
    { name: 'Frozen Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4.3 },
    { name: 'Eclair', calories: 262, fat: 16, carbs: 23, protein: 6 },
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 3.9 },
    { name: 'Jelly bean', calories: 375, fat: 0, carbs: 94, protein: 0 },
    { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0 },
    { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
    { name: 'Donut', calories: 452, fat: 25, carbs: 51, protein: 4.9 },
    { name: 'KitKat', calories: 518, fat: 26, carbs: 65, protein: 7 },
    { name: 'Marshmallow', calories: 129, fat: 0, carbs: 33, protein: 0 },
    { name: 'Brownie', calories: 480, fat: 24, carbs: 58, protein: 7 },
    { name: 'Cheesecake', calories: 560, fat: 38, carbs: 41, protein: 9 },
    { name: 'Waffle', calories: 410, fat: 20, carbs: 52, protein: 8 },
    { name: 'Muffin', calories: 340, fat: 14, carbs: 45, protein: 6 },
  ]
</script>
