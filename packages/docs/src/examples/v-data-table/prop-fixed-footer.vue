<template>
  <v-card>
    <v-text-field
      v-model="search"
      density="compact"
      placeholder="Type 'rs'..."
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      hide-details
    ></v-text-field>

    <v-data-table
      :filter-keys="['name', 'fuel', 'origin']"
      :headers="headers"
      :items="cars"
      :items-per-page="-1"
      :search="search"
      height="400"
      item-value="name"
      fixed-footer
      fixed-header
    >
      <template v-slot:item.price="{ value }">
        ${{ value.toLocaleString() }}
      </template>

      <template v-slot:tfoot="{ items }">
        <tfoot>
          <tr>
            <td>Total</td>
            <td class="text-end">{{ sum(items, 'horsepower') }}</td>
            <td colspan="2"></td>
            <td class="text-end">${{ sum(items, 'price').toLocaleString() }}</td>
          </tr>
        </tfoot>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const search = ref('')

  const sum = (items, key) => items.reduce((total, item) => total + item[key], 0)

  const cars = [
    { name: 'Ford Mustang', horsepower: 450, fuel: 'Gasoline', origin: 'USA', price: 55000 },
    { name: 'Tesla Model S', horsepower: 670, fuel: 'Electric', origin: 'USA', price: 79999 },
    { name: 'BMW M3', horsepower: 503, fuel: 'Gasoline', origin: 'Germany', price: 70000 },
    { name: 'Audi RS6', horsepower: 591, fuel: 'Gasoline', origin: 'Germany', price: 109000 },
    { name: 'Chevrolet Camaro', horsepower: 650, fuel: 'Gasoline', origin: 'USA', price: 62000 },
    { name: 'Porsche 911', horsepower: 379, fuel: 'Gasoline', origin: 'Germany', price: 101000 },
    { name: 'Jaguar F-Type', horsepower: 575, fuel: 'Gasoline', origin: 'UK', price: 61000 },
    { name: 'Mazda MX-5', horsepower: 181, fuel: 'Gasoline', origin: 'Japan', price: 26000 },
    { name: 'Nissan GT-R', horsepower: 565, fuel: 'Gasoline', origin: 'Japan', price: 113540 },
    { name: 'Mercedes-AMG GT', horsepower: 523, fuel: 'Gasoline', origin: 'Germany', price: 115900 },
  ]

  const headers = [
    { title: 'Car Model', key: 'name', align: 'start' },
    { title: 'Horsepower', key: 'horsepower', align: 'end' },
    { title: 'Fuel Type', key: 'fuel', align: 'start' },
    { title: 'Origin', key: 'origin', align: 'start' },
    { title: 'Price', key: 'price', align: 'end' },
  ]
</script>

<script>
  export default {
    data: () => ({
      search: '',
      cars: [
        { name: 'Ford Mustang', horsepower: 450, fuel: 'Gasoline', origin: 'USA', price: 55000 },
        { name: 'Tesla Model S', horsepower: 670, fuel: 'Electric', origin: 'USA', price: 79999 },
        { name: 'BMW M3', horsepower: 503, fuel: 'Gasoline', origin: 'Germany', price: 70000 },
        { name: 'Audi RS6', horsepower: 591, fuel: 'Gasoline', origin: 'Germany', price: 109000 },
        { name: 'Chevrolet Camaro', horsepower: 650, fuel: 'Gasoline', origin: 'USA', price: 62000 },
        { name: 'Porsche 911', horsepower: 379, fuel: 'Gasoline', origin: 'Germany', price: 101000 },
        { name: 'Jaguar F-Type', horsepower: 575, fuel: 'Gasoline', origin: 'UK', price: 61000 },
        { name: 'Mazda MX-5', horsepower: 181, fuel: 'Gasoline', origin: 'Japan', price: 26000 },
        { name: 'Nissan GT-R', horsepower: 565, fuel: 'Gasoline', origin: 'Japan', price: 113540 },
        { name: 'Mercedes-AMG GT', horsepower: 523, fuel: 'Gasoline', origin: 'Germany', price: 115900 },
      ],
      headers: [
        { title: 'Car Model', key: 'name', align: 'start' },
        { title: 'Horsepower', key: 'horsepower', align: 'end' },
        { title: 'Fuel Type', key: 'fuel', align: 'start' },
        { title: 'Origin', key: 'origin', align: 'start' },
        { title: 'Price ($)', key: 'price', align: 'end' },
      ],
    }),
    methods: {
      sum (items, key) {
        return items.reduce((total, item) => total + item[key], 0)
      },
    },
  }
</script>

<style>
  .v-data-table-footer {
    position: sticky;
    background-color: inherit;
    border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
    bottom: 0;
  }
</style>
