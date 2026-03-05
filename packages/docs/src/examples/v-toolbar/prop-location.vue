<template>
  <v-container class="position-relative" min-height="150">
    <v-toolbar
      color="primary"
      density="compact"
      location="top left"
      title="Application"
      absolute
      floating
      rounded
    >
      <template v-slot:prepend>
        <v-btn icon="mdi-menu"></v-btn>
      </template>

      <template v-slot:append>
        <v-btn icon="mdi-magnify"></v-btn>
        <v-btn icon="mdi-heart"></v-btn>
      </template>
    </v-toolbar>

    <v-toolbar
      color="secondary"
      density="compact"
      location="top end"
      absolute
      floating
      rounded
    >
      <template v-slot:prepend>
        <v-btn icon="mdi-bell"></v-btn>
      </template>

      <template v-slot:append>
        <v-btn icon="mdi-account"></v-btn>
        <v-btn icon="mdi-cog"></v-btn>
      </template>
    </v-toolbar>

    <v-toolbar
      class="mb-2"
      color="surface"
      density="compact"
      location="bottom center"
      rounded="pill"
      absolute
      floating
    >
      <template v-slot:prepend>
        <v-btn icon="mdi-skip-previous"></v-btn>
        <v-btn icon="mdi-play"></v-btn>
        <v-btn icon="mdi-skip-next"></v-btn>
      </template>

      <v-slider class="mx-6" min-width="100" hide-details></v-slider>

      <template v-slot:append>
        <v-btn icon="mdi-volume-high"></v-btn>
      </template>
    </v-toolbar>
  </v-container>
</template>
