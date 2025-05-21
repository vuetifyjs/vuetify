<template>
  <v-data-table :items="consoles" hide-default-footer>
    <template v-slot:item.exclusive="{ item }">
      <v-checkbox-btn
        v-model="item.exclusive"
        :ripple="false"
      ></v-checkbox-btn>
    </template>
  </v-data-table>
</template>

<script setup>
  import { ref } from 'vue'

  const consoles = ref([
    {
      name: 'PlayStation 5',
      manufacturer: 'Sony',
      year: 2020,
      sales: '10M',
      exclusive: true,
    },
    {
      name: 'Xbox Series X',
      manufacturer: 'Microsoft',
      year: 2020,
      sales: '6.5M',
      exclusive: false,
    },
    {
      name: 'Nintendo Switch',
      manufacturer: 'Nintendo',
      year: 2017,
      sales: '89M',
      exclusive: true,
    },
    {
      name: 'PlayStation 4',
      manufacturer: 'Sony',
      year: 2013,
      sales: '116M',
      exclusive: true,
    },
    {
      name: 'Xbox One',
      manufacturer: 'Microsoft',
      year: 2013,
      sales: '50M',
      exclusive: false,
    },
    {
      name: 'Nintendo Wii',
      manufacturer: 'Nintendo',
      year: 2006,
      sales: '101M',
      exclusive: true,
    },
  ])
</script>

<script>
  export default {
    data: () => ({
      consoles: [
        {
          name: 'PlayStation 5',
          manufacturer: 'Sony',
          year: 2020,
          sales: '10M',
          exclusive: true,
        },
        {
          name: 'Xbox Series X',
          manufacturer: 'Microsoft',
          year: 2020,
          sales: '6.5M',
          exclusive: false,
        },
        {
          name: 'Nintendo Switch',
          manufacturer: 'Nintendo',
          year: 2017,
          sales: '89M',
          exclusive: true,
        },
        {
          name: 'PlayStation 4',
          manufacturer: 'Sony',
          year: 2013,
          sales: '116M',
          exclusive: true,
        },
        {
          name: 'Xbox One',
          manufacturer: 'Microsoft',
          year: 2013,
          sales: '50M',
          exclusive: false,
        },
        {
          name: 'Nintendo Wii',
          manufacturer: 'Nintendo',
          year: 2006,
          sales: '101M',
          exclusive: true,
        },
      ],
    }),
  }
</script>
