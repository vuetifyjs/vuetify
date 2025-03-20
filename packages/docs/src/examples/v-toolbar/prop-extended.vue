<template>
  <v-card height="200">
    <v-toolbar extended>
      <v-toolbar-title text="Toolbar"></v-toolbar-title>

      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>

        <v-btn icon="mdi-heart"></v-btn>

        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-toolbar>
  </v-card>
</template>
