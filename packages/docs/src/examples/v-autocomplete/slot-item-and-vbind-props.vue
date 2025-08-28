<template>
  <v-app>
    <v-container>
      <v-autocomplete :items="items">
        <template v-slot:item="{ props, item }">
          <v-list-item v-bind="props"></v-list-item>
        </template>
      </v-autocomplete>
    </v-container>
  </v-app>
</template>

<script setup>
  const items = [
    ...Array.from({ length: 50 }, (_, i) => ({
      value: (i + 3).toString().padStart(19, '0'),
      title: `Mock  ${i + 1}`,
    })),
  ]
</script>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 50 }, (_, i) => ({
        value: (i + 3).toString().padStart(19, '0'),
        title: `Mock ${i + 1}`,
      })),
    }),
  }
</script>
