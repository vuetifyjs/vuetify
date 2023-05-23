<template>
  <v-data-iterator
    :items="desserts"
    :items-per-page="3"
  >
    <template v-slot:header>
      <div class="bg-primary pa-2 mb-2">
        Header
      </div>
    </template>

    <template v-slot:default="{ items }">
      <v-row>
        <v-col
          v-for="item in items"
          :key="item.raw.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="fill-height">
            <v-card-title class="subheading font-weight-bold d-flex align-center justify-space-between">
              {{ item.raw.name }}
            </v-card-title>

            <v-divider></v-divider>

            <v-list density="compact">
              <v-list-item title="Calories" :subtitle="String(item.raw.calories)"></v-list-item>
              <v-list-item title="Fat" :subtitle="String(item.raw.fat)"></v-list-item>
              <v-list-item title="Carbs" :subtitle="String(item.raw.carbs)"></v-list-item>
              <v-list-item title="Protein" :subtitle="String(item.raw.protein)"></v-list-item>
              <v-list-item title="Sodium" :subtitle="String(item.raw.sodium)"></v-list-item>
              <v-list-item title="Calcium" :subtitle="String(item.raw.calcium)"></v-list-item>
              <v-list-item title="Iron" :subtitle="String(item.raw.iron)"></v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <div class="bg-primary pa-2 mt-2">
        Footer
      </div>
    </template>
  </v-data-iterator>
</template>

<script>
  export default {
    data: () => ({
      itemsPerPageArray: [3, 6, 9],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%',
        },
      ],
    }),
    computed: {
      filteredKeys () {
        return this.keys.filter(key => key !== 'Name')
      },
      sortBy () {
        return [{
          key: this.sortKey,
          order: this.sortOrder,
        }]
      },
    },
  }
</script>
