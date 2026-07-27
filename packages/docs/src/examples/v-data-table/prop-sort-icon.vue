<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :sort-by="[{ key: 'calories', order: 'asc' }, { key: 'fat', order: 'desc' }]"
    sort-asc-icon="mdi-sort-ascending"
    sort-desc-icon="mdi-sort-descending"
    sort-icon="mdi-swap-vertical"
  ></v-data-table>
</template>

<script setup>
  const headers = [
    {
      title: 'Dessert (100g serving)',
      align: 'start',
      sortable: false,
      key: 'name',
    },
    { title: 'Calories', key: 'calories' },
    { title: 'Fat (g)', key: 'fat' },
    { title: 'Carbs (g)', key: 'carbs' },
    { title: 'Protein (g)', key: 'protein' },
  ]
  const desserts = [
    { name: 'Frozen Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4.3 },
    { name: 'Eclair', calories: 262, fat: 16, carbs: 23, protein: 6 },
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  ]
</script>

<script>
  export default {
    data () {
      return {
        headers: [
          {
            title: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Calories', key: 'calories' },
          { title: 'Fat (g)', key: 'fat' },
          { title: 'Carbs (g)', key: 'carbs' },
          { title: 'Protein (g)', key: 'protein' },
        ],
        desserts: [
          { name: 'Frozen Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4 },
          { name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4.3 },
          { name: 'Eclair', calories: 262, fat: 16, carbs: 23, protein: 6 },
          { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
        ],
      }
    },
  }
</script>

<style scoped>
  ::v-deep(.v-table__wrapper)  > table > thead > tr > th:not(.v-data-table__th--sorted):not(:hover) .v-data-table-header__sort-icon {
    opacity: .3; /* $data-table-header-sort-icon-default-opacity */
  }
  ::v-deep(.v-data-table-header__sort-icon) {
    margin-inline: .5rem 0; /* $data-table-header-sort-icon-margin-inline */
  }
</style>
