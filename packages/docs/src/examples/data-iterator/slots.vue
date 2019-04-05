<template>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      hide-actions
      row
      wrap
    >
      <template v-slot:header>
        <v-toolbar
          class="mb-2"
          color="indigo darken-5"
          dark
          flat
        >
          <v-toolbar-title>This is a header</v-toolbar-title>
        </v-toolbar>
      </template>
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title class="subheading font-weight-bold">{{ props.item.name }}</v-card-title>

            <v-divider></v-divider>

            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Calories:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Fat:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Carbs:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Protein:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Sodium:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Calcium:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Iron:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
      <template v-slot:footer>
        <v-toolbar
          class="mt-2"
          color="indigo"
          dark
          dense
          flat
        >
          <v-toolbar-title class="subheading">This is a footer</v-toolbar-title>
        </v-toolbar>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4
      },
      items: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        }
      ]
    })
  }
</script>
