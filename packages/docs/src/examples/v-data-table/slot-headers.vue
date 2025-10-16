<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    item-value="name"
    items-per-page="5"
    hover
  >
    <template v-slot:top>
      <v-expand-transition>
        <div v-if="headers.length < 6">
          <v-btn
            class="mb-2"
            rounded="lg"
            size="small"
            text="Reset"
            variant="text"
            block
            border
            @click="onClickReset"
          ></v-btn>

          <v-divider></v-divider>
        </div>
      </v-expand-transition>
    </template>

    <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
      <tr>
        <template v-for="column in columns" :key="column.key">
          <th>
            <div class="d-flex align-center">
              <span
                class="me-2 cursor-pointer"
                @click="toggleSort(column)"
                v-text="column.title"
              ></span>

              <v-icon
                v-if="isSorted(column)"
                :icon="getSortIcon(column)"
                color="medium-emphasis"
              ></v-icon>

              <v-icon
                v-if="column.removable"
                color="medium-emphasis"
                icon="$close"
                @click="remove(column.key)"
              ></v-icon>
            </div>
          </th>
        </template>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup>
  import { ref } from 'vue'

  function DEFAULT_HEADERS () {
    return [
      {
        title: 'Dessert',
        align: 'start',
        key: 'name',
        sortable: false,
        removable: false,
      },
      { title: 'Calories', key: 'calories', removable: true },
      { title: 'Fat(g)', key: 'fat', removable: true },
      { title: 'Carbs(g)', key: 'carbs', removable: true },
      { title: 'Protein(g)', key: 'protein', removable: true },
      { title: 'Iron(%)', key: 'iron', removable: true },
    ]
  }

  const headers = ref(DEFAULT_HEADERS())

  const desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6,
      carbs: 24,
      protein: 4,
      iron: 1,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9,
      carbs: 37,
      protein: 4.3,
      iron: 1,
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16,
      carbs: 23,
      protein: 6,
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
      fat: 16,
      carbs: 49,
      protein: 3.9,
      iron: 16,
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0,
      carbs: 94,
      protein: 0,
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
      fat: 25,
      carbs: 51,
      protein: 4.9,
      iron: 22,
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26,
      carbs: 65,
      protein: 7,
      iron: 6,
    },
  ]

  function onClickReset () {
    headers.value = DEFAULT_HEADERS()
  }

  function remove (key) {
    headers.value = headers.value.filter(header => header.key !== key)
  }
</script>

<script>
  function DEFAULT_HEADERS () {
    return [
      {
        title: 'Dessert',
        align: 'start',
        key: 'name',
        sortable: false,
        removable: false,
      },
      { title: 'Calories', key: 'calories', removable: true },
      { title: 'Fat(g)', key: 'fat', removable: true },
      { title: 'Carbs(g)', key: 'carbs', removable: true },
      { title: 'Protein(g)', key: 'protein', removable: true },
      { title: 'Iron(%)', key: 'iron', removable: true },
    ]
  }

  export default {
    data: () => ({
      headers: DEFAULT_HEADERS(),
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
    }),
    methods: {
      onClickReset () {
        this.headers = DEFAULT_HEADERS()
      },
      remove (key) {
        this.headers = this.headers.filter(header => header.key !== key)
      },
    },
  }
</script>
