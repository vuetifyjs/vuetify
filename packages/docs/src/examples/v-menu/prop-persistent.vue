<template>
  <div class="text-center">
    <v-menu persistent>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Dropdown </v-btn>
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
