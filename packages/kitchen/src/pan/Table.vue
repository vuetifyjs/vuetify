<template>
  <v-container>
    <core-title>Data table with custom grouping</core-title>
    <core-section>
      <v-data-table
        :headers="headers"
        :items="items"
        :group-by="'value'"
        :custom-group="groupBy"
      />
    </core-section>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Value', value: 'value' },
      ],
      items: [
        { id: 1, name: 'Test1', value: 2 },
        { id: 2, name: 'Test2', value: 3 },
        { id: 3, name: 'Test3', value: 1 },
        { id: 4, name: 'Test4', value: 2 },
        { id: 5, name: 'Test5', value: 3 },
        { id: 6, name: 'Test6', value: 1 },
      ],
    }),
    methods: {
      groupBy: function evenOddGrouper (items, groupBy) {
        const key = groupBy[0]
        return items.reduce((rv, x) => {
          const group = x[key] % 2 ? 'odd' : 'even';
          (rv[group] = rv[group] || []).push(x)
          return rv
        }, {})
      },
    },
  }
</script>
