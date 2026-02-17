<template>
  <v-combobox
    v-model="model"
    v-model:menu="menu"
    :items="filteredItems"
    item-title="value"
    item-value="id"
    chips
    closable-chips
    multiple
  >
    <template v-slot:menu-header>
      <v-tabs
        v-model="tab"
        class="mt-2"
        slider-color="primary"
        grow
        @keydown.enter.stop
      >
        <v-tab value="fruits">Fruits</v-tab>
        <v-tab value="vegetables">Vegetables</v-tab>
      </v-tabs>
    </template>
  </v-combobox>
</template>

<script setup>
  import { computed, shallowRef } from 'vue'

  const fruits = [
    { id: 1, value: 'Apple', category: 'fruits' },
    { id: 2, value: 'Banana', category: 'fruits' },
    { id: 3, value: 'Cherry', category: 'fruits' },
    { id: 4, value: 'Mango', category: 'fruits' },
    { id: 5, value: 'Orange', category: 'fruits' },
    { id: 6, value: 'Peach', category: 'fruits' },
    { id: 7, value: 'Pineapple', category: 'fruits' },
    { id: 8, value: 'Strawberry', category: 'fruits' },
  ]

  const vegetables = [
    { id: 9, value: 'Broccoli', category: 'vegetables' },
    { id: 10, value: 'Carrot', category: 'vegetables' },
    { id: 11, value: 'Celery', category: 'vegetables' },
    { id: 12, value: 'Cucumber', category: 'vegetables' },
    { id: 13, value: 'Lettuce', category: 'vegetables' },
    { id: 14, value: 'Pepper', category: 'vegetables' },
    { id: 15, value: 'Spinach', category: 'vegetables' },
    { id: 16, value: 'Tomato', category: 'vegetables' },
  ]

  const items = [...fruits, ...vegetables]

  const model = shallowRef([fruits[0], vegetables[1]])
  const menu = shallowRef(false)
  const tab = shallowRef('fruits')

  const filteredItems = computed(() => {
    return items.filter(item => item.category === tab.value)
  })
</script>

<script>
  export default {
    data: () => ({
      fruits: [
        { id: 1, value: 'Apple', category: 'fruits' },
        { id: 2, value: 'Banana', category: 'fruits' },
        { id: 3, value: 'Cherry', category: 'fruits' },
        { id: 4, value: 'Mango', category: 'fruits' },
        { id: 5, value: 'Orange', category: 'fruits' },
        { id: 6, value: 'Peach', category: 'fruits' },
        { id: 7, value: 'Pineapple', category: 'fruits' },
        { id: 8, value: 'Strawberry', category: 'fruits' },
      ],
      vegetables: [
        { id: 9, value: 'Broccoli', category: 'vegetables' },
        { id: 10, value: 'Carrot', category: 'vegetables' },
        { id: 11, value: 'Celery', category: 'vegetables' },
        { id: 12, value: 'Cucumber', category: 'vegetables' },
        { id: 13, value: 'Lettuce', category: 'vegetables' },
        { id: 14, value: 'Pepper', category: 'vegetables' },
        { id: 15, value: 'Spinach', category: 'vegetables' },
        { id: 16, value: 'Tomato', category: 'vegetables' },
      ],
      model: [
        { id: 1, value: 'Apple', category: 'fruits' },
        { id: 10, value: 'Carrot', category: 'vegetables' },
      ],
      menu: false,
      tab: 'fruits',
    }),

    computed: {
      items () {
        return [...this.fruits, ...this.vegetables]
      },
      filteredItems () {
        return this.items.filter(item => item.category === this.tab)
      },
    },
  }
</script>
