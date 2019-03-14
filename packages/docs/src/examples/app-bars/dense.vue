<template>
  <v-app-bar
    color="deep-purple accent-4"
    dense
    dark
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Page title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-menu
      left
      bottom
    >
      <template #activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile
          v-for="n in 5"
          :key="n"
          @click="() => {}"
        >
          <v-list-tile-title>Option {{ n }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>
