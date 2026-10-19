<template>
  <v-card
    class="mx-auto"
    height="200"
    image="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    max-width="400"
  >
    <v-card-title class="text-white">Right-click anywhere</v-card-title>

    <v-menu activator="parent" context-menu>
      <v-list density="compact">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :prepend-icon="item.icon"
          :title="item.title"
          link
        ></v-list-item>
      </v-list>
    </v-menu>
  </v-card>
</template>

<script setup>
  const items = [
    { title: 'Open', icon: 'mdi-open-in-new' },
    { title: 'Copy link', icon: 'mdi-link-variant' },
    { title: 'Download', icon: 'mdi-download' },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Open', icon: 'mdi-open-in-new' },
        { title: 'Copy link', icon: 'mdi-link-variant' },
        { title: 'Download', icon: 'mdi-download' },
      ],
    }),
  }
</script>
