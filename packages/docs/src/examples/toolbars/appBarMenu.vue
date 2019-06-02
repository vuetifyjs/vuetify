<template>
  <v-card
    color="grey lighten-4"
    flat
    height="200px"
  >
    <v-toolbar color="grey darken-1" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-menu :nudge-width="100">
        <template v-slot:activator="{ on }">
          <v-toolbar-title v-on="on">
            <span>All</span>
            <v-icon dark>arrow_drop_down</v-icon>
          </v-toolbar-title>
        </template>

        <v-list>
          <v-list-item
            v-for="item in items"
            :key="item"
            @click=""
          >
            <v-list-item-title v-text="item"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        'All', 'Family', 'Friends', 'Coworkers',
      ],
    }),
  }
</script>
