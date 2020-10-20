<template>
  <v-container class="fill-height">
    <v-data-iterator
      :footer-props="{ itemsPerPageOptions }"
      :items="items"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      v-bind="$attrs"
    >
      <template v-slot:header>
        <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
        >
          <v-text-field
            v-model="search"
            clearable
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              class="mx-2"
              flat
              solo-inverted
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
            >
              <v-btn
                large
                depressed
                color="blue"
                :value="false"
              >
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="blue"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.name"
            cols="12"
            sm="6"
          >
            <v-card>
              <v-card-title>
                <h5>{{ item.name }}</h5>
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-row justify="space-between">
                    <v-col cols="auto">
                      <v-list-item-content>Calories:</v-list-item-content>
                    </v-col>
                    <v-col cols="auto">
                      <v-list-item-content>{{ item.calories }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row justify="space-between">
                    <v-col cols="auto">
                      <v-list-item-content>Fat:</v-list-item-content>
                    </v-col>
                    <v-col cols="auto">
                      <v-list-item-content>{{ item.fat }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row justify="space-between">
                    <v-col cols="auto">
                      <v-list-item-content>Carbs:</v-list-item-content>
                    </v-col>
                    <v-col cols="auto">
                      <v-list-item-content>{{ item.carbs }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row justify="space-between">
                    <v-col cols="auto">
                      <v-list-item-content>Protein:</v-list-item-content>
                    </v-col>
                    <v-col cols="auto">
                      <v-list-item-content>{{ item.protein }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row justify="space-between">
                    <v-col cols="auto">
                      <v-list-item-content>Sodium:</v-list-item-content>
                    </v-col>
                    <v-col cols="auto">
                      <v-list-item-content>{{ item.sodium }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row justify="space-between">
                    <v-col cols="auto">
                      <v-list-item-content>Calcium:</v-list-item-content>
                    </v-col>
                    <v-col cols="auto">
                      <v-list-item-content>{{ item.calcium }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-list-item>
                  <v-row justify="space-between">
                    <v-col cols="auto">
                      <v-list-item-content>Iron:</v-list-item-content>
                    </v-col>
                    <v-col cols="auto">
                      <v-list-item-content>{{ item.iron }}</v-list-item-content>
                    </v-col>
                  </v-row>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  export default {
    name: 'Usage',

    inheritAttrs: false,

    data: () => ({
      itemsPerPageOptions: [4, 8, 12],
      search: '',
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'name',
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
      items: [
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
      defaults: {
        'disable-filtering': false,
        'disable-pagination': false,
        'disable-sort': false,
        'hide-default-footer': false,
      },
      options: {
        booleans: [
          'disable-filtering',
          'disable-pagination',
          'disable-sort',
          'hide-default-footer',
        ],
      },
      tabs: [],
    }),
  }
</script>
