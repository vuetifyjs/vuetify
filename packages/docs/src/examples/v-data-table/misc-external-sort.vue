<template>
  <div>
    <v-data-table
      v-model:sort-by="sortBy"
      :headers="headers"
      :items="desserts"
      class="elevation-1"
    ></v-data-table>
    <div class="text-center pt-2">
      <v-btn
        color="primary"
        class="me-2"
        @click="toggleOrder"
      >
        Toggle sort order
      </v-btn>
      <v-btn
        color="primary"
        @click="nextSort"
      >
        Sort next column
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sortBy: [{ key: 'fat', order: 'asc' }],
        headers: [
          {
            title: 'Dessert (100g serving)',
            align: 'start',
            key: 'name',
          },
          { title: 'Calories', key: 'calories' },
          { title: 'Fat (g)', key: 'fat' },
          { title: 'Carbs (g)', key: 'carbs' },
          { title: 'Protein (g)', key: 'protein' },
          { title: 'Iron (%)', key: 'iron' },
        ],
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
      }
    },
    methods: {
      toggleOrder () {
        this.sortBy = [{ key: this.sortBy[0].key, order: this.sortBy[0].order === 'asc' ? 'desc' : 'asc' }]
      },
      nextSort () {
        let index = this.headers.findIndex(h => h.key === this.sortBy[0].key)
        index = (index + 1) % this.headers.length
        this.sortBy = [{ key: this.headers[index].key, order: 'asc' }]
      },
    },
  }
</script>
