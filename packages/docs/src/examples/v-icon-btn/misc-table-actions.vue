<template>
  <v-data-table
    :headers="headers"
    :items="plants"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon-btn
        size="small"
        icon="mdi-pencil"
        class="mr-2"
      />

      <v-icon-btn
        icon="mdi-delete-outline"
        size="small"
      />
    </template>
  </v-data-table>
</template>

<script setup>
  const headers = [
    { title: 'Title', align: 'start', key: 'title' },
    { title: 'Author', align: 'end', key: 'author' },
    { title: 'Actions', align: 'end', key: 'actions' },
  ]

  const plants = [
    { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee'},
    { id: 2, title: '1984', author: 'George Orwell'},
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald'},
    { id: 4, title: 'Sapiens', author: 'Yuval Noah Harari'},
    { id: 5, title: 'Dune', author: 'Frank Herbert'},
  ]
</script>
