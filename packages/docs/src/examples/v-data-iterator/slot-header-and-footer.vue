<template>
  <v-data-iterator
    :items="desserts"
    :items-per-page="4"
    :sort-by="sortBy"
    :search="search"
  >
    <template v-slot:header>
      <v-toolbar
        dark
        color="blue darken-3"
        class="pa-2 mb-2"
      >
        <v-text-field
          v-model="search"
          clearable
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          variant="solo"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
          v-model="sortKey"
          flat
          solo-inverted
          hide-details
          :items="keys"
          prepend-inner-icon="mdi-magnify"
          label="Sort by"
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn-toggle
          v-model="sortOrder"
          mandatory
        >
          <v-btn
            size="large"
            depressed
            color="blue"
            value="asc"
          >
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
          <v-btn
            size="large"
            depressed
            color="blue"
            value="desc"
          >
            <v-icon>mdi-arrow-down</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </template>

    <template v-slot:no-data>
      <v-alert class="ma-2" type="warning">No results</v-alert>
    </template>

    <template v-slot:default="{ items, isSelected, toggleSelect }">
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
              <v-checkbox-btn :model-value="isSelected(item)" @click="toggleSelect(item)"></v-checkbox-btn>
            </v-card-title>

            <v-divider></v-divider>

            <v-list density="compact">
              <v-list-item title="Calories" :subtitle="item.raw.calories"></v-list-item>
              <v-list-item title="Fat" :subtitle="item.raw.fat"></v-list-item>
              <v-list-item title="Carbs" :subtitle="item.raw.carbs"></v-list-item>
              <v-list-item title="Protein" :subtitle="item.raw.protein"></v-list-item>
              <v-list-item title="Sodium" :subtitle="item.raw.sodium"></v-list-item>
              <v-list-item title="Calcium" :subtitle="item.raw.calcium"></v-list-item>
              <v-list-item title="Iron" :subtitle="item.raw.iron"></v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer="{ prevPage, nextPage, pageCount, page, setItemsPerPage, itemsPerPage }">
      <div class="d-flex align-center justify-space-around pa-4">
        <span class="grey--text">Items per page</span>
        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn
              dark
              text
              color="primary"
              class="ml-2"
              v-bind="props"
            >
              {{ itemsPerPage }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
              @click="setItemsPerPage(number)"
            >
              <v-list-item-title>{{ number }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-spacer></v-spacer>

        <span
          class="mr-4
          grey--text"
        >
          Page {{ page }} of {{ pageCount }}
        </span>
        <v-btn
          fab
          dark
          color="blue darken-3"
          class="mr-1"
          @click="prevPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          color="blue darken-3"
          class="ml-1"
          @click="nextPage"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
    </template>
  </v-data-iterator>
</template>

<script>
  export default {
    data: () => ({
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortKey: 'name',
      sortOrder: 'asc',
      keys: [
        'name',
        'calories',
        'fat',
        'carbs',
        'protein',
        'sodium',
        'calcium',
        'iron',
      ],
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
    methods: {
      updateItemsPerPage (number) {
        this.itemsPerPage = number
      },
    },
  }
</script>
