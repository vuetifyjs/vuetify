<template>
  <div class="text-body-2 mb-1">dividers with <v-code>vertical</v-code></div>
  <v-toolbar color="purple">
    <template v-slot:prepend>
      <div class="text-h5 px-3">Title</div>
    </template>

    <v-divider class="mx-3" vertical></v-divider>
    <v-toolbar-title>My Home</v-toolbar-title>

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

  <div class="text-body-2 mt-3 mb-1">dividers with <v-code>vertical</v-code> and <v-code>inset</v-code></div>
  <v-toolbar color="teal">
    <template v-slot:prepend>
      <div class="text-h5 px-3">Title</div>
    </template>

    <v-divider class="mx-3" inset vertical></v-divider>
    <v-toolbar-title>My Home</v-toolbar-title>

    <v-toolbar-items>
      <v-btn variant="text">News</v-btn>
      <v-divider inset vertical></v-divider>
      <v-btn variant="text">Blog</v-btn>
      <v-divider inset vertical></v-divider>
      <v-btn variant="text">Music</v-btn>
    </v-toolbar-items>
    <v-divider inset vertical></v-divider>
    <v-app-bar-nav-icon class="ms-2"></v-app-bar-nav-icon>
  </v-toolbar>
</template>
