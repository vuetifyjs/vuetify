<template>
  <v-toolbar color="purple">
    <template v-slot:prepend>
      <div class="text-h5">Title</div>
    </template>

    <v-divider
      class="ms-3"
      inset
      vertical
    ></v-divider>

    <v-toolbar-title>My Home</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn variant="text">News</v-btn>

      <v-divider vertical></v-divider>

      <v-btn variant="text">Blog</v-btn>

      <v-divider vertical></v-divider>

      <v-btn variant="text">Music</v-btn>
    </v-toolbar-items>

    <v-divider vertical></v-divider>

    <v-app-bar-nav-icon class="ms-2"></v-app-bar-nav-icon>
  </v-toolbar>
</template>
