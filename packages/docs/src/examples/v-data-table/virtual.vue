<template>
  <v-data-table-virtual
    :headers="headers"
    :items="virtualBoats"
    class="elevation-1"
    height="400"
    item-value="name"
  ></v-data-table-virtual>
</template>

<script setup>
  import { computed } from 'vue'

  const headers = [
    { title: 'Boat Type', align: 'start', key: 'name' },
    { title: 'Speed (knots)', align: 'end', key: 'speed' },
    { title: 'Length (m)', align: 'end', key: 'length' },
    { title: 'Price ($)', align: 'end', key: 'price' },
    { title: 'Year', align: 'end', key: 'year' },
  ]

  const boats = [
    {
      name: 'Speedster',
      speed: 35,
      length: 22,
      price: 300000,
      year: 2021,
    },
    {
      name: 'OceanMaster',
      speed: 25,
      length: 35,
      price: 500000,
      year: 2020,
    },
    {
      name: 'Voyager',
      speed: 20,
      length: 45,
      price: 700000,
      year: 2019,
    },
    {
      name: 'WaveRunner',
      speed: 40,
      length: 19,
      price: 250000,
      year: 2022,
    },
    {
      name: 'SeaBreeze',
      speed: 28,
      length: 31,
      price: 450000,
      year: 2018,
    },
    {
      name: 'HarborGuard',
      speed: 18,
      length: 50,
      price: 800000,
      year: 2017,
    },
    {
      name: 'SlickFin',
      speed: 33,
      length: 24,
      price: 350000,
      year: 2021,
    },
    {
      name: 'StormBreaker',
      speed: 22,
      length: 38,
      price: 600000,
      year: 2020,
    },
    {
      name: 'WindSail',
      speed: 15,
      length: 55,
      price: 900000,
      year: 2019,
    },
    {
      name: 'FastTide',
      speed: 37,
      length: 20,
      price: 280000,
      year: 2022,
    },
  ]

  const virtualBoats = computed(() => {
    return [...Array(10000).keys()].map(i => {
      const boat = { ...boats[i % 10] }
      boat.name = `${boat.name} #${i}`
      return boat
    })
  })
</script>

<script>
  export default {
    data: () => ({
      headers: [
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Calories', align: 'end', key: 'calories' },
        { title: 'Fat (g)', align: 'end', key: 'fat' },
        { title: 'Carbs (g)', align: 'end', key: 'carbs' },
        { title: 'Protein (g)', align: 'end', key: 'protein' },
        { title: 'Iron (%)', align: 'end', key: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6',
        },
      ],
    }),
    computed: {
      virtualDesserts () {
        return [...Array(10000).keys()].map(i => {
          const dessert = { ...this.desserts[i % 10] }
          dessert.name = `${dessert.name} #${i}`

          return dessert
        })
      },
    },
  }
</script>
