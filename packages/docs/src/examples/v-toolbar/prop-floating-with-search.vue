<template>
  <v-card
    class="pa-4"
    height="300px"
    img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
    flat
  >
    <v-toolbar
      dense
      floating
    >
      <v-text-field
        prepend-icon="mdi-magnify"
        hide-details
        single-line
      ></v-text-field>

      <v-btn icon>
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>
