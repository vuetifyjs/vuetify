<template>
  <v-data-iterator
    v-model:items-per-page="itemsPerPage"
    v-model:page="page"
    :items="desserts"
    :search="search"
    :sort-by="sortBy"
  >
    <template v-slot:header>
      <v-toolbar
        dark
        color="blue-darken-3"
        class="px-2 mb-2"
      >
        <v-text-field
          v-model="search"
          clearable
          hide-details
          prepend-inner-icon="mdi-magnify"
          placeholder="Search"
          variant="solo"
          density="comfortable"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-select
          v-model="sortKey"
          hide-details
          :items="keys"
          :item-value="item => item.toLowerCase()"
          prepend-inner-icon="mdi-sort"
          label="Sort by"
          density="comfortable"
        ></v-select>
        <v-spacer></v-spacer>
        <v-btn-toggle
          v-model="sortOrder"
          mandatory
        >
          <v-btn
            color="blue"
            value="asc"
          >
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
          <v-btn
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

    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.name"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card>
            <v-card-title class="subheading font-weight-bold">
              {{ item.raw.name }}
            </v-card-title>

            <v-divider></v-divider>

            <v-list density="compact">
              <v-list-item
                v-for="(key, index) in filteredKeys"
                :key="index"
                :title="key"
                :subtitle="String(item.raw[key.toLowerCase()])"
                :class="{ 'text-blue': sortKey === key.toLowerCase() }"
              ></v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <div class="d-flex align-center justify-space-around pa-4">
        <span class="grey--text">Items per page</span>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              color="primary"
              class="ml-2"
              append-icon="mdi-chevron-down"
              v-bind="props"
            >
              {{ itemsPerPage }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
              :title="number"
              @click="itemsPerPage = number"
            ></v-list-item>
          </v-list>
        </v-menu>

        <v-spacer></v-spacer>

        <span
          class="mr-4
          grey--text"
        >
          Page {{ page }} of {{ numberOfPages }}
        </span>
        <v-btn
          icon
          size="small"
          @click="prevPage"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn
          icon
          size="small"
          class="ml-2"
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
    data () {
      return {
        itemsPerPageArray: [3, 6, 9],
        itemsPerPage: 3,
        page: 1,
        search: '',
        sortKey: 'name',
        sortOrder: 'asc',
        keys: [
          'Name',
          'Calories',
          'Fat',
          'Carbs',
          'Protein',
          'Sodium',
          'Calcium',
          'Iron',
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
      }
    },
    computed: {
      numberOfPages () {
        return Math.ceil(this.desserts.length / this.itemsPerPage)
      },
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
      nextPage () {
        if (this.page + 1 <= this.numberOfPages) this.page += 1
      },
      prevPage () {
        if (this.page - 1 >= 1) this.page -= 1
      },
    },
  }
</script>
