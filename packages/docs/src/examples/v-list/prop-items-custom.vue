<template>
  <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-list
      :items="items"
      item-title="name"
      item-value="id"
    ></v-list>
  </v-card>
</template>

<script setup>
  const items = [
    {
      name: 'Item #1',
      id: 1,
    },
    {
      name: 'Item #2',
      id: 2,
    },
    {
      name: 'Item #3',
      id: 3,
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          name: 'Item #1',
          id: 1,
        },
        {
          name: 'Item #2',
          id: 2,
        },
        {
          name: 'Item #3',
          id: 3,
        },
      ],
    }),
  }
</script>
