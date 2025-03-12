<template>
  <v-data-table
    :group-by="groupBy"
    :headers="headers"
    :items="tools"
    item-value="name"
    hide-default-footer
  >
    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
      <tr>
        <td :colspan="columns.length">
          <div class="d-flex align-center">
            <v-btn
              :icon="isGroupOpen(item) ? '$expand' : '$next'"
              color="medium-emphasis"
              density="comfortable"
              size="small"
              variant="outlined"
              @click="toggleGroup(item)"
            ></v-btn>

            <span class="ms-4">Tool Type: {{ item.value }}</span>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup>
  const groupBy = [{ key: 'type', order: 'asc' }]

  const headers = [
    {
      title: 'Tool Name',
      align: 'start',
      sortable: false,
      key: 'name',
    },
    { title: 'Weight(kg)', key: 'weight' },
    { title: 'Length(cm)', key: 'length' },
    { title: 'Price($)', key: 'price' },
  ]

  const tools = [
    {
      name: 'Hammer',
      weight: 0.5,
      length: 30,
      price: 10,
      type: 'hand',
    },
    {
      name: 'Screwdriver',
      weight: 0.2,
      length: 20,
      price: 5,
      type: 'hand',
    },
    {
      name: 'Drill',
      weight: 1.5,
      length: 25,
      price: 50,
      type: 'power',
    },
    {
      name: 'Saw',
      weight: 0.7,
      length: 50,
      price: 15,
      type: 'hand',
    },
    {
      name: 'Tape Measure',
      weight: 0.3,
      length: 10,
      price: 8,
      type: 'measuring',
    },
    {
      name: 'Level',
      weight: 0.4,
      length: 60,
      price: 12,
      type: 'measuring',
    },
    {
      name: 'Wrench',
      weight: 0.6,
      length: 25,
      price: 10,
      type: 'hand',
    },
    {
      name: 'Pliers',
      weight: 0.3,
      length: 15,
      price: 7,
      type: 'hand',
    },
    {
      name: 'Sander',
      weight: 2.0,
      length: 30,
      price: 60,
      type: 'power',
    },
    {
      name: 'Multimeter',
      weight: 0.5,
      length: 15,
      price: 30,
      type: 'measuring',
    },
  ]
</script>

<script>
  export default {
    data () {
      return {
        groupBy: [
          {
            key: 'gluten',
            order: 'asc',
          },
        ],
        headers: [
          {
            title: 'Tool Name',
            align: 'start',
            sortable: false,
            key: 'name',
          },
          { title: 'Weight (kg)', key: 'weight' },
          { title: 'Length (cm)', key: 'length' },
          { title: 'Price ($)', key: 'price' },
        ],
        tools: [
          {
            name: 'Hammer',
            weight: 0.5,
            length: 30,
            price: 10,
            type: 'hand',
          },
          {
            name: 'Screwdriver',
            weight: 0.2,
            length: 20,
            price: 5,
            type: 'hand',
          },
          {
            name: 'Drill',
            weight: 1.5,
            length: 25,
            price: 50,
            type: 'power',
          },
          {
            name: 'Saw',
            weight: 0.7,
            length: 50,
            price: 15,
            type: 'hand',
          },
          {
            name: 'Tape Measure',
            weight: 0.3,
            length: 10,
            price: 8,
            type: 'measuring',
          },
          {
            name: 'Level',
            weight: 0.4,
            length: 60,
            price: 12,
            type: 'measuring',
          },
          {
            name: 'Wrench',
            weight: 0.6,
            length: 25,
            price: 10,
            type: 'hand',
          },
          {
            name: 'Pliers',
            weight: 0.3,
            length: 15,
            price: 7,
            type: 'hand',
          },
          {
            name: 'Sander',
            weight: 2.0,
            length: 30,
            price: 60,
            type: 'power',
          },
          {
            name: 'Multimeter',
            weight: 0.5,
            length: 15,
            price: 30,
            type: 'measuring',
          },
        ],
      }
    },
  }
</script>
