<template>
  <v-toolbar>
    <template v-slot:prepend>
      <v-btn icon="i-mdi:arrow-left"></v-btn>
    </template>

    <v-btn class="ms-5" icon="i-mdi:archive-plus-outline"></v-btn>

    <v-btn icon="i-mdi:alert-circle-outline"></v-btn>

    <v-btn icon="i-mdi:delete-outline"></v-btn>

    <template v-if="$vuetify.display.smAndUp">
      <v-divider
        class="mx-3 align-self-center"
        length="24"
        thickness="2"
        vertical
      ></v-divider>

      <v-btn icon="i-mdi:folder-outline"></v-btn>

      <v-btn icon="i-mdi:tag-outline"></v-btn>

      <v-btn icon="i-mdi:dots-vertical"></v-btn>
    </template>
  </v-toolbar>
</template>
