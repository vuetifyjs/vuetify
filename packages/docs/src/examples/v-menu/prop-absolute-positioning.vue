<template>
  <div class="d-flex justify-center">
    <v-menu target="cursor">
      <template v-slot:activator="{ props }">
        <v-card
          v-bind="props"
          height="300"
          image="https://cdn.vuetifyjs.com/images/cards/girl.jpg"
          width="600"
        ></v-card>
      </template>

      <v-list :items="items"></v-list>
    </v-menu>
  </div>
</template>

<script setup>
  const items = [
    { title: 'Menu Item 1', value: 1 },
    { title: 'Menu Item 2', value: 2 },
    { title: 'Menu Item 3', value: 3 },
    { title: 'Menu Item 4', value: 4 },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Menu Item 1', value: 1 },
        { title: 'Menu Item 2', value: 2 },
        { title: 'Menu Item 3', value: 3 },
        { title: 'Menu Item 4', value: 4 },
      ],
    }),
  }
</script>
