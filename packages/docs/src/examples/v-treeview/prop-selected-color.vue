<template>
  <div class="d-flex ga-4 flex-wrap">
    <v-treeview
      v-model:selected="selection"
      :items="items"
      class="flex-1-1-0"
      item-value="id"
      select-strategy="classic"
      selected-color="primary"
      open-all
      selectable
    ></v-treeview>
    <v-treeview
      v-model:selected="selection"
      :items="items"
      class="flex-1-1-0"
      item-value="id"
      select-strategy="classic"
      selected-color="success"
      open-all
      selectable
    ></v-treeview>
    <v-treeview
      v-model:selected="selection"
      :items="items"
      class="flex-1-1-0"
      item-value="id"
      select-strategy="classic"
      selected-color="red"
      open-all
      selectable
    ></v-treeview>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const selection = shallowRef([2])
  const items = [
    {
      id: 1,
      title: 'Today',
      children: [
        { id: 2, title: 'Gym' },
        { id: 3, title: 'Coffee' },
      ],
    },
    {
      id: 4,
      title: 'Tomorrow',
      children: [
        { id: 5, title: 'Work' },
        { id: 6, title: 'Hackathon' },
      ],
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      selection: [2],
      items: [
        {
          id: 1,
          title: 'Today',
          children: [
            { id: 2, title: 'Cleanup the desk' },
            { id: 3, title: 'Make a great coffee' },
          ],
        },
        {
          id: 4,
          title: 'Tomorrow',
          children: [
            { id: 5, title: 'Contribute to Vuetify' },
            { id: 6, title: 'Hit the Gym' },
          ],
        },
      ],
    }),
  }
</script>
