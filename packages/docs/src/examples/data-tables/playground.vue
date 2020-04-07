<template>
  <div>
    <v-row justify="space-around">
      <v-switch v-model="dense" class="mx-2" label="Dense"></v-switch>
      <v-switch v-model="loading" class="mx-2" label="Loading"></v-switch>
      <v-switch v-model="disableSort" class="mx-2" label="Disable sort"></v-switch>
      <v-switch v-model="disablePagination" class="mx-2" label="Disable pagination"></v-switch>
      <v-switch v-model="disableFiltering" class="mx-2" label="Disable filtering"></v-switch>
      <v-switch v-model="hideDefaultHeader" class="mx-2" label="Hide default header"></v-switch>
      <v-switch v-model="hideDefaultFooter" class="mx-2" label="Hide default footer"></v-switch>
      <v-switch v-model="multiSort" class="mx-2" label="Multi sort"></v-switch>
      <v-switch v-model="mustSort" class="mx-2" label="Must sort"></v-switch>
      <v-switch v-model="showExpand" class="mx-2" label="Show expand"></v-switch>
      <v-switch v-model="showGroupBy" class="mx-2" label="Show group by"></v-switch>
      <v-switch v-model="showSelect" class="mx-2" label="Show select"></v-switch>
      <v-btn-toggle
        v-model="sortBy"
        :multiple="multiSort"
        :mandatory="mustSort"
        :disable="disableSort"
      >
        <v-btn
          v-for="header in headers"
          :key="header.value"
          text
          :value="header.value"
        >Sort by {{ header.text }}</v-btn>
      </v-btn-toggle>
      <v-btn-toggle v-model="groupBy">
        <v-btn
          v-for="header in headers"
          :key="header.value"
          text
          :value="header.value"
        >Group by {{ header.text }}</v-btn>
      </v-btn-toggle>
    </v-row>

    <v-data-table
      :headers="headers"
      :height="height"
      :items="desserts"
      :dense="dense"
      :loading="loading"
      :disable-sort="disableSort"
      :disable-pagination="disablePagination"
      :disable-filtering="disableFiltering"
      :hide-default-header="hideDefaultHeader"
      :hide-default-footer="hideDefaultFooter"
      :multi-sort="multiSort"
      :must-sort="mustSort"
      :show-expand="showExpand"
      :show-group-by="showGroupBy"
      :show-select="showSelect"
      :sort-by="sortBy"
      item-key="name"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dense: false,
        height: 300,
        loading: false,
        disableSort: false,
        disablePagination: false,
        disableFiltering: false,
        hideDefaultHeader: false,
        hideDefaultFooter: false,
        multiSort: false,
        mustSort: false,
        showExpand: false,
        showGroupBy: false,
        showSelect: false,
        sortBy: [],
        groupBy: [],
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            value: 'name',
          },
          { text: 'Category', value: 'category' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            category: 'Ice cream',
          },
          {
            name: 'Ice cream sandwich',
            category: 'Ice cream',
          },
          {
            name: 'Eclair',
            category: 'Cookie',
          },
          {
            name: 'Cupcake',
            category: 'Pastry',
          },
          {
            name: 'Gingerbread',
            category: 'Cookie',
          },
          {
            name: 'Jelly bean',
            category: 'Candy',
          },
          {
            name: 'Lollipop',
            category: 'Candy',
          },
          {
            name: 'Honeycomb',
            category: 'Toffee',
          },
          {
            name: 'Donut',
            category: 'Pastry',
          },
          {
            name: 'KitKat',
            category: 'Candy',
          },
          {
            name: 'Butterfinger',
            category: 'Candy',
          },
          {
            name: 'Scone',
            category: 'Pastry',
          },
          {
            name: 'Crunch bar',
            category: 'Candy',
          },
          {
            name: 'Fudge sundae',
            category: 'Ice cream',
          },
          {
            name: 'Twizzlers',
            category: 'Candy',
          },
          {
            name: 'Root beer float',
            category: 'Ice cream',
          },
          {
            name: 'Strawberry shortcake',
            category: 'Pastry',
          },
          {
            name: 'Croissant',
            category: 'Pastry',
          },
          {
            name: 'Cannoli dip',
            category: 'Ice cream',
          },
          {
            name: 'Sorbet',
            category: 'Ice cream',
          },
        ],
      }
    },
  }
</script>
