<template>
  <v-card
    class="pa-3"
    flat
    height="300px"
    img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
  >
    <v-toolbar
      dense
      floating
    >
      <v-text-field
        hide-details
        prepend-icon="search"
        single-line
      ></v-text-field>

      <v-btn icon>
        <v-icon>my_location</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>
