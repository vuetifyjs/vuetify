<template>
  <div class="text-center">
    <v-btn
      :disabled="loading"
      append-icon="mdi-refresh"
      text="Refresh"
      variant="outlined"
      @click="onClick"
    ></v-btn>
  </div>

  <v-data-table :items="items" :loading="loading">
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const loading = shallowRef(false)

  const items = [
    { name: 'Chevrolet Camaro', year: 1967, engine: 'V8', horsepower: 375, torque: 415 },
    { name: 'Ford Mustang', year: 1965, engine: 'V8', horsepower: 271, torque: 312 },
    { name: 'Dodge Charger', year: 1968, engine: 'V8', horsepower: 425, torque: 490 },
    { name: 'Pontiac GTO', year: 1964, engine: 'V8', horsepower: 350, torque: 445 },
    { name: 'Plymouth Barracuda', year: 1964, engine: 'V8', horsepower: 330, torque: 425 },
    { name: 'Chevrolet Chevelle SS', year: 1970, engine: 'V8', horsepower: 450, torque: 500 },
    { name: 'Oldsmobile 442', year: 1971, engine: 'V8', horsepower: 340, torque: 440 },
    { name: 'Dodge Challenger', year: 1970, engine: 'V8', horsepower: 425, torque: 490 },
    { name: 'AMC Javelin', year: 1968, engine: 'V8', horsepower: 315, torque: 425 },
    { name: 'Mercury Cougar', year: 1967, engine: 'V8', horsepower: 335, torque: 427 },
  ]

  function onClick () {
    loading.value = true
    setTimeout(() => {
      loading.value = false
    }, 2000)
  }
</script>

<script>
  import { shallowRef } from 'vue'

  export default {
    data () {
      return {
        loading: false,
        items: [
          { name: 'Chevrolet Camaro', year: 1967, engine: 'V8', horsepower: 375, torque: 415 },
          { name: 'Ford Mustang', year: 1965, engine: 'V8', horsepower: 271, torque: 312 },
          { name: 'Dodge Charger', year: 1968, engine: 'V8', horsepower: 425, torque: 490 },
          { name: 'Pontiac GTO', year: 1964, engine: 'V8', horsepower: 350, torque: 445 },
          { name: 'Plymouth Barracuda', year: 1964, engine: 'V8', horsepower: 330, torque: 425 },
          { name: 'Chevrolet Chevelle SS', year: 1970, engine: 'V8', horsepower: 450, torque: 500 },
          { name: 'Oldsmobile 442', year: 1971, engine: 'V8', horsepower: 340, torque: 440 },
          { name: 'Dodge Challenger', year: 1970, engine: 'V8', horsepower: 425, torque: 490 },
          { name: 'AMC Javelin', year: 1968, engine: 'V8', horsepower: 315, torque: 425 },
          { name: 'Mercury Cougar', year: 1967, engine: 'V8', horsepower: 335, torque: 427 },
        ],
      }
    },
    methods: {
      onClick () {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2000)
      },
    },
  }
</script>
