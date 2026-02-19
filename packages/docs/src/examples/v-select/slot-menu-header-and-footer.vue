<template>
  <v-container>
    <v-select
      v-model="model"
      v-model:menu="menu"
      :items="items"
      item-title="value"
      item-value="id"
      multiple
    >
      <template v-slot:menu-header="{ search, filteredItems }">
        <div class="pa-2 border-b">
          <v-text-field
            v-model="search.value"
            :error="!!search.value && !filteredItems.length"
            density="compact"
            placeholder="Search..."
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            clearable
            hide-details
          ></v-text-field>
        </div>
      </template>

      <template v-slot:menu-footer="{ search, filteredItems }">
        <div class="d-flex align-center pa-2 pl-4 border-t">
          <span v-if="search.value" class="text-body-2">
            Found {{ filteredItems.length }} of {{ items.length }}
          </span>

          <v-btn
            class="ml-auto"
            text="Done"
            variant="tonal"
            @click="menu = false"
          ></v-btn>
        </div>
      </template>
    </v-select>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const items = [
    { id: 1, value: 'Apple' },
    { id: 2, value: 'Banana' },
    { id: 3, value: 'Cherry' },
    { id: 4, value: 'Mango' },
    { id: 5, value: 'Orange' },
    { id: 6, value: 'Peach' },
    { id: 7, value: 'Pineapple' },
    { id: 8, value: 'Strawberry' },
  ]

  const model = shallowRef([])
  const menu = shallowRef(false)
</script>

<script>
  export default {
    data: () => ({
      items: [
        { id: 1, value: 'Apple' },
        { id: 2, value: 'Banana' },
        { id: 3, value: 'Cherry' },
        { id: 4, value: 'Mango' },
        { id: 5, value: 'Orange' },
        { id: 6, value: 'Peach' },
        { id: 7, value: 'Pineapple' },
        { id: 8, value: 'Strawberry' },
      ],
      model: [],
      menu: false,
    }),
  }
</script>
